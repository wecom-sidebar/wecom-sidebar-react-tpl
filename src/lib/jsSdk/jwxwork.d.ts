declare namespace wx {
  // 所有 wx.invoke 的 api 名
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
    | 'getCurExternalChat'
    | 'createSchoolPayment'
    | 'startMeeting'
    | 'startLiving'
    | 'replayLiving'
    | 'downloadLivingReplay'

  /**
   * 所有企业微信 SDK 的回调返回类型
   * 类型为对象，其中除了每个接口本身返回的数据之外，还有一个通用属性errMsg，其值格式如下：
   * 调用成功时：”xxx:ok” ，其中xxx为调用的接口名
   * 用户取消时：”xxx:cancel”，其中xxx为调用的接口名
   * 调用失败时：其值为具体错误信息
   */
  interface WxFnCallbackRes {
    errMsg: string;
  }

  interface WxInvokeCallbackRes {
    err_msg: string;
  }

  // 企业微信发送消息的格式
  interface TextMessage {
    msgtype: 'text',
    text: {
      content: string; // 文本内容
    }
  }

  interface ImageMessage {
    msgtype: 'image',
    image: {
      mediaid: string, //图片的素材id
    }
  }

  interface VideoMessage {
    msgtype: 'video',
    video: {
      mediaid: string, //视频的素材id
    }
  }

  interface FileMessage {
    msgtype: 'file';
    file: {
      mediaid: string, //文件的素材id
    }
  }

  interface NewsMessage {
    msgtype: 'news';
    news: {
      link: string, //H5消息页面url 必填
      title: string, //H5消息标题
      desc: string, //H5消息摘要
      imgUrl: string, //H5消息封面图片URL
    }
  }

  interface MiniProgramMessage {
    msgtype: 'miniprogram';
    miniprogram: {
      appid: string,//小程序的appid
      title: string, //小程序消息的title
      imgUrl: string,//小程序消息的封面图。必须带http或者https协议头，否则报错 $apiName$:fail invalid imgUrl
      page: string, //小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
    }
  }

  interface LinkMessage {
    msgtype: 'link',
    link: {
      title?: string;
      desc?: string;
      url: string;
      imgUrl?: string;
    }
  }

  type Message =
    TextMessage
    | ImageMessage
    | VideoMessage
    | FileMessage
    | NewsMessage
    | MiniProgramMessage
    | LinkMessage

  // 分享内容
  interface ShareContent {
    title: string, // 分享标题
    desc: string, // 分享描述
    link: string, // 分享链接
    imgUrl: string // 分享封面
  }

  // 参与会话的互联企业成员
  interface CorpGroupUserId {
    corpId: string,                 // 企业CORPID
    userId?: string,                 // 成员ID，仅自建应用使用
    openUserId?: string              // 成员OPEN_USERID，仅第三方应用使用
  }

  // 所有企业微信 SDK 的回调函数
  type WxFnCallback<ExtraRes = {}> = (res: WxFnCallbackRes & ExtraRes) => void;
  type WxInvokeCallback<ExtraRes = {}> = (res: WxInvokeCallbackRes & ExtraRes) => void;

  // wx.fn 的通用传参
  interface Params {
    success?: WxInvokeCallback
    fail?: WxInvokeCallback
    complete?: Function;
    cancel?: Function;
    trigger?: Function;
  }

  // 判断当前客户端版本是否支持指定JS接口
  interface checkJsApiParams {
    jsApiList: Api[]; // 需要检测的JS接口列表
    // 以键值对的形式返回，可用的api值true，不可用为false
    // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
    success?: WxInvokeCallback<{
      checkResult: { [api in Api]: boolean },
      errMsg: string;
    }>
  }

  declare function checkJsApi(params: checkJsApiParams);

  /**
   * 所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，
   * 对于变化url的SPA（single-page application）的web app可在每次url变化时进行调用）
   * 详见：https://work.weixin.qq.com/api/doc/90000/90136/90514
   */
  interface ConfigParams extends Params {
    beta: boolean; // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
    debug: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: string; // 必填，企业微信的corpID
    timestamp: number; // 必填，生成签名的时间戳
    nonceStr: string; // 必填，生成签名的随机串
    signature: string; // 必填，签名，见 附录-JS-SDK使用权限签名算法
    jsApiList: Api[]; // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
  }

  declare function config(configParams: ConfigParams);

  // 通过ready接口处理成功验证
  declare function ready(callback: () => void);

  // 通过error接口处理失败验证
  declare function error(callback: WxFnCallback);

  /**
   * config注入的是企业的身份与权限，而agentConfig注入的是应用的身份与权限。
   * 尤其是当调用者为第三方服务商时，通过config无法准确区分出调用者是哪个第三方应用，
   * 而在部分场景下，又必须严谨区分出第三方应用的身份，此时即需要通过agentConfig来注入应用的身份信息。
   * 详见：https://work.weixin.qq.com/api/doc/90000/90136/90515
   */
  interface AgentConfigParams extends Params {
    corpid: string; // 必填，企业微信的corpid，必须与当前登录的企业一致
    agentid: string; // 必填，企业微信的应用id （e.g. 1000247）
    timestamp: number; // 必填，生成签名的时间戳
    nonceStr: string; // 必填，生成签名的随机串
    signature: string; // 必填，签名，见附录-JS-SDK使用权限签名算法
    jsApiList: API[]; // 必填
    success?: WxFnCallback; // 成功回调
    fail?: WxFnCallback; // 失败回调
    complete?: WxFnCallback; // 失败或成功都会回调
  }

  declare function agentConfig(agentConfigParams: AgentConfigParams);

  // 打开会话，详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93231
  declare function openEnterpriseChat(params: {
    // 注意：userIds和externalUserIds至少选填一个。内部群最多2000人；外部群最多500人；如果有微信联系人，最多40人
    userIds: string,    //参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
    externalUserIds: string, // 参与会话的外部联系人列表，格式为userId1;userId2;…，用分号隔开。
    groupName: string,  // 会话名称。单聊时该参数传入空字符串""即可。
    chatId: string, // 若要打开已有会话，需指定此参数。如果是新建会话，chatId必须为空串
    success: WxInvokeCallback<{ chatId: string }>
    fail: WxFnCallback;
  });

  // 以下接口详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90523
  // 获取“转发”按钮点击状态及自定义分享内容接口，
  declare function onMenuShareAppMessage(params: ShareContent & {
    success: () => void; // 用户确认分享后执行的回调函数
    cancel: () => void; // 用户取消分享后执行的回调函数
  })

  // 获取“微信”按钮点击状态及自定义分享内容接口
  declare function onMenuShareWechat(params: ShareContent & {
    success: () => void; // 用户确认分享后执行的回调函数
    cancel: () => void; // 用户取消分享后执行的回调函数
  })

  // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
  declare function onMenuShareTimeline(params: Omit<ShareContent, 'desc'> & {
    success: () => void; // 用户确认分享后执行的回调函数
    cancel: () => void; // 用户取消分享后执行的回调函数
  })

  // 以下界面 API 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90524
  // 监听页面返回事件
  declare function onHistoryBack(callback: Function);

  // 隐藏右上角菜单接口
  declare function hideOptionMenu();

  // 显示右上角菜单接口
  declare function showOptionMenu();

  // 关闭当前网页窗口接口
  declare function closeWindow();

  // 批量隐藏功能按钮接口
  type MenuItem =
    'menuItem:setFont'
    | 'menuItem:refresh'
    | 'menuItem:share:appMessage'
    | 'menuItem:share:wechat'
    | 'menuItem:favorite'
    | 'menuItem:copyUrl'
    | 'menuItem:openWithSafari'
    | 'menuItem:share:email'

  // 批量隐藏功能按钮接口
  declare function hideMenuItems(params: {
    menuList: MenuItem[] // 要隐藏的菜单项
  })

  // 批量显示功能按钮接口
  declare function showMenuItems(params: {
    menuList: MenuItem[] // 要显示的菜单项
  })

  // 隐藏所有非基础按钮接口
  declare function hideAllNonBaseMenuItem();

  // 显示所有功能按钮接口
  declare function showAllNonBaseMenuItem();

  // 用户截屏事件
  declare function onUserCaptureScreen(callback: Function);

  // 企业微信扫一扫
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90526
  declare function scanQRCode(params: {
      desc: string,
      needResult: 0 | 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
      scanType: string[], // 可以指定扫二维码还是条形码（一维码），默认二者都有
      success: WxFnCallback
      error: WxFnCallback
  })

  // 以下 API 为图像接口，详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90528
  // 获取本地图片接口
  declare function getLocalImgData(params: {
    localId: string, // 图片的localID
    success: WxFnCallback<{
      localData: string // base64 数据
    }>
  })

  // 拍照或从手机相册中选图接口
  declare function chooseImage(params: {
    count: number, // 默认9
    sizeType: Array<'original' | 'compressed'>, // 可以指定是原图还是压缩图，默认二者都有
    sourceType: Array<'album', 'camera'>, // 可以指定来源是相册还是相机，默认二者都有
    defaultCameraMode: 'normal' | 'batch', //表示进入拍照界面的默认模式，目前有normal与batch两种选择，normal表示普通单拍模式，batch表示连拍模式，不传该参数则为normal模式。从3.0.26版本开始支持front和batch_front两种值，其中front表示默认为前置摄像头单拍模式，batch_front表示默认为前置摄像头连拍模式。（注：用户进入拍照界面仍然可自由切换两种模式）
    isSaveToAlbum: 0 | 1, //整型值，0表示拍照时不保存到系统相册，1表示自动保存，默认值是1
    success: WxFnCallback<{
      // 返回选定照片的本地ID列表，
      // andriod中localId可以作为img标签的src属性显示图片；
      // iOS应当使用 getLocalImgData 获取图片base64数据，从而用于img标签的显示（在img标签内使用 wx.chooseImage 的 localid 显示可能会不成功）
      localIds: string[]
    }>
  })

  // 预览图片接口
  declare function previewImage(params: {
    current: string, // 当前显示图片的http链接
    urls: string[] // 需要预览的图片http链接列表
  })

  // 上传图片接口
  declare function uploadImage(params: {
    localId: string, // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 0 | 1, // 默认为1，显示进度提示
    success: WxFnCallback<{
      serverId: string; // 返回图片的服务器端ID
    }>
  })

  // 下载图片接口
  declare function downloadImage(params: {
    serverId: string, // 需要下载的图片的服务器端ID，由uploadImage接口获得
    isShowProgressTips: 0 | 1, // 默认为1，显示进度提示
    success: WxFnCallback<{
      localId: string; // 返回图片下载后的本地ID
    }>
  })

  // 以下为音频接口，详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90529
  // 开始录音接口
  declare function startRecord();
  // 停止录音接口
  declare function stopRecord(params: {
    success: WxFnCallback<{ localId: string }>
  })
  // 监听录音自动停止接口
  declare function onVoiceRecordEnd(params: {
    complete: WxFnCallback<{ localId: string }>
  })
  // 播放语音接口
  declare function playVoice(params: {
    localId: '' // 需要播放的音频的本地ID，由stopRecord接口获得
  })
  // 暂停播放接口
  declare function pauseVoice(params: {
    localId: '' // 需要暂停的音频的本地ID，由stopRecord接口获得
  })
  // 停止播放接口
  declare function stopVoice(params: {
    localId: string // 需要停止的音频的本地ID，由stopRecord接口获得
  })
  // 监听语音播放完毕接口
  declare function onVoicePlayEnd(params: {
    success: WxFnCallback<{
      localId: string; // 返回音频的本地ID
    }>
  })
  // 上传语音接口
  declare function uploadVoice(params: {
    localId: string, // 需要上传的音频的本地ID，由stopRecord接口获得
    isShowProgressTips: 0 | 1, // 默认为1，显示进度提示
    success: WxFnCallback<{
      serverId: string; // 返回音频的服务器端ID
    }>
  })
  // 下载语音接口
  declare function downloadVoice(params: {
    serverId: string, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
    isShowProgressTips: 0 | 1, // 默认为1，显示进度提示
    success: WxFnCallback<{
      localId: string; // 返回音频的本地ID
    }>
  })
  // 语音转文字接口
  declare function translateVoice(params: {
    localId: string, // 需要识别的音频的本地Id，由录音相关接口获得，音频时长不能超过60秒
    isShowProgressTips: 0 | 1, // 默认为1，显示进度提示
    success: WxFnCallback<{
      translateResult: any; // 语音识别的结果
    }>
  })

  // 以下为文件接口，详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90530
  declare function previewFile(params: {
    url: string, // 需要预览文件的地址(必填，可以使用相对路径)
    name: string, // 需要预览文件的文件名，必须有带文件格式的后缀，例如.doc(不填的话取url的最后部分，最后部分是个包含格式后缀的文件名)
    size: number // 需要预览文件的字节大小(必填，而且大小必须正确，否则会打开失败)
  })

  // invoke ----------------------------------------------------------------------
  // SDK 调用函数
  declare function invoke<ExtraRes = {}>(
    apiName: Api,
    params: Object,
    callback: WxInvokeCallback<ExtraRes>
  );

  // 获取进入H5页面的入口环境
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94326
  declare function invoke(api: 'getContext', {}, callback: WxInvokeCallback<{
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
    callback: WxInvokeCallbackRes<{
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
    callback: WxInvokeCallbackRes
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
      selectedCorpGroupUserIds?: CorpGroupUserId[] // 非必填，已选企业互联用户ID列表。用于多次选人时可重入
    },
    callback: WxInvokeCallback<{
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
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94516
  declare function invoke(
    api: 'selectPrivilegedContact',
    params: {
      fromDepartmentId: -1 | 0,// 必填，表示打开的通讯录从指定的部门开始展示，-1表示自己所在部门开始, 0表示从最上层开始
      mode: 'multi' | 'single',// 必填，选择模式，single表示单选，multi表示多选
      selectedContextContact?: 1 | 0    // 是否勾选当前环境的参与者。1表示是，0表示否。
      selectedOpenUserIds?: string[], // 非必填，已选用户OpenID列表。single模式忽略该参数。
      selectedTickets?: string[] // 非必填，已选ticket列表。single模式忽略该参数
    },
    callback: WxInvokeCallback<{
      userList?: { // 已选的成员列表
        openUserId: string; // 成员openUserId
      }[];
      selectedTicket: string;    // 已选的集合Ticket
      expiresIn: number;    // ticket有效期
      selectedUserCount: number;    // 用户选中的用户个数
    }>
  )

  // 认领老师班级
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94546
  declare function invoke(
    api: 'claimClassAdmin',
    params: {},
    callback: WxInvokeCallback<{
      departmentIds: string[]; // 认领的班级部门id列表
    }>
  )

  // 变更群成员
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93232
  declare function invoke(
    api: 'updateEnterpriseChat',
    params: {
      chatId: string; // 通过企业微信创建群聊接口返回的chatId
      userIdsToAdd: string; // 参与会话的企业成员列表，格式为userid1;userid2;...，用分号隔开。
    },
    callback: WxInvokeCallback
  )

  // 隐藏聊天附件栏的发送按钮
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94355
  declare function invoke(
    api: 'hideChatAttachmentMenu',
    params: {
      menuList: string[] // 要隐藏的菜单项,sendMessage。即附件栏底部发送按钮。
    },
    callback: WxInvokeCallback
  )

  // 分享消息到当前会话
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94354
  interface SendChatMessageCommonParams {
    enterChat: boolean, // 为true时表示发送完成之后顺便进入会话，仅移动端3.1.10及以上版本支持该字段
  }

  declare function invoke(api: 'sendChatMessage', params: TextMessage & SendChatMessageCommonParams, callback: WxInvokeCallback)
  declare function invoke(api: 'sendChatMessage', params: ImageMessage & SendChatMessageCommonParams, callback: WxInvokeCallback)
  declare function invoke(api: 'sendChatMessage', params: VideoMessage & SendChatMessageCommonParams, callback: WxInvokeCallback)
  declare function invoke(api: 'sendChatMessage', params: FileMessage & SendChatMessageCommonParams, callback: WxInvokeCallback)
  declare function invoke(api: 'sendChatMessage', params: NewsMessage & SendChatMessageCommonParams, callback: WxInvokeCallback)
  declare function invoke(api: 'sendChatMessage', params: MiniProgramMessage & SendChatMessageCommonParams, callback: WxInvokeCallback)

  // 创建群聊并发送消息
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94517
  declare function invoke(
    api: 'createChatWithMsg',
    params: {
      selectedOpenUserIds?: string[],
      selectedTickets?: string[],
      chatName?: string,
      msg: LinkMessage
    },
    callback: WxInvokeCallback<{
      chatId: string; // 新建的会话ID，当会话为单聊时不返回此字段
    }>
  )

  // 打开已有群聊并发送消息
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94518
  declare function invoke(
    api: 'openExistedChatWithMsg',
    params: {
      chatId: string,
      msg?: LinkMessage,
    },
    callback: WxInvokeCallback
  )

  // 私密消息
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94495
  declare function invoke(
    api: 'setShareAttr',
    params: {
      withShareTicket?: boolean,
      state?: string;
    },
    callback: WxInvokeCallback
  )
  declare function invoke(
    api: 'getShareInfo',
    params: {
      shareTicket: string;
    },
    callback: WxInvokeCallback<{
      encryptedData: string; // 转发信息的加密数据
      iv: string; //	加密算法的初始向量
    }>
  )

  // 创建企业互联会话
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94547
  declare function invoke(
    api: 'createCorpGroupChat',
    params: {
      groupName: string,  // 必填，会话名称。单聊时该参数传入空字符串""即可。
      userIds?: string[],    //参与会话的企业成员列表，仅自建应用使用，第三方应用会忽略该字段
      openUserIds?: string[],// 参与会话的企业成员列表，仅第三方应用使用，自建应用会忽略该字段
      corpGroupUserIds?: CorpGroupUserId[]  // 非必填， 参与会话的互联企业成员列表
    },
    callback: WxInvokeCallback
  )

  // 变更企业互联群成员
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94548
  declare function invoke(
    api: 'updateCorpGroupChat',
    params: {
      chatId: string, //通过企业微信创建群聊接口返回的chatId
      userIdsToAdd?: string[],    //新增的企业成员列表，仅自建应用使用，第三方应用会忽略该字段
      openUserIdsToAdd?: string[],// 新增的企业成员列表，仅第三方应用使用，自建应用会忽略该字段
      corpGroupUserIdsToAdd?: CorpGroupUserId[]; // 非必填， 参与会话的互联企业成员列表
    },
    callback: WxInvokeCallback
  )

  // 外部联系人选人接口
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/91823
  declare function invoke(
    api: 'selectExternalContact',
    params: {
      filterType: 0 | 1, //0表示展示全部外部联系人列表，1表示仅展示未曾选择过的外部联系人。默认值为0；除了0与1，其他值非法。在企业微信2.4.22及以后版本支持该参数
    },
    callback: WxInvokeCallback<{
      userIds: string[]; // 一堆外部联系人 id
    }>
  )

  // 打开个人信息页接口
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/91824
  declare function invoke(
    api: 'openUserProfile',
    params: {
      type: 1 | 2, //1表示该userid是企业成员，2表示该userid是外部联系人
      userid: string //可以是企业成员，也可以是外部联系人
    },
    callback: WxInvokeCallback
  )

  // 获取当前外部联系人userid
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/91825
  declare function invoke(
    api: 'getCurExternalContact',
    params: {},
    callback: WxInvokeCallback<{
      userId: string; // 外部联系人 id
    }>
  )

  // 获取当前客户群的群ID
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/92675
  declare function invoke(
    api: 'getCurExternalChat',
    params: {},
    callback: WxInvokeCallback<{
      chatId: string; // 外部联系群 id
    }>
  )

  // 群发消息给客户
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93562
  declare function invoke(
    api: 'shareToExternalContact',
    params: {
      text: {
        content: string,    // 文本内容
      };
      attachments?: Array<ImageMessage | VideoMessage | LinkMessage | MiniProgramMessage | FileMessage>;
    },
    callback: WxInvokeCallback
  )

  // 群发消息到客户群
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93563
  declare function invoke(
    api: 'shareToExternalChat',
    params: {
      text: {
        content: string,    // 文本内容
      };
      attachments?: Array<ImageMessage | VideoMessage | LinkMessage | MiniProgramMessage | FileMessage>;
    },
    callback: WxInvokeCallback
  )

  // 进入添加客户界面
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93235
  declare function invoke(api: 'navigateToAddCustomer', params: {}, callback: WxInvokeCallback);

  // 发表内容到客户朋友圈
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94958
  declare function invoke(
    api: 'shareToExternalMoments',
    params: {
      text: {
        content: string,    // 文本内容
      };
      attachments?: Array<ImageMessage | VideoMessage | LinkMessage | MiniProgramMessage | FileMessage>;
    },
    callback: WxInvokeCallback
  )

  // 设置朋友圈封面与签名
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94959
  declare function invoke(
    api: 'updateMomentsSetting',
    params: {
      signature?: string,    // 个性签名
      imgUrl?: string    // 封面url
    },
    callback: WxInvokeCallback
  )

  // 进入微信客服消息界面
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/94870
  declare function invoke(
    api: 'navigateToKfChat',
    params: {
      openKfId: string; // 客服帐号ID
      externalUserId?: string; // 微信客户ID，若没指定，则跳转到客服帐号的消息列表界面
    },
    callback: WxInvokeCallback
  )

  // 创建立即会议
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93830
  declare function invoke(
    api: 'startMeeting',
    params: {
      meetingType: 1, // 会议类型。0-语音会议；1-视频会议
      theme?: string, // 会议主题。最多20个UTF-8字符
      attendees?: string[], // 参会人员，内部同事列表。系统会忽略不合法的ID
      externalAttendees?: string[], // 参会人员，外部联系列表。要求与发起人必须是好友关系。系统会忽略不合法的ID
      deviceSns?: string[], // 设备序列号列表。支持添加已绑定的硬件设备。Mac端不支持
    },
    callback: WxInvokeCallback<{ meetingId: string }>
  )

  // 进入会议
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93831
  declare function invoke(
    api: 'startMeeting',
    params: {
      meetingId: string; // 会议 Id
    },
    callback: WxInvokeCallback<{ meetingId: string }>
  )

  // 创建直播
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93832
  declare function invoke(
    api: 'startLiving',
    params: {
      liveType: 0 | 1 | 2 | 3; // 直播类型，0-通用直播；1-企业培训；2-大班课；3-小班课。 Mac端只支持通用直播
      theme?: string; // 直播主题。最多20个UTF-8字符
    },
    callback: WxInvokeCallback<{ livingId: string }>
  )

  // 进入直播
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93833
  declare function invoke(
    api: 'startLiving',
    params: {
      livingId: string; // 直播 Id
    },
    callback: WxInvokeCallback<{ livingId: string }>
  )

  // 观看直播回放
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93835
  declare function invoke(
    api: 'replayLiving',
    params: {
      livingId: string; // 直播 Id
    },
    callback: WxInvokeCallback
  )

  // 下载直播回放
  declare function invoke(
    api: 'downloadLivingReplay',
    params: {
      livingId: string; // 直播 Id
    },
    callback: WxInvokeCallback
  )

  // 发起班级收款
  declare function invoke(
    api: 'createSchoolPayment',
    params: {
      projectName?: string;  // 收款项目名称
      amount?: number;  // 收款金额，每个学生需付费的金额，单位为分
      payers?: {
        students: string[], //需要收款的学生列表
        departments: number[], //需要收款的家校通讯录部门列表、支持班级，年级，校区
      }
    },
    callback: WxInvokeCallback<{ paymentId: string }>
  )

  // 自定义转发到会话
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90523
  declare function invoke(api: 'shareAppMessage', params: ShareContent, callback: WxInvokeCallback);

  // 自定义转发到微信
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90523
  declare function invoke(api: 'shareWechatMessage', params: ShareContent, callback: WxInvokeCallback);

  // 打开系统默认浏览器
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90524
  declare function invoke(
    api: 'openDefaultBrowser',
    params: {
      url: string; // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
    },
    callback: WxInvokeCallback
  )

  // 拉起电子发票列表
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/90526
  declare function invoke(
    api: 'chooseInvoice',
    params: {
      timestamp: string, // 卡券签名时间戳
      nonceStr: string, // 卡券签名随机串
      signType: string, // 签名方式，默认 'SHA1'
      cardSign: string, // 卡券签名
    },
    callback: WxInvokeCallback<{
      choose_invoice_info: {
        card_id: string;
        encrypt_code: string;
        app_id: string;
      }
    }>
  )

  // 跳转到小程序
  // 详见：https://open.work.weixin.qq.com/api/doc/90001/90144/93114
  declare function invoke(
    api: 'launchMiniprogram',
    params: {
      appid: string, // 需跳转的小程序appid
      path?: string, // 所需跳转的小程序内页面路径及参数。非必填
    },
    callback: WxInvokeCallback
  )
}
