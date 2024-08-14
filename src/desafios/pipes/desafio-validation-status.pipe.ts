import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { Desafios } from "../interfaces/desafios.interface";
import { StatusDesafio } from "../enums/status-desafio.enum";

export class DesafioValidationStatusPipe implements PipeTransform{
    readonly statusPermitidos = [
        StatusDesafio.ACEITO,
        StatusDesafio.RECUSADO,
        StatusDesafio.CANCELADO
    ]
    transform(value: any) {
        const status = value.status.toUpperCase();

        if(!this.statusValido(status)) throw new BadRequestException(`${status} não é um status válido`);
        return value;
    }

    private statusValido(status: any){
        const idx = this.statusPermitidos.indexOf(status);

        return idx !== -1;
    }
    
}
