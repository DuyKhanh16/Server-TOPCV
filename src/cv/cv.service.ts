import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from 'src/entity/cv.entity';
import { Repository } from 'typeorm';
import { async } from 'rxjs';
import { UersService } from 'src/users/uers.service';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv) private cvRepository: Repository<Cv>,
    private readonly userService: UersService
    ) {}

  async create(createCvDto: CreateCvDto,user_id:string) {
    const user=await this.userService.getUserById(user_id)
    return this.cvRepository.createQueryBuilder("cv").insert().into(Cv).values({
      cv_fullnName:createCvDto.user_name,
      cv_email:createCvDto.user_email,
      cv_job:createCvDto.user_job,
      cv_brirthday:createCvDto.user_birthday,
      cv_address:createCvDto.user_address,
      cv_phone:createCvDto.user_numberPhone,
      cv_avata:createCvDto.user_avata,
      cv_skill:createCvDto.user_skill,
      cv_experience:createCvDto.user_exp,
      cv_action:createCvDto.user_action,
      cv_cartificate:createCvDto.user_cartificate,
      cv_target:createCvDto.user_taget,
      cv_education:createCvDto.user_education,
      cv_date:createCvDto.cv_date,
      user:user
    }).execute()
  }

  findAll(user_id:string) {
    return this.cvRepository.createQueryBuilder("cv").where("cv.user.user_id = :user_id", {user_id: user_id}).getMany()
  }

  findOne(id: number) {
    return this.cvRepository.findOneBy({cv_id:id})
  }

  async resetStatus(id:number) {
    return this.cvRepository.createQueryBuilder("cv").update(Cv).set({
      cv_status:0
    }).where("user.user_id =:id",{id:id}).execute()
  }
  async activeJob(data:number[]){
    return this.cvRepository.createQueryBuilder("cv").update(Cv).set({
      cv_status:1
    }).execute()
  }
  async deleteCvById(id:number) {
    return await this.cvRepository
      .createQueryBuilder()
      .delete()
      .from(Cv)
      .where('cv_id = :id', { id: id })
      .execute();
  }
  async updateCv(id: number, updateCvDto: UpdateCvDto) {
    return await this.cvRepository
      .createQueryBuilder()
      .update(Cv)
      .set(updateCvDto)
      .where('cv_id = :id', { id: id })
      .execute();
  }
  async getCVRecruitment() {
    return await this.cvRepository
      .createQueryBuilder('cv')
      .innerJoinAndSelect('cv.user', 'user')
      .where('cv.cv_status = :status', { status: 1 })
      .andWhere('user.user_recruitment = :action', { action: 1 })
      .getMany();
  }
}
