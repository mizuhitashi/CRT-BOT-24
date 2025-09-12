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

const port = process.env.PORT || process.env.port || 3978;
server.listen(port, () => {
  console.log(`Bot is running on http://localhost:${port}`);
});

server.post('/api/messages', async (req, res) => {
    console.log('>>> POST /api/messages');
    await adapter.process(req, res, async (context) => {
        console.log('>>> Bot received a message');

        const userMessage = context.activity.text?.trim();
        const locstion_text = '掃除場所の説明';
        const task_text = '掃除の種類の説明';
        const command_text = 'コマンドの説明';
                
       if (userMessage === '/location') {
            await context.sendActivity(locstion_text);
        } else if (userMessage === '/task') {
            await context.sendActivity(task_text);
        } else if (userMessage === '/command') {
            await context.sendActivity(command_text);
        } else {
            await context.sendActivity('そのコマンドはありません。なにいってんの？');
        }
    });
});
