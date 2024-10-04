const {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const Character = require('../schemas/char');

module.exports = {
    customID: 'equipBtn',
    async execute(interaction, client){
        const userId = interaction.user.id;
        
        // Find the user's character
        const character = await Character.findOne({ userId });

        const statsButton = new ButtonBuilder()
        .setCustomId('statsBtn')
        .setStyle(ButtonStyle.Primary)
        .setLabel('Stats');
        const equipButton = new ButtonBuilder()
        .setCustomId('equipBtn')
        .setStyle(ButtonStyle.Primary)
        .setLabel('Equipment')
        .setDisabled(true);

        const profileRow = new ActionRowBuilder()
        .addComponents(statsButton, equipButton);

        // Construct the profile message
        const profileEmbed = new EmbedBuilder()
            .setColor('#0099ff') // Set the embed color
            .setTitle(`${character.characterName} | Lv ${character.level}`)
            .addFields({ name: 'Gold:', value: `${character.gold}`})
            .addFields({name: 'Weapon', value: `${character.main}`, inline:true},{name: 'Armor', value: `${character.armor}`, inline: true})
            
        await interaction.update({ embeds: [profileEmbed], components: [profileRow] }); // Send the embed
    }
}