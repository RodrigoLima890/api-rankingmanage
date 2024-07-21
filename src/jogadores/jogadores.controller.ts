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
    ):Promise<Jogador>{
        return await this.jogadoresService.criarAtualizarJogador(jogadorDto)
    }

    @Get('/buscarTodos')
    async buscarJogadores(@Query('email') email:string):Promise<Jogador[] | Jogador>{
        
        if(email) return await this.jogadoresService.buscarJogadorPorEmail(email);
        
        return await this.jogadoresService.buscarTodosJogadores();
        
    }

    @Delete()
    async deletarJogadorPorEmail(@Query('email') email:string):Promise<any>{
        return await this.jogadoresService.deletarJogadorPorEmail(email);
    }
}
