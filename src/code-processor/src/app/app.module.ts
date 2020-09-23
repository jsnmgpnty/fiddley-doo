import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagingModule } from '../messaging/messaging.module';
import { OpenApiConnectorModule } from '../open-api-connector';
import { LoggingModule } from '../logging';
import { ConfigOptions } from '../config-options';
import { ProcessorModule } from '../processor/processor.module';

@Module({})
export class AppModule {
  static register(config: ConfigOptions): DynamicModule {
    return {
      module: AppModule,
      imports: [
        LoggingModule.register({ elasticSearch: config.elasticSearch, appName: config.appName }),
        MessagingModule.register(config.messaging),
        OpenApiConnectorModule.register(config.openApi),
        ProcessorModule.register(),
      ],
    };
  }
}
