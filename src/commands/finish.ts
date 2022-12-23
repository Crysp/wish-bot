import path from 'path';
import TelegramBot from 'node-telegram-bot-api';
import { removeChat } from '../activeChats';
import { finishMessage, finishVideos } from '../config';
import { createBucket } from '../utils/messageBucket';

const videosBucket = createBucket(finishVideos);

export default async function finish(bot: TelegramBot, chatId: number) {
  const video = videosBucket.getItem(chatId);
  removeChat(chatId);
  await bot.sendMessage(chatId, finishMessage.text, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  });
  await bot.sendChatAction(chatId, 'upload_video');
  await bot.sendVideoNote(chatId, path.join(process.cwd(), video), {
    reply_markup: {
      remove_keyboard: true,
    },
  });
}
