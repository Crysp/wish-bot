"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
async function oneMore(bot, chatId) {
    await bot.sendMessage(chatId, config_1.oneMoreWishReply.text, {
        parse_mode: 'Markdown',
    });
}
exports.default = oneMore;
