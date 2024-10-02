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
        const retreatButton = new ButtonBuilder()
        .setCustomId('retreatBtn')
        .setStyle(ButtonStyle.Primary)
        .setLabel('Retreat');
        
        const leaveButton = new ButtonBuilder()
        .setCustomId('leaveBtn')
        .setStyle(ButtonStyle.Primary)
        .setLabel('Leave');
        const forwardButton = new ButtonBuilder()
        .setCustomId('forwardBtn')
        .setStyle(ButtonStyle.Primary)
        .setLabel('Press Forward');

        const row1 = new ActionRowBuilder()
        .addComponents(leftButton, middleButton, rightButton, retreatButton);
        const row2 = new ActionRowBuilder()
        .addComponents(forwardButton, leaveButton);

        //saves the door options
        entry.leftDoor = getRandomInt(3);
        entry.middleDoor = getRandomInt(3);
        entry.rightDoor = getRandomInt(3);
        await entry.save();
        
        //generates the door type
        const leftDoor = doorColor(entry.leftDoor);
        const rightDoor = doorColor(entry.rightDoor);
        const middleDoor = doorColor(entry.middleDoor);
		
	    if (entry.currentFloor == 0){
            await interaction.reply({
                content: `Floor ${entry.currentFloor}\nThe doors of the tower are open to explore.`,
                components: [row2],
            });
        }
        if (entry.currentFloor > 0 && entry.encounter < 3){
        	await interaction.reply({
			content: `Floor ${entry.currentFloor}\nThe left door is **${leftDoor}**. The middle door is **${middleDoor}**. The right door is **${rightDoor}**.`,
			components: [row1],
		    });
        }
        
    }
    
}
