import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { Evento } from "../interfaces/categoria.interface";

export class AtualizaCategoriaDto{
    
    @IsString()
    @IsOptional()
    descricao:string;

    @IsArray()
    @ArrayMinSize(1)
    eventos:Array<Evento>;
}