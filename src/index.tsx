import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {fetchAuth, fetchSignatures} from './api'
import loadSdk from './lib/loadSdk'
import {Options} from './lib/initSdk'
import config from './_config'

const options: Options = {
  config,
  getSignatures: async () => {
    return await fetchSignatures();
  },
  getUserId: async (code: string) => {
    const data = await fetchAuth(code)

    return data.UserId
  },

}

loadSdk(options)
  .then(() => ReactDOM.render(<App/>, document.getElementById('root')))
