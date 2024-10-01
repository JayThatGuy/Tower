const {SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle} = require('discord.js');
const itemCosts = require("../store-prices.json"); //Imports items
const Character = require('../schemas/char'); // Import the character model

module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("You open the door to a shop every adventurer frequents."),
    async execute(interaction){
        const userId = interaction.user.id;

        // Find the user's character
        const character = await Character.findOne({ userId });

        if (!character) {
            return interaction.reply({
                content: 'You do not have a character created. Use `/character` to create one.',
                ephemeral: true
            });
        }

        // Create a select menu with items from the store-prices.json file
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select-item')
            .setPlaceholder('Choose an item to purchase')
            .addOptions(
                Object.keys(itemCosts).map(item => ({
                    label: item,
                    description: `${item} costs ${itemCosts[item]} gold`,
                    value: item
                }))
            );

        const row = new ActionRowBuilder().addComponents(selectMenu);

        // Send the shop message with the select menu
        await interaction.reply({
            content: `You have **${character.gold}** gold. Select an item to purchase:`,
            components: [row],
            ephemeral: true // Makes it visible only to the user
        });

        // Create a collector for the select menu interaction
        const filter = i => i.user.id == interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 10000 });

        collector.on('collect', async i => {
            if (i.customId === 'select-item') {
                const selectedItem = i.values[0];
                const itemPrice = itemCosts[selectedItem];

                // Check if user has enough gold
                if (character.gold >= itemPrice) {
                    // Deduct the item price from user's gold
                    character.gold -= itemPrice;
                    await character.save();

                    // Confirmation message
                    await i.update({
                        content: `You have successfully purchased **${selectedItem}** for **${itemPrice}** gold! You now have **${character.gold}** gold left.`,
                        components: [] // Remove the select menu
                    });
                } else {
                    await i.update({
                        content: `You do not have enough gold to buy **${selectedItem}**. You need **${itemPrice}** gold, but you only have **${character.gold}**.`,
                        components: [] // Remove the select menu
                    });
                }
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.editReply({
                    content: 'You did not make a selection in time.',
                    components: [] // Remove the select menu after timeout
                });
            }
        });
    }
};