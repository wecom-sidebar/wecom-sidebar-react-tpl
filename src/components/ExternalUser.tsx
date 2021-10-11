import * as React from 'react'
import {useEffect, useState} from 'react'
import jsSdk from '../lib'
import {fetchExternalUser} from '../api'
import {ExternalUserResponse} from '../api/types'

// 性别Map
const genderMap = ['未定义', '男', '女']

const ExternalUser: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [externalUser, setExternalUser] = useState<ExternalUserResponse['external_contact'] | void>()

  const getExternalUserInfo = async () => {
    const res = await jsSdk.invoke<{userId?: string}>('getCurExternalContact')

    if (!res || !res.userId) return

    const userInfo = await fetchExternalUser(res.userId).catch(e => console.error(e))

    setExternalUser(userInfo)
  }

  useEffect(() => {
    getExternalUserInfo()
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>加载中</div>
  }

  if (!externalUser) {
    return null
  }

  const openUserProfile = () => {
    return jsSdk.invoke('openUserProfile', {
      userid: externalUser.external_userid,
      type: externalUser.type
    })
  }

  return (
    <div>
      <h2>外部联系人</h2>
      <img width="48" src={externalUser.avatar} alt="头像"/>
      <p>ID: {externalUser.external_userid}</p>
      <p>姓名: {externalUser.name}@{externalUser.corp_name}</p>
      <p>姓别: {genderMap[externalUser.gender]}</p>
      <button onClick={openUserProfile}>
        查看详情
      </button>
    </div>
  )
}

export default ExternalUser
