import { IsString, MaxLength, IsEmail } from 'class-validator';
export class PersonSchema {
    @IsString()
    @MaxLength(255)
    name: string;
    @IsString()
    @MaxLength(255)
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}