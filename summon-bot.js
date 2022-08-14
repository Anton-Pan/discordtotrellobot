const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trello-create-baord')
        .setDescription('creates a new trello board'),
    async execute(interaction) {
        await interaction.reply('marvin can i have a raise to 100 an hour for copy pasting code');
    },
};