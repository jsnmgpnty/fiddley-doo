import { NestFactory, NestApplication } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import setupStaticPage from './utils/setup-static';
import { resolve } from 'path';
import * as helmet from 'helmet';
import { AppModule } from './app/app.module';
import { getConfig } from './config-helper';
import { ConfigOptions } from './config-options';
import { LoggerService } from './logging';
require('dotenv').config();

async function bootstrap() {
  // configuration setup
  const config = getConfig() as ConfigOptions;

  // fastify app setup
  const app = await NestFactory.create<NestApplication>(
    AppModule.register(config),
    { logger: false },
  );
  app.useLogger(app.get(LoggerService));
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors();

  // open api setup
  const { title, description, version } = config.swagger;
  const options = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('explorer', app, document);

  // index.html setup
  setupStaticPage(app, resolve(__dirname, 'public', 'index.html'));

  await app.listen(config.appPort);
};

bootstrap();
