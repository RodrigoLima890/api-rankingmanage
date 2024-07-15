import { Body, Controller,Delete,Get,Post, Query } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
    
    constructor(private readonly jogadoresService:JogadoresService){}

    @Post()
    async criarAtualizarJogador(
        @Body() jogadorDto:CriarJogadorDTO
    ){
        await this.jogadoresService.criarAtualizarJogador(jogadorDto)
    }

    @Get('/buscarTodos')
    buscarJogadores(@Query('email') email:string):Jogador[] | Jogador{
        if(email){
            return this.jogadoresService.buscarJogadorPorEmail(email);
        }else{
            return this.jogadoresService.buscarTodosJogadores();
        }
    }

    @Delete()
    deletarJogadorPorEmail(@Query('email') email:string):void{
        this.jogadoresService.deletarJogadorPorEmail(email);
    }
}
