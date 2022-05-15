const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    name: String,
    items: String,
    deleted: Boolean,
    deleteComments: String,
    itemBool: Boolean,
    isOpen: Boolean,
});

module.exports = mongoose.model('Inventory', InventorySchema);