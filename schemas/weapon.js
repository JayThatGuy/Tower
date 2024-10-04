const mongoose = require('mongoose');

//creates a weapon entry
const weaponSchema = new mongoose.Schema({
    name: {type: String, required: true},
    power: {type: Number, default: 0},
    type: {type: String, required: true},
    scaling: {type: Float64Array, default: 1.00},
    effect: {type: String, default: 'None'},
    rarity: {type: String, default: 'Common'}
});

// Create a model for weapons
const Weapon = mongoose.model('Weapon', weaponSchema);

module.exports = Weapon;