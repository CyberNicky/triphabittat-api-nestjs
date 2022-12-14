import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { DestinoController } from "src/controllers/destino.controllers";
import { DestinoModel } from "src/models/destino.models";


@Module({
    imports: [TypeOrmModule.forFeature([DestinoModel])],
    controllers: [DestinoController],
})

export class DestinoModule {}