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
import { DestinoModel } from 'src/models/destino.models';
import { DestinoSchema } from 'src/schema/destino.schema';
import { Repository } from 'typeorm';

@Controller('destino')
export class DestinoController {
  constructor(
    @InjectRepository(DestinoModel) private model: Repository<DestinoModel>,
    
  ) {}
  @Post()
  public async create(
    @Body() body: DestinoSchema,
  ): Promise<DestinoModel> {
    return this.model.save(body);
  }

  @Get(':id')
  public async getOne(@Param('id') id:number): Promise<DestinoModel> {
    const destino = await this.model.findOne({ where: { id }});
    if (!destino){
        throw new NotFoundException(`Não achei um destino com ID solicitado. ${id}`);
    }
    return destino;
  }
  @Get()
  public async getAll(): Promise<DestinoModel[]> {
    return this.model.find();
  }
  @Put(':id')
  public async update(
    @Param('id') id:number, 
    @Body() body: DestinoSchema,
    ): Promise<DestinoModel> {
    const destino = await this.model.findOne({ where: { id }});
    if (!destino){
        throw new NotFoundException(`Não achei uma pessoa com ID solicitado. ${id}`);
    }
    await this.model.update({id}, body);
    return await this.model.findOne({ where: { id } });
  }
  @Delete(':id')
  public async delete(@Param('id') id:number,
  ): Promise<string> {
    const destino = await this.model.findOne({ where: { id } });
    if (!destino){
        throw new NotFoundException(`Não achei um destino com ID solicitado. ${id}`);
    }
    this.model.delete(id);
    return `Deletado com sucesso. ${id}`;
  }
}