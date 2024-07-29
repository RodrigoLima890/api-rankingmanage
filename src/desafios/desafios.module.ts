import { Module } from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { DesafiosController } from './desafios.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DesafioSchema } from './interfaces/desafios.schema';

@Module({
  imports: [MongooseModule.forFeature([{name:'Desafios',schema:DesafioSchema}])],
  providers: [DesafiosService],
  controllers: [DesafiosController]
})
export class DesafiosModule {}
