import { UpdatePersonDto } from '@personnel/iqb-personnel-dtos';

export class UpdatePersonEvent {
  constructor(
    public readonly id: string,
    public readonly updatePersonDto: UpdatePersonDto
  ) {
  }
}
