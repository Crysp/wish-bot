"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const activeChats_1 = require("../activeChats");
async function ready(bot, chatId) {
    (0, activeChats_1.addChat)(chatId);
}
exports.default = ready;
