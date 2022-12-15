import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserInterface } from 'src/interfaces/user.interface';
import { PersonModel } from 'src/models/person.model';
import { AuthInterface } from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly jwtService: JwtService) {}

  async checkUserPassword(id: number, password: string): Promise<void> {
    try {
      const user = await PersonModel.findOneOrFail({
        where: { id },
        select: ['password'],
      });
      console.log(user)
      const rightPassword = await bcrypt.compare(password, user.password);
    //   const rightPassword = password === user.password;
      if (!user || !rightPassword) {
        throw new UnauthorizedException('Estas credenciais estão incorretas.');
      }
    } catch (error) {
      throw error;
    }
  }

  async signToken(user: UserInterface): Promise<string> {
    const { id, name, email } = user;

    const payload: AuthInterface = {
      id,
      name,
      email,
    };

    return this.jwtService.sign(payload);
  }

  @Post('login')
  async login(
    @Body()
    data: {
      email: string;
      password: string;
      roleId: number;
      unitId: number;
    },
  ): Promise<{ user: UserInterface; accessToken: string; id: number }> {
    try {
      const { email, password, roleId, unitId } = data;

      const user = await PersonModel.findOne({
        where: {
          email,
        },
      });

      await this.checkUserPassword(user.id, password);

      const accessToken = await this.signToken(user);

      return { user, accessToken, id: user.id };
    } catch (error) {
      throw error;
    }
  }
}
