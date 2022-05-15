const Inventory = require('../models/inventory')
const { ObjectId } = require('mongodb');

exports.createItem = (req, res) => {
    Inventory.create({
        name: req.body.name,
        items: req.body.items,
        deleted: false,
        deleteComments: "",
        itemBool: false,
        isOpen: false
    }).then(result => {
        res.redirect('/')
    }).catch(error => console.error(error))
}

exports.updateItem = (req, res) => {
    Inventory.updateOne(
        {_id: req.params.id},
        {
            $set: {
                name: req.body.name,
                items: req.body.items,
                itemBool: false
            }
        },
    ).then(result => {
        res.redirect('/')
    }).catch(error => console.error(error))
}

exports.editItem = (req, res) => {
    const id = req.params.id;
    Inventory.updateOne(
        {_id: id},
        {
            $set: {
                name: req.body.name,
                items: req.body.items,
                itemBool: true
            }
        },
    ).then(result => {
        res.redirect('/')
    }).catch(error => console.error(error))
}

exports.cancelUpdate = (req, res) => {
    Inventory.updateOne(
        {_id: req.params.id},
        {
            $set: {
                itemBool: false,
                isOpen: false
            }
        },
    ).then(result => {
        res.redirect('/')
    }).catch(error => console.error(error))
}

exports.deleteItem = (req, res) => {
    Inventory.updateOne({
        _id: ObjectId(req.params.id)
        },
        {
            $set: {
                deleted : true,
                deleteComments: req.body.comments,
                isOpen: false
            }
        },
    ).then(result => {
        res.redirect('/')
    }).catch(error => console.error(error))
}

exports.undoDelete = (req, res) => {
    Inventory.updateOne({
        _id: ObjectId(req.params.id)
        },
        {
            $set: {
                deleted : false
            }
        },
    ).then(result => {
        res.json('Undo successful.')
    }).catch(error => console.error(error))
}


exports.commentOnDelete = (req, res) => {
    const id = req.params.id;
    Inventory.updateOne(
        {_id: id},
        {
            $set: {
                name: req.body.name,
                items: req.body.items,
                isOpen: true
            }
        },
    ).then(result => {
        res.redirect('/')
    }).catch(error => console.error(error))
}
