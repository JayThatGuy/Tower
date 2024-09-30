const { SlashCommandBuilder } = require('@discordjs/builders');
const Character = require('../schemas/char'); // Import the character model

module.exports = {
    data: new SlashCommandBuilder()
        .setName('statedit')
        .setDescription('Increase or decrease a stat value'),
    async execute(interaction) {
        const userId = interaction.user.id;

        // checkfor an existing character
        const existingCharacter = await Character.findOne({ userId});

        if (!existingCharacter) {
            return interaction.reply({
                content: 'No Character.',
                ephemeral: true
            });
        } else {
            return interaction.reply({
                content: 'Incomplete.',
                ephemeral: true
            });
        }
    }
} 
