"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moreThanOneWishFareWell = exports.replyVideos = exports.replyMessage = exports.oneMoreWishReply = exports.actions = exports.rulesMessage = exports.startNotificationMessage = exports.afterStartMessage = exports.welcomeMessage = exports.GOOGLE_SHEETS_DOC_ID = exports.USER_WISH_MINIMUM_WORDS = exports.BEGIN_COMMAND = exports.BOT_TOKEN = void 0;
// @ts-ignore
const config_json_1 = __importDefault(require("../config.json"));
exports.BOT_TOKEN = config_json_1.default.bot_token;
exports.BEGIN_COMMAND = 'begin';
exports.USER_WISH_MINIMUM_WORDS = config_json_1.default.user_wish_minimum_words;
exports.GOOGLE_SHEETS_DOC_ID = config_json_1.default.google_sheets_doc_id;
exports.welcomeMessage = config_json_1.default.welcome;
exports.afterStartMessage = config_json_1.default.after_start_message;
exports.startNotificationMessage = config_json_1.default.start_notification;
exports.rulesMessage = config_json_1.default.rules;
exports.actions = config_json_1.default.reply_shortcut;
exports.oneMoreWishReply = config_json_1.default.one_more_wish_reply;
exports.replyMessage = config_json_1.default.reply_message;
exports.replyVideos = config_json_1.default.reply_videos;
exports.moreThanOneWishFareWell = config_json_1.default.more_that_one_wish_farewell;
