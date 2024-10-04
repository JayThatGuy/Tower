const mongoose = require('mongoose');

// Create a schema for the character
const characterSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    characterName: { type: String, required: true },
    level: {type: Number, default: 0},
    strength: { type: Number, default: 0 },
    dexterity: { type: Number, default: 0 },
    constitution: { type: Number, default: 0 },
    intelligence: { type: Number, default: 0 },
    gold: {type: Number, default: 0},
    main: {type: String, default: "Unarmed"},
    offHand: {type: String, default: "Unarmed"},
    armor: {type: String, default: "None"},
    misc1: {type: String, default: "None"},
    misc2: {type: String, default: "None"},
    misc3: {type: String, default: "None"}
}); 

// Create a model for the character
const Character = mongoose.model('Character', characterSchema);

module.exports = Character;
