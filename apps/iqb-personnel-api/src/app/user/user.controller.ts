import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto } from '@personnel/iqb-personnel-dtos';
import { UserService } from '../user/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return await this.userService.findAll();
  }

  @Get('/id/:id')
  async findById(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.findById(id);
  }

  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<UserDto> {
    return await this.userService.findByName(name);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.userService.create(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserDto> {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserDto> {
    return await this.userService.remove(id);
  }
}
