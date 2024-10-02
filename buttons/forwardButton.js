const Tower = require('../schemas/tower');

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

        
        
	entry.currentFloor += 1;
        if(entry.currentFloor > entry.highestFloor){
            entry.highestFloor = entry.currentFloor;
        }
	await entry.save();

        await interaction.update({
            content: `Going up.`,
            components: [],
        })
	}
}
