import * as React from 'react'
import {useCallback, useState} from 'react'
import {jsSdk} from "../index";
import {Button, Input} from "antd";

const {TextArea} = Input

const Actions: React.FC = () => {
  const [msg, setMsg] = useState<string>('')

  const sendMsg = useCallback(async () => {
    if (!msg) alert('消息不能为空')

    await jsSdk.invoke('sendChatMessage', {
      msgtype: 'text',
      text: {
        content: msg
      }
    });
  }, [msg])

  return (
    <div>
      <h2>功能</h2>

      <TextArea style={{width: '100%'}} value={msg} onChange={e => setMsg(e.target.value)}/>

      <Button type="primary" onClick={sendMsg}>
        sendChatMessage
      </Button>
    </div>
  )
}

export default Actions
