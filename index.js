const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

// middelware
app.use(cors())
app.use(express.json())
// xZg5pBCsATbZdW1p

const uri =
  'mongodb+srv://ToDo:xZg5pBCsATbZdW1p@cluster0.zyllo.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
})

async function run() {
  try {
    await client.connect()
    const collection = client.db('ToDo').collection('Users')

    app.get('/users', async (req, res) => {
      const quarry = {}
      const cursor = collection.find(quarry)
      const result = await cursor.toArray()
      res.send(result)
    })
    app.post('/users', async (req, res) => {
      const newTask = req.body

      const result = await collection.insertOne(newTask)
      res.send(result)
    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id
      const query = { _id: ObjectId(id) }
      const Tasks = await collection.deleteOne(query)
      res.send(Tasks)
    })
  } finally {
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, () => {
  console.log('mongo ')
})
