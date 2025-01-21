const mongoose = require('mongoose');

const DataSchema  = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },

},{timestamps:true})

module.exports = mongoose.model('userdata',DataSchema);