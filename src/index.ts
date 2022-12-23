import TelegramBot from 'node-telegram-bot-api';
import { saveLine } from './sheets';
import start from './commands/start';
import help from './commands/help';
import reply from './commands/reply';
import { rules } from './commands/rules';
import ready from './commands/ready';
import { isActiveChat } from './activeChats';
import {
  actions,
  BEGIN_COMMAND,
  BOT_TOKEN,
  USER_WISH_MINIMUM_WORDS,
} from './config';
import startNotification from './commands/startNotification';
import oneMore from './commands/oneMore';

const commands = ['start', 'help', 'rules'] as const;

type InputKey =
  | `is${Capitalize<typeof commands[number]>}`
  | 'isOther'
  | 'isOneMore';

const Input: Record<InputKey, RegExp> = {
  ...commands.reduce(
    (result, command) => ({
      ...result,
      [`is${command.slice(0, 1).toUpperCase().concat(command.slice(1))}`]:
        new RegExp(`^\/${command}`),
    }),
    {} as Record<InputKey, RegExp>,
  ),
  isOther: new RegExp(
    `^(?!${commands.map(command => `\/${command}`).join('|')}|${[
      actions.one_more_wish.text,
    ].join('|')}).*$`,
  ),
  isOneMore: new RegExp(actions.one_more_wish.text),
};

function isWishMessage(message: TelegramBot.Message) {
  if (!message.text) {
    return false;
  }
  const words = [
    ...new Intl.Segmenter('ru', { granularity: 'word' }).segment(message.text),
  ];
  return (
    words.filter(segment => segment.isWordLike).length >=
    USER_WISH_MINIMUM_WORDS
  );
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

console.info('Launched!');

bot.onText(Input.isOther, async message => {
  if (isActiveChat(message.chat.id) && isWishMessage(message)) {
    await saveLine(message.from?.username || '', message.text || '');
    await reply(bot, message.chat.id);
  } else if (!isActiveChat(message.chat.id)) {
    await startNotification(bot, message.chat.id);
  } else {
    await rules(bot, message.chat.id);
  }
});

bot.onText(Input.isStart, async message => {
  await start(bot, message.chat.id);
});

bot.onText(Input.isOneMore, async message => {
  await oneMore(bot, message.chat.id);
});

bot.onText(Input.isHelp, async message => {
  await help(bot, message.chat.id);
});

bot.onText(Input.isRules, async message => {
  await rules(bot, message.chat.id);
});

bot.on('callback_query', async callbackQuery => {
  switch (callbackQuery.data) {
    case BEGIN_COMMAND:
      if (callbackQuery.message) {
        await ready(bot, callbackQuery.message.chat.id);
      }
  }
});
