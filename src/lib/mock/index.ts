export const invokeResMock: Record<string, any> = {
  'getCurExternalContact': {
    userId: 'wmuUG7CQAAOrCCMkA8cqcCm1wJrJAD6A'
  },
}

export const wxResMock: Record<string, any> = {
  'agentConfig': () => {
    console.log('mock agent config')
  },
}
