import { WxSDK } from './types';

const fakeValue: Record<string, any> = {
  number: 0,
  string: '',
  object: {},
};

const createMockFn = (apiName: string, mockRes: any) => {
  return async (...args: any) => {
    console.log(`JSSDK调用：${apiName}`)
    if (typeof mockRes === 'function') {
      return mockRes(...args);
    } else {
      return mockRes;
    }
  }
}

/**
 * Mock企业微信 SDK，可以在浏览器下不调用 Sdk
 */
export const mockJsSdk = (originalJsSdk: WxSDK, wxResMock: Partial<WxSDK>, invokeMockRes: any) => {
  // @ts-ignore
  const newJsSdk: WxSDK = {};

  Object.entries(originalJsSdk).forEach(entry => {
    const [key, originalValue] = entry as [keyof WxSDK, any];

    const originalValueType = typeof originalValue;
    const mockRes = wxResMock[key];

    // 特殊处理 invoke
    if (key === 'invoke') {
      newJsSdk.invoke = createMockFn(key, invokeMockRes)
    }

    if (originalValueType === 'function') {
      // mock 函数
      newJsSdk[key] = createMockFn(key, wxResMock[key]);
    } else {
      // @ts-ignore 使用 mock 值
      newJsSdk[key] = mockRes || fakeValue[originalValueType] || null;
    }
  });

  return newJsSdk;
};
