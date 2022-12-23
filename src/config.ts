// @ts-ignore
import config from '../config.json';

type MessageWithButton = { text: string; button: string };
type SimpleMessage = { text: string };
type Actions = { one_more_wish: { text: string } };

export const BOT_TOKEN = config.bot_token;

export const BEGIN_COMMAND = 'begin';
export const ONE_MORE_WISH_COMMAND = 'one_more_wish';

export const USER_WISH_MINIMUM_WORDS = config.user_wish_minimum_words;
export const GOOGLE_SHEETS_DOC_ID = config.google_sheets_doc_id;

export const welcomeMessage: MessageWithButton = config.welcome;
export const afterStartMessage: SimpleMessage = config.after_start_message;
export const startNotificationMessage: MessageWithButton =
  config.start_notification;
export const rulesMessage: SimpleMessage = config.rules;
export const actions: Actions = config.reply_shortcut;
export const oneMoreWishReply: SimpleMessage = config.one_more_wish_reply;
export const replyMessage: SimpleMessage = config.reply_message;
export const replyShortMessage: SimpleMessage = config.reply_short_message;
export const replyVideos: string[] = config.reply_videos;
export const moreThanOneWishFareWell: SimpleMessage =
  config.more_that_one_wish_farewell;
