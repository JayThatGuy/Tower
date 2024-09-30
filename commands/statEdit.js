const { SlashCommandBuilder } = require('@discordjs/builders');
const Character = require('../schemas/char'); // Import the character model

module.exports = {
    data: new SlashCommandBuilder()
        .setName('statedit')
        .setDescription('Increase or decrease a stat value')
        .addStringOption(option =>
            option.setName('stat')
            .setDescription('The stat to be changed')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('value')
            .setRequired(true)
        ),
    async execute(interaction) {
        const userId = interaction.user.id;

        // checkfor an existing character
        const existingCharacter = await Character.findOne({ userId});

        if (!existingCharacter) {
            return interaction.reply({
                content: 'No Character.',
                ephemeral: true
            });
        }
        
        }
    }
} 
