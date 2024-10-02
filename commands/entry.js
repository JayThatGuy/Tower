const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Character = require('../schemas/char'); // Import the character model
const Tower = require('../schemas/tower'); // Import the tower model

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enter')
		.setDescription('Enter the Gungeon!'),
	async execute(interaction, client) {
		const leftBtn = new ButtonBuilder()
		.setCustomId('leftBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Left');
		const middleBtn = new ButtonBuilder()
		.setCustomId('middleBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Middle');
		const rightBtn = new ButtonBuilder()
		.setCustomId('rightBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Right');
		const leaveBtn = new ButtonBuilder()
		.setCustomId('leaveBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Leave');

		const row = new ActionRowBuilder()
		.addComponents(leftBtn);

		await interaction.reply({
			content: 'Begin your Journey!',
			components: [row],
		});

	}
}
