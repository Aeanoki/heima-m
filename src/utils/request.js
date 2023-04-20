import axios from 'axios'
import store from '@/store/index'
import router from '@/router'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})
const relogin = axios.create({
  baseURL: 'http://toutiao.itheima.net/'
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response.status === 401) {
      const { user } = store.state
      if (!user || !user.token) {
        console.log(111)
        return backlogin()
      }
      console.log(222)
      try {
        const { data } = await relogin({
          method: 'PUT',
          url: '/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })
        user.token = data.data.token
        store.commit('xguser', user)
        console.log(data)
        return request(error.config)
      } catch (e) {
        backlogin()
      }
    }
    return Promise.reject(error)
  }
)

function backlogin() {
  router.replace('/login')
}
export default request
