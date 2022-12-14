import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DestinoModel } from './models/destino.models';
import { PersonModel } from './models/person.model';
import { DestinoModule } from './modules/destino.modules';
import { PersonModule } from './modules/person.modules';


@Module({
  imports: [PersonModule, DestinoModule, DestinoModel, TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    entities: [PersonModel, DestinoModel],
    synchronize: true,
  }),
],
})

export class AppModule {}
