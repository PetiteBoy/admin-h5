export function setSessionStorage(key, val) {
  sessionStorage.setItem(key, val)
}

export function getSessionStorage(key) {
  return sessionStorage.getItem(key)
}

export function removeSessionStorage(key) {
  sessionStorage.removeItem(key)
}

export function apiStatusFn(res) {
  return new Promise((resolve, reject) => {
    if (res.status === '0x0000') {
      // 接口正常请求
      resolve(res)
    } else if (res.status === '0x5002') {
      location.hash = '/login'
    } else {
      reject(res)
    }
  })
}
