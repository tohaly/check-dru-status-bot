import { logger } from './logger.js';

export class Scheduler {
  public name: string;
  public time: {
    hours: number;
    minutes: number;
  };
  public callback: () => void;

  constructor(name: string, time: string, callback: () => void) {
    this.name = name;
    this.time = this.splitTime(time);
    this.callback = callback;
  }

  private splitTime(time): { hours: number; minutes: number } {
    const [hours, minutes] = time.split(':');
    return { hours: Number(hours), minutes: Number(minutes) };
  }

  private getCurrentDateWithScheduleTime(): number {
    const { hours, minutes } = this.time;

    const currentDateWithSchedulerTime = new Date();
    currentDateWithSchedulerTime.setHours(hours, minutes);

    return currentDateWithSchedulerTime.valueOf();
  }

  private getTimeout(): number {
    const { hours, minutes } = this.time;

    const currentTimeMs = new Date().valueOf();
    const scheduleTimeMs = this.getCurrentDateWithScheduleTime();
    const isNextDay = currentTimeMs >= scheduleTimeMs;

    const nextTargetTime = new Date();
    if (isNextDay) {
      nextTargetTime.setDate(nextTargetTime.getDate() + 1);
    }
    nextTargetTime.setHours(hours, minutes);

    return nextTargetTime.valueOf() - currentTimeMs;
  }

  public schedule(): void {
    const timeOutMs = this.getTimeout();

    logger.info(
      `planed new event at ${this.time.hours}:${this.time.minutes}, ms to event: ${timeOutMs}`,
    );

    setTimeout(() => {
      this.callback && this.callback();
      this.schedule();

      logger.info(`event success done and planed on next day`);
    }, timeOutMs);
  }
}
