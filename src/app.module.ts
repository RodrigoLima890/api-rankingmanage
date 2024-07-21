import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
    "mongodb+srv://rodrigolima90017:G4CFq4I1iPMQWUBS@cluster0.sdryddq.mongodb.net/rankingManagerDb?retryWrites=true&w=majority&appName=Cluster0"),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
