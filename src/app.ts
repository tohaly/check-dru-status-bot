import { config } from 'dotenv';
config();


import { bot } from './bot.js';
import { Scheduler } from './sheduler.js';
import { getStatus } from './dertu.js';
import { logger } from './logger.js';

const { TARGET_CHATS_ID, MESSAGE_TIME } = process.env;

export const app = (): void => {
  const sendMessage = async (): Promise<void> => {
    const { err, data } = (await getStatus()) || {};

    if (err) {
      logger.error('send message problem');
      return;
    }

    let chatIdsArr: number[];
    try {
      chatIdsArr = JSON.parse(TARGET_CHATS_ID);
    } catch {
      logger.error('Chat id parse error');
    }

    chatIdsArr?.map((id) => {
      bot.sendMessage(
        id,
        `Привет!
На сегодняшний день статус по визе вот такой:
  - public: ${data.external};
  - private: ${data.internal}.`,
      );
    });

    logger.info('Message send success');
  };

  new Scheduler('check-status', MESSAGE_TIME, sendMessage).schedule();

  sendMessage()

  logger.info('app start');
};
