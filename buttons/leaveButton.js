const Character = require('../schemas/char'); // Import the character model
const Tower = require('../schemas/tower'); //Import the Tower Entry model

module.exports = {
	customID: 'leaveBtn',
	async execute(interaction, client) {
		const userId = interaction.user.id;
        
        // Find the user's character and entry
		const character = await Character.findOne({ userId});
        const entry = await Tower.findOne({ userId });

		entry.currentFloor = 0;
		entry.encounter = 0;
		await entry.save();

		await interaction.update({
			content: `${character.characterName} has left the Tower.`,
			components: [],
		});
	}
}
