import logger from '../util/logger'

export default async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  logger.info(`${ctx.method} ${ms}ms ${ctx.url}`)
}
