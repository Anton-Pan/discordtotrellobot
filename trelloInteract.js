const TrelloNodeAPI = require('trello-node-api');

const trello = new TrelloNodeAPI();
trello.setApiKey(process.env.trelloKey);
trello.setOauthToken(process.env.trelloToken);

async function trelloCreatelistInBoard(board) {
    const listNames = ("To Do", "In Progress", "Done", "Blocked")
    for (let i = 0; i < listNames.length; i++) {
        let data = {
            name: listNames[i],
            idBoard: board,
        };

        const response = await trello.list.create(data)
        console.log(response)
        return response
    }}

module.exports.checkBoard = async function checkBoard(boardName) {
    const response = await trello.board.search(boardName);
    console.log(response)
    return response
}

module.exports.createBoard = async function createBoard({title, desc}) {
    let data = {
        name: title,
        desc: desc,
    };

    let response;
    try {
        response = await trello.board.create(data);
    } catch (error) {
        if (error) {
            console.log('error ' + error);
        }
    }
    console.log('response: ' + response);
    trelloCreatelistInBoard(title)
}

module.exports.createCard = async function createCard({board, cardName, cardDesc, content}) {
    let data = {
        name: cardName,
        desc: cardDesc,
        pos: 'top',
        idList: 'LIST_ID', //REQUIRED
        due: null,
        dueComplete: false,
        idMembers: ['MEMBER_ID', 'MEMBER_ID', 'MEMBER_ID'],
        idLabels: ['LABEL_ID', 'LABEL_ID', 'LABEL_ID'],
        urlSource: 'https://example.com',
        fileSource: 'file',
        idCardSource: 'CARD_ID',
        keepFromSource: 'attachments,checklists,comments,due,labels,members,stickers'
    };

    trello.card.create(data).then(function (response) {
        console.log('response ', response);
    }).catch(function (error) {
        console.log('error', error);
    });
}