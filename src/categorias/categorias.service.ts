import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface';
import { InjectModel } from '@nestjs/mongoose';
import { CriaCategoriaDto } from './dtos/cria-categoria.dto';
import { AtualizaCategoriaDto } from './dtos/atualiza-categoria.dto';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectModel('Categorias') private readonly categoriaModel:Model<Categoria>
    ){}

    async criarCategoria(criarCategoriaDto:CriaCategoriaDto):Promise<Categoria>{
        const {categoria} = criarCategoriaDto;

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

        if(categoriaEncontrada) throw new BadRequestException("Categoria "+categoria+" já cadastrada")
        
        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save();
    }
    async buscarTodasCategorias():Promise<Categoria[]>{
        return this.categoriaModel.find().exec();
    }

    async buscarCategoriaPorId(_id:string):Promise<Categoria>{
        const categoriaEncontrada = await this.categoriaModel.findById(_id).exec();

        if(!categoriaEncontrada) throw new NotFoundException("Categoria não encontrada");

        return categoriaEncontrada;
    }

    async deletarCategoriaPeloId(_id:string):Promise<Object>{
        const categoriaEncontrada = await this.categoriaModel.findById(_id).exec();

        if(!categoriaEncontrada) throw new NotFoundException("Categoria não encontrada");

        const objDelecao = await this.categoriaModel.deleteOne({_id:_id});
        if(objDelecao.deletedCount < 1) throw new BadRequestException("Ocorreu algum erro ao deletar essa categoria");

        const objRetorno = {
            "Mensagem":"Categoria deletada com sucesso"
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
}
