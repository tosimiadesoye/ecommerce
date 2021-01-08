const mongoose = require('mongoose');
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    productId:{
        type: Schema.Types.ObjectId,
        ref: 'Makeups'
    },
    quantity: Number,
    total: Number
},{timestamps: true, collection:'order'})

const order = mongoose.model("Order", OrderSchema);
module.exports = order