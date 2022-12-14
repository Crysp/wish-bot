export const activeChats = new Map<number, number>();

export function isActiveChat(chatId: number) {
  return activeChats.has(chatId);
}

export function addChat(chatId: number) {
  if (!activeChats.has(chatId)) {
    activeChats.set(chatId, 0);
  }
}

export function removeChat(chatId: number) {
  activeChats.delete(chatId);
}

export function incrementWish(chatId: number) {
  activeChats.set(chatId, activeChats.get(chatId)! + 1);
}

export function countWishes(chatId: number) {
  return activeChats.get(chatId) || 0;
}
