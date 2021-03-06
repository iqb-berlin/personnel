import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreatePersonDto, PersonDto, UpdatePersonDto } from '@personnel/iqb-personnel-dtos';
import { JwtAuthGuard } from '../authentication/guard/jwt-auth.guard';
import { PersonService } from './person.service';

@UseGuards(JwtAuthGuard)
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {
  }

  @Get()
  async findAll(): Promise<PersonDto[]> {
    return await this.personService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PersonDto> {
    return await this.personService.findById(id);
  }

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto): Promise<PersonDto> {
    return await this.personService.create(createPersonDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto
  ): Promise<PersonDto> {
    return await this.personService.update(id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PersonDto> {
    return await this.personService.remove(id);
  }
}
