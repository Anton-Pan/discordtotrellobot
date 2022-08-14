const {Client} = require('discord.js');
const {token} = require('./config.json');
const trelloInteract = require("./trelloInteract");
const {deployCommands} = require("./deploy-commands");

deployCommands().then(r => console.log("Commands added."))

const client = new Client({intents: 84992});

client.once('ready', () => {
    console.log('Bot Ready!');
});

function getParameterObject(wordList) {
    let msgDesc = ""
    let msgTitle = ""
    let boardName = ""
    for (let i = 1; i < wordList.length; i++) {
        const wordListElement = wordList[i]
        if (wordListElement == "--title") {
            msgTitle = wordList[i + 1]
        }
        if (wordListElement == "--desc") {
            msgDesc = wordList[i + 1]
        }
        if (wordListElement == "--boardName") {
            boardName = wordList[i + 1]
        }
    }
    return {title: msgTitle, desc: msgDesc, boardName: boardName}
}

function parseCommandIntoArray(commandName) {
    let wordList = []
    let terminatingCharacters
    let wordInProgress = ""
    for (let i = 0; i < commandName.length; i++) {
        let characterATIndex = commandName[i];
        if (terminatingCharacters === undefined) {
            if (characterATIndex === '"') {
                terminatingCharacters = ['"']
            } else if (characterATIndex === ' ') {
                terminatingCharacters = ['"', " "]
            } else {
                terminatingCharacters = [' ']
                wordInProgress += characterATIndex
            }
        } else {
            if (terminatingCharacters !== undefined && terminatingCharacters.includes(characterATIndex)) {
                wordList.push(wordInProgress)
                wordInProgress = ""
                terminatingCharacters = undefined
            } else {
                wordInProgress += characterATIndex
            }
        }
    }
    if (wordInProgress !== "") {
        wordList.push(wordInProgress)
    }
    return wordList
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction)
    const {commandName} = interaction;
    const parsedCommandArray = parseCommandIntoArray(commandName)
    const parsedParameterObject = getParameterObject(parsedCommandArray)


    if (parsedCommandArray[0] === "//trello-create-board") {
        console.log("trello-create-board called")
        const keyArray = ["boardName","desc", "title"]
        for (let i = 0; i < keyArray.length; i++) {
            const keyArrayElement = keyArray[i];
            if (!parsedParameterObject[keyArrayElement]){
                interaction.reply(`ERROR: You are missing ${keyArrayElement}!
                Please add it to your command using the format 
                '//trello-create-board --boardName YOUR_BOARD_NAME --desc YOUR_DESCRIPTION --title YOUR_TITLE'`)
            }
        }

        if (!await trelloInteract.checkBoard(parsedParameterObject.boardName)) {
            await trelloInteract.createBoard(parsedParameterObject)
        } else {
            await interaction.reply("ERROR: Board already exists. Please try a different board name.")
        }

    }
})

client.login(token).then(r => console.log("Bot Login Attempted"));