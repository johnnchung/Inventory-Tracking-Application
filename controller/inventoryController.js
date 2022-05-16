const Inventory = require('../models/inventory')
const { ObjectId } = require('mongodb');

/**
 * Creating a new item within our database
 * @param {object} req 
 */
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

/**
 * Updating the inventory item with incoming request
 * @param {object} req
 */
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

/**
 * Option for editing existing item in our inventory
 * @param {object} req
 */
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

/**
 * Option for cancelling editing state
 * @param {object} req 
 */
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

/**
 * Change delete state to true to hide inventory data (soft-delete)
 * @param {object} req
 */
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

/**
 * Allow undo of deleted item
 * @param {object} req
 */
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

/**
 * Allow reason for deletion through comment
 * @param {object} req
 */
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
