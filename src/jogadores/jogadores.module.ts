import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JogadoresService } from './jogadores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from './interfaces/jogador.schema';
import { CategoriaSchema } from 'src/categorias/interfaces/categoria.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Jogadores',schema:JogadorSchema},{name:'Categorias',schema:CategoriaSchema}])],
  controllers: [JogadoresController],
  providers: [JogadoresService]
})
export class JogadoresModule {}
