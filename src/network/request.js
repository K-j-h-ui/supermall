import axios from "axios"
export function request (config){
// 1.创建实例
      const instance = axios.create({
        baseURL:"http://123.207.32.32:8000",
        timeout:5000
      })
    
// 2.请求拦截
instance.interceptors.request.use(config => {
  console.log(config);
  // 1.config信息中不符合服务器要求
  // 2.发送请求时希望在界面中显示的一个请求的图标
  // 3.某些网络请求，比如登录(token),必须携带一些特殊信息
  return config
},err => {
  console.log(err)
})

// 2.1响应拦截
instance.interceptors.response.use(res => {
  // console.log(res);
  
  return res.data
},err => {
  console.log(err)
})

   // 3.发送真正的网络请求
      return instance(config)
  //  本身就是个promise
    } 