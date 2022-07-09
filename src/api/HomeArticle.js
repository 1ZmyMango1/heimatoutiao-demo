import request from '@/utils/request'

// 获取文章列表
export const getArticle = (params) => {
  return request({
    url: '/v1_0/articles',
    method: 'GET',
    params
  })
}
