"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const activeChats_1 = require("../activeChats");
const messageBucket_1 = require("../utils/messageBucket");
const replyBucket = (0, messageBucket_1.createBucket)(config_1.replyVariants);
async function reply(bot, chatId) {
    const reply = replyBucket.getItem(chatId);
    const replyOptions = {
        parse_mode: 'Markdown',
        reply_markup: {
            keyboard: [
                [{ text: config_1.actions.one_more_wish.text }],
                [{ text: config_1.actions.finish.text }],
            ],
        },
    };
    if (reply.image && fs_1.default.existsSync(path_1.default.join(process.cwd(), reply.image))) {
        await bot.sendPhoto(chatId, path_1.default.join(process.cwd(), reply.image), {
            caption: reply.text,
            ...replyOptions,
        });
    }
    else {
        await bot.sendMessage(chatId, reply.text, replyOptions);
    }
    (0, activeChats_1.incrementWish)(chatId);
}
exports.default = reply;
