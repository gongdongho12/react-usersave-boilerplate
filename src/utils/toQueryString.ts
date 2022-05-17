const toQueryString = filter => Object.entries(filter).filter(e => e[1] !== undefined).reduce((prev, e) => {
  if (typeof e[1] === 'object') {
    const temp = toQueryString(e[1])
    if (temp) {
      e[1] = `(${temp})`
    }
  }
  if (e?.[1] !== undefined && typeof e[1] === 'string') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prev.push(e.join('='))
  }
  return prev
}, []).join('&')

export default toQueryString