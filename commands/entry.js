const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const Character = require('../schemas/char'); // Import the character model
const Tower = require('../schemas/tower'); // Import the tower model

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

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
	async execute(interaction, client) {
        const userId = interaction.user.id;

        // Find the user's character
        const character = await Character.findOne({ userId});

        if (!character) {
            return interaction.reply({
                content: 'You do not have a character created. Use `/character` to create one.',
                ephemeral: true
            });
        }

        // Retrieve or create the user's profile with gold
        let entry = await Tower.findOne({ userId });
        if (!entry) {
            entry = new Tower({ 
                userId: userId,
            });
            await entry.save();
        }

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

	const leftDoor = doorColor(getRandomInt(3));
	const rightDoor = doorColor(getRandomInt(3));
	const middleDoor = doorColor(getRandomInt(3));
		
	if (entry.currentFloor == 0){
        	var row2 = new ActionRowBuilder()
		.addComponents(leaveButton);
            	await interaction.reply({
                	content: '`The left door is **${leftDoor}**. The middle door is ${middleDoor}. The right door is ${rightDoor}.`',
                	components: [row1, row2],
            	});
        }else{
        	await interaction.reply({
			content: '`The left door is **${leftDoor}**. The middle door is ${middleDoor}. The right door is ${rightDoor}.`',
			components: [row1],
		});
        }
    }
}
