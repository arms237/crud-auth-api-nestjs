import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePlayerDTO {
    @ApiProperty({
        description: 'Le NOM du joueur',
        example: 'John',
        type: String
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'Le prénom du joueur',
        example: 'Doe',
        type: String
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'L\'id de l\'equipe du joeur ',
        example: 1,
        type: Number
    })
    @IsNumber()
    @IsPositive()
    teamId: number;

    @ApiProperty({
        description: 'L\'id du poste du joeur ',
        example: 1,
        type: Number
    })
    @IsNumber()
    @IsPositive()
    positionId: number;
}