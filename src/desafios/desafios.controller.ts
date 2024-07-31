import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { CriaDesafioDto } from './dtos/cria-desafio.dto';
import { ValidacaoParamPipe } from 'src/common/pipes/validacao-param.pipe';
import { DesafiosService } from './desafios.service';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(private readonly desafiosService:DesafiosService){

    }

    @Post()
    @UsePipes(ValidacaoParamPipe)
    async criaDesafio(@Body() desafio:CriaDesafioDto){
        await this.desafiosService.criaDesafio(desafio);
    }
}
