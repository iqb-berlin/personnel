import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  readonly id!: string;

  @IsNotEmpty()
  readonly name!: string;

  @IsNotEmpty()
  readonly password!: string;
}
