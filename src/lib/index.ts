import _jsSdk from "./jsSdk"
import {isMock, mockJsSdk} from "./jsSdk/utils"
import checkRedirect from "./utils/checkRedirect";
import initSdk from "./utils/initSdk";

/**
 * 生成 jssdk 的函数
 * @param wxResMock wx.fn 的 mock 映射关系
 * @param invokeResMock wx.invoke 的 mock 映射关系
 */
const createJsSdk = (wxResMock?: Record<string, any>, invokeResMock?: Record<string, any>) => {
  return isMock ? mockJsSdk(_jsSdk, wxResMock || {}, invokeResMock || {}) : _jsSdk;
}

export {
  createJsSdk,
  checkRedirect,
  initSdk,
}
