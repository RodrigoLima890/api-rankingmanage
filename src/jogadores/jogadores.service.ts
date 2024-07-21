import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogadores') private readonly jogadorModel: Model<Jogador>) { }

    async atualizarJogador(_id: string, jogador: CriarJogadorDTO): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
        if (!jogadorEncontrado) throw new NotFoundException("Jogador com _id " + _id + " não encontrado")
        await this.jogadorModel.updateOne({ _id: _id }, jogador);
        return jogadorEncontrado;

    }

    async criarJogador(jogador: CriarJogadorDTO): Promise<Jogador> {
        const {email, telefone} = jogador;

        const emailExiste = await this.jogadorModel.findOne({email}).exec();

        if(emailExiste) throw new BadRequestException("Email já cadastrado anteriomente");

        const telefoneExiste = await this.jogadorModel.findOne({telefone}).exec();
        if(telefoneExiste) throw new BadRequestException("Telefone já cadastrado anteriomente");

        const jogadorCriador = new this.jogadorModel(jogador);
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
    async buscarJogadorPeloId(_id: string): Promise<Jogador> {
        const jogador = await this.jogadorModel.findById(_id);

        if (!jogador) throw new NotFoundException(`Jogador com o id ${_id} não foi encontrado`)

        return jogador;

    }

    async deletarJogadorPorid(_id: string): Promise<any> {
        const deleteObj = await this.jogadorModel.deleteOne({ _id });
        if (deleteObj.deletedCount < 1) throw new BadRequestException('Erro ao excluir o registro')
        return {
            'message': 'Registro excluido com sucesso',
            ...deleteObj
        }
    }

}
