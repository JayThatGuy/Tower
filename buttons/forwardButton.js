const {ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Tower = require('../schemas/tower');

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function doorColor(roll) {
	if (roll == 0) {
		return ('red');
	} else if (roll == 1) {
		return ('blue');
	} else if (roll == 2) {
		return ('green');
	} else {
		return ('broken');
	}
}

module.exports = {
	customID: 'forwardBtn',
	async execute(interaction, client) {
		const userId = interaction.user.id;
        
        // Find the user's character
        const entry = await Tower.findOne({ userId });

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
        const forwardButton = new ButtonBuilder()
        .setCustomId('forwardBtn')
        .setStyle(ButtonStyle.Primary)
        .setLabel('Press Forward');
        
        //creates the rows depending on the option.
        const row1 = new ActionRowBuilder()
        .addComponents(leftButton, middleButton, rightButton);
        const row2 = new ActionRowBuilder()
        .addComponents(forwardButton, leaveButton);

        //generates the door type
        const leftDoor = doorColor(getRandomInt(3));
        const rightDoor = doorColor(getRandomInt(3));
        const middleDoor = doorColor(getRandomInt(3));

        //increments the floor level
	entry.currentFloor += 1;
        if(entry.currentFloor > entry.highestFloor){
            entry.highestFloor = entry.currentFloor;
        }
	await entry.save();

        await interaction.update({
            content: `Floor ${entry.currentFloor}\nThe left door is **${leftDoor}**. The middle door is **${middleDoor}**. The right door is **${rightDoor}**.`,
            components: [row1],
        })
	}
}
