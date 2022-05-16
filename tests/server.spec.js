// test-setup.js 
const mongoose = require('mongoose')

async function removeAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

async function dropAllCollections () {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    try {
      await collection.drop()
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes('a background operation is currently running')) return
      console.log(error.message)
    }
  }
}

module.exports = {
  setupDB (databaseName) {
    // Connect to Mongoose
    beforeAll(async () => {
      const url = `mongodb://127.0.0.1/${databaseName}`
      await mongoose.connect(url, { useNewUrlParser: true })
    })

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections()
    })

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections()
      await mongoose.connection.close()
    })
  }
}

const Inventory = require('../models/inventory')
const express = require('express');
const router = express.Router();

it('Should save inventory to database', async done => {
  const res = await router.post('/create')
	.send({
    name: "John",
    items: "Chung",
    deleted: false,
    deleteComments: "",
    itemBool: false,
    isOpen: false,
    })

  // Searches the user in the database
  const user = await Inventory.findOne({ name: "John" })
  done()
})