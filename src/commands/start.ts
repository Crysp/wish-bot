import TelegramBot from 'node-telegram-bot-api';
import { BEGIN_COMMAND, welcomeMessage } from '../config';

export default async function start(bot: TelegramBot, chatId: number) {
  await bot.setChatMenuButton({
    chat_id: chatId,
    menu_button: { type: 'commands' },
  });
  await bot.sendMessage(chatId, welcomeMessage.text, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [{ text: welcomeMessage.button, callback_data: BEGIN_COMMAND }],
      ],
    },
  });
}
