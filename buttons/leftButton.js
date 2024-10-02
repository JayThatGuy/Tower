const Tower = require('../schemas/tower'); // Import the tower model


module.exports = {
	customID: 'leftBtn',
	async execute(interaction, client) {
        const userId = interaction.user.id;
        
        // Find the user's character
        const entry = await Tower.findOne({ userId });

		entry.encounter += 1;
		await entry.save();
		await interaction.reply({
			content: `Welcome to encounter ${entry.encounter}`,
			ephemeral: true
		});
		
	}
}
