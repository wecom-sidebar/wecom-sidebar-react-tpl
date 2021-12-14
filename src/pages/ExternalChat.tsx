import * as React from 'react'
import {useEffect, useState} from 'react'
import {fetchExternalChat} from '../api'
import {Spin} from "antd";
import {invoke} from "wecom-sidebar-jssdk";

const ExternalChat: React.FC = () => {
  const [loading, setLoading] = useState<boolean>()
  const [externalChat, setExternalChat] = useState<ExternalChatResponse['group_chat'] | void>()

  const getExternalChatInfo = async () => {
    try {
      const res = await invoke('getCurExternalChat', {})

      if (!res || !res.chatId) return

      console.log('外部联系群 ID', res.chatId);

      const chatInfo = await fetchExternalChat(res.chatId || '').catch(e => console.error(e))

      setExternalChat(chatInfo)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getExternalChatInfo()
      .finally(() => setLoading(false))
  }, [])

  const openUserProfile = (userId: string, type: 1 | 2) => {
    return invoke('openUserProfile', {
      userid: userId,
      type,
    })
  }

  return (
    <Spin spinning={loading}>
      <div>
        <h2>外部联系群</h2>
        {externalChat ? (
          <div>
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
        ) : <p>找不到外部联系群</p>}
      </div>
    </Spin>
  )
}

export default ExternalChat
