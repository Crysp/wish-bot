import TelegramBot, { SendMessageOptions } from 'node-telegram-bot-api';
import { actions, replyVariants } from '../config';
import path from 'path';
import fs from 'fs';
import { incrementWish } from '../activeChats';
import { createBucket } from '../utils/messageBucket';

const replyBucket = createBucket(replyVariants);

export default async function reply(bot: TelegramBot, chatId: number) {
  const reply = replyBucket.getItem(chatId);
  const replyOptions: SendMessageOptions = {
    parse_mode: 'Markdown',
    reply_markup: {
      keyboard: [
        [{ text: actions.one_more_wish.text }],
        [{ text: actions.finish.text }],
      ],
    },
  };
  if (reply.image && fs.existsSync(path.join(process.cwd(), reply.image))) {
    await bot.sendPhoto(chatId, path.join(process.cwd(), reply.image), {
      caption: reply.text,
      ...replyOptions,
    });
  } else {
    await bot.sendMessage(chatId, reply.text, replyOptions);
  }
  incrementWish(chatId);
}
