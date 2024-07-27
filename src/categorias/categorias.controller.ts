import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriaCategoriaDto } from './dtos/cria-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';
import { AtualizaCategoriaDto } from './dtos/atualiza-categoria.dto';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriaService:CategoriasService){

    }

    @Post()
    async criarCategoria(@Body() criaCategoria:CriaCategoriaDto):Promise<Categoria>{
        return this.categoriaService.criarCategoria(criaCategoria);
    }

    @Get()
    async buscarTodasCategorias():Promise<Categoria[]>{
        return this.categoriaService.buscarTodasCategorias();
    }

    @Get('/:_id')
    async buscarCategoriaPorId(@Param('_id') _id:string):Promise<Categoria>{
        return this.categoriaService.buscarCategoriaPorId(_id)
    }

    @Delete('/:_id')
    async deletarCategoriaPeloId(@Param('_id') _id:string):Promise<Object>{
        return this.categoriaService.deletarCategoriaPeloId(_id)
    }

    @Put()
    async atualizarCategoria(@Body() atualizarCategoria:AtualizaCategoriaDto, @Param('categoria') categoria):Promise<Object>{
        return await this.categoriaService.atualizarCategoria(categoria, atualizarCategoria );
    }
}
