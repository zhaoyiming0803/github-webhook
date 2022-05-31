const Router = require('koa-router')
const router = new Router()

router.use('/webhook', require('./message').routes())

module.exports = router
