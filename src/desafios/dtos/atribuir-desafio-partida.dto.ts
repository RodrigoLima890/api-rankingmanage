import { IsNotEmpty } from "class-validator";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { Resultado } from "../interfaces/desafios.interface";

export class AtribuirDesafioPartidaDto{
    
    @IsNotEmpty()
    def:string

    @IsNotEmpty()
    resultado: Array<Resultado>
}