import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/users.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import {  hash } from 'argon2';
import { async } from 'rxjs';
import { CvService } from 'src/cv/cv.service';
// import * as argon2 from 'argon2';

@Injectable()
export class UersService {
    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>
        )
         {}

  async  getUserByEmail(user_email: string) {
        const user = await this.usersRepository.findOne({where:{user_email:user_email}});
        return user
    }

    async getUserById(user_id:any){
        return await this.usersRepository.findOneBy({user_id:user_id})
    }
    async createUser(data: RegisterDto) {
        
        const result= this.usersRepository.createQueryBuilder()
        .insert().into(UserEntity).values({
            user_fullName: data.user_fullName,
            user_email: data.user_email,
            user_password: data.user_password,
            user_avata: data.user_avatar
        }).execute()
        return result
    }

    async uploadInfor(data,id){
        return this.usersRepository.createQueryBuilder("user").update(UserEntity).set({
            user_avata:data.user_avata,
            user_fullName:data.user_fullName,
            user_phone:data.user_numberPhone
        }).where("user_id = :user_id", {user_id: id.id}).execute()

    }
    async updatePassword(newPassword,id){
        return this.usersRepository.createQueryBuilder("user").update(UserEntity).set({
            user_password:newPassword
        }).where("user_id = :user_id", {user_id: id}).execute()
        
    }

    async updateRecruitment(user_recruitment:number,id:number){
        return this.usersRepository.createQueryBuilder("user").update(UserEntity).set({
            user_recruitment:1
        }).where("user_id = :user_id", {user_id: id}).execute()
    }
}
    
