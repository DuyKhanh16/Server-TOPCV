import { IsNotEmpty, IsString } from "class-validator";


export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    user_fullName: string;

    @IsString()
    @IsNotEmpty()
    user_email: string;

    @IsString()
    @IsNotEmpty()
    user_password: string;

    @IsString()
    user_avatar?: string
}
// export class LoginGoogleDto {
//     @IsString()
//     @IsNotEmpty()
//     user_email: string;

//     @IsString()
//     @IsNotEmpty()
//     user_name: string;

//     @IsString()
//     @IsNotEmpty()
//     user_avatar: string;

//     @IsString()
//     user_password: string;
// }