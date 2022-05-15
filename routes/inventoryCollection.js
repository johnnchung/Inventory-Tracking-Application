const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventoryController');

router.post('/create', inventoryController.createItem);

router.post('/submitUpdate/:id', inventoryController.updateItem);

router.post('/edit/:id', inventoryController.editItem);

router.post('/cancel/:id', inventoryController.cancelUpdate);

router.post('/deleteUpdate/:id', inventoryController.deleteItem);

router.patch('/undo/:id', inventoryController.undoDelete);

router.patch('/comment/:id', inventoryController.commentOnDelete);

module.exports = router;