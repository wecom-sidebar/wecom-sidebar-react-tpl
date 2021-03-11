import compareVersions from 'compare-versions'
import { Msg, MsgType } from './types';
export { mockWxSDK } from './utils';

/**
 * jssdk 的 config 函数的封装
 * @param setting
 */
const config = (setting: wx.Setting): Promise<wx.ConfigCallbackRes> => {
  return new Promise((resolve, reject) => {
    wx.config({ ...setting });
    wx.ready(res => resolve(res));
    wx.error(err => reject(err));
  });
};

/**
 * jssdk 的 agentConfig 函数封装
 * @param agentSetting
 */
const agentConfig = (agentSetting: Omit<wx.AgentSetting, 'success' | 'fail'>): Promise<wx.ConfigCallbackRes> => {
  return new Promise((resolve, reject) => {
    wx.agentConfig({
      ...agentSetting,
      success: resolve,
      fail: reject,
      complete: resolve,
    });
  });
};

/**
 * 根据 userAgent 检查当前企业微信版本号是否 < 3.0.24
 */
const checkDeprecated = (): boolean => {
  const DEPRECATED_VERSION = '3.0.24'

  const versionRegexp = /wxwork\/([\d.]+)/;
  const versionResult = navigator.userAgent.match(versionRegexp);

  if (!versionResult || versionResult.length < 2) {
    return true;
  }

  const [, version] = versionResult;

  // version < DEPRECATED_VERSION ?
  return compareVersions(version, DEPRECATED_VERSION) === -1
};

/**
 * 通用调用企业微信 SDK 的函数
 * @param apiName api 名称
 * @param params 传入参数
 */
const invoke = <Res = {}>(apiName: wx.Api, params: Object) => {
  return new Promise<wx.InvokeCallbackRes & Res>((resolve, reject) => {
    wx.invoke<Res>(apiName, params, res => {
      if (res.err_msg === `${apiName}:ok`) {
        resolve(res);
      } else {
        reject(res);
      }
    });
  });
};

/**
 * 从外部联系人的profile、聊天工具栏进入页面时才可成功调用该接口
 * 详见：https://work.weixin.qq.com/api/doc/90000/90136/91799
 */
const getCurExternalContact = async () => {
  interface Res {
    userId: string;
  }

  const res = await invoke<Res>('getCurExternalContact', {});

  return res.userId;
};

/**
 * 从客户群的聊天工具栏进入页面时才可成功调用该接口
 * 详见：https://work.weixin.qq.com/api/doc/90000/90136/92095
 */
const getCurExternalChat = async () => {
  interface Res {
    chatId: string;
  }

  const res = await invoke<Res>('getCurExternalChat', {});

  return res.chatId;
};

/**
 * 聊天工具栏分享消息到会话
 */
const sendChatMessage = async (msgType: MsgType, value: Msg) => {
  return invoke('sendChatMessage', {
    msgtype: msgType,
    [msgType]: value,
  });
};

/**
 * 调用此接口将唤起成员或外部联系人的个人信息页面
 * @param userId
 * @param type
 */
const openUserProfile = async (userId: string, type: 1 | 2) => {
  return invoke('openUserProfile', {
    type,
    userid: userId
  })
}

const wecomJsSdk = {
  checkDeprecated,
  config,
  agentConfig,
  getCurExternalContact,
  getCurExternalChat,
  sendChatMessage,
  invoke,
  openUserProfile,
};

export default wecomJsSdk;
