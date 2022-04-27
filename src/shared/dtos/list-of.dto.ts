import { ApiProperty } from '@nestjs/swagger';

export class ListOfDto<MODEL> {
  @ApiProperty()
  list: MODEL[];

  @ApiProperty()
  totalElements: number;
}
