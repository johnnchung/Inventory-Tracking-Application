const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const Inventory = require('../models/inventory')

var itemBool;
var isOpen;
Inventory.find().then(result => {
    itemBool = new Array(result.length).fill(false)
})
Inventory.find().then(result => {
    isOpen = new Array(result.length).fill(false)
})

router.get('/', (req, res) => {
    Inventory.find()
    .then(results => {
        res.render('index.ejs', { inventoryCollection: results, bools: itemBool, commentsOpen: isOpen })
    }).catch(error => console.error(error))
})

router.post('/inventoryCollection', (req, res) => {
    itemBool = itemBool ? itemBool.concat([false]) : [false]
    isOpen = isOpen ? isOpen.concat([false]) : [false]
    Inventory.create({
        name: req.body.name,
        items: req.body.items,
        deleted: false,
        deleteComments: ""
    }).then(result => {
        res.redirect('/')
    }).catch(error => console.error(error))
})

router.post('/inventoryCollection/submitUpdate/:index', (req, res) => {
    itemBool[req.params.index] = false;
    Inventory.find().then(indexVal => {
        return indexVal[req.params.index]._id;
    }).then(itemId => {
        Inventory.updateOne(
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

router.post('/inventoryCollection/edit', (req, res) => {
    var index = req.body.i;
    itemBool[index] = true;
    Inventory.find().then(results => {
        res.render('index.ejs', { inventoryCollection: results, bools: itemBool, commentsOpen: isOpen})
    }).catch(error => console.error(error))
})

router.post('/inventoryCollection/cancel', (req, res) => {
    var index = req.body.i;
    itemBool[index] = false;
    isOpen[index] = false;
    Inventory.find().then(results => {
        res.render('index.ejs', { inventoryCollection: results, bools: itemBool, commentsOpen: isOpen})
    }).catch(error => console.error(error))
})

router.post('/inventoryCollection/deleteUpdate/:index/:id', (req, res) => {
    isOpen[req.params.index] = false;
    Inventory.updateOne({
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

router.patch('/inventoryCollection/undo', (req, res) => {
    Inventory.updateOne({
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


router.patch('/inventoryCollection/comment', (req, res) => {
    isOpen[req.body.i] = true;
    Inventory.find().then(results => {
        res.render('index.ejs', { inventoryCollection: results, bools: itemBool, commentsOpen: isOpen })
    }).catch(error => console.error(error))
})

module.exports = router;