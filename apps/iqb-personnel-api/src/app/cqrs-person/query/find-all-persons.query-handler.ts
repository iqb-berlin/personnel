import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PersonDto } from '@personnel/iqb-personnel-dtos';
import * as clc from 'cli-color';
import { FindAllPersonsQuery } from './find-all-persons.query';
import { CqrsPersonService } from '../cqrs-person.service';

@QueryHandler(FindAllPersonsQuery)
export class FindAllPersonsQueryHandler implements IQueryHandler<FindAllPersonsQuery> {
  constructor(private readonly service: CqrsPersonService) {
  }

  execute(query: FindAllPersonsQuery): Promise<PersonDto[]> {
    console.log(clc.yellowBright('Async FindAllPersonsQuery...'));

    return this.service.findAll();
  }
}
