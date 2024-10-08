import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { CriaDesafioDto } from './dtos/cria-desafio.dto';
import { ValidacaoParamPipe } from 'src/common/pipes/validacao-param.pipe';
import { DesafiosService } from './desafios.service';
import { Desafios } from './interfaces/desafios.interface';
import { DesafioValidationStatusPipe } from './pipes/desafio-validation-status.pipe';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(private readonly desafiosService: DesafiosService) {

    }

    @Post()
    @UsePipes(ValidacaoParamPipe)
    async criaDesafio(@Body() desafio: CriaDesafioDto): Promise<Desafios> {
        return await this.desafiosService.criaDesafio(desafio);
    }

    @Get()
    async buscarTodos(): Promise<Desafios[]> {
        return this.desafiosService.buscarTodosDesafios();
    }

    @Get('/:solicitante')
    async buscarDesafiosPorSolicitante(@Param('solicitante') solicitante: string): Promise<Desafios[]> {
        return await this.desafiosService.buscarDesafiosPorSolicitante(solicitante);
    }

    @Put('/:desafio')
    async atualizarDesafio(
        @Body(DesafioValidationStatusPipe) atualizarDesafioDto: AtualizarDesafioDto,
        @Param('desafio') idDesafio:string
    ):Promise<Object> {
        return await this.desafiosService.atualizarDesafio(idDesafio, atualizarDesafioDto);
     }

    @Post('/:desafio/partida/')
    async atribuirDesafioPartida(
        @Body(ValidacaoParamPipe) atribuirDesafioPartidaDto:AtribuirDesafioPartidaDto,
        @Param('desafio') idDesafio:string
    ):Promise<Desafios>{
        return this.desafiosService.atribuirDesafioPartida(idDesafio,atribuirDesafioPartidaDto)
    }

    // metodo para cencelar um desafio
    @Delete('/:desafio')
    async deletarDesafio(@Param('desafio') desafio:string):Promise<Object>{
        return await this.desafiosService.deletarDesafio(desafio);
    }
}
