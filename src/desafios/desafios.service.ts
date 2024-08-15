import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CriaDesafioDto } from './dtos/cria-desafio.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Desafios, Partidas } from './interfaces/desafios.interface';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { StatusDesafio } from './enums/status-desafio.enum';
import { CacheService } from 'src/cache/cache.service';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';

@Injectable()
export class DesafiosService {

    constructor(
        @InjectModel('Desafios') private readonly desafioModel: Model<Desafios>,
        @InjectModel('Partidas') private readonly partidaModel: Model<Partidas>,
        private readonly categoriaService: CategoriasService,
        private readonly jogadoresService: JogadoresService,
        private readonly cacheService: CacheService
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
        this.logger.log(`solicitanteJogadorDaPartida: ${JSON.stringify(solicitantePartida)}`);

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

    async buscarTodosDesafios(): Promise<Desafios[]> {
        return await this.desafioModel.find().populate('partida').populate('solicitante').populate('jogadores').exec()
    }

    async buscarDesafiosPorSolicitante(solicitante: any): Promise<Desafios[]> {
        
        const jogadorExiste = await this.jogadoresService.buscarJogadorPeloId(solicitante);

        if(!jogadorExiste) throw new NotFoundException(`Jogador com o id ${solicitante} não encontrado`)
        
        return this.cacheService.getCache<Desafios[]>(`desafio_${solicitante}`,
            async () =>
                await this.desafioModel.find()
            .where('jogadores')
            .in(solicitante)
            .populate('solicitante')
            .populate('jogadores')
            .exec())

    }

    async atribuirDesafioPartida(idDesafio: string, atribuirDesafioPartida: AtribuirDesafioPartidaDto) {
        const desafioEncontrado = await this.desafioModel.findById(idDesafio).exec();
        if (!desafioEncontrado) throw new NotFoundException("Desafio com id " + idDesafio + " não encontrado")

        const jogadorFilter = desafioEncontrado.jogadores.filter((jogador) => {
            return jogador._id == atribuirDesafioPartida.def
        },[])
        console.log(jogadorFilter);

        this.logger.log(`desafioEncontrado: ${desafioEncontrado}`)
        this.logger.log(`jogadorFilter: ${jogadorFilter}`)

        if (jogadorFilter.length == 0) throw new BadRequestException("Jogador vencedor não faz parte do desafio")

        const partidaCriada = new this.partidaModel(atribuirDesafioPartida)

        partidaCriada.categoria = desafioEncontrado.categoria
        partidaCriada.jogadores = desafioEncontrado.jogadores

        const resultado = await partidaCriada.save()

        desafioEncontrado.status = StatusDesafio.REALIZADO;

        desafioEncontrado.partida = resultado.id;
        console.log(resultado.id+" resultado");
        console.log(desafioEncontrado+ "Desafio encontrado");
        try {
            const desafio = await this.desafioModel.findOneAndUpdate({ _id:idDesafio }, { $set: desafioEncontrado }).exec()
            console.log(desafio+" Desafio");
        } catch (error) {
            /*
            Se a atualização do desafio falhar excluímos a partida 
            gravada anteriormente
            */
            await this.partidaModel.deleteOne({ _id: resultado._id }).exec();
            throw new InternalServerErrorException()
        }
    }

    async atualizarDesafio(idDesafio:string, atualizarDesafioDto:AtualizarDesafioDto):Promise<Object>
    {
        const desafioEncontrado = await this.desafioModel.findById(idDesafio).exec();

        console.log(desafioEncontrado);
        if(!desafioEncontrado) throw new NotFoundException("Desafio não encontrado");

        if(atualizarDesafioDto.status){
            desafioEncontrado.dataHoraResposta = new Date()
        }
        desafioEncontrado.status = atualizarDesafioDto.status;
        desafioEncontrado.dataHoraDesafio = atualizarDesafioDto.dataHoraDesafio;
        const objectUpdate = await this.desafioModel.updateOne({_id:idDesafio}, desafioEncontrado);

        if(objectUpdate.modifiedCount < 1) throw new BadRequestException('Erro ao editar as informações do desafio');

        return {
            'message':'Desafio alterado com sucesso'
        }
    }

    async deletarDesafio(desafioId:string){
        const desafioExiste = await this.desafioModel.findById(desafioId);
        if(!desafioExiste) throw new NotFoundException("Desafio "+desafioId+" não encontrado");

        desafioExiste.status = StatusDesafio.CANCELADO;

        await this.desafioModel.findOneAndUpdate({desafioId},{$set: desafioExiste}).exec() 
    }
}
