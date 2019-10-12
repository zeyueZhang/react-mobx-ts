import { LOGIN_COOKIE_NAME } from '@/constants/login';

export function getSessionStorage(key: string) {
  return sessionStorage.getItem(key)
}

export function setSessionStorage(key: string, value: {[propsname: string]: any}) {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export function isAuthenticated () {
  return _getCookie(LOGIN_COOKIE_NAME)
}

export function authenticateSuccess (token: string) {
  _setCookie(LOGIN_COOKIE_NAME, token)
}

export function logout () {
  _setCookie(LOGIN_COOKIE_NAME, '', 0)
}

export function _getCookie (name: string) {
  let start, end
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      end = document.cookie.indexOf(';', start)
      if (end === -1) {
        end = document.cookie.length
      }
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}

export function _setCookie (name: string, value: string, expire?: number) {
  let date = new Date()
  date.setDate(date.getDate() + expire!)
  document.cookie = name + '=' + escape(value) + '; path=/' +
    (expire ? ';expires=' + date.toUTCString() : '')
}