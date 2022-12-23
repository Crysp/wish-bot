"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
async function startNotification(bot, chatId) {
    await bot.sendMessage(chatId, config_1.startNotificationMessage.text, {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: config_1.startNotificationMessage.button,
                        callback_data: config_1.BEGIN_COMMAND,
                    },
                ],
            ],
        },
    });
}
exports.default = startNotification;
