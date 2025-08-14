import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdatePlayerDTO {
    @ApiProperty({
        description: 'Le NOM du joueur',
        example: 'John',
        type: String
    })
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty({
        description: 'Le prénom du joueur',
        example: 'Doe',
        type: String
    })
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiProperty({
        description: 'L\'id de l\'equipe du joeur ',
        example: 1,
        type: Number
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    teamId: number;

    @ApiProperty({
        description: 'L\'id du poste du joeur ',
        example: 1,
        type: Number
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    positionId: number;
}