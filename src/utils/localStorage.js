// 封装读取模块
export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
  // return JSON.parse(window.localStorage.getItem(key))
}
// 封装存入模块
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 封装删除模块
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
