const ptId = 'CURRENT_PTID'
const token = 'ACIS_URSER_TOKEN'
const account = 'ACIS_CURRENT_ACCOUNT'
const screenRoom = 'SCREEN_ROOM'

export function setStoragePtId (val) {
  return localStorage.setItem(ptId, val)
}

export function getStoragePtId () {
  return localStorage.getItem(ptId)
}

export function removeStorage (name) {
  return localStorage.removeItem(name)
}

export function clearStorage () {
  return localStorage.clear()
}

export function setUserToken (val) {
  return localStorage.setItem(token, val)
}

export function getUserToken () {
  return localStorage.getItem(token)
}

export function removeUserToken () {
  return localStorage.removeItem(token)
}

export function setCurrentAccount (val) {
  return localStorage.setItem(account, val)
}

export function getCurrentAccount (val) {
  return localStorage.getItem(account, val)
}

// 设置房间号
export function setCurrentRoom (val) {
  return localStorage.setItem(screenRoom, val)
}

// 查找房间号
export function getCurrentRoom (val) {
  return localStorage.getItem(screenRoom, val)
}
