import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {fetchAppTicket, fetchAuth, fetchCorpTicket} from './api'
import loadSdk from './lib/loadSdk'
import {Options} from './lib/initSdk'
import config from './_config'

const options: Options = {
  config,
  getUserId: async (code: string) => {
    const data = await fetchAuth(code)

    return data.UserId
  },
  getAppTicket: async () => {
    const data = await fetchAppTicket()

    return data.ticket
  },
  getCorpTicket: async () => {
    const data = await fetchCorpTicket()

    return data.ticket
  }
}

loadSdk(options)
  .then(() => ReactDOM.render(<App/>, document.getElementById('root')))
