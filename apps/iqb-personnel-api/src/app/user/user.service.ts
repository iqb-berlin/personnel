import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto, UserDto } from '@personnel/iqb-personnel-dtos';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {
  }

  private static mapToDto(
    user: HydratedDocument<UserDocument, unknown, unknown>
  ): UserDto {
    return user
      ? {
        id: user._id,
        name: user.name,
        password: user.password
      }
      : null;
  }

  async findAll(): Promise<UserDto[]> {
    return (await this.userModel.find().exec())
      .map((result) => UserService.mapToDto(result));
  }

  async findById(id: string): Promise<UserDto> {
    const readUser = await this.userModel.findById(id);
    return UserService.mapToDto(readUser);
  }

  async findByName(username: string): Promise<UserDto | undefined> {
    const foundUsers = (await this.userModel.find().where('name').equals(username).exec())
      .map((result) => UserService.mapToDto(result));

    if (foundUsers.length > 1) {
      console.error(`More than one user with name ${username} exists!`);
      return;
    }

    return foundUsers[0];
  }

  async create(createUserDto: CreateUserDto): Promise<UserDto | undefined> {
    const existingUser: UserDto = await this.findByName(createUserDto.name);
    if (existingUser) {
      console.error(`User ${createUserDto.name} already exists!`);
      return;
    }
    const createdUser = await this.userModel.create(createUserDto);
    return UserService.mapToDto(createdUser);
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto
    );
    return UserService.mapToDto(updatedUser);
  }

  async remove(id: string): Promise<UserDto> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    return UserService.mapToDto(deletedUser);
  }
}
