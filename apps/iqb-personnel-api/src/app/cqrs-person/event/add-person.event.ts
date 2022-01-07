import { CreatePersonDto } from '@personnel/iqb-personnel-dtos';

export class AddPersonEvent {
  constructor(
    public readonly createPersonDto: CreatePersonDto
  ) {
  }
}
