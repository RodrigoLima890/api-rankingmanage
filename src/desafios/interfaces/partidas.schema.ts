import mongoose from "mongoose";

export const PartidaSchema = new mongoose.Schema(
    {
        categoria: {type:String},
        jogadores :[{
            type:mongoose.Schema.ObjectId,
            ref: 'Jogadores'
        }],
        def:{type:mongoose.Schema.ObjectId},
        resultado: [
            {
            set:{type:String}
        }
    ]
    },{timestamps: true, collection: 'Partidas'}
)
