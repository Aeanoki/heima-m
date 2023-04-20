import request from '@/utils/request'

export const getArticles = (params) => {
  return request({
    method: 'get',
    url: '/v1_0/articles',
    params
  })
}

// 获取全部频道
export const getAlllChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/channels'
  })
}
// 添加用户频道
export const addChannels = (channels) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channels]
    }
  })
}

// 删除用户频道
export const removeUserChannels = (target) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`
  })
}
