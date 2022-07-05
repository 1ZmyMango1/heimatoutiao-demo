// 引入request请求方法
import request from '@/utils/request'

// 登录的接口
export const Login = (data) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 验证码接口
export const getSumCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}
