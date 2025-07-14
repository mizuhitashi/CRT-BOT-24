const restify = require('restify');
const { BotFrameworkAdapter } = require('botbuilder');
require('dotenv').config();

// Botの処理
const adapter = new BotFrameworkAdapter({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});

const server = restify.createServer();
server.listen(process.env.PORT || 3978, () => {
    console.log(`Bot is listening on ${server.url}`);
});

server.post('/api/messages', (req, res) => {
    adapter.processActivity(req, res, async (context) => {
        await context.sendActivity('こんにちは！Botが応答しています。');
    });
});
