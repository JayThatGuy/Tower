const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('Stat Edit')
        .setDescription('Increase or decrease a stat value'),
    async execute(interaction) {
        const characterName = interaction.options.getString('name');
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
