import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { StatusDesafio } from "../enums/status-desafio.enum";

export interface Desafios extends Document{
    dataHoraDesafio:Date;
    status:StatusDesafio;
    dataHoraSolicitacao:Date;
    dataHoraResposta:Date;
    solicitante:Jogador;
    categoria:string;
    jogadores: Array<Jogador>;
    partida:Partida
}

export interface Partida extends Document{
    categoria:string,
    jogadores:Array<Jogador>;
    def:Jogador;
    resultados:Array<Resultado>
}

export interface Resultado{
    set:string
}
