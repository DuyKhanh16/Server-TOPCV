import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class AddressDto{
    @IsString()
    @IsNotEmpty()
    home:string
    
    @IsNotEmpty()
    @IsString()
    street:string

    @IsString()
    @IsNotEmpty()
    district:string

    @IsString()
    @IsNotEmpty()
    city:string

}
export class RegisterCompanyDto {
    @IsString()
    @IsNotEmpty()
    company_name: string;

    @IsObject()
    @IsNotEmpty()
    company_address: AddressDto;

    @IsString()
    @IsNotEmpty()
    company_email: string;

    @IsString()
    @IsNotEmpty()
    company_password: string;
}