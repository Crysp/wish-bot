import TelegramBot from 'node-telegram-bot-api';

export default async function help(bot: TelegramBot, chatId: number) {
  console.log('Requested help for', chatId);
  return;
}
