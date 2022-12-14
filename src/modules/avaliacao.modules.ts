import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { AvaliacaoController } from "src/controllers/avaliacao.controllers";
import { AvaliacaoModel } from "src/models/avaliacao.models";
@Module({
    imports: [TypeOrmModule.forFeature([AvaliacaoModel])],
    controllers: [AvaliacaoController],
})

export class AvaliacaoModule {}