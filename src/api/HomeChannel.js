import request from '@/utils/request'

// 展示频道列表
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}

// 获取全部频道列表
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels',
    method: 'GET'
  })
}
