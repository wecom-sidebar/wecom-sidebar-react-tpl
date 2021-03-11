import Cookies from 'js-cookie'
import qs from 'qs'
import {isMock} from "./env"
import {Config} from "./initSdk"

type GetUserId = (code: string) => Promise<string>

/**
 * 判断查询参数是否存在 code
 * @returns {boolean}
 */
const hasCodeExisted = () => window.location.search.includes('code');

/**
 * 获取重定位的 OAuth 路径
 * @returns {string}
 */
const getOAuthUrl = (config: Config) => {
  const [redirectUri] = window.location.href.split('#');

  const searchObj = {
    appid: config.corpId,
    redirect_uri: encodeURIComponent(redirectUri),
    response_type: 'code',
    scope: 'snsapi_base',
    agentid: config.agentId,
    state: 'A1',
  };

  const search = Object.entries(searchObj)
    .map(entry => {
      const [key, value] = entry;
      return `${key}=${value}`;
    })
    .join('&');

  return `https://open.weixin.qq.com/connect/oauth2/authorize?${search}#wechat_redirect`;
};

/**
 * 判断当前网页是否需要重定向
 */
const checkRedirect = async (config: Config, getUserId: GetUserId) => {
  if (isMock) return

  const userId = Cookies.get('userId')

  if (!userId && !hasCodeExisted()) {
    // 需要重定向
    window.location.replace(getOAuthUrl(config));
  } else {
    // 重定向回来后获取 userId
    if (!userId) {
      const code = qs.parse(window.location.search.slice(1)).code as string

      const newUserId = await getUserId(code)

      Cookies.set('userId', newUserId)
    }
  }
};

export default checkRedirect
