import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindPersonByIdQuery } from './find-person-by-id.query';
import { CqrsPersonService } from '../cqrs-person.service';
import { PersonDto } from '@personnel/iqb-personnel-dtos';
import * as clc from 'cli-color';

@QueryHandler(FindPersonByIdQuery)
export class FindPersonByIdQueryHandler implements IQueryHandler<FindPersonByIdQuery> {
  constructor(private readonly service: CqrsPersonService) {
  }

  execute(query: FindPersonByIdQuery): Promise<PersonDto> {
    console.log(clc.yellowBright('Async FindPersonByIdQuery...'));

    return this.service.findById(query.id);
  }
}
