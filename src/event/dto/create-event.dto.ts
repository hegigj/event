import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  start: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  end: string;
}
