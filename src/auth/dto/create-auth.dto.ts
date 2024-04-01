import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    user_email: string;

    @IsString()
    @IsNotEmpty()
    user_password: string;
}

export class LoginCompanyDto {
    @IsString()
    @IsNotEmpty()
    company_email: string;

    @IsString()
    @IsNotEmpty()
    company_password: string;
}
