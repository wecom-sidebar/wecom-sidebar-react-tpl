import {isMock} from "./env"
import _jsSdk from "./jsSdk"
import {invokeResMock, wxResMock} from "./mock"
import {mockJsSdk} from "./jsSdk/utils"

const jsSdk = isMock ? mockJsSdk(_jsSdk, wxResMock, invokeResMock) : _jsSdk;

export default jsSdk
