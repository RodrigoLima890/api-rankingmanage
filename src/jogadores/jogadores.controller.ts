import { Body, Controller,Delete,Get,Param,Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParamPipe } from './pipes/jogadores-validacao-param.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
    
    constructor(private readonly jogadoresService:JogadoresService){}

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() jogadorDto:CriarJogadorDTO,@Param('_id', JogadoresValidacaoParamPipe) _id:string
    ):Promise<Jogador>{
        return await this.jogadoresService.atualizarJogador(_id,jogadorDto)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() jogadorDto:CriarJogadorDTO
    ):Promise<Jogador>{
        return await this.jogadoresService.criarJogador(jogadorDto)
    }

    @Get('/:_id')
    async buscarJogadorPeloId(@Param('_id',JogadoresValidacaoParamPipe) _id:string):Promise<Jogador>{
        return await this.jogadoresService.buscarJogadorPeloId(_id);
    }

    @Get()
    async buscarJogadores():Promise<Jogador[]>{        
        return await this.jogadoresService.buscarTodosJogadores();
    }

    @Delete('/:_id')
    async deletarJogadorPorid(@Param('_id', JogadoresValidacaoParamPipe) _id:string):Promise<any>{
        return await this.jogadoresService.deletarJogadorPorid(_id);
    }
}
