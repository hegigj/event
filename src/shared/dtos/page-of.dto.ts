import { ApiProperty } from '@nestjs/swagger';
import { ListOfDto } from './list-of.dto';

export class PageOfDto<MODEL> extends ListOfDto<MODEL> {
  @ApiProperty()
  pageNo: number;

  @ApiProperty()
  pageSize: number;
}
