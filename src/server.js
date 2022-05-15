const express = require('express');
const bodyParser= require('body-parser');
const { ObjectId } = require('mongodb');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.use(express.static('../public'))
app.set('view engine', 'ejs')
app.set('views', '../public');

MongoClient.connect('mongodb+srv://johnchung19:Rotmgnpemc11!@cluster0.dsp69.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{ useUnifiedTopology: true}).then(client => {   
    console.log('Connected to Database')
    const db = client.db('inventory-application')
    const itemNameCollection = db.collection('inventoryCollection')

    // itemBool keeps track of whether to display span or input text field in our ejs template
    var itemBool;
    // isOpen keeps track of whether we should display our comments text field
    var isOpen;
    itemNameCollection.find().toArray().then(result => {
        itemBool = new Array(result.length).fill(false)
    })
    itemNameCollection.find().toArray().then(result => {
        isOpen = new Array(result.length).fill(false)
    })

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    /**
     * GET request to render template on the browser
     */
    app.get('/', (req, res) => {
        db.collection('inventoryCollection').find().toArray()
        .then(results => {
            res.render('index.ejs', { inventoryCollection: results, bools: itemBool, commentsOpen: isOpen })
        }).catch(error => console.error(error))
    })

    /**
     * POST request to insert inventory items into our database
     */
    app.post('/inventoryCollection', (req, res) => {
        const inventoryItem = { ...req.body }
        inventoryItem["deleted"] = false;
        inventoryItem["deleteComments"] = "";
        itemNameCollection.insertOne(inventoryItem).then(result => {
            res.redirect('/')
        }).catch(error => console.error(error))
        itemBool ? itemBool.push(false) : []
    })

    /**
     * POST request to submit an edit
     * Takes in index from the REST URL to keep track of inventory item
     */
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

    /**
     * POST request to edit a current inventory item
     */
    app.post('/inventoryCollection/edit', (req, res) => {
        var index = req.body.i;
        itemBool[index] = true;
        db.collection('inventoryCollection').find().toArray().then(results => {
            res.render('index.ejs', { inventoryCollection: results, bools: itemBool, commentsOpen: isOpen})
        }).catch(error => console.error(error))
    })

    /**
     * POST request to soft-delete an item from an inventory
     * Takes in index and Object Id from the REST URL to delete correct inventory item
     */
    app.post('/inventoryCollection/deleteUpdate/:index/:id', (req, res) => {
        isOpen[req.params.index] = false;
        itemNameCollection.updateOne({
            _id: ObjectId(req.params.id)
            },
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

    /**
     * PATCH request to implement undo functionality of delete
     */
    app.patch('/inventoryCollection/undo', (req, res) => {
        itemNameCollection.updateOne({
            _id: ObjectId(req.body.id)
            },
            {
                $set: {
                    deleted : false
                }
            },
        ).then(result => {
            res.json('Undo successful.')
        }).catch(error => console.error(error))
    })

    /**
     * PATCH request to update comments within deleted inventory items
     */
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
