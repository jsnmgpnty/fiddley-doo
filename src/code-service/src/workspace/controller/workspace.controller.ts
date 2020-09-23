import { Controller, Get, Delete, Put, Query, Post, Body, Param, ParseBoolPipe } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Workspace } from '../models/workspace.entity';
import { WorkspaceService } from '../services/workspace.service';
import { BaseErrors, EntityMetadata, ErrorInfo } from '../../common/models';
import { BaseController } from '../../common/controller/base.controller';
import { WorkspaceStatus } from '../../workspace/models/workspace-status.enum';

@ApiTags('Workspace')
@Controller('workspace')
export class WorkspaceController extends BaseController<Workspace, WorkspaceService> {
  constructor (private readonly svc: WorkspaceService) {
    super(svc);
  }

  @Get()
  @ApiResponse({ type: Workspace, status: 200, isArray: true })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'find' })
  @ApiQuery({ name: 'query', required: false, type: String })
  async find(@Query('query') queryString?: string): Promise<EntityMetadata<Workspace[]>> {
    if (!queryString) return await this.service.find({ status: { $ne: WorkspaceStatus.pending } }, null);
    const query = JSON.parse(decodeURIComponent(queryString));
    if (!query) return this.sendErrorResponse(new ErrorInfo(BaseErrors.InvalidArguments, null, 500));
    query.filter = { ...query.filter, status: { $ne: WorkspaceStatus.pending } };
    return await this.service.find(query.filter, query.options, query.sort, query.skip, query.take);
  }

  @Get(':id')
  @ApiResponse({ type: Workspace, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findById' })
  async findById(@Param('id') id: string): Promise<EntityMetadata<Workspace>> {
    return super.findById(id);
  }

  @Get('single')
  @ApiResponse({ type: Workspace, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'findOne' })
  async findOne(@Query('query') queryString: string): Promise<EntityMetadata<Workspace>> {
    const query = JSON.parse(decodeURIComponent(queryString));
    if (!query) return this.sendErrorResponse(new ErrorInfo(BaseErrors.InvalidArguments, null, 500));
    query.filter = { ...query.filter, status: { $ne: WorkspaceStatus.pending } };
    return await this.service.findOne(query.filter);
  }

  @Post()
  @ApiResponse({ type: Workspace, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'create' })
  async create(@Body() model: Workspace): Promise<EntityMetadata<Workspace>> {
    return super.create(model);
  }

  @Put(':id')
  @ApiResponse({ type: Workspace, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'update' })
  async updateItem(
    @Body() model: Workspace,
    @Param('id') id: string,
    @Query('queue', ParseBoolPipe) queue: boolean = true,
  ): Promise<EntityMetadata<Workspace>> {
    const res = await super.update(model, id);
    if (res && res.data && queue) this.svc.sendToQueue(res.data);
    return res;
  }

  @Delete(':id')
  @ApiResponse({ type: Boolean, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'delete' })
  async delete(@Param('id') id: string): Promise<EntityMetadata<boolean>> {
    return super.delete(id);
  }
}
