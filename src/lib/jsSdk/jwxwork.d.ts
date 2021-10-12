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
  type ConfigCallback<ExtraRes> = (res: ConfigCallback & ExtraRes) => void;
  type InvokeCallback<ExtraRes> = (res: InvokeCallbackRes & ExtraRes) => void;

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
  declare function ready(callback: Function);

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

  // 获取进入H5页面的入口环境
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94326
  declare function invoke(api: 'getContext', {}, callback: InvokeCallback<{
    entry: 'normal' | 'contact_profile' | 'single_chat_tools' | 'group_chat_tools' | 'chat_attachment'; // 返回进入H5页面的入口类型
    shareTicket: string; // 可用于调用getShareInfo接口
  }>);

  // 选人接口
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/91819
  declare function invoke(
    api: 'selectEnterpriseContact',
    params: {
      fromDepartmentId: -1 | 0,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
      mode: 'single' | 'multi',// 必填，选择模式，single表示单选，multi表示多选
      type: string[],// 必填，选择限制类型，指定department、user中的一个或者多个
      selectedDepartmentIds?: string[],// 非必填，已选部门ID列表。用于多次选人时可重入，single模式下请勿填入多个id
      selectedUserIds?: string[]// 非必填，已选用户ID列表。用于多次选人时可重入，single模式下请勿填入多个id
    },
    callback: InvokeCallbackRes<{
      result: string | {
        departmentList: {
          id: string; // 已选的单个部门ID
          name: string; // 已选的单个部门名称
        }[]; // 已选的部门列表
        userList: {
          id: string; // 已选的单个成员ID
          name: string; // 已选的单个成员名称
          avatar: string; // 已选的单个成员头像
        }[] // 已选的用户
      }
    }>
  )

  // 打开个人信息页接口
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/91822
  declare function invoke(
    api: 'openUserProfile',
    params: {
      type: 1 | 2, // 1表示该userid是企业成员，2表示该userid是外部联系人
      userid: string // 可以是企业成员，也可以是外部联系人
    },
    callback: InvokeCallbackRes
  )

  // 企业互联选人接口
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94364
  declare function invoke(
    api: 'selectCorpGroupContact',
    params: {
      fromDepartmentId: -1 | 0;// 必填，表示打开的通讯录从指定的部门开始展示，-1表示打开的通讯录从自己所在部门开始展示, 0表示从最上层开始。移动端，当需要展开的部门不在应用可见范围内，则从应用的可见范围开始展开。
      mode: 'single' | 'multi';// 必填，选择模式，single表示单选，multi表示多选
      type: string[],// 必填，选择限制类型，指定department、user中的一个或者多个
      selectedDepartmentIds?: string[],// 非必填，已选部门ID列表。用于多次选人时可重入
      selectedUserIds?: string[],// 非必填，仅自建应用使用，第三方应用会忽略该字段，已选用户ID列表。用于多次选人时可重入
      selectedOpenUserIds?: string[],// 非必填，仅第三方应用使用，自建应用会忽略该字段，已选用户ID列表。用于多次选人时可重入
      selectedCorpGroupDepartmentIds?: { // 非必填，已选企业互联部门ID列表。用于多次选人时可重入
        corpId: string;                 // 企业CORPID
        departmentId: string;                 // 部门ID
      }[];
      selectedCorpGroupUserIds?: { // 非必填，已选企业互联用户ID列表。用于多次选人时可重入
        corpId: string,                 // 企业CORPID
        userId: string,                 // 成员ID，仅自建应用返回
        openUserId: string                 // 成员OPEN_USERID，仅第三方应用返回
      }[];
    },
    callback: InvokeCallback<{
      result: string | {
        departmentList: {
          id: string; // 已选的单个部门ID
        }[];
        userList: {
          id: string; // 已选的单个成员ID，仅自建应用返回
          openUserId: string // 已选的单个成员ID，仅第三方应用返回
        }[];
        corpGroupDepartmentList: {
          corpId: string; // 企业CORPID
          id: string; // 已选的单个部门ID
        }[];
        corpGroupUserList: {
          corpId: string; // 企业CORPID
          id: string; // 已选的单个成员ID，仅自建应用返回
          openUserId: string; // 已选的单个成员ID，仅第三方应用返回
        }[];
      }
    }>
  )

  // 返回ticket的选人接口
  // 详情：https://open.work.weixin.qq.com/api/doc/90001/90144/94516
  declare function invoke(
    api: 'selectPrivilegedContact',
    params: {
      fromDepartmentId: -1 | 0,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
      mode: 'multi' | 'single',// 必填，选择模式，single表示单选，multi表示多选
      selectedContextContact?: 1 | 0    // 是否勾选当前环境的参与者。1表示是，0表示否。
      selectedOpenUserIds?: string[], // 非必填，已选用户OpenID列表。single模式忽略该参数。
      selectedTickets?: string[] // 非必填，已选ticket列表。single模式忽略该参数
    },
    callback: InvokeCallback<{
      userList?: { // 已选的成员列表
        openUserId: string; // 成员openUserId
      }[];
      selectedTicket: string;    // 已选的集合Ticket
      expiresIn: number;    // ticket有效期
      selectedUserCount: number;    // 用户选中的用户个数
    }>
  )

  // 认领老师班级
  // 详情：https://open.work.weixin.qq.com/api/doc/90001/90144/94546
  declare function invoke(
    api: 'claimClassAdmin',
    params: {},
    callback: InvokeCallback<{
      departmentIds: string[]; // 认领的班级部门id列表
    }>
  )

  /**
   * 隐藏分享按钮
   */
  declare function hideOptionMenu(): void;
}
