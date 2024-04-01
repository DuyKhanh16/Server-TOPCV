import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';

@Controller('api/v1/cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get("list/:user_id")
  async findAll(@Param("user_id") user_id:string,@Res() res) {
    const result= await this.cvService.findAll(user_id)
    return res.status(200).json({
      message:"success",
      data:result
    })
  }

  @Get("one/:id")
  async findOne(@Res() res,@Param("id") id:string) {
    const result= await this.cvService.findOne(Number(id))
    return res.status(200).json({
      message:"success",
      data:result
    })
  }
  @Post("newcv/:user_id")
  async createNewCv(@Body() createCvDto: CreateCvDto,@Param("user_id") user_id:string, @Res() res) {
    const newCV= await this.cvService.create(createCvDto,user_id)
    return res.status(201).json({
      message: `Tạo CV ứng tuyển ${createCvDto.user_job} thành công`,
    })
    
  }

  @Put("update/:id")
  async updateCv(@Param("id") id:string,@Body() updateCvDto: UpdateCvDto,@Res() res) {
    try {
      const result= await this.cvService.updateCv(Number(id),updateCvDto)
      res.status(201).json({
        messager:"Cập nhật CV thành công"
      })
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message:"data error"
      })
    }
    
  }
  @Delete("delete/:id")
  async deleteCv(@Param("id") id:string,@Res() res) {
    try {
      const result= await this.cvService.deleteCvById(Number(id))
      return res.status(200).json({
        message:"Xóa tuyển dụng thành công"
      })
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message:"Không tìm được tuyển dụng"
      })
    }
  }

  @Get("cv-recruitment")
  async getCVRecruitment(@Res() res) {
    try {
      const result= await this.cvService.getCVRecruitment()
      return res.status(200).json({
        message:"success",
        data:result
      })
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message:"error"
      })
      
    }
  }
}
