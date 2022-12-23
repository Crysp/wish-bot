import TelegramBot from 'node-telegram-bot-api';
import path from 'path';
import {
  actions,
  replyVideos,
  replyMessage,
  moreThanOneWishFareWell,
} from '../config';
import { countWishes, incrementWish } from '../activeChats';
import { createBucket } from '../utils/messageBucket';

const videosBucket = createBucket(replyVideos);

export default async function reply(bot: TelegramBot, chatId: number) {
  const video = videosBucket.getItem(chatId);

  incrementWish(chatId);

  await bot.sendMessage(chatId, replyMessage.text, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
    reply_markup: {
      keyboard: [[{ text: actions.one_more_wish.text }]],
      resize_keyboard: true,
    },
  });
  await bot.sendChatAction(chatId, 'upload_video');
  await bot.sendVideoNote(chatId, path.join(process.cwd(), video));

  if (countWishes(chatId) > 1) {
    await bot.sendMessage(chatId, moreThanOneWishFareWell.text, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
  }
}
