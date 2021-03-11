import initSdk, {Options} from "./initSdk"
import checkRedirect from "./checkRedirect"

// 加载 JsSdk
const loadSdk = async (options: Options) => {
  await checkRedirect(options.config, options.getUserId)

  await initSdk(options)
}

export default loadSdk
