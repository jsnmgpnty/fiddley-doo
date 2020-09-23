import { Logger } from "@nestjs/common";

export class BaseWorker {
  constructor(protected logger: Logger) { }

  protected log(type: string, msg: string, method: string) {
    switch (type) {
      case 'error': {
        const err = new Error(`WaitListService.${method} | ${msg}`);
        this.logger.error(err.message, err.stack);
        break;
      }
      default: {
        this.logger.log(`WaitListService.${method} | ${msg}`);
        break;
      }
    }
  }
}