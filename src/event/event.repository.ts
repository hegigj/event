import {
  EntityRepository,
  Like,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { EventEntity } from './event.entity';
import { FilterEventDto } from './dto/filter-event.dto';
import {Query} from "@nestjs/common";

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {

    // @Query(value = "SELECT * FROM public.event WHERE userId = ?1", nativeQuery =  true)
    // EventEntity findEventByUserId(int userId)

  private async getPostAndSubEntities(): Promise<
    SelectQueryBuilder<EventEntity>
  > {
    return this.createQueryBuilder('event')
      .select([
        'event.id',
        'event.title',
        'event.start',
        'event.end',
        'event.status',
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'bookings.id',
        'bookings.firstName',
        'bookings.lastName',
        'bookings.email',
      ])
      .leftJoin('event.user', 'user')
      .leftJoin('event.bookings', 'bookings');
  }

  // @ts-ignore
  async findAndCount(
    options: FilterEventDto,
  ): Promise<[EventEntity[], number]> {
    const qb: SelectQueryBuilder<EventEntity> =
      await this.getPostAndSubEntities();

    const { start, end, title } = options;
    qb.where('event."start" BETWEEN :start AND :end', { start, end });

    if (title) {
      qb.where({
        title: Like(`%${title}%`),
      });
    }

    return qb.getManyAndCount();
  }

  // @ts-ignore
  async findOne(id: number): Promise<EventEntity | undefined> {
    const qb: SelectQueryBuilder<EventEntity> =
      await this.getPostAndSubEntities();
    qb.where({ id });

    return qb.getOne();
  }
}
