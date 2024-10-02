const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Character = require('../schemas/char'); // Import the character model
const Tower = require('../schemas/tower'); // Import the tower model

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enter')
		.setDescription('Enter the Gungeon!'),
	async execute(interaction, client) {
		const button = new ButtonBuilder()
		.setCustomId('rightBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Begin your journey!');
		const button = new ButtonBuilder()
		.setCustomId('middleBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Begin your journey!');
		const button = new ButtonBuilder()
		.setCustomId('leftBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Begin your journey!');

		const row = new ActionRowBuilder()
		.addComponents(button);

		await interaction.reply({
			content: 'Begin your Journey!',
			components: [row],
		});

	}
}
