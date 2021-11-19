import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PersonDto {
  @IsNotEmpty()
  readonly id!: string;

  @IsNotEmpty()
  readonly forename!: string;

  @IsNotEmpty()
  readonly surname!: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  readonly birthday!: Date;
}
