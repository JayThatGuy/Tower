const mongoose = require('mongoose');

//creates a weapon entry
const armorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    effect: {type: String, default: 'None'},
    rarity: {type: String, default: 'Common'}
});

// Create a model for weapons
const Armor = mongoose.model('Armor', armorSchema);

module.exports = Armor;