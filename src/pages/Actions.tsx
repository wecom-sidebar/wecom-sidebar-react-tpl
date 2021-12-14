import * as React from 'react'
import {useCallback, useState} from 'react'
import {Button, Input} from "antd";
import {invoke} from "wecom-sidebar-jssdk";

const {TextArea} = Input

const Actions: React.FC = () => {
  const [msg, setMsg] = useState<string>('')

  const sendMsg = useCallback(async () => {
    if (!msg) alert('消息不能为空')

    await invoke('sendChatMessage', {
      msgtype: 'text',
      enterChat: true,
      text: {
        content: msg
      }
    });
  }, [msg])

  return (
    <div>
      <h2>功能</h2>

      <TextArea style={{width: '100%', marginBottom: 8}} value={msg} onChange={e => setMsg(e.target.value)}/>

      <Button block type="primary" onClick={sendMsg}>
        发送
      </Button>
    </div>
  )
}

export default Actions
