import _jsSdk from "./jsSdk"
import {invokeResMock, isMock, wxResMock} from "./mock"
import {mockJsSdk} from "./jsSdk/utils"

const jsSdk = isMock ? mockJsSdk(_jsSdk, wxResMock, invokeResMock) : _jsSdk;

export default jsSdk
