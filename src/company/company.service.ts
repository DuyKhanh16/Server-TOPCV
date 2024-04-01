import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Company } from 'src/entity/company.entity';
import { Repository } from 'typeorm';
import { RegisterCompanyDto } from './dto/company.dto';
import { Notification } from 'src/entity/notification.entity';
import { CompanyCv } from 'src/entity/company_cv.entity';
import { CvService } from 'src/cv/cv.service';

@Injectable()
export class CompanyService {
    constructor(
         @InjectRepository(Company) private companyRepository: Repository<Company>,
         @InjectRepository(Notification) private notificationRepository: Repository<Notification>,
         @InjectRepository(CompanyCv) private companyCvRepository: Repository<CompanyCv>,
         private readonly cvService: CvService

    ) {}

   async getCompanyByEmail(email: string) {
        return await this.companyRepository.findOne({where:{company_email:email}});
    }
    async createCompany(data: RegisterCompanyDto) {
        const hasdPassword=await argon2.hash(data.company_password);
        
        return this.companyRepository.save({
            company_name: data.company_name,
            address: data.company_address,
            company_email: data.company_email,
            company_password: hasdPassword
        });
        
    }
    async getAllCompany(limit: number) {
        return await this.companyRepository.find({take:12,skip:12*limit});
    }
    async getCompanyById(id:number){
        return await this.companyRepository.findOneBy({company_id:id})
    }

    async getInforOneCompany(id: number) {
        const data =  await this.companyRepository.createQueryBuilder("company")
        .innerJoinAndSelect("company.address","address")
        .where('company.company_id = :id', { id: id }).getOne();
        return await this.companyRepository.findOne({
            relations: ["address", ],
            where: {
                company_id: id
            }
        })
       
        
    }

    async updateBackground(id: number, data: string) {
        return this.companyRepository.createQueryBuilder("company").update(Company).set({
            company_bacgroundPhoto: data
        }).where("company_id = :id", { id: id }).execute();
    }
    
    async updateAvatar(id: number, data: string) {
        return this.companyRepository.createQueryBuilder("company").update(Company).set({
            company_avata: data
        }).where("company_id = :id", { id: id }).execute();
    }

    async updateInfor(id: number, data: any) {
        return await this.companyRepository.createQueryBuilder("company").update(Company).set(data).where("company_id = :id", { id: id }).execute();
    }

    async createSeenCv(data: any) {
        console.log(data);
        
        const check= await this.companyCvRepository.createQueryBuilder("companyCv")
        .select()
        .where("company_id = :id", { id: data.company_id })
        .andWhere("cv_id = :cv_id", { cv_id: data.cv_id })
        .getOne();
        
        if(check){
            return new Error();
        }
        const company= await this.getCompanyById(data.company_id);
        const cv= await this.cvService.findOne(data.cv_id);
        const seed = await this.companyCvRepository.save({
            cv:cv,
            company:company
        })
        const notiSeen= await this.notificationRepository
        .createQueryBuilder('Notification')
        .insert()
        .into(Notification)
        .values({
          companyCv: seed,
          notification_content: 'đã xem Cv',
        })
        .execute();
        
        return ;
        
    }
}
