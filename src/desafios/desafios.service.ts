import { Injectable } from '@nestjs/common';
import { CriaDesafioDto } from './dtos/cria-desafio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafios } from './interfaces/desafios.interface';

@Injectable()
export class DesafiosService {

    constructor(
        @InjectModel('desafios') private readonly desafiosModel:Model<Desafios>
    ){

    }

    async criaDesafio(desafio:CriaDesafioDto){
        const {jogadores, solicitante} = desafio;
    }
}
