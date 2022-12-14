"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const sheets_1 = require("./sheets");
const start_1 = __importDefault(require("./commands/start"));
const help_1 = __importDefault(require("./commands/help"));
const reply_1 = __importDefault(require("./commands/reply"));
const finish_1 = __importDefault(require("./commands/finish"));
const rules_1 = require("./commands/rules");
const ready_1 = __importDefault(require("./commands/ready"));
const activeChats_1 = require("./activeChats");
const config_1 = require("./config");
const startNotification_1 = __importDefault(require("./commands/startNotification"));
const oneMore_1 = __importDefault(require("./commands/oneMore"));
const commands = ['start', 'help', 'rules', 'finish'];
const Input = {
    ...commands.reduce((result, command) => ({
        ...result,
        [`is${command.slice(0, 1).toUpperCase().concat(command.slice(1))}`]: new RegExp(`^\/${command}`),
    }), {}),
    isOther: new RegExp(`^(?!${commands.map(command => `\/${command}`).join('|')}|${[
        config_1.actions.one_more_wish.text,
        config_1.actions.finish.text,
    ].join('|')}).*$`),
    isOneMore: new RegExp(config_1.actions.one_more_wish.text),
    isFastReply: new RegExp(`(${[config_1.actions.finish.text].join('|')})`),
};
function isWishMessage(message) {
    if (!message.text) {
        return false;
    }
    const words = [
        ...new Intl.Segmenter('ru', { granularity: 'word' }).segment(message.text),
    ];
    return words.filter(segment => segment.isWordLike).length >= 3;
}
function isContinueReply(message) {
    if (!message.text) {
        return false;
    }
    return message.text === config_1.actions.one_more_wish.text;
}
function isFinishRequest(message) {
    if (!message.text) {
        return false;
    }
    return message.text === config_1.actions.finish.text;
}
const bot = new node_telegram_bot_api_1.default(config_1.BOT_TOKEN, { polling: true });
console.info('Launched!');
bot.onText(Input.isOther, async (message) => {
    if ((0, activeChats_1.isActiveChat)(message.chat.id) && isWishMessage(message)) {
        await (0, sheets_1.saveLine)(message.from?.username || '', message.text || '');
        await (0, reply_1.default)(bot, message.chat.id);
    }
    else if (!(0, activeChats_1.isActiveChat)(message.chat.id)) {
        await (0, startNotification_1.default)(bot, message.chat.id);
    }
    else {
        await (0, rules_1.rules)(bot, message.chat.id);
    }
});
bot.onText(Input.isStart, async (message) => {
    await (0, start_1.default)(bot, message.chat.id);
});
bot.onText(Input.isFastReply, async (message) => {
    if ((0, activeChats_1.isActiveChat)(message.chat.id) && isContinueReply(message)) {
        // to do nothing
    }
    else if (!(0, activeChats_1.isActiveChat)(message.chat.id)) {
        await (0, startNotification_1.default)(bot, message.chat.id);
    }
    else if (isFinishRequest(message)) {
        await (0, finish_1.default)(bot, message.chat.id);
    }
});
bot.onText(Input.isOneMore, async (message) => {
    await (0, oneMore_1.default)(bot, message.chat.id);
});
bot.onText(Input.isHelp, async (message) => {
    await (0, help_1.default)(bot, message.chat.id);
});
bot.onText(Input.isRules, async (message) => {
    await (0, rules_1.rules)(bot, message.chat.id);
});
bot.onText(Input.isFinish, async (message) => {
    await (0, finish_1.default)(bot, message.chat.id);
});
bot.on('callback_query', async (callbackQuery) => {
    switch (callbackQuery.data) {
        case config_1.BEGIN_COMMAND:
            if (callbackQuery.message) {
                await (0, rules_1.rules)(bot, callbackQuery.message.chat.id);
                await (0, ready_1.default)(bot, callbackQuery.message.chat.id);
            }
    }
});
