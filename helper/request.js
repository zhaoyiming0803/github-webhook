const request = require('request')

module.exports = options => {
  const _options = Object.assign({}, options, { json: true })
  return new Promise((resolve, reject) => {
    request(_options, (error, response, body) => {
      if (error) reject(error)
      else resolve(body)
    })
  })
}