import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafios.schema';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CacheModule } from 'src/cache/cache.module';
@Module({
  imports: [
    MongooseModule.forFeature([{name:'Desafios',schema:DesafioSchema}]),
    CategoriasModule,
    JogadoresModule,
    CacheModule
  ],
  providers: [DesafiosService],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
