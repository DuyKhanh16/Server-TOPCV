import { Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'src/entity/job.entity';
import { Repository } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { CompanyService } from 'src/company/company.service';
import { JobSaveUser } from 'src/entity/job-save-user.entity';
import { UersService } from 'src/users/uers.service';
import { async } from 'rxjs';
import { Apply } from 'src/entity/apply.entity';
import { CvService } from 'src/cv/cv.service';
import { Notification } from 'src/entity/notification.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job) private jobRepository: Repository<Job>,
    @InjectRepository(JobSaveUser)
    private jobSaveUserRepository: Repository<JobSaveUser>,
    @InjectRepository(Apply) private applyRepository: Repository<Apply>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private readonly companyService: CompanyService,
    private readonly userService: UersService,
    private readonly cvService: CvService,
  ) {}
  async getAllJob() {
    return await this.jobRepository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.company', 'company')
      .getMany();
  }
  async getJobById(id: number) {
    // return await this.jobRepository.findOneBy({ job_id: id });
    return await this.jobRepository.createQueryBuilder('job')
    .innerJoinAndSelect('job.company', 'company')
    .where('job.job_id = :id', { id: id }).getOne();
  }
  async getJobByIdCompany(id: number) {
    return await this.jobRepository
      .createQueryBuilder('job')
      .where('job.company_id = :id', { id: id })
      .orderBy('job.job_id', 'DESC')
      .getMany();
  }
  async createJob(data: CreateJobDto, id: number) {
    const company = await this.companyService.getCompanyById(id);
    return await this.jobRepository
      .createQueryBuilder()
      .insert()
      .into(Job)
      .values({
        job_name: data.job_name,
        job_address: data.job_address,
        job_city: data.job_city,
        job_description: data.job_description,
        job_request: data.job_request,
        job_welfare: data.job_welfare,
        job_exp: data.job_exp,
        job_status: data.job_status,
        job_salary: data.job_salary,
        company: company,
      })
      .execute();
  }
  async saveJob(user_id: number, job_id: number) {
    const check = await this.jobSaveUserRepository
      .createQueryBuilder('JobSaveUser')
      .where('JobSaveUser.user_id = :user_id', { user_id: user_id })
      .andWhere('JobSaveUser.job_id = :job_id', { job_id: job_id })
      .getOne();
    if (check) {
      throw new Error('Đã tồn tại bản ghi');
    }
    const user = await this.userService.getUserById(user_id);
    const job = await this.getJobById(job_id);
    const result = await this.jobSaveUserRepository
      .createQueryBuilder('JobSaveUser')
      .insert()
      .into(JobSaveUser)
      .values({
        user: user,
        job: job,
      })
      .execute();
    const curentJobSaveUser = await this.jobSaveUserRepository.findOneBy({
      job_save_id: result.identifiers[0].job_save_id,
    });
    await this.notificationRepository
      .createQueryBuilder('Notification')
      .insert()
      .into(Notification)
      .values({
        jobsaveuser: curentJobSaveUser,
        notification_content: 'ứng viên đã lưu công việc',
      })
      .execute();
  }
  async getJobSaveUser(user_id: number) {
    const result = await this.jobSaveUserRepository
      .createQueryBuilder('JobSaveUser')
      .innerJoinAndSelect('JobSaveUser.job', 'Job') 
      .innerJoinAndSelect('Job.company', 'company')
      .where('JobSaveUser.user.user_id = :user_id', { user_id: user_id })
      .getMany();
    return result;
  }
  async createAppply(job_id: number, cv_id: number) {
    const check = await this.applyRepository
      .createQueryBuilder('Apply')
      .where('Apply.cv_id = :cv_id', { cv_id: cv_id })
      .andWhere('Apply.job_id = :job_id', { job_id: job_id })
      .getOne();
    if (check) {
      throw new Error('Đã tồn tại bản ghi');
    }
    try {
      const job = await this.getJobById(job_id);
      const cv = await this.cvService.findOne(cv_id);
      console.log(cv);

      const result = await this.applyRepository
        .createQueryBuilder('Apply')
        .insert()
        .into(Apply)
        .values({
          job: job,
          cv: cv,
        })
        .execute();
      console.log(result);
      const curentApply = await this.applyRepository.findOneBy({
        apply_id: result.identifiers[0].apply_id,
      });
      await this.notificationRepository
        .createQueryBuilder('Notification')
        .insert()
        .into(Notification)
        .values({
          apply: curentApply,
          notification_content: 'ứng viên đã nộp Cv ứng tuyển công việc',
        })
        .execute();
      return;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getJobSearch(job:string,city:string) {
    const result = await this.jobRepository
      .createQueryBuilder('job')
      .innerJoinAndSelect('job.company', 'company')
      .where('job.job_name like :job', { job: `%${job}%` })
      .andWhere('job.job_city like :city', { city: `%${city}%` })
      .getMany();
    return result;
  }

  async updateStatusNotificationOneJob(id: number) {
    return await this.notificationRepository.update({notification_id:id},{notification_status:1})
  }
  
  async updateStatusJob(id: number,job_status:number) {
    return await this.jobRepository.update({job_id:id},{job_status:job_status})
  }
}
