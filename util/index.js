const sleep = (timeout = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout)
  })
}

export {
  sleep
}
