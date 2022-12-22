// @ts-ignore
import config from '../config.json';

type MessageWithButton = { text: string; button: string };
type SimpleMessage = { text: string };
type MessageWithImage = { image?: string; text: string };
type Actions = { one_more_wish: { text: string }; finish: { text: string } };

export const BOT_TOKEN = config.bot_token;

export const BEGIN_COMMAND = 'begin';

export const welcomeMessage: MessageWithButton = config.welcome;
export const afterStartMessage: SimpleMessage = config.after_start_message;
export const startNotificationMessage: MessageWithButton =
  config.start_notification;
export const rulesMessage: SimpleMessage = config.rules;
export const replyVariants: MessageWithImage[] = config.wishes;
export const actions: Actions = config.reply_shortcut;
export const oneMoreWishReply: SimpleMessage = config.one_more_wish_reply;
export const finishMessage: SimpleMessage = config.finish_message;
export const finishVideos: string[] = config.finish_videos;
