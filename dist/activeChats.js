"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countWishes = exports.incrementWish = exports.removeChat = exports.addChat = exports.isActiveChat = exports.activeChats = void 0;
exports.activeChats = new Map();
function isActiveChat(chatId) {
    return exports.activeChats.has(chatId);
}
exports.isActiveChat = isActiveChat;
function addChat(chatId) {
    if (!exports.activeChats.has(chatId)) {
        exports.activeChats.set(chatId, 0);
    }
}
exports.addChat = addChat;
function removeChat(chatId) {
    exports.activeChats.delete(chatId);
}
exports.removeChat = removeChat;
function incrementWish(chatId) {
    exports.activeChats.set(chatId, exports.activeChats.get(chatId) + 1);
}
exports.incrementWish = incrementWish;
function countWishes(chatId) {
    return exports.activeChats.get(chatId) || 0;
}
exports.countWishes = countWishes;
