const mongoose = require('mongoose');
const {Schema} = mongoose;

const groupSchema = new Schema({
    groupName:{
        type:String,
        required: true
    },

    members:[String],
    memberLimit:{
        type:Number,
        default:5
    },

    productId:{
        type:String,
    },
    paymentStatus: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Group', groupSchema)