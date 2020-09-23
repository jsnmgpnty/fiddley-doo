import { Injectable } from '@nestjs/common';
import { isNil } from 'lodash';
import * as _eval from 'eval'
import { Workspace } from '../models/workspace.entity';
import { LoggerService } from '../../logging/logger.service';
import { OpenApiService } from '../../open-api-connector';
import { BaseWorker } from './base.worker';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { WorkspaceStatus } from '../models/workspace-status.enum';

@Injectable()
export class ProcessorService extends BaseWorker {
  constructor (loggerService: LoggerService, private openApiService: OpenApiService) {
    super(loggerService);
  }

  @RabbitSubscribe({
    exchange: 'fiddleydo.exchange',
    routingKey: '',
    queue: 'fiddleydo.events.processcode',
  })
  async processCode (msg: Workspace) {
    if (!msg) {
      this.log('error', 'failed to process message - payload is null', 'processCode');
      return;
    }

    if (!msg.jsCode) {
      this.log('error', 'failed to process code - jsCode is null or empty', 'processCode');
      return;
    }

    try {
      const res = _eval(`try { ${msg.jsCode}; module.exports = null; } catch (err) { module.exports = err; }`);
      if (isNil(res)) {
        msg.status = WorkspaceStatus.valid;
        msg.error = null;
      } else {
        msg.status = WorkspaceStatus.failed;
        msg.error = { message: res.message, stack: res.stack };
      }
    } catch (error) {
      msg.status = WorkspaceStatus.failed;
      msg.error = { message: error.message, stack: error.stack };
    }

    const req = { id: msg.id, model: msg, queue: false };
    const updateResult = await this.openApiService['CodeService']['Workspace'].update(req);
    if (!updateResult) {
      this.log('error', 'failed to update status', 'processCode');
    }
  }
}
