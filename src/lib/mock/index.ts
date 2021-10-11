// 根据外部判断是否为 mock 环境
const isWindowMock = window.isMock === true;
// 根据宿主环境判断是否要 mock
const isHostMock = navigator.userAgent.toLowerCase().includes('chrome')
  && !navigator.userAgent.toLowerCase().includes('wxwork')

export const isMock = isWindowMock || isHostMock;

// 可在这里自由 mock wx.invoke 的内容
export const invokeResMock: Record<string, any> = window.invokeResMock || {
  'getCurExternalContact': {
    userId: 'wmuUG7CQAAOrCCMkA8cqcCm1wJrJAD6A'
  },
}

// 可在这里自由 wx.fn 的内容
export const wxResMock: Record<string, any> = window.wxResMock || {
  'agentConfig': () => {
    console.log('mock agent config')
  },
}
