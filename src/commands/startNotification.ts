import TelegramBot from 'node-telegram-bot-api';
import { BEGIN_COMMAND, startNotificationMessage } from '../config';

export default async function startNotification(
  bot: TelegramBot,
  chatId: number,
) {
  await bot.sendMessage(chatId, startNotificationMessage.text, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: startNotificationMessage.button,
            callback_data: BEGIN_COMMAND,
          },
        ],
      ],
    },
  });
}
