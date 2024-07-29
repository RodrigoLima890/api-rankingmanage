import { Jogador } from "src/jogadores/interfaces/jogador.interface";
import { StatusDesafio } from "../enums/status-desafio.enum";

export interface DesafiosInterface extends Document{
    dataHoraDesafio:Date;
    status:StatusDesafio;
    dataHoraSolicitacao:Date;
    dataHoraResposta:Date;
    solicitante:Jogador;
    categoria:string;
    jogadores: Array<Jogador>;
    partida:Partida
}

interface Partida extends Document{
    categoria:string,
    jogadores:Array<Jogador>;
    def:Jogador;
    resultados:Array<Resultado>
}

interface Resultado{
    set:string
}
