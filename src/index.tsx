import React from 'react'
import ReactDOM from 'react-dom'
import {ConfigProvider} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import App from './App'
import {fetchSignatures, fetchUserId} from './api'
import config from './_config'
import {mockUserId} from "./mock";
import {checkRedirect, initSdk} from "wecom-sidebar-jssdk";

import 'antd/dist/antd.css';

const AppWrapper = (
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>
)

checkRedirect(config, fetchUserId, mockUserId)
  .then(() => initSdk(config, fetchSignatures))
  .then(() => ReactDOM.render(AppWrapper, document.getElementById('root')))
