import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CriarJogadorDTO{
    constructor(){

    }
    @IsString()
    @IsNotEmpty()
    readonly telefone:string;

    @IsEmail()
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    readonly nome:string;

}