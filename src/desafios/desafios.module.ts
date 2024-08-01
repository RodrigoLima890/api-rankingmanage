import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafios.schema';
import { CategoriasService } from 'src/categorias/categorias.service';

@Module({
  imports: [MongooseModule.forFeature([{name:'Desafios',schema:DesafioSchema}]), CategoriasService],
  providers: [DesafiosService],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
