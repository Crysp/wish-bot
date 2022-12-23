"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const config_1 = require("../config");
const activeChats_1 = require("../activeChats");
const messageBucket_1 = require("../utils/messageBucket");
const videosBucket = (0, messageBucket_1.createBucket)(config_1.replyVideos);
async function reply(bot, chatId) {
    const video = videosBucket.getItem(chatId);
    const withOneMoreWishButton = {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: config_1.actions.one_more_wish.text,
                        callback_data: config_1.ONE_MORE_WISH_COMMAND,
                    },
                ],
            ],
        },
    };
    (0, activeChats_1.incrementWish)(chatId);
    if ((0, activeChats_1.countWishes)(chatId) === 1) {
        await bot.sendMessage(chatId, config_1.replyMessage.text, {
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
        });
        await bot.sendChatAction(chatId, 'upload_video');
        await bot.sendVideoNote(chatId, path_1.default.join(process.cwd(), video), withOneMoreWishButton);
    }
    else {
        await bot.sendMessage(chatId, config_1.moreThanOneWishFareWell.text, {
            ...withOneMoreWishButton,
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
        });
    }
}
exports.default = reply;
