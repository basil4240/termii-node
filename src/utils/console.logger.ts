import { Logger } from "../types";

export class ConsoleLogger implements Logger {
  debug(message: string, ...args: any[]) {
    console.debug(message, ...args);
  }
  info(message: string, ...args: any[]) {
    console.info(message, ...args);
  }
  warn(message: string, ...args: any[]) {
    console.warn(message, ...args);
  }
  error(message: string, ...args: any[]) {
    console.error(message, ...args);
  }
}
