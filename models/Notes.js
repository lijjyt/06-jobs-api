const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    name:{
        type: String,
        default: 'untitled',
        maxlength: 30,
    },
    label:{
        type: String,

    },
    createdBy: {
        type:mongoose.Types.ObjectId,
        ref: 'User'
    },

}, {timestamps:true})

module.exports = mongoose.model('Notes', NoteSchema)