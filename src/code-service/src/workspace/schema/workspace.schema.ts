import { Model, model } from 'mongoose';
import { BaseEntitySchemaOptions, BaseEntitySchema, BaseEntityHooks } from '../../common/schema/base-entity.schema';
import { extendSchema } from '../../common/models';
import { Workspace } from '../models/workspace.entity';

const WorkspaceSchema = extendSchema(
  BaseEntitySchema,
  {
    jsCode: String,
    status: String,
    error: {
      message: String,
    },
  },
  BaseEntitySchemaOptions,
  BaseEntityHooks,
);

const WorkspaceSchemaModel: Model<Workspace> = model<Workspace>('Workspace', WorkspaceSchema);

export { WorkspaceSchema, WorkspaceSchemaModel };
