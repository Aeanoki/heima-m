import request from '@/utils/request'

export const getArticlesData = (articleID) => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleID}`
  })
}

// 收藏
export const addCollect = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target: id
    }
  })
}

// 取消收藏
export const deleteCollect = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${id}`
  })
}

// 文章点赞
export const addGood = (id) => {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target: id
    }
  })
}

// 取消点赞
export const deleteGood = (id) => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${id}`
  })
}
