import { ApiProperty } from "@nestjs/swagger";

export class WorkspaceError {
  @ApiProperty()
  message: string;

  @ApiProperty()
  stack: string;
} 