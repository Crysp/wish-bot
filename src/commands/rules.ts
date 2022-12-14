import TelegramBot from 'node-telegram-bot-api';
import { rulesMessage } from '../config';

export async function rules(bot: TelegramBot, chatId: number) {
  await bot.sendMessage(chatId, rulesMessage.text, { parse_mode: 'Markdown' });
}
