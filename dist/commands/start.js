"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
async function start(bot, chatId) {
    await bot.setChatMenuButton({
        chat_id: chatId,
        menu_button: { type: 'commands' },
    });
    await bot.sendMessage(chatId, config_1.welcomeMessage.text, {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [{ text: config_1.welcomeMessage.button, callback_data: config_1.BEGIN_COMMAND }],
            ],
        },
    });
}
exports.default = start;
