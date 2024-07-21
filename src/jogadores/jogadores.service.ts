import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogadores') private readonly jogadorModel: Model<Jogador>) { }

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDTO): Promise<Jogador> {
        const { email } = criarJogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontrado) {
            return this.atualizar(jogadorEncontrado, criarJogadorDto)
        }
        return this.criar(criarJogadorDto);
    }

    private async atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDTO): Promise<Jogador> {
        await this.jogadorModel.updateOne({ email: jogadorEncontrado.email }, criarJogadorDto);
        return await this.jogadorModel.findOne({ email: jogadorEncontrado.email }).exec();
    }

    private async criar(criarJogadorDto: CriarJogadorDTO): Promise<Jogador> {

        const jogadorCriador = new this.jogadorModel(criarJogadorDto);
        return await jogadorCriador.save();
    }

    async buscarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async buscarJogadorPorEmail(email: string): Promise<Jogador> {
        const jogador = await this.jogadorModel.findOne({ email });

        if (!jogador) throw new NotFoundException(`Jogador com o email ${email} não encontrado`)

        return jogador
    }

    async deletarJogadorPorEmail(email: string): Promise<any> {
        const deleteObj = await this.jogadorModel.deleteOne({ email });
        if (deleteObj.deletedCount < 1) throw new BadRequestException('Erro ao excluir o registro')
        return {
            'message': 'Registro excluido com sucesso',
            ...deleteObj
        }
    }

}
