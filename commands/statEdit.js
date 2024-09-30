const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('Stat Edit')
        .setDescription('Increase or decrease a stat value')
        .addStringOption(option => 
            option.setName('Stat')
            .setDescription('The Stat you want to change')
            .setRequired(true)
        .addStringOption(option => 
            option.setName('Value')
            .setDescription('The amount to change by')
            .setRequired(true),
    async execute(interaction, client) {
        interaction.reply('Pong!');
    }
}
