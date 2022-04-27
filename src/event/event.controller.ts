import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Headers,
  NotImplementedException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FilterEventDto } from './dto/filter-event.dto';
import { EventService } from './event.service';
import { ResponseDto } from '../shared/dtos/response.dto';
import { PageOfDto } from '../shared/dtos/page-of.dto';
import { EventEntity } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EditEventDto } from './dto/edit-event.dto';
import { RoleGuard } from '../shared/guards/role.guard';
import { UserRole } from '../shared/enums/user-role.enum';
import { UserDto } from '../user/dto/user.dto';
import { LoggedUser } from '../user/logged-users';
import { ApiBody, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ApiCustomResponse } from '../shared/decorators/api-custom-response';
import { ApiCustomPaginatedResponse } from '../shared/decorators/api-custom-paginated-response';
import { UserEntity } from '../user/user.entity';
import { ListOfDto } from '../shared/dtos/list-of.dto';

@ApiTags('Event')
@ApiExtraModels(ResponseDto, PageOfDto, EventEntity)
@Controller('event')
export class EventController {
  constructor(private readonly postService: EventService) {}

  @Get()
  @ApiCustomPaginatedResponse(EventEntity)
  async getList(
    @Query() filterPostDto: FilterEventDto,
  ): Promise<ResponseDto<ListOfDto<EventEntity>>> {
    const listOfEvents: ListOfDto<EventEntity> = await this.postService.getList(
      filterPostDto,
    );

    return {
      data: listOfEvents,
      result: null,
    };
  }

  @Get(':id')
  @ApiCustomResponse(EventEntity)
  async get(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<EventEntity>> {
    const post: EventEntity = await this.postService.get(id);

    return {
      data: post,
      result: null,
    };
  }

  @Post()
  @UseGuards(new RoleGuard(UserRole.USER))
  @ApiBody({ type: CreateEventDto })
  @ApiCustomResponse(EventEntity)
  async add(
    @Headers('authorization') token: string,
    @Body() createPostDto: CreateEventDto,
  ): Promise<ResponseDto<EventEntity>> {
    const user: UserDto = LoggedUser.getUser(token);

    const newPost: EventEntity = await this.postService.create(
      createPostDto,
      user,
    );

    return {
      data: newPost,
      result: null,
    };
  }

  @Put(':id')
  @UseGuards(new RoleGuard(UserRole.USER))
  @ApiBody({ type: EventEntity })
  @ApiCustomResponse(EventEntity)
  async update(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() editPostDto: EditEventDto,
  ): Promise<ResponseDto<EventEntity>> {
    if (id !== editPostDto.id) throw new ConflictException();

    const user: UserDto = LoggedUser.getUser(token);

    const post: EventEntity = await this.postService.update(
      id,
      editPostDto,
      user.id,
    );

    return {
      data: post,
      result: null,
    };
  }

  @Delete(':id')
  @UseGuards(new RoleGuard(UserRole.USER))
  @ApiCustomResponse(EventEntity)
  async remove(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<EventEntity>> {
    const user: UserDto = LoggedUser.getUser(token);

    const post: EventEntity = await this.postService.delete(id, user.id);

    return {
      data: post,
      result: null,
    };
  }

  @Get(':id/bookings')
  @ApiCustomPaginatedResponse(UserEntity)
  async getCommentList(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<PageOfDto<UserEntity>>> {
    throw new NotImplementedException();
  }

  @Patch(':id/book')
  @UseGuards(new RoleGuard(UserRole.USER))
  @ApiCustomResponse(UserEntity)
  async addComment(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<UserEntity>> {
    const event: EventEntity = await this.postService.get(id);

    throw new NotImplementedException();
  }

  @Delete(':id/cancel')
  @UseGuards(new RoleGuard(UserRole.USER))
  @ApiCustomResponse(UserEntity)
  async removeComment(
    @Headers('authorization') token: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseDto<UserEntity>> {
    const event: EventEntity = await this.postService.get(id);
    throw new NotImplementedException();
  }
}
