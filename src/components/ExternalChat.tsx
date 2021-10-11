import * as React from 'react'
import {useEffect, useState} from 'react'
import {fetchExternalChat} from '../api'
import {jsSdk} from "../index";

const ExternalChat: React.FC = () => {
  const [loading, setLoading] = useState<boolean>()
  const [externalChat, setExternalChat] = useState<ExternalChatResponse['group_chat'] | void>()

  const getExternalChatInfo = async () => {
    const res = await jsSdk.invoke<{chatId?: string}>('getCurExternalChat')

    if (!res || !res.chatId) return

    const chatInfo = await fetchExternalChat(res.chatId || '').catch(e => console.error(e))

    setExternalChat(chatInfo)
  }

  useEffect(() => {
    getExternalChatInfo()
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div>加载中...</div>
  }

  if (!externalChat) {
    return null
  }

  const openUserProfile = (userId: string, type: 1 | 2) => {
    return jsSdk.invoke('openUserProfile', {
      userid: userId,
      type,
    })
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
            <a onClick={() => openUserProfile(m.userid, m.type)}>
              {m.userid}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ExternalChat
