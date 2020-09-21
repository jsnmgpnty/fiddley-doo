import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkspaceController } from './controller/workspace.controller';
import { WorkspaceSchema } from './schema/workspace.schema';
import { Workspace } from './models/workspace.entity';
import { WorkspaceService } from './services/workspace.service';
import { CommonModule } from '../common/common.module';

@Module({ })
export class WorkspaceModule {
  static register(): DynamicModule {
    return {
      module: WorkspaceModule,
      imports: [
        MongooseModule.forFeature([{ name: Workspace.name, schema: WorkspaceSchema }]),
        CommonModule.register(),
      ],
      controllers: [WorkspaceController],
      providers: [WorkspaceService],
    };
  }
}
