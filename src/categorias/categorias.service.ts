import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CriaCategoriaDto } from './dtos/cria-categoria.dto';
import { AtualizaCategoriaDto } from './dtos/atualiza-categoria.dto';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel('Categorias') private readonly categoriaModel:Model<Categoria>,
        @InjectModel('Jogadores') private readonly jogadorModel:Model<Jogador>
    ){}

    async criarCategoria(criarCategoriaDto:CriaCategoriaDto):Promise<Categoria>{
        const {categoria} = criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

        if(categoriaEncontrada) throw new BadRequestException("Categoria "+categoria+" já cadastrada")
        
        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save();
    }
    async buscarTodasCategorias():Promise<Categoria[]>{
        return await this.categoriaModel.find().populate('jogadores').exec();
    }

    async buscarCategoria(categoria:string):Promise<Categoria>{
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria:categoria}).exec();

        if(!categoriaEncontrada) throw new NotFoundException("Categoria não encontrada");

        return categoriaEncontrada;
    }

    async deletarCategoriaPeloId(_id:string):Promise<Object>{
        const categoriaEncontrada = await this.categoriaModel.findById(_id).exec();

        if(!categoriaEncontrada) throw new NotFoundException("Categoria não encontrada");

        const objDelecao = await this.categoriaModel.deleteOne({_id:_id});
        if(objDelecao.deletedCount < 1) throw new BadRequestException("Ocorreu algum erro ao deletar essa categoria");

        const objRetorno = {
            "message":"Categoria deletada com sucesso"
        }
        return objRetorno; 
    }

    async atualizarCategoria(categoria:string, atualizarCategoria:AtualizaCategoriaDto):Promise<Object>{
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria:categoria}).exec();

        if(!categoriaEncontrada) throw new NotFoundException("Categoria não encontrada");

        const objUpdate = await this.categoriaModel.updateOne({categoria:categoria}, atualizarCategoria);

        if(objUpdate.modifiedCount < 1) throw new BadRequestException("Erro ao editar as informações da categoria");

        return {
            "message":"Categoria editada com sucesso"
        }
    }

    async atribuiCategoriaJogador(param:string[]):Promise<Object>{
        const categoria = param['categoria']
        const jogadorId = param['jogadorId'];
        
        const categoriaEncontrada = await this.categoriaModel.findOne({categoria:categoria}).exec();
        if(!categoriaEncontrada) throw new NotFoundException("Categoria não encontrada");
        
        const jogadorEncontrado = await this.jogadorModel.findById(jogadorId).exec();
        if(!jogadorEncontrado) throw new NotFoundException("Jogador não encontrado");

        if(categoriaEncontrada.jogadores.includes(jogadorId)) throw new BadRequestException(`Jogador ${jogadorEncontrado.nome} já esta nessa categoria`);
        
        const jogadorEmOutraCategoria =  (await this.buscarTodasCategorias()).map(categoria=>categoria.jogadores.includes(jogadorId));
        if(jogadorEmOutraCategoria.includes(true)) throw new BadRequestException(`Jogador ${jogadorEncontrado.nome} já esta incluido em outra categoria.`)
        
        categoriaEncontrada.jogadores.push(jogadorId);

        const objUpdCat = await this.categoriaModel.updateOne({categoria:categoria}, categoriaEncontrada).exec();
        if(objUpdCat.modifiedCount < 1) throw new BadRequestException("Ocorreu um erro ao relacionar o jogador a essa categoria");

        return {
            'message':`Jogador(a) ${jogadorEncontrado.nome} relacionado(a) a categoria ${categoria} com sucesso`
        };
    }
}
