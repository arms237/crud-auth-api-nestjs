import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, MinLength } from "class-validator";

export class CreateTeam{
    @IsString({
        message: 'Le champ nom doit être une chaine de caractères',
    })
    @Length(3,30,{
        message:'Le nom doit contenir entre 3 et 30 caractères'
    })
    @ApiProperty({
        description:"Le nom de l'equipe",
        example:"FC Barcelonne",
        minLength: 3,
        maxLength: 30,
        required:true,
    })
    name: string;

    @IsString({
        message: 'Le champ pays doit être une chaine de caractères',
    })
    @MinLength(3)
    @ApiProperty({
        description:"Le pays de l'equipe",
        example:"Espagne",
        minLength: 3,
        required:true,
    })
    country: string;
}