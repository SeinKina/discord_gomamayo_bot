// ゴママヨ検出ライブラリのインポート
const gomamayo = require('gomamayo-js');

// ゴママヨ検出関数
module.exports = async function detected_gomamayo(text) { // Because top-level async function won't be executed
    const result = await gomamayo.find(text)
    if (result) { // gomamayo detected
        console.log('ゴママヨやね: ')
        console.log(result[0]) // string[] of gomamayo will be printed
        console.log(result[1]) // string[][][] of raw information parsed by MeCab will be printed
        return true;
    } else if (result === null) {
        console.log('未検出') // no gomamayo detected
        return false;
    }
};
