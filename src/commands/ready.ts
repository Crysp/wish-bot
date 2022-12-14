import TelegramBot from 'node-telegram-bot-api';
import { addChat } from '../activeChats';

export default async function ready(bot: TelegramBot, chatId: number) {
  addChat(chatId);
}
