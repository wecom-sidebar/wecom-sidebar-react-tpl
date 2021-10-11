/// <reference types="react-scripts" />
import {JsSDK} from "./lib/jsSdk";

declare global {
  interface Window {
    // wx.invoke 里的 Mock 关系表，apiName -> result
    invokeResMock?: Partial<JsSDK>;
    // 企业微信的 JsSdk 的 Mock 关系表，fnName -> result
    wxResMock?: Partial<JsSDK>;
  }
}
