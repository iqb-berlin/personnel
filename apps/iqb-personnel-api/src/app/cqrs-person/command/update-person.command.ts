import { UpdatePersonDto } from '@personnel/iqb-personnel-dtos';

export class UpdatePersonCommand {
  constructor(
    public readonly id: string,
    public readonly updatePersonDto: UpdatePersonDto
  ) {
  }
}
