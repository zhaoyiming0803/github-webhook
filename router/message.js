const Router = require('koa-router')
const router = new Router()
const request = require('../helper/request')

router.post('/', async (ctx, next) => {
  const bodyData = ctx.request.body
  const { action, repository, sender } = bodyData
  const events = [
    'pull_request',
    'comment',
    'issue',
    'forkee'
  ]

  console.log(JSON.stringify(bodyData))

  let _event = ''
  let targetUrl = repository.html_url

  for (let i = 0; i < events.length; i++) {
    const event = events[i]
    const target = bodyData[event]
    if (target) {
      _event = event
      targetUrl = target.html_url
      break
    }
  }

  const eventType = [{
    tag: 'text',
    text: `event type: ${_event} ${action || ''}`
  }]

  const link = [{
    tag: 'text',
    text: 'link url: '
  }, {
    tag: "a",
    text: `show details ->`,
    href: targetUrl
  }]

  const createdBy = [{
    tag: 'text',
    text: 'created by: '
  }, {
    tag: "a",
    text: `${sender.login}`,
    href: sender.html_url
  }]

  const body = {
    msg_type: 'post',
    content: {
      post: {
        zh_cn: {
          title: 'Github 新动态',
          content: [eventType, link, createdBy]
        }
      }
    }
  }

  try {
    await request({
      uri: 'https://open.feishu.cn/open-apis/bot/v2/hook/05043351-7161-429c-a4fc-5df5b08c2fa5',
      method: 'post',
      body
    })
    ctx.body = 'success'
  } catch (e) {
    ctx.body = JSON.stringify(e)
  }
})

module.exports = router
