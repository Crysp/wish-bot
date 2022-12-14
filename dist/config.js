"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishVideos = exports.oneMoreWishReply = exports.actions = exports.replyVariants = exports.rulesMessage = exports.startNotificationMessage = exports.welcomeMessage = exports.BEGIN_COMMAND = exports.BOT_TOKEN = void 0;
// @ts-ignore
const config_json_1 = __importDefault(require("../config.json"));
exports.BOT_TOKEN = config_json_1.default.bot_token;
exports.BEGIN_COMMAND = 'begin';
exports.welcomeMessage = config_json_1.default.welcome;
exports.startNotificationMessage = config_json_1.default.start_notification;
exports.rulesMessage = config_json_1.default.rules;
exports.replyVariants = config_json_1.default.wishes;
exports.actions = config_json_1.default.reply_shortcut;
exports.oneMoreWishReply = config_json_1.default.one_more_wish_reply;
exports.finishVideos = config_json_1.default.finish_videos;
