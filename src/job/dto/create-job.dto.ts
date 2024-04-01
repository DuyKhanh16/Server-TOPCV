import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateJobDto {
    @IsNumber()
    job_id: number;
    
    @IsString()
    @IsNotEmpty()
    job_name: string;

    @IsString()
    @IsNotEmpty()
    job_description: string;
    
    @IsString()
    @IsNotEmpty()
    job_city: string;

    @IsString()
    @IsNotEmpty()
    job_address: string;

    @IsString()
    @IsNotEmpty()
    job_salary: string;

    @IsString()
    @IsNotEmpty()
    job_request: string;

    @IsString()
    @IsNotEmpty()
    job_welfare: string;

    @IsString()
    @IsNotEmpty()
    job_exp: string;

    @IsNumber()
    @IsNotEmpty()
    job_status: number;
}
