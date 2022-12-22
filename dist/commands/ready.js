"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activeChats_1 = require("../activeChats");
const config_1 = require("../config");
async function ready(bot, chatId) {
    (0, activeChats_1.addChat)(chatId);
    await bot.sendMessage(chatId, config_1.afterStartMessage.text, {
        parse_mode: 'Markdown',
    });
}
exports.default = ready;
