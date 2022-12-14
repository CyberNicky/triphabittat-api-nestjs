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
import { PersonModel } from 'src/models/person.model';
import { DestinoModel } from 'src/models/destino.models';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(
    @InjectRepository(AvaliacaoModel) private model: Repository<AvaliacaoModel>,
  ) {}
  @Post()
  public async create(@Body() body: AvaliacaoSchema): Promise<AvaliacaoModel> {
    const userExists = await PersonModel.findOneBy({id:  body.id_user});
    if (!userExists) {
      throw new NotFoundException(
        `Não achei um usuário com ID solicitado. ${body.id_user}`,
      );
    }
    
    const destinoExists = await DestinoModel.findOneBy({id: body.id_destino})
    if (!destinoExists){
      throw new NotFoundException(
        `Não achei um destino com ID solicitado. ${body.id_destino}`,
      );
    }
    // validar se o conteudo da avaliação tem um tamanho mínimo de caracteres
    // desconsiderando os espaços
    if ( body.conteudo.replace(/\s/g, '').length < 4) {
      throw new NotFoundException(
      `Caracters insuficientes. ${body.conteudo}`,
    );
  }

    return this.model.save(body);
  }

  @Get(':id')
  public async getOne(@Param('id') id: number): Promise<AvaliacaoModel> {
    const avaliacao = await this.model.findOne({ where: { id } });
    if (!avaliacao) {
      throw new NotFoundException(
        `Não achei um avaliacao com ID solicitado. ${id}`,
      );
    }
    return avaliacao;
  }
  @Get()
  public async getAll(): Promise<AvaliacaoModel[]> {
    return this.model.find();
  }
  @Put(':id')
  public async update(
    @Param('id') id: number,
    @Body() body: AvaliacaoSchema,
  ): Promise<AvaliacaoModel> {
    const avaliacao = await this.model.findOne({ where: { id } });
    if (!avaliacao) {
      throw new NotFoundException(
        `Não achei uma avaliação com ID solicitado. ${id}`,
      );
    }
    await this.model.update({ id }, body);
    return await this.model.findOne({ where: { id } });
  }
  @Delete(':id')
  public async delete(@Param('id') id: number): Promise<string> {
    const avaliacao = await this.model.findOne({ where: { id } });
    if (!avaliacao) {
      throw new NotFoundException(
        `Não achei uma avaliação com ID solicitado. ${id}`,
      );
    }
    this.model.delete(id);
    return `Deletado com sucesso. ${id}`;
  }
}
