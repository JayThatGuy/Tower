const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const Character = require('../schemas/char'); // Import the character model

// Function to determine the grade based on the value
function getGrade(value) {
    if (value < 100) return "I";   // Below 100
    if (value < 200) return "H";   // Below 200
    if (value < 300) return "G";   // Below 300
    if (value < 400) return "F";   // Below 400
    if (value < 500) return "E";   // Below 500
    if (value < 600) return "D";   // Below 600
    if (value < 700) return "C";   // Below 700
    if (value < 800) return "B";   // Below 800
    if (value < 900) return "A";   // Below 900
    return "S";   // Max
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('View your character profile'),
    async execute(interaction) {
        const userId = interaction.user.id;

        // Find the user's character
        const character = await Character.findOne({ userId });

        if (!character) {
            return interaction.reply({
                content: 'You do not have a character created. Use `/character` to create one.',
                ephemeral: true
            });
        }

        // Get the grades for each stat
        const strengthGrade = getGrade(character.strength);
        const dexterityGrade = getGrade(character.dexterity);
        const constitutionGrade = getGrade(character.constitution);
        const intelligenceGrade = getGrade(character.intelligence);

        // Construct the profile message
        const profileEmbed = new EmbedBuilder()
            .setColor('#0099ff') // Set the embed color
            .setTitle(`${character.characterName}`)
            .addFields({ name: 'Stats:', value: `Strength: ${strengthGrade}\n
                Dexterity: ${dexterityGrade}\n
                Constitution: ${constitutionGrade}\n
                Intelligence: ${intelligenceGrade}`})
            

        await interaction.reply({ embeds: [profileEmbed] }); // Send the embed
    }
};
