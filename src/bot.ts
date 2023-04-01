import TelegramBot from 'node-telegram-bot-api';
import { config } from 'dotenv';
config();

const token = process.env.TELEGRAM_TOKEN

export const bot = new TelegramBot(token);
