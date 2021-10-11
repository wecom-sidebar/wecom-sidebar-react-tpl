import JsSdk from './index';

export type JsSDK = typeof JsSdk;

/**
 * 支持多种消息格式，包括文本(“text”)，图片(“image”)，视频(“video”)，文件(“file”)，H5(“news”）和小程序(“miniprogram”)。
 */
export type MsgType = 'text' | 'image' | 'video' | 'file' | 'news' | 'miniprogram';

/**
 * 分享消息到聊天窗口的消息内容
 */
export type TextMsg = {
  content: string; // 文本内容
};
export type FileMsg = {
  mediaid: string; // 素材id
};
export type ImageMsg = FileMsg;
export type VideoMsg = FileMsg;
export type NewsMsg = {
  link: string; // H5消息页面url 必填
  title: string; // H5消息标题
  desc: string; // H5消息摘要
  imgUrl: string; // H5消息封面图片URL
};
export type MiniProgramMsg = {
  appid: string; // 小程序的appid
  title: string; // 小程序消息的title
  imgUrl: string; // 小程序消息的封面图。必须带http或者https协议头，否则报错 $apiName$:fail invalid imgUrl
  page: string; // 小程序消息打开后的路径，注意要以.html作为后缀，否则在微信端打开会提示找不到页面
};
export type Msg = TextMsg | FileMsg | ImageMsg | VideoMsg | NewsMsg | MiniProgramMsg;
