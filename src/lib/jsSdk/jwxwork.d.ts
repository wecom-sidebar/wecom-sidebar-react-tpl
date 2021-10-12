declare namespace wx {
  /**
   * 所有 api
   */
  type Api =
    | 'getOpenData'
    | 'getContext'
    | 'onMenuShareAppMessage'
    | 'sendChatMessage'
    | 'onMenuShareWechat'
    | 'onMenuShareTimeline'
    | 'startRecord'
    | 'stopRecord'
    | 'onVoiceRecordEnd'
    | 'playVoice'
    | 'pauseVoice'
    | 'stopVoice'
    | 'onVoicePlayEnd'
    | 'uploadVoice'
    | 'downloadVoice'
    | 'chooseImage'
    | 'previewImage'
    | 'uploadImage'
    | 'downloadImage'
    | 'getLocalImgData'
    | 'getNetworkType'
    | 'onNetworkStatusChange'
    | 'openLocation'
    | 'getLocation'
    | 'startAutoLBS'
    | 'stopAutoLBS'
    | 'onLocationChange'
    | 'onHistoryBack'
    | 'hideOptionMenu'
    | 'showOptionMenu'
    | 'hideMenuItems'
    | 'showMenuItems'
    | 'hideAllNonBaseMenuItem'
    | 'showAllNonBaseMenuItem'
    | 'closeWindow'
    | 'openDefaultBrowser'
    | 'scanQRCode'
    | 'selectEnterpriseContact'
    | 'openEnterpriseChat'
    | 'chooseInvoice'
    | 'selectExternalContact'
    | 'getCurExternalContact'
    | 'openUserProfile'
    | 'shareAppMessage'
    | 'shareWechatMessage'
    | 'startWifi'
    | 'stopWifi'
    | 'connectWifi'
    | 'getWifiList'
    | 'onGetWifiList'
    | 'onWifiConnected'
    | 'getConnectedWifi'
    | 'setClipboardData'
    | 'wwapp.getOpenData'
    | 'wwapp.initWwOpenData'
    | 'getCurExternalChat';

  /**
   * 所有企业微信 SDK 的回调返回类型
   * 类型为对象，其中除了每个接口本身返回的数据之外，还有一个通用属性errMsg，其值格式如下：
   * 调用成功时：”xxx:ok” ，其中xxx为调用的接口名
   * 用户取消时：”xxx:cancel”，其中xxx为调用的接口名
   * 调用失败时：其值为具体错误信息
   */
  interface ConfigCallbackRes {
    errMsg: string;
  }
  interface InvokeCallbackRes {
    err_msg: string;
  }

  /**
   * 所有企业微信 SDK 的回调函数
   */
  type ConfigCallback<ExtraRes = {}> = (res: ConfigCallbackRes & ExtraRes) => void;
  type InvokeCallback<ExtraRes = {}> = (res: InvokeCallbackRes & ExtraRes) => void;

  // wx.fn 的通用传参
  interface Params {
    success?: InvokeCallback
    fail?: InvokeCallback
    complete?: Function;
    cancel?: Function;
    trigger?: Function;
  }


  // checkJsApi ----------------------------------------------------------------------
  // 判断当前客户端版本是否支持指定JS接口
  interface checkJsApiParams {
    jsApiList: Api[]; // 需要检测的JS接口列表
    // 以键值对的形式返回，可用的api值true，不可用为false
    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    success?: InvokeCallback<{
      checkResult: {[api in Api]: boolean},
      errMsg: string;
    }>
  }
  declare function checkJsApi(params: checkJsApiParams);

  // config ----------------------------------------------------------------------
  interface ConfigParams extends Params {
    beta: boolean; // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
    debug: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: string; // 必填，企业微信的corpID
    timestamp: number; // 必填，生成签名的时间戳
    nonceStr: string; // 必填，生成签名的随机串
    signature: string; // 必填，签名，见 附录-JS-SDK使用权限签名算法
    jsApiList: Api[]; // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
  }
  /**
   * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，
   * 对于变化url的SPA（single-page application）的web app可在每次url变化时进行调用）
   * 详见：https://work.weixin.qq.com/api/doc/90000/90136/90514
   * @param configParams
   */
  declare function config(configParams: ConfigParams);

  // ready ----------------------------------------------------------------------
  /**
   * 通过ready接口处理成功验证
   * @param callback
   */
  declare function ready(callback: () => void);

  // error ----------------------------------------------------------------------
  /**
   * 通过error接口处理失败验证
   * @param callback
   */
  declare function error(callback: ConfigCallback);

  // agentConfig ----------------------------------------------------------------------
  interface AgentConfigParams extends Params {
    corpid: string; // 必填，企业微信的corpid，必须与当前登录的企业一致
    agentid: string; // 必填，企业微信的应用id （e.g. 1000247）
    timestamp: number; // 必填，生成签名的时间戳
    nonceStr: string; // 必填，生成签名的随机串
    signature: string; // 必填，签名，见附录-JS-SDK使用权限签名算法
    jsApiList: API[]; // 必填
    success?: ConfigCallback; // 成功回调
    fail?: ConfigCallback; // 失败回调
    complete?: ConfigCallback; // 失败或成功都会回调
  }
  /**
   * config注入的是企业的身份与权限，而agentConfig注入的是应用的身份与权限。
   * 尤其是当调用者为第三方服务商时，通过config无法准确区分出调用者是哪个第三方应用，
   * 而在部分场景下，又必须严谨区分出第三方应用的身份，此时即需要通过agentConfig来注入应用的身份信息。
   * 详见：https://work.weixin.qq.com/api/doc/90000/90136/90515
   * @param agentConfigParams
   */
  declare function agentConfig(agentConfigParams: AgentConfigParams);

  // invoke ----------------------------------------------------------------------
  /**
   * SDK 调用函数
   * @param apiName API 名
   * @param params 传入的参数
   * @param callback 成功/失败回调
   */
  declare function invoke<ExtraRes = {}>(
    apiName: Api,
    params: Object,
    callback: InvokeCallback<ExtraRes>
  );

  /**
   * 隐藏分享按钮
   */
  declare function hideOptionMenu(): void;
}
