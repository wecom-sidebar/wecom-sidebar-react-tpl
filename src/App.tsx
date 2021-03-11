import React, {FC, useEffect, useState} from 'react'
import {fetchUser} from './api'
import Cookies from 'js-cookie'
import ExternalUser from './components/ExternalUser'
import {UserResponse} from './api/types'
import ExternalChat from './components/ExternalChat'
import Actions from './components/Actions'

const App: FC = () => {
  const [user, setUser] = useState<UserResponse>();

  // 获取当前外部联系人信息
  const getUserInfo = async () => {
    const userId = Cookies.get('userId')

    const userInfo = await fetchUser(userId || '')

    setUser(userInfo)
  }

  useEffect(() => {
    getUserInfo().then()
  }, [])

  if (!user) return <p>加载中...</p>

  return (
    <div>
      <h1>欢迎回来，{user.name}</h1>

      <ExternalUser />

      <ExternalChat />

      <Actions />
    </div>
  );
}

export default App;
