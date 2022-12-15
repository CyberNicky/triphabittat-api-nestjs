import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationController } from './authentication.controller';


import { JwtStrategy } from 'src/providers/authentication/jwt.strategy';
import { PersonModel } from 'src/models/person.model';
import { PersonModule } from 'src/modules/person.modules';

@Module({
  imports: [
    forwardRef(() => PersonModule),
    TypeOrmModule.forFeature([PersonModel]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: {
        expiresIn: '1d',
        algorithm: 'HS384',
      },
      verifyOptions: {
        algorithms: ['HS384'],
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [JwtStrategy],
  exports: [TypeOrmModule, JwtModule],
})
export class AuthenticationModule {}