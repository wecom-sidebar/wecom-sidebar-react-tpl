/// <reference types="react-scripts" />
import {WxSDK} from "./lib/jsSdk/types"

declare global {
  interface Window {
    // Mock 企业微信的 SDK
    fakeJsSdk?: Partial<WxSDK>;
  }
}
