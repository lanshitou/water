import api from 'axios'
const service = api.create({})
service.interceptors.request.use(
  config => {
    // if (store.state.token) {
    //   config.headers.Authorization = store.state.token
    // } else {
    //   window.location.href = 'http://localhost:8088/#' + '/login'
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  res => {
    return res
  },
  res => {
    return Promise.reject(res)
  }
)
export default service
