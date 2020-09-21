import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../common/services/base.service';
import { Workspace } from '../models/workspace.entity';
import { LoggerService } from '../../logging/logger.service';
import { BaseErrors, EntityMetadata } from 'src/common/models';
import { PublisherService } from 'src/messaging';
import { WorkspaceStatus } from '../models/workspace-status.enum';

@Injectable()
export class WorkspaceService extends BaseService<Workspace>{
  constructor(
    @InjectModel(Workspace.name) model: Model<Workspace>,
    loggerService: LoggerService,
    private publisherService: PublisherService,
  ) {
    super(model, loggerService);
  }

  public async create(item: Workspace): Promise<EntityMetadata<Workspace>> {
    item.status = WorkspaceStatus.pending;
    const result = await super.create(item);
    if (!result) {
      return this.getErrorEntityMetadata(
        BaseErrors.FailedToCreateResource,
        `WorkspaceService.create | failed to create resource`,
      );
    }

    this.publisherService.sendToQueue('fiddleydo.events.processcode', result);
    return result;
  }

  public async update(id: string, item: Workspace): Promise<EntityMetadata<Workspace>> {
    const result = await super.update(id, item);
    if (!result) {
      return this.getErrorEntityMetadata(
        BaseErrors.FailedToUpdateResource,
        `WorkspaceService.update | failed to update resource`,
      );
    }

    this.publisherService.sendToQueue('fiddleydo.events.processcode', result);
    return result;
  }
}
