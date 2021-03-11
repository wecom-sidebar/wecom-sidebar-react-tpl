import sha1 from 'sha1';
import apis from './jsSdk/apis';
import jsSdk from "./index"

export interface Config {
  corpId: string;
  agentId: string;
}

export type GetTicket = () => Promise<string>
export type GetUserId = (code: string) => Promise<string>

export interface Options {
  config: Config
  getAppTicket: GetTicket
  getCorpTicket: GetTicket
  getUserId: GetUserId
}

/**
 * 签名生成规则如下：
 * 参与签名的参数有四个: noncestr（随机字符串）, jsapi_ticket(如何获取参考“获取企业jsapi_ticket”以及“获取应用的jsapi_ticket接口”), timestamp（时间戳）, url（当前网页的URL， 不包含#及其后面部分）
 * 将这些参数使用URL键值对的格式 （即 key1=value1&key2=value2…）拼接成字符串string1。
 * 有两个注意点：1. 字段值采用原始值，不要进行URL转义；2. 必须严格按照如下格式拼接，不可变动字段顺序。
 * jsapi_ticket=${jsapiTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}
 * @param nonceStr
 * @param jsapiTicket 随机字符串
 * @param timestamp 时间截
 */
const sign = (jsapiTicket: string, nonceStr: string, timestamp: number) => {
  const [url] = window.location.href.split('#');

  const rawObj = {
    jsapi_ticket: jsapiTicket,
    noncestr: nonceStr,
    timestamp,
    url,
  };

  const rawStr = Object.entries(rawObj)
    .map(entry => {
      const [key, value] = entry;

      return `${key}=${value}`;
    })
    .join('&');

  return sha1(rawStr);
};

/**
 * 获取签名
 * @param nonceStr
 * @param timestamp
 * @param getAppTicket
 * @param getCorpTicket
 */
const prepareSign = async (nonceStr: string, timestamp: number, getAppTicket: GetTicket, getCorpTicket: GetTicket) => {
  const promises = [getAppTicket()]

  // 如果版本 < 3.0.24，还需要获取企业的jsapi_ticket
  if (jsSdk.checkDeprecated()) {
    promises.push(getCorpTicket())
  }

  const [ appTicket, corpTicket ] = await Promise.all(promises)

  return {
    appSign: sign(appTicket || '', nonceStr, timestamp),
    corpSign: corpTicket ? sign(corpTicket || '', nonceStr, timestamp) : null,
  };
};

/**
 * 初始化企业微信 SDK 库
 * @param options 自建应用的基本信息
 */
const initSdk = async (options: Options) => {
  const { corpId, agentId } = options.config;

  const nonceStr = btoa(new Date().toISOString());
  const timestamp = Date.now();

  // 获取 ticket
  const { appSign, corpSign } = await prepareSign(nonceStr, timestamp, options.getAppTicket, options.getCorpTicket);

  // corpSign 存在则说明版本 < 3.0.24
  // 注意：这里不能做并行操作，要先 config 再 agentConfig
  if (corpSign) {
    await jsSdk.config({
      beta: true,
      debug: false,
      appId: corpId,
      timestamp,
      nonceStr,
      signature: corpSign,
      jsApiList: apis,
    }).catch(e => {
      console.error(e)
    });
  }

  await jsSdk.agentConfig({
    corpid: corpId,
    agentid: agentId,
    timestamp,
    nonceStr,
    signature: appSign,
    jsApiList: apis,
  }).catch(e => {
    console.error(e)
  });
};

export default initSdk
