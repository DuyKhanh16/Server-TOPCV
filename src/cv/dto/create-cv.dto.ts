import { IsNotEmpty, IsString } from "class-validator"

export class CreateCvDto {
    @IsString()
    @IsNotEmpty()
    user_exp: string

    @IsString()
    @IsNotEmpty()
    user_education: string

    @IsString()
    @IsNotEmpty()
    user_action: string

    @IsString()
    @IsNotEmpty()
    user_cartificate: string

    @IsString()
    @IsNotEmpty()
    user_name: string

    @IsString()
    @IsNotEmpty()
    user_avata: string

    @IsString()
    @IsNotEmpty()
    user_job: string

    @IsString()
    @IsNotEmpty()
    user_birthday: string

    @IsString()
    @IsNotEmpty()
    user_address: string

    @IsString()
    @IsNotEmpty()
    user_email: string

    @IsString()
    @IsNotEmpty()
    user_numberPhone:string

    @IsString()
    @IsNotEmpty()
    user_taget: string

    @IsString()
    @IsNotEmpty()
    user_skill: string

    @IsString()
    @IsNotEmpty()
    cv_date: string
}
