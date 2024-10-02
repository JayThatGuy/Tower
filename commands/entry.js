const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Character = require('../schemas/char'); // Import the character model
const Tower = require('../schemas/tower'); // Import the tower model

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enter')
		.setDescription('Enter the Gungeon!'),
	async execute(interaction, client) {
		const rightButton = new ButtonBuilder()
		.setCustomId('rightBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Right');
		const middleButton = new ButtonBuilder()
		.setCustomId('middleBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Middle');
		const leftButton = new ButtonBuilder()
		.setCustomId('leftBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Left');
        const leaveButton = new ButtonBuilder()
		.setCustomId('leaveBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Leave');

		const row1 = new ActionRowBuilder()
		.addComponents(rightButton, middleButton, leftButton);
        const row2 = new ActionRowBuilder()
		.addComponents(leaveButton);

		await interaction.reply({
			content: 'Begin your Journey!',
			components: [row1, row2],
		});

	}
}
