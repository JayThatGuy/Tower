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
        const statName = interaction.options.getString('stat');
        const statChange = interaction.options.getInteger('value');
        const userId = interaction.user.id;

        // checkfor an existing character
        const character = await Character.findOne({ userId});

        if (!existingCharacter) {
            return interaction.reply({
                content: 'No Character.',
                ephemeral: true
            });
        }
        // Edit stats
        if (statName == 'Str', 'str', 'Strength', 'strength') {
            statName = 'strength';
        } else if (statName == 'Dex', 'dex', 'Dexterity', 'dexterity') {
            statName = 'dexterity';
        } else if (statName == 'Con', 'con', 'Constitution', 'constitution') {
            statName = 'constitution';
        } else if (statName == 'Int', 'int', 'Intelligence', 'intelligence') {
            statName = 'intelligence';
        } else if (statName == 'Gold', 'gold') {
            statName = 'gold';
        } else {
            return interaction.reply({
                content: 'No Character.',
                ephemeral: true
            });
        }
        
    }
} 
