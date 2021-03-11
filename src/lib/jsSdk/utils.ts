import wxSDK from './index';
import { WxSDK } from './types';

const fakeValue: Record<string, any> = {
  number: 0,
  string: '',
  object: '',
};

/**
 * Mock企业微信 SDK，可以在浏览器下不调用 Sdk
 */
export const mockWxSDK = (fakeWxSDK: Partial<WxSDK>) => {
  // @ts-ignore
  const newWxSDK: WxSDK = {};

  Object.entries(wxSDK).forEach(entry => {
    const [key, value] = entry as [keyof WxSDK, any];

    const valueType = typeof value;

    // 默认函数
    if (!fakeWxSDK[key] && valueType === 'function') {
      // @ts-ignore
      newWxSDK[key] = async () => console.log(`wxSDK调用: ${key}`);
      return;
    }

    newWxSDK[key] = fakeWxSDK[key] || fakeValue[valueType] || null;
  });

  return newWxSDK;
};
