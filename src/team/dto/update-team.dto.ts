import { IsOptional, IsString, Length, MinLength } from "class-validator";

export class UpdateTeam{
    @IsString({
        message: 'Le champ nom doit être une chaine de caractères',
    })
    @Length(3,30,{
        message:'Le nom doit contenir entre 3 et 30 caractères'
    })
    @IsOptional()
    name: string;

    @IsString({
        message: 'Le champ pays doit être une chaine de caractères',
    })
    @MinLength(3)
    @IsOptional()
    country: string;
}