const express = require('express');
const bodyParser= require('body-parser');
const { ObjectId } = require('mongodb');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(express.static('public'))
app.use(express.static('views'))
app.set('view engine', 'ejs')

MongoClient.connect('mongodb+srv://johnchung19:Rotmgnpemc11!@cluster0.dsp69.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true})
  .then(client => {

    console.log('Connected to Database')
    const db = client.db('inventory-application')
    const itemNameCollection = db.collection('inventoryCollection')
    var itemBool;
    var isOpen;

    itemNameCollection.find().toArray().then(result => {
        itemBool = new Array(result.length).fill(false)
    })
    itemNameCollection.find().toArray().then(result => {
        isOpen = new Array(result.length).fill(false)
    })
    
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
        db.collection('inventoryCollection').find().toArray()
        .then(results => {
            res.render('index.ejs', { inventoryCollection: results, bools: itemBool, commentsOpen: isOpen })
        }).catch(error => console.error(error))
    })

    app.post('/inventoryCollection', (req, res) => {
        const inventoryItem = { ...req.body }
        inventoryItem["deleted"] = false;
        inventoryItem["deleteComments"] = "";
        itemNameCollection.insertOne(inventoryItem).then(result => {
            res.redirect('/')
        }).catch(error => console.error(error))
        itemBool ? itemBool.push(false) : []
    })

    app.post('/inventoryCollection/submitUpdate/:index', (req, res) => {
        itemBool[req.params.index] = false;
        itemNameCollection.find().toArray().then(indexVal => {
            return indexVal[req.params.index]._id;
        }).then(itemId => {
            itemNameCollection.updateOne(
                {_id: itemId},
                {
                    $set: {
                        name: req.body.name,
                        items: req.body.items
                    }
                },
            ).then(result => {
                res.redirect('/')
            }).catch(error => console.error(error))
        })
    })

    app.post('/inventoryCollection/edit', (req, res) => {
        var index = req.body.i;
        itemBool[index] = true;
        db.collection('inventoryCollection').find().toArray().then(results => {
            res.render('index.ejs', { inventoryCollection: results, bools: itemBool, commentsOpen: isOpen})
        }).catch(error => console.error(error))
    })

    app.put('/inventoryCollection', (req, res) => {
        itemNameCollection.updateOne(
            {name: req.body.name},
            {
                $set: {
                    name: req.body.name,
                    items: req.body.items
                }
            },
        ).then(result => {
            res.json('Success')
        }).catch(error => console.error(error))
    })

    app.post('/inventoryCollection/deleteUpdate/:index/:id', (req, res) => {
        isOpen[req.params.index] = false;
        itemNameCollection.updateOne(
            {_id: ObjectId(req.params.id)},
            {
                $set: {
                    deleted : true,
                    deleteComments: req.body.comments
                }
            },
        ).then(result => {
            res.redirect('/')
        }).catch(error => console.error(error))
      })
    
    app.patch('/inventoryCollection/undo', (req, res) => {
        itemNameCollection.updateOne(
            {_id: ObjectId(req.body.id)},
            {
                $set: {
                    deleted : false
                }
            },
        ).then(result => {
            res.json('Undo successful.')
        }).catch(error => console.error(error))
    })

    app.patch('/inventoryCollection/comment', (req, res) => {
        isOpen[req.body.i] = true;
        db.collection('inventoryCollection').find().toArray().then(results => {
            res.render('index.ejs', { inventoryCollection: results, bools: itemBool, commentsOpen: isOpen })
        }).catch(error => console.error(error))
    })

    app.listen(3000, function() {
        console.log('Listening on Port 3000')
    })
  }).catch(console.error)
