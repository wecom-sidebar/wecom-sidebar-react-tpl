export const invokeResMock: Record<string, any> = window.invokeResMock || {
  'getCurExternalContact': {
    userId: 'wmuUG7CQAAOrCCMkA8cqcCm1wJrJAD6A'
  },
}

export const wxResMock: Record<string, any> = window.wxResMock || {
  'agentConfig': () => {
    console.log('mock agent config')
  },
}
