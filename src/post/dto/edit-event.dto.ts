import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import {CreateEventDto} from "./create-event.dto";

export class EditEventDto extends CreateEventDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
