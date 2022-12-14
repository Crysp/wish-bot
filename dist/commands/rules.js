"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const config_1 = require("../config");
async function rules(bot, chatId) {
    await bot.sendMessage(chatId, config_1.rulesMessage.text, { parse_mode: 'Markdown' });
}
exports.rules = rules;
