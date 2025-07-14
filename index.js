const restify = require('restify');
const { CloudAdapter, ConfigurationServiceClientCredentialFactory } = require('botbuilder');
require('dotenv').config();

// 認証情報（空でOK）
const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: process.env.MicrosoftAppId || '',
    MicrosoftAppPassword: process.env.MicrosoftAppPassword || '',
    MicrosoftAppType: 'MultiTenant',
});

// CloudAdapter の作成
const adapter = new CloudAdapter(credentialsFactory);

// サーバー起動
const server = restify.createServer();
server.listen(process.env.PORT || 3978, () => {
    console.log(`Bot is running on http://localhost:${process.env.PORT || 3978}`);
});

// エラーハンドラ
adapter.onTurnError = async (context, error) => {
    console.error(`[onTurnError] ${error}`);
    await context.sendActivity('エラーが発生しました。');
};

// Bot ロジック
server.post('/api/messages', async (req, res) => {
    await adapter.process(req, res, async (context) => {
        await context.sendActivity('こんにちは！Botが CloudAdapter で応答しています。');
    });
});
