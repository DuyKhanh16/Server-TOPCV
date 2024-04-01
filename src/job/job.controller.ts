import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query, Put } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { query } from 'express';

@Controller('api/v1/job')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  @Get("list")
  async getAllJob(@Res() res) {
    const result = await this.jobService.getAllJob();
    
    return res.status(200).json({
      message:"Lấy tuyển dụng thành công",
      data:result
    })
  }
  @Get("list/:id")
  async getJob(@Param("id") id:string,@Res() res) {
    const result = await this.jobService.getJobByIdCompany(Number(id));
    return res.status(200).json({
      message:"Lấy tuyển dụng thành công",
      data:result
    })
  }
  @Get("one/:id")
  async getOneJob(@Param("id") id:string,@Res() res) {
    const result= await this.jobService.getJobById(Number(id))
    return res.status(200).json({
      message:"Lấy tuyển dụng thành công",
      data:result
    })
  }

  @Get("search")
  async getJobSearch(@Query("job-search") job_search:string,@Query("city_search") city_search:string, @Res() res) {
    try {
      const result= await this.jobService.getJobSearch(job_search,city_search)
    return res.status(200).json({
      message:"Lấy tuyển dụng thành công",
      data:result
    })
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message:"Không tìm được tuyển dụng"
      })
    }
  }
  
  @Get("list-city")
  async getListJobByCity(@Res() res,@Query("city_search") city_search:string) {
    try {
      const result= await this.jobService.getJobSearch("",city_search)
      return res.status(200).json({
        message:"Lấy tuyển dụng thành công",
        data:result
      })
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message:"Không tìm được tuyển dụng"
      })
      
    }
    
  }

  @Get("jobsave/:id")
  async getJobSave(@Param("id") id:string,@Res() res) {
    const result= await this.jobService.getJobSaveUser(Number(id))
    return res.status(200).json({
      message:"success",
      data:result
    })
  }

  @Post("savejob/:user_id/:job_id")
  async saveJob(@Param("user_id") user_id:string,@Param("job_id") job_id:string,@Res() res) {
   try {
    const result= await this.jobService.saveJob(Number(user_id),Number(job_id))
    return res.status(201).json({
      message:"Lưu thông tin tuyển dụng thành công"
    })
   } catch (error) {
    console.log(error);
    res.status(400).json({
      message:"Đã tồn tại bản lưu trong lịch sử lưu"
    })
   }
  }

  @Post("create/:id")
  create(@Body() createJobDto: CreateJobDto,@Param("id") id:string,@Res() res) {
   try {
    const result=this.jobService.createJob(createJobDto,Number(id))
    return res.status(201).json({
      message:"Tạo tuyển dụng thành công",
      data:result
    })
   } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:"server error"
    })
   }
  }

  @Post("apply/:job_id/:cv_id")
 async creatApply(@Param("job_id") job_id:string,@Param("cv_id") cv_id:string,@Res() res) {
     try {
         const result= await this.jobService.createAppply(Number(job_id),Number(cv_id))
      res.status(201).json({
        message:"ứng tuyển thành công"
      })
     } catch (error) {
      console.log(error);
      res.status(400).json({
        message:"Bạn đã ứng tuyển công việc hiện tại bằng CV này trước đó!"
      })

     }
  }

  @Put("notification/updatestatus/:id")
  async updateNotification(@Param("id") id:string,@Res() res) {
    try {
      await this.jobService.updateStatusNotificationOneJob(Number(id))
      return res.status(201).json({
        message:"success"
      })
    } catch (error) {
      console.log(error);
      
    }
  }
  @Put("updatestatus/:id")
  async updateStatus(@Param("id") id:string,@Res() res, @Body("job_status") job_status:string) {
   
    try {
      await this.jobService.updateStatusJob(Number(id),Number(job_status))
      return res.status(201).json({
        message:"Đã Update trạng thái thành công!"
      })
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message:"Không tìm được tuyển dụng"
      })
      
    }
    
  }
  
}
