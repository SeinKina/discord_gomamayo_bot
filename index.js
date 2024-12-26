// hey.jsのmodule.exportsを呼び出します。
const heyFile = require('./commands/hey.js');

// discord.jsライブラリの中から必要な設定を呼び出し、変数に保存します
const { Client, Events, GatewayIntentBits } = require('discord.js');
// 設定ファイルからトークン情報を呼び出し、変数に保存します
const { token } = require('./config.json');
// クライアントインスタンスと呼ばれるオブジェクトを作成します
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const detected_gomamayo = require('./commands/goma.js');

// クライアントオブジェクトが準備OKとなったとき一度だけ実行されます
client.once(Events.ClientReady, c => {
	console.log(`準備OKです! ${c.user.tag}がログインします。`);
});


//スラッシュコマンドに応答するには、interactionCreateのイベントリスナーを使う必要があります
client.on(Events.InteractionCreate, async interaction => {

    // スラッシュ以外のコマンドの場合は対象外なので早期リターンさせて終了します
    // コマンドにスラッシュが使われているかどうかはisChatInputCommand()で判断しています
    if (!interaction.isChatInputCommand()) return;

    // heyコマンドに対する処理
    if (interaction.commandName === heyFile.data.name) {
        try {
            await heyFile.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            } else {
                await interaction.reply({ content: 'コマンド実行時にエラーになりました。', ephemeral: true });
            }
        }
    } else {
        console.error(`${interaction.commandName}というコマンドには対応していません。`);
    }
});

// メッセージ送信関数
async function sendMsg(channelId, text, option = {}) {
    try {
        const channel = await client.channels.fetch(channelId);
        if (!channel || !channel.isTextBased()) {
            console.error("指定されたチャンネルが見つからないか、テキストチャンネルではありません。");
            return;
        }
        await channel.send({ content: text, ...option });
        console.log("メッセージ送信: " + text + JSON.stringify(option));
    } catch (error) {
        console.error("メッセージ送信中にエラーが発生しました:", error);
    }
}

// リプライ関数
async function replyMsg(message, text, option = {}) {
    try {
        await message.reply({ content: text, ...option });
        console.log("リプライ送信: " + text + JSON.stringify(option));
    } catch (error) {
        console.error("リプライ送信中にエラーが発生しました:", error);
    }
}

client.on('messageCreate', async message => {
    if (message.author.id == client.user.id || message.author.bot) {
        return;
    }
    console.log("received message: " + message.content);

    if (await detected_gomamayo(message.content)) {
        await replyMsg(message, "ゴママヨ！？");
    }
    return;
})


// ログインします
client.login(token);