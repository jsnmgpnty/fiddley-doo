import { Controller, Get, Delete, Put, Query, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { Workspace } from '../models/workspace.entity';
import { WorkspaceService } from '../services/workspace.service';
import { EntityMetadata, ErrorInfo } from '../../common/models';
import { BaseController } from '../../common/controller/base.controller';

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
    return super.find(queryString);
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
    return super.findOne(queryString);
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
  async update(@Body() model: Workspace, @Param('id') id: string): Promise<EntityMetadata<Workspace>> {
    return super.update(model, id);
  }

  @Delete(':id')
  @ApiResponse({ type: Boolean, status: 200 })
  @ApiResponse({ type: ErrorInfo, status: 500 })
  @ApiOperation({ operationId: 'delete' })
  async delete(@Param('id') id: string): Promise<EntityMetadata<boolean>> {
    return super.delete(id);
  }
}
