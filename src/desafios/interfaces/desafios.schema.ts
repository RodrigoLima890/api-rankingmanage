import mongoose from "mongoose";

export const DesafioSchema = new mongoose.Schema(
    {
        dataHoraDesafio:{type:Date},
        status: {type:String},
        dataHoraSolicitacao:{type:Date},
        dataHoraResposta:{type:Date},
        solicitante:{type:String},
        jogadores:
        [
            {
                type:mongoose.Schema.ObjectId,
                ref:'jogadores'
            }
        ],
        partida:
        [
            {
                type:mongoose.Schema.ObjectId,
                ref:'partidas'
            }
        ]

    },{timestamps:true, collection:'desafios'}
)
