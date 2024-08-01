import { Document } from "mongodb";
export interface Jogador extends Document{
    _id:string
    readonly telefone:string;
    readonly email: string;
    nome:string;
    ranking:string;
    posicaoRanking:number;
    urlFotoJogador: string;
}