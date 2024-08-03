import { BadRequestException, Inject, Injectable, Logger } from '@nestjs/common';
import { CriaDesafioDto } from './dtos/cria-desafio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafios } from './interfaces/desafios.interface';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { StatusDesafio } from './enums/status-desafio.enum';

@Injectable()
export class DesafiosService {

    constructor(
        @InjectModel('Desafios') private readonly desafioModel: Model<Desafios>,
        private readonly categoriaService: CategoriasService,
        private readonly jogadoresService: JogadoresService
    ) {
    }

    private readonly logger = new Logger(DesafiosService.name)

    async criaDesafio(desafio: CriaDesafioDto): Promise<Desafios> {
        const jogadores = await this.jogadoresService.buscarTodosJogadores();

        desafio.jogadores.map((jogadorDto) => {
            const jogadorFilter = jogadores.filter((jogador) => jogador._id == jogadorDto._id);

            if (jogadorFilter.length == 0) throw new BadRequestException(`O id ${jogadorDto._id} não é um jogador!`);
        });

        const solicitantePartida = desafio.jogadores.filter((jogador) => jogador._id == desafio.solicitante);
        this.logger.log(`solicitanteEhJogadorDaPartida: ${JSON.stringify(solicitantePartida)}`);

        if (solicitantePartida.length == 0) throw new BadRequestException(`O solicitante deve ser um jogador da partida!`);
        

        const categoriaDoJogador = await this.categoriaService.buscarCategoriaJogador(desafio.solicitante);

        if (!categoriaDoJogador) throw new BadRequestException(`O solicitante precisa estar registrado em uma categoria!`);
        

        const dataDesafio = new Date(desafio.dataHoraDesafio);
        const dataHoraSolicitacao = new Date();

        const desafioCriado = new this.desafioModel(desafio);
        desafioCriado.categoria = categoriaDoJogador.categoria;
        desafioCriado.dataHoraSolicitacao = dataHoraSolicitacao;

        if (dataDesafio < dataHoraSolicitacao) throw new BadRequestException("A data do desafio tem que ser maior que a data de solicitação");
        
        desafioCriado.status = StatusDesafio.PENDENTE;
        this.logger.log(`desafioCriado: ${JSON.stringify(desafioCriado)}`);
        return await desafioCriado.save();
    }

}
