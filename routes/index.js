const express = require('express');
const router = express.Router();
const Inventory = require('../models/inventory')

router.get('/', (req, res) => {
    Inventory.find()
    .then(results => {
        res.render('index.ejs', { inventoryCollection: results })
    })
})

module.exports = router;