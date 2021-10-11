import apis from './jsSdk/apis';
import {TicketRes} from "../api/types"
import jsSdk from "./index"

export interface Config {
  corpId: string;
  agentId: string;
}

export type GetUserId = (code: string) => Promise<string>
export type GetSignatures = () => Promise<TicketRes>

export interface Options {
  config: Config
  getSignatures: GetSignatures,
  getUserId: GetUserId
}

/**
 * 初始化企业微信 SDK 库
 * @param options 自建应用的基本信息
 */
const initSdk = async (options: Options) => {
  const { corpId, agentId } = options.config;

  // 获取 ticket
  const signaturesRes = await options.getSignatures();

  await jsSdk.agentConfig({
    corpid: corpId,
    agentid: agentId,
    timestamp: signaturesRes.meta.timestamp,
    nonceStr: signaturesRes.meta.nonceStr,
    signature: signaturesRes.app.signature,
    jsApiList: apis,
  }).catch(e => {
    console.error(e)
  });
};

export default initSdk
