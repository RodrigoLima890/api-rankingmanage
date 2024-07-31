import mongoose from "mongoose";

export const PartidaSchame = new mongoose.Schema(
    {
        categoria: {type:String},
        jogadores :[{
            type:mongoose.Schema.ObjectId,
            ref: 'jogadores'
        }],
        def:{type:mongoose.Schema.ObjectId},
        resultado: [
            {
            set:{type:String}
        }
    ]
    },{timestamps: true, collection: 'partidas'}
)
