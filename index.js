const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
app.use(router.routes()) 

app.listen(8090, () => {
  console.log('webhook application listen port 8090')
})
