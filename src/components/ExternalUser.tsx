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
    const externalUserId = await jsSdk.getCurExternalContact()

    const userInfo = await fetchExternalUser(externalUserId).catch(e => console.error(e))

    setExternalUser(userInfo)

    setLoading(false)
  }

  useEffect(() => {
    getExternalUserInfo().then()
  }, [])

  if (loading) {
    return <div>加载中</div>
  }

  if (!externalUser) {
    return null
  }

  return (
    <div>
      <h2>外部联系人</h2>
      <img width="48" src={externalUser.avatar} alt="头像"/>
      <p>ID: {externalUser.external_userid}</p>
      <p>姓名: {externalUser.name}@{externalUser.corp_name}</p>
      <p>姓别: {genderMap[externalUser.gender]}</p>
      <button onClick={() => jsSdk.openUserProfile(externalUser.external_userid, externalUser.type)}>查看详情</button>
    </div>
  )
}

export default ExternalUser
