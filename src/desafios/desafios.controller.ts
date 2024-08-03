import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { CriaDesafioDto } from './dtos/cria-desafio.dto';
import { ValidacaoParamPipe } from 'src/common/pipes/validacao-param.pipe';
import { DesafiosService } from './desafios.service';
import { Desafios } from './interfaces/desafios.interface';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(private readonly desafiosService:DesafiosService){

    }

    @Post()
    @UsePipes(ValidacaoParamPipe)
    async criaDesafio(@Body() desafio:CriaDesafioDto):Promise<Desafios>{
        return await this.desafiosService.criaDesafio(desafio);
    }

    @Get()
    async buscarTodos():Promise<Desafios[]>{
        return this.desafiosService.buscarTodosDesafios();
    }

    @Get('/:solicitante')
    async buscarDesafiosPorSolicitante(@Param('solicitante') solicitante:string):Promise<Desafios[]>{
        return await this.desafiosService.buscarDesafiosPorSolicitante(solicitante);
    }
}
