const restify = require('restify');
const {
    CloudAdapter,
    ConfigurationBotFrameworkAuthentication
} = require('botbuilder');
require('dotenv').config();

// Bot Framework Authentication オブジェクトを生成
const botFrameworkAuth = new ConfigurationBotFrameworkAuthentication(process.env);

// Adapter に渡す
const adapter = new CloudAdapter(botFrameworkAuth);

// エラーハンドラ
adapter.onTurnError = async (context, error) => {
    console.error(`[onTurnError] ${error.stack}`);
    await context.sendActivity('エラーが発生しました。');
};

// サーバー構築
const server = restify.createServer();
server.use(restify.plugins.bodyParser());

server.listen(3978, () => {
    console.log(`Bot is running on http://localhost:3978`);
});

server.post('/api/messages', async (req, res) => {
    console.log('>>> POST /api/messages');
    await adapter.process(req, res, async (context) => {
        console.log('>>> Bot received a message');
        await context.sendActivity(`こんにちは！Botが応答しています。`);
    });
});
