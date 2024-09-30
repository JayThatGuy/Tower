const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('Stat Edit')
        .setDescription('Pong!'),
    async execute(interaction, client) {
        interaction.reply('Pong!');
    }
}
