const {ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Tower = require('../schemas/tower'); // Import the tower model

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function isBossFloor(floor){
    if ((floor % 10) == 9){
        return true;
    }else{
        return false;
    }
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
	customID: 'leftBtn',
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
        
        //creates the rows depending on the option.
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

        //increment encounter up to 3
		if(entry.encounter < 3){
            entry.encounter ++;
		    await entry.save();
        }  

        
        if(isBossFloor(entry.currentFloor) == true && entry.encounter == 3){
            await interaction.update({
                content: `Floor ${entry.currentFloor}\nThere is now just a door between you and what's to come.`,
                components: [row2],
            })
        }else if(entry.encounter == 3){
            await interaction.update({
                content: `Floor ${entry.currentFloor}\nOnly one way forward from here.`,
                components: [row2],
            })
        }else if(entry.encounter < 3){
            await interaction.update({
                content: `Floor ${entry.currentFloor}\nThe left door is **${leftDoor}**. The middle door is **${middleDoor}**. The right door is **${rightDoor}**.`,
                components: [row1],
            })
        }
	}
}
