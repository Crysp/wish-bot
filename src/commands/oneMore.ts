import TelegramBot from 'node-telegram-bot-api';
import { oneMoreWishReply } from '../config';

export default async function oneMore(bot: TelegramBot, chatId: number) {
  await bot.sendMessage(chatId, oneMoreWishReply.text, {
    parse_mode: 'Markdown',
  });
}
