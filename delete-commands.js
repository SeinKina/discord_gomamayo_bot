const { REST, Routes } = require('discord.js');
const { applicationId, guildId, token } = require('./config.json');

// DiscordのAPIに接続
const rest = new REST({ version: '10' }).setToken(token);

// サーバー固有のコマンドを取得
(async () => {
    try {
        const commands = await rest.get(
            Routes.applicationGuildCommands(applicationId, guildId)
        );

        console.log('現在登録されているコマンド一覧:');
        console.log(commands); // 各コマンドの情報が表示されます
    } catch (error) {
        console.error('コマンドリストの取得中にエラーが発生しました:', error);
    }
})();


// (async () => {
//     try {
//         // ここに削除したいコマンドのIDを指定します
//         const commandId = '';

//         await rest.delete(
//             Routes.applicationGuildCommand(applicationId, guildId, commandId)
//         );

//         console.log(`コマンド ${commandId} が削除されました！`);
//     } catch (error) {
//         console.error('コマンド削除中にエラーが発生しました:', error);
//     }
// })();
