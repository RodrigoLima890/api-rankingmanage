import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";
import { StatusDesafio } from "../enums/status-desafio.enum";

export class AtualizarDesafioDto{
    @IsDateString()
    @IsOptional()
    dataHoraDesafio:Date

    @IsOptional()
    status:StatusDesafio
}