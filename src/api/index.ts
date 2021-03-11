import axios from 'axios'
import {AuthResponse, ExternalChatResponse, ExternalUserResponse, TicketResponse, UserResponse} from './types'

// 后端地址
const baseURL = 'https://service-kuwar5zi-1253834571.gz.apigw.tencentcs.com/release'

// 创建 axios 实例
const api = axios.create({
  baseURL,
  proxy: false,
})

// 根据 userId 获取 user 信息
export const fetchUser = async (userId: string) => {
  const response = await api.get<UserResponse>('/api', {
    params: {
      url: '/user/get',
      userid: userId,
    }
  });

  return response.data
}

// 根据 externalUserId 获取 externalUser 信息
export const fetchExternalUser = async (externalUserId: string, cursor?: string) => {
  const response = await api.get<ExternalUserResponse>('/api', {
    params: {
      url: '/externalcontact/get',
      external_userid: externalUserId,
      cursor
    }
  })

  return response.data.external_contact
}

// 根据 externalChatId 获取 chat 信息
export const fetchExternalChat = async (externalChatId: string) => {
  const response = await api.get<ExternalChatResponse>('/api', {
    params: {
      url: '/externalcontact/groupchat/get',
      chat_id: externalChatId
    }
  })

  return response.data.group_chat
}

// 根据 code 换取 userId，作为用户身份验证
export const fetchAuth = async (code: string) => {
  const response = await api.get<AuthResponse>('/api', {
    params: {
      url: '/user/getuserinfo',
      code
    }
  })

  return response.data
}

// 获取应用的jsapi_ticket
export const fetchAppTicket = async () => {
  const response = await api.get<TicketResponse>('/api', {
    params: {
      url: '/ticket/get',
      type: 'agent_config'
    }
  })

  return response.data
}

// 获取企业的jsapi_ticket
export const fetchCorpTicket = async () => {
  const response = await api.get<TicketResponse>('/api', {
    params: {
      url: '/get_jsapi_ticket',
    }
  })

  return response.data
}

export default api
