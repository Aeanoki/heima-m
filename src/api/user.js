import request from '@/utils/request.js' // 传入axios模块
export const login = (data) => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
// 获取短信验证码
export const sendSMS = (mobile) => {
  return request({
    method: 'get',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/v1_0/user'
  })
}
// 获取用户频道信息
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}

// 关注用户
export const getUserFollow = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: id
    }
  })
}

// 取消关注用户
export const deleteUserFollow = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${id}`
  })
}

// 获取个人资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 修改个人资料
export const setUserProfile = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 修改用户头像
export const setUserPhoto = (data) => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
