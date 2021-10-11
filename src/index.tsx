import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {fetchUserId, fetchSignatures} from './api'
import config from './_config'
import {invokeResMock, wxResMock} from "./mock";
import {checkRedirect, createJsSdk, initSdk} from "./lib";

export const jsSdk = createJsSdk(wxResMock, invokeResMock);

checkRedirect(config, fetchUserId)
  .then(() => initSdk(config, fetchSignatures))
  .then(() => ReactDOM.render(<App/>, document.getElementById('root')))
