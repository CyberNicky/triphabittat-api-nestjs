import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm/dist";
import { PersonController } from "src/controllers/person.controllers";
import { PersonModel } from "src/models/person.model";

@Module({
    imports: [TypeOrmModule.forFeature([PersonModel])],
    controllers: [PersonController],
})

export class PersonModule {}