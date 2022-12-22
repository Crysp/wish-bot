"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const activeChats_1 = require("../activeChats");
const config_1 = require("../config");
const messageBucket_1 = require("../utils/messageBucket");
const videosBucket = (0, messageBucket_1.createBucket)(config_1.finishVideos);
async function finish(bot, chatId) {
    const video = videosBucket.getItem(chatId);
    (0, activeChats_1.removeChat)(chatId);
    await bot.sendMessage(chatId, config_1.finishMessage.text, { parse_mode: 'Markdown' });
    await bot.sendChatAction(chatId, 'upload_video');
    await bot.sendVideoNote(chatId, path_1.default.join(process.cwd(), video), {
        reply_markup: {
            remove_keyboard: true,
        },
    });
}
exports.default = finish;
