import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../common/models';
import { WorkspaceError } from './workspace-error.entity';
import { WorkspaceStatus } from './workspace-status.enum';

export class Workspace extends BaseEntity {
  @ApiProperty()
  jsCode: string;

  @ApiProperty({ enum: [WorkspaceStatus.failed, WorkspaceStatus.valid, WorkspaceStatus.pending]})
  status: WorkspaceStatus;

  @ApiProperty()
  error: WorkspaceError;
}