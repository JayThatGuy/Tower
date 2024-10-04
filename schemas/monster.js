const mongoose = require('mongoose');

//creates a weapon entry
const monsterSchema = new mongoose.Schema({
    name: {type: String, required: true}
});

// Create a model for weapons
const Monster = mongoose.model('Monster', monsterSchema);

module.exports = Monster;