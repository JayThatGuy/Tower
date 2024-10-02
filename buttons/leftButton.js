module.exports = {
	customID: 'leftBtn',
	async execute(interaction, client) {
		tower.encounter +=;
		await interaction.reply({
			content: `Welcome to encounter ${tower.encounter}`,
			ephemeral: true
		});
		
	}
}
