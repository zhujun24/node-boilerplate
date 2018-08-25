import Koa from 'koa'
import KoaRouter from 'koa-router'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import timer from './middleware/timer'
import { TestDB, dbInit } from './db/dbInit'
import health from './controllers/health'

const app = new Koa()
const router = new KoaRouter()

app.use(timer)
app.use(bodyParser())
app.use(json())

router.get('/db', async (ctx) => {
  ctx.body = await TestDB.find({
    collection: 'test'
  })
})

router.get('/', health)
router.get('/health', health)

;(async () => {
  await Promise.all([
    dbInit()
  ])

  app.use(router.routes())
    .use(router.allowedMethods())

  app.listen(3000)
})()
