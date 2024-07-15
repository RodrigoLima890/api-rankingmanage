import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class JogadoresService {

    private jogadores:Jogador[] = [];

    private readonly logger = new Logger(JogadoresService.name);

    async criarAtualizarJogador(criarJogadorDto:CriarJogadorDTO): Promise<void>{
        const {email} = criarJogadorDto;
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        if(jogadorEncontrado) {
            this.atualizar(jogadorEncontrado, criarJogadorDto)
            return 
        }
        this.criar(criarJogadorDto);
    }

    private atualizar(jogadorEncontrado:Jogador, criarJogadorDto:CriarJogadorDTO):void{
        const {nome} = criarJogadorDto;
        jogadorEncontrado.nome = nome;
    }

    private criar(criarJogadorDto: CriarJogadorDTO):void{

        const {nome, email, telefone} = criarJogadorDto

        const jogador:Jogador = {
            _id:uuidv4(),
            nome,
            telefone,
            email,
            ranking: 'A',
            posicaoRanking:1,
            urlFotoJogador: 'teste.png'
        }
        this.logger.log(`cria jogador Dto: ${JSON.stringify(jogador)}`)

        this.jogadores.push(jogador);
    }

     buscarTodosJogadores():Jogador[]{
        return this.jogadores;
    }
    buscarJogadorPorEmail(email:string):Jogador{
        const jogador = this.jogadores.find((jogador) => jogador.email == email)

        if(!jogador)
            throw new NotFoundException(`Jogador com o email ${email} não encontrado`)
        
        return jogador
    }
    deletarJogadorPorEmail(email:string):void{
        const jogadorEncontrado = this.jogadores.find((jogador) => jogador.email === email);

        this.jogadores = this.jogadores.filter((jogador)=> jogador.email !== jogadorEncontrado.email)
    }

}
