export const invokeResMock: Record<string, any> = {
  'getCurExternalContact': 'YanHaixiang',
}

export const wxResMock: Record<string, any> = {
  'agentConfig': () => {
    console.log('mock agent config')
  },
}
