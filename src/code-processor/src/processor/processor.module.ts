import { Module, DynamicModule } from '@nestjs/common';
import { ProcessorService } from './services/processor.service';
import { CommonModule } from '../common/common.module';

@Module({ })
export class ProcessorModule {
  static register(): DynamicModule {
    return {
      module: ProcessorModule,
      imports: [CommonModule.register()],
      providers: [ProcessorService],
    };
  }
}
