const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Character = require('../schemas/char'); // Import the character model
const Tower = require('../schemas/tower'); // Import the tower model

// rng
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

// determine door type
function doorColor(roll) {
	if (roll == 0) {
		return ('Red');
	} else if (roll == 1) {
		return ('blue');
	} else if (roll == 2) {
		return ('green');
	} else {
		return ('broken');
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('enter')
		.setDescription('Enter the Gungeon!'),
	// create buttons
	async execute(interaction, client) {
		const leftButton = new ButtonBuilder()
		.setCustomId('leftBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Left');
		const middleButton = new ButtonBuilder()
		.setCustomId('middleBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Middle');
		const rightButton = new ButtonBuilder()
		.setCustomId('rightBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Right');
        	const leaveButton = new ButtonBuilder()
		.setCustomId('leaveBtn')
		.setStyle(ButtonStyle.Primary)
		.setLabel('Leave');

		const row1 = new ActionRowBuilder()
		.addComponents(rightButton, middleButton, leftButton);
        	const row2 = new ActionRowBuilder()
		.addComponents(leaveButton);

		//generate doors
		const leftDoor = doorColor(getRandomInt(3));
		const rightDoor = doorColor(getRandomInt(3));
		const middleDoor = doorColor(getRandomInt(3));

		await interaction.reply({
			content: `The left door is **${leftDoor}**. The middle door is ${middleDoor}. The right door is ${rightDoor}.`,
			components: [row1, row2],
		});

	}
}
