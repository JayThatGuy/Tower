module.exports = {
	customID: 'leftBtn',
	async execute(interaction, client) {
		tower.encounter +=;
		await tower.save;
		await interaction.reply({
			content: `Welcome to encounter ${tower.encounter}`,
			ephemeral: true
		});
		
	}
}
