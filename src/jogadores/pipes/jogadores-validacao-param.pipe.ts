import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class JogadoresValidacaoParamPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log(typeof value)
        if(!value) throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`); 
        return value;
    }
}