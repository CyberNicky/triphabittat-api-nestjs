import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonModel } from './models/person.model';
import { PersonModule } from './modules/person.modules';

@Module({
  imports: [PersonModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '',
    database: 'test',
    entities: [PersonModel],
    synchronize: true,
  }),
],
})

export class AppModule {}
