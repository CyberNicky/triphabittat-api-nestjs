import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonModel } from 'src/models/person.model';
import { PersonSchema } from 'src/schema/person.schema';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Hash } from 'crypto';


@Controller('user')
export class PersonController {
  constructor(
    @InjectRepository(PersonModel) private model: Repository<PersonModel>,
  ) {}
  @Post('register')
  public async create(
    @Body() body: PersonSchema,
  ): Promise<PersonModel> {
    body.password = bcrypt.hashSync(body.password, 10)
    return this.model.save(body);
  }

  @Get(':id')
  public async getOne(@Param('id') id:number): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id }});
    if (!person){
        throw new NotFoundException(`Não achei uma pessoa com ID solicitado. ${id}`);
    }
    return person;
  }
  @Get()
  public async getAll(): Promise<PersonModel[]> {
    return this.model.find();
  }
  @Put(':id')
  public async update(
    @Param('id') id:number, 
    @Body() body: PersonSchema,
    ): Promise<PersonModel> {
    const person = await this.model.findOne({ where: { id }});
    if (!person){
        throw new NotFoundException(`Não achei uma pessoa com ID solicitado. ${id}`);
    }
    await this.model.update({id}, body);
    return await this.model.findOne({ where: { id } });
  }
  @Delete(':id')
  public async delete(@Param('id') id:number,
  ): Promise<string> {
    const person = await this.model.findOne({ where: { id } });
    if (!person){
        throw new NotFoundException(`Não achei uma pessoa com ID solicitado. ${id}`);
    }
    this.model.delete(id);
    return `Deletado com sucesso. ${id}`;
  }
}
