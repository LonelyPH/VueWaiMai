/* 
*封装的ajax请求函数模块
*返回值：promise对象（异步返回数据是：response.data）
*/
import axios from 'axios'
//*暴露封装的ajax函数
export default function ajax (url, data={}, type='GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      let urlStr = ''
      Object.keys(data).forEach((key) => {
        //*根据data拼接urlStr
        urlStr += key + '=' + data[key] + '&'
      })
      if (urlStr !== '') {
        //*去掉urlStr的最后一位&符并与url拼接
        url += '?' + urlStr.substring(0, urlStr.length - 1)
      }
      //*发送get请求
      promise = axios.get(url)
    }
    else {
      //*发送post请求
      promise = axios.post(url, data)
    }
    promise.then((response) => {
      //*成功时调用resolve
      resolve(response.data)
    }).catch((error) => {
      //*失败时调用reject
      reject(error)
    })
  })
}