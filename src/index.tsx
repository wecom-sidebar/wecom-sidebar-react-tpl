import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {fetchAuth, fetchSignatures} from './api'
import initSdk from './lib/utils/initSdk'
import config from './_config'
import checkRedirect from "./lib/utils/checkRedirect";

const getUserId = async (code: string) => {
  const data = await fetchAuth(code)

  return data.UserId
}

checkRedirect(config, getUserId)
  .then(() => initSdk(config, fetchSignatures))
  .then(() => ReactDOM.render(<App/>, document.getElementById('root')))
