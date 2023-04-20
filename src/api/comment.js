import request from '@/utils/request'

// 获得评论列表
export const getCommentList = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 对评论点赞
export const addCommentGood = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target: id
    }
  })
}

// 取消评论点赞

export const deleteCommentGood = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${id}`
  })
}

// 发布文章评论或评论回复
export const addCommentPost = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
