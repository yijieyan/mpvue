let request = require('request-promise')

function http (options) {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await request(options)
      res = typeof res === 'string' ? JSON.parse(res) : res
      resolve(res)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = http
