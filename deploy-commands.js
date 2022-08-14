const {SlashCommandBuilder, Routes} = require('discord.js');
const {REST} = require('@discordjs/rest');
const {clientId, guildId, token} = require('./config.json');


module.exports.deployCommands = async function deployComnands() {
    const commands = [
        new SlashCommandBuilder().setName('trello-create-board').setDescription('creates a new trello board')
            .addStringOption(option =>
                option.setName('title')
                    .setDescription('title for board issue')
                    .setRequired(true))

            .addStringOption(option =>
                option.setName('boardName')
                    .setDescription('name of the board')
                    .setRequired(true)),

            //.addStringOption(option =>
                //option.setName('desc')
                    //.setDescription('description of the issue')
                    //.setRequired(true))


    new SlashCommandBuilder().setName('trello-create-card').setDescription('creates a new trello card in the chosen board'),
]
.
    map(command => command.toJSON());

    const rest = new REST({version: '10'}).setToken(token);

    rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error);
}