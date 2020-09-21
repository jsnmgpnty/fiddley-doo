import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagingModule } from '../messaging/messaging.module';
import { LoggingModule } from '../logging';
import { ConfigOptions } from '../config-options';
import { WorkspaceModule } from '../workspace/workspace.module';

@Module({})
export class AppModule {
  static register(config: ConfigOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        MongooseModule.forRoot(config.database.connectionString),
        LoggingModule.register({ elasticSearch: config.elasticSearch, appName: config.appName }),
        MessagingModule.register(config.messaging),
        WorkspaceModule.register(),
      ],
    };
  }
}
