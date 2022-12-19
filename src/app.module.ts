import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvaliacaoModel } from './models/avaliacao.models';
import { DestinoModel } from './models/destino.models';
import { PersonModel } from './models/person.model';
import { DestinoModule } from './modules/destino.modules';
import { PersonModule } from './modules/person.modules';
import { AvaliacaoModule } from './modules/avaliacao.modules';
import { AuthenticationModule } from './authentication/authentication.module';


@Module({
  imports: [PersonModule, DestinoModule, DestinoModel,AvaliacaoModel, AvaliacaoModule, AuthenticationModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'triphabitat',
    entities: [PersonModel, DestinoModel, AvaliacaoModel],
    synchronize: true,
  }),
],
})

export class AppModule {}
