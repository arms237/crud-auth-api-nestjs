import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {
    @IsString(
        {
            message: "L'email doit être une chaine de caractères"
        }
    )
    @IsNotEmpty({
        message: "Un email est requis pour se connecter !"
    })
    @IsEmail({
        blacklisted_chars: "!?#$^%&*(){}[]"
    },
    {
        message: "L'adresse mail n'est pas valide"
    })
    @ApiProperty(
        {
            description: "L'adresse email de l'utilisateur",
            example: "sammy.johnson@example.com",
            required: true
        }
    )
    email: string;

    @IsString(
        {
            message: "Le mot de passe doit être une chaine de caractères"
        }
    )
    @IsNotEmpty({
        message: "Un mot de passe est requis pour se connecter !"
    })
    @MinLength(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères !"
    })
    @ApiProperty(
        {
            description: "Le mot de passe de l'utilisateur (minimum 8 caractères)",
            example: "motdepasse123",
            required: true,
            minLength: 8
        }
    )
    password: string;
}
