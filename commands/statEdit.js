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
        .addIntegerOption(option =>
            option.setName('value')
            .setDescription('The amount to change by')
            .setRequired(true)
        ),
    async execute(interaction) {
        const statName = interaction.options.getString('stat');
        const statChange = interaction.options.getInteger('value');
        const userId = interaction.user.id;

        // checkfor an existing character
        const character = await Character.findOne({ userId});

        if (!character) {
            return interaction.reply({
                content: 'No Character.',
                ephemeral: true
            });
        }
        // adjust stat
        if (statName === 'Str') {
            const newStat = statChange + character.strength;
            character.strength = newStat;
        } else if (statName === 'Dex') {
            const newStat = statChange + character.dexterity;
            character.dexterity = newStat;
        } else if (statName === 'Con') {
            const newStat = statChange + character.constitution;
            character.constitution = newStat;
        } else if (statName === 'Int') {
            const newStat = statChange + character.intelligence;
            character.intelligence = newStat;
        } else if (statName === 'Gold') {
            const newStat = statChange + character.gold;
            character.gold = newStat;
        } else if (statName === 'Lv') {
            const newStat = statChange + character.level;
            character.level = newStat;
        } else {
            return interaction.reply({
                content: 'Invalid.',
                ephemeral: true
            });
        }
            await character.save();

            await interaction.reply(`${character.characterName}'s **${statName}** changed successfully!`);
    }
} 
