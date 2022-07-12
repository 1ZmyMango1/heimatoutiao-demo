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

// 更新频道接口
export const addUserChannel = (channel) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}

/**
 * 删除用户频道
 */
export const deleteUserChannel = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}
