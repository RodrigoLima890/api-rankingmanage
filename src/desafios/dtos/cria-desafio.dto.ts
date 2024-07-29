import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsDateString, IsNotEmpty } from "class-validator";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export class CriaDesafioDto{
    @IsDateString()
    @IsNotEmpty()
    dataHoraDesafio:Date;

    @IsNotEmpty()
    solicitante:Jogador;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    jogadores:Array<Jogador>;
}