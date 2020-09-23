
import { MessagingOptions } from './messaging';
import { OpenApiOptions } from './open-api-connector';

export interface ElasticSearchOptions {
  url: string;
  index: string;
}

export interface SwaggerOptions {
  title: string;
  description: string;
  version: string;
}

export interface DatabaseOptions {
  connectionString: string;
}

export interface ConfigOptions {
  appName: string;
  appPort: number;
  messaging?: MessagingOptions;
  swagger?: SwaggerOptions;
  elasticSearch?: ElasticSearchOptions;
  openApi?: OpenApiOptions
}
