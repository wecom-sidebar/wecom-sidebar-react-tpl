import {isMock} from "./env"
import wecomJsSdk, {mockWxSDK} from "./jsSdk"
import {WxSDK} from './jsSdk/types'

// Windows 传入的 jsSdk
export const fakeJsSdk: Partial<WxSDK> = isMock && window.fakeJsSdk ? window.fakeJsSdk : {};

const jsSdk = isMock ? mockWxSDK(fakeJsSdk) : wecomJsSdk;

export default jsSdk
