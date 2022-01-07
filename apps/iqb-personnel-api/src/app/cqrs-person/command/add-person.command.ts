import { CreatePersonDto } from '@personnel/iqb-personnel-dtos';

export class AddPersonCommand {
  constructor(public readonly createPersonDto: CreatePersonDto) {
  }
}
