import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { FilterEventDto } from './dto/filter-event.dto';
import { EventEntity } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { EditEventDto } from './dto/edit-event.dto';
import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/dto/user.dto';
import { prepareUser } from '../shared/utilities/prepare-user';
import { ListOfDto } from '../shared/dtos/list-of.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventRepository)
    private readonly postRepository: EventRepository,
  ) {}

  async getList(
    filterPostDto?: FilterEventDto,
  ): Promise<ListOfDto<EventEntity>> {
    try {
      const [posts, postCount] = await this.postRepository.findAndCount(
        filterPostDto,
      );

      return {
        list: posts,
        totalElements: postCount,
      };
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }
  }

  async get(id: number): Promise<EventEntity> {
    try {
      return await this.postRepository.findOne(id);
    } catch (ex) {
      throw new NotFoundException(ex);
    }
  }

  async create(
    createPostDto: CreateEventDto,
    userDto: UserDto,
  ): Promise<EventEntity> {
    const newPost: EventEntity = new EventEntity();
    const user: UserEntity = prepareUser(userDto);
    const { title, imageUrl, start, end } = createPostDto;

    newPost.title = title;
    if (imageUrl) {
      newPost.imageUrl = imageUrl;
    }
    newPost.start = start;
    newPost.end = end;

    newPost.user = user;

    try {
      await newPost.save();
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return newPost;
  }

  async update(
    id: number,
    editPostDto: EditEventDto,
    userId: number,
  ): Promise<EventEntity> {
    const post: EventEntity = await this.get(id);

    if (post.user.id !== userId)
      throw new ConflictException({
        data: null,
        result: 'You can not modify a event made by someone else!',
      });

    const { title, imageUrl, start, end } = editPostDto;

    post.title = title;
    post.imageUrl = imageUrl;
    post.start = start;
    post.end = end;

    try {
      await post.save();
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return post;
  }

  async delete(id: number, userId: number): Promise<EventEntity> {
    const foundPost: EventEntity = await this.get(id);

    if (foundPost.user.id !== userId)
      throw new ConflictException({
        data: null,
        result: 'You can not delete event made by someone else!',
      });

    try {
      await this.postRepository.remove(foundPost);
    } catch (ex) {
      throw new InternalServerErrorException(ex);
    }

    return foundPost;
  }
}
