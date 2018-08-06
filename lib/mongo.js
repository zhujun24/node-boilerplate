import { MongoClient } from 'mongodb'

let testDB

const mongoInit = new Promise((resolve) => {
  MongoClient.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true}, (err, client) => {
    console.log('MongoDB Connected successfully')
    testDB = client.db('test')
    resolve()
  })
})

export {
  testDB,
  mongoInit
}
