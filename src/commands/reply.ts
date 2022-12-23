import TelegramBot, { SendBasicOptions } from 'node-telegram-bot-api';
import path from 'path';
import {
  actions,
  replyVideos,
  replyMessage,
  moreThanOneWishFareWell,
  ONE_MORE_WISH_COMMAND,
} from '../config';
import { countWishes, incrementWish } from '../activeChats';
import { createBucket } from '../utils/messageBucket';

const videosBucket = createBucket(replyVideos);

export default async function reply(bot: TelegramBot, chatId: number) {
  const video = videosBucket.getItem(chatId);
  const withOneMoreWishButton: SendBasicOptions = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: actions.one_more_wish.text,
            callback_data: ONE_MORE_WISH_COMMAND,
          },
        ],
      ],
    },
  };

  incrementWish(chatId);

  const wishesCount = countWishes(chatId);

  await bot.sendMessage(chatId, replyMessage.text, {
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  });
  await bot.sendChatAction(chatId, 'upload_video');
  await bot.sendVideoNote(
    chatId,
    path.join(process.cwd(), video),
    wishesCount === 1 ? withOneMoreWishButton : {},
  );

  if (countWishes(chatId) > 1) {
    await bot.sendMessage(chatId, moreThanOneWishFareWell.text, {
      ...withOneMoreWishButton,
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
  }
}
