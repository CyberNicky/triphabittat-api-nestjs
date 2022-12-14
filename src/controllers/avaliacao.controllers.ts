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
  import { AvaliacaoModel } from 'src/models/avaliacao.models';
  import { AvaliacaoSchema } from 'src/schema/avaliacao.schema';
  import { Repository } from 'typeorm';
  
  @Controller('avaliacao')
  export class AvaliacaoController {
    constructor(
      @InjectRepository(AvaliacaoModel) private model: Repository<AvaliacaoModel>,
      
    ) {}
    @Post()
    public async create(
      @Body() body: AvaliacaoSchema,
    ): Promise<AvaliacaoModel> {
      return this.model.save(body);
    }
  
    @Get(':id')
    public async getOne(@Param('id') id:number): Promise<AvaliacaoModel> {
      const avaliacao = await this.model.findOne({ where: { id }});
      if (!avaliacao){
          throw new NotFoundException(`Não achei um avaliacao com ID solicitado. ${id}`);
      }
      return avaliacao;
    }
    @Get()
    public async getAll(): Promise<AvaliacaoModel[]> {
      return this.model.find();
    }
    @Put(':id')
    public async update(
      @Param('id') id:number, 
      @Body() body: AvaliacaoSchema,
      ): Promise<AvaliacaoModel> {
      const avaliacao = await this.model.findOne({ where: { id }});
      if (!avaliacao){
          throw new NotFoundException(`Não achei uma avaliação com ID solicitado. ${id}`);
      }
      await this.model.update({id}, body);
      return await this.model.findOne({ where: { id } });
    }
    @Delete(':id')
    public async delete(@Param('id') id:number,
    ): Promise<string> {
      const avaliacao = await this.model.findOne({ where: { id } });
      if (!avaliacao){
          throw new NotFoundException(`Não achei uma avaliação com ID solicitado. ${id}`);
      }
      this.model.delete(id);
      return `Deletado com sucesso. ${id}`;
    }
  }