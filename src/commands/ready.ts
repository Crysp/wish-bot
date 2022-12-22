import TelegramBot from 'node-telegram-bot-api';
import { addChat } from '../activeChats';
import { afterStartMessage } from '../config';

export default async function ready(bot: TelegramBot, chatId: number) {
  addChat(chatId);
  await bot.sendMessage(chatId, afterStartMessage.text, {
    parse_mode: 'Markdown',
  });
}
