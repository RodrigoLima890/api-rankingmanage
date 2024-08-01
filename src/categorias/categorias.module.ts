import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './interfaces/categoria.schema';
import { JogadorSchema } from 'src/jogadores/interfaces/jogador.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:'Categorias', schema:CategoriaSchema },{name:'Jogadores', schema:JogadorSchema }])],
  controllers: [CategoriasController],
  providers: [CategoriasService],
  exports:[CategoriasService]
})
export class CategoriasModule {}
