import Koa from 'koa'
import timer from './middleware/timer'
import { testDB, mongoInit } from './lib/mongo'

const app = new Koa()

app.use(timer)

;(async () => {
  await Promise.all([
    mongoInit
  ])

  const DbFInd = async () => {
    return new Promise((resolve) => {
      testDB.collection('demo').find({}).toArray((err, docs) => {
        console.log(docs)
        resolve(docs)
      })
    })
  }

  app.use(async (ctx) => {
    ctx.body = await DbFInd()
  })

  app.listen(3000)
})()
