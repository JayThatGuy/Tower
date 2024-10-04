const { SlashCommandBuilder } = require('@discordjs/builders');
const Character = require('../schemas/char'); // Import the character model

module.exports = {
    data: new SlashCommandBuilder()
        .setName('character')
        .setDescription('Create a new character')
        .addStringOption(option => 
            option.setName('name')
            .setDescription('The name of your character')
            .setRequired(true)
        ),
    async execute(interaction) {
        const characterName = interaction.options.getString('name');
        const userId = interaction.user.id;

        // Check if the character already exists for the user
        const existingCharacter = await Character.findOne({ userId});

        if (existingCharacter) {
            return interaction.reply({
                content: 'You already have a character.',
                ephemeral: true
            });
        }

        // Create a new character
        const newCharacter = new Character({
            userId: userId,
            characterName: characterName,
            strength: 0,
            dexterity: 0,
            constitution: 0,
            intelligence: 0,
            gold: 0,
            main: "Unarmed",
            offHand: "Unarmed",
            armor: "None",
            misc1: "None",
            misc2: "None",
            misc3: "None",
        });

        await newCharacter.save();

        await interaction.reply(`**${characterName}** has begun their journey!`);
    }
};
