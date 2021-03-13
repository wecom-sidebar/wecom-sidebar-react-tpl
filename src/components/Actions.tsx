import * as React from 'react'
import jsSdk from '../lib'
import {useCallback, useState} from 'react'

const Actions: React.FC = () => {
  const [msg, setMsg] = useState<string>('')

  const sendMsg = useCallback(async () => {
    if (!msg) alert('消息不能为空')

    await jsSdk.invoke('sendChatMessage', {
      msgtype: 'text',
      text: {
        content: msg
      }
    }).catch(e => console.error(e))
  }, [msg])

  return (
    <div>
      <h2>功能</h2>

      <textarea style={{width: '100%'}} value={msg} onChange={e => setMsg(e.target.value)}/>

      <button onClick={sendMsg}>
        sendChatMessage
      </button>
    </div>
  )
}

export default Actions
