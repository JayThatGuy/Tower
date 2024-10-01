const mongoose = require('mongoose');

//creates a tower entry
const entrySchema = new mongoose.Schema({
    userId: {type:String, required:true},
    currentFloor: {type:Number, default:0},
    highestFloor: {type:Number, default:0},
    encounter: {type:Number,default:0}
});

// Create a model for the tower entry
const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;