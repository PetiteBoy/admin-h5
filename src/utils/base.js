export function setSessionStorage(key, val) {
  sessionStorage.setItem(key, val)
}

export function getSessionStorage(key) {
  return sessionStorage.getItem(key)
}

export function removeSessionStorage(key) {
  sessionStorage.removeItem(key)
}
