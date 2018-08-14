import redis from 'redis'
import logger from './logger'

let redisCache = {}

class Redis {
  constructor (config = {}) {
    this.host = config.host || '127.0.0.1'
    this.port = config.port || 6379
    this.db = config.db || 0
    this.client = redis.createClient(this.port, this.host)
    this.client.select(this.db)
  }

  static getInstance (config = {}) {
    let key = `${config.db}`
    if (!redisCache[key]) {
      console.log(`Create new redis instance for key ${key}`)
      redisCache[key] = new this(config)
    }
    return redisCache[key]
  }

  set (key, value, expire) {
    this.client.set(key, value)
    if (expire) {
      this.client.expire(key, expire)
    }
  }

  get (key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          logger.error('Redis get error')
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
  }

  del (key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          logger.error('Redis del error')
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
  }

  exists (key) {
    return new Promise((resolve, reject) => {
      this.client.exists(key, (err, reply) => {
        if (err) {
          logger.error('Redis exists error')
          reject(err)
        } else {
          resolve(reply)
        }
      })
    })
  }

  keys (key) {
    return new Promise((resolve, reject) => {
      this.client.keys(key, (err, rows) => {
        if (err) {
          logger.error('Reids keys error')
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  async delWildcard (key) {
    let rows = await this.keys(key)
    let promises = rows.map(v => this.del(v))
    await Promise.all(promises)
    return true
  }
}

export default Redis
