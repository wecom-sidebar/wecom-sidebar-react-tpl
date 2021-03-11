import * as React from 'react'
import {useEffect, useState} from 'react'
import jsSdk from '../lib'
import {fetchExternalChat} from '../api'
import {ExternalChatResponse} from '../api/types'

interface IProps {
}

const ExternalChat: React.FC<IProps> = () => {
  const [loading, setLoading] = useState<boolean>()
  const [externalChat, setExternalChat] = useState<ExternalChatResponse['group_chat'] | void>()

  const getExternalChatInfo = async () => {
    const externalChatId = await jsSdk.getCurExternalChat()

    const userInfo = await fetchExternalChat(externalChatId || '').catch(e => console.error(e))

    setExternalChat(userInfo)

    setLoading(false)
  }

  useEffect(() => {
    getExternalChatInfo().then()
  }, [])

  if (loading) {
    return <div>加载中...</div>
  }

  if (!externalChat) {
    return null
  }

  return (
    <div>
      <h2>外部联系群</h2>
      <p>群名: {externalChat.name}</p>
      <p>群主: {externalChat.owner}</p>
      <p>群公告: {externalChat.notice}</p>
      <p>群成员: </p>
      <ul>
        {externalChat.member_list.map(m => (
          <li key={m.userid}>
            <a onClick={() => jsSdk.openUserProfile(m.userid, m.type)}>{m.userid}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExternalChat
