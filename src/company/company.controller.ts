import { Body, Controller, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from './dto/company.dto';

@Controller('api/v1/company')
export class CompanyController {
    constructor( private companyService: CompanyService) {}

    @Get("list")
    async getListCompany(@Res() res,@Query("limit") limit:string) {
        
        const result= await this.companyService.getAllCompany(Number(limit));
        return res.status(200).json({
            message:"success",
            data:result
        })
    }

    @Get("one/:id")
    async getInforOneCompany(@Res() res,@Param("id") id:string) {
        const result= await this.companyService.getInforOneCompany(Number(id))
        
        return res.status(200).json({
            message:"Lấy tuyển dụng thành công",
            data:result
        })
        
    }

    @Post('register')
    async register(@Body() data: RegisterCompanyDto,@Res() res) {
                
        const checkCompany=await this.companyService.getCompanyByEmail(data.company_email);
        if (checkCompany) {
            return res.status(400).json({
                message: 'Email đã được đăng ký',
            });
        }
        const result= await this.companyService.createCompany(data);
        return res.status(201).json({
            message:"Đăng ký thành công",
        })
    }
    @Put('update-info/:id')
    async updateInfor(@Param('id') id: number, @Body() data: any, @Res() res) {
        try {
            await this.companyService.updateInfor(id, data);
            return res.status(201).json({
                message: 'Cập nhật thông tin thành công',
            })
        } catch (error) {
            console.log(error);
            
        }
    }

    @Put('update-backgroud/:id')
    async updateBackgroud(@Param('id') id: number, @Body("company_bacgroundPhoto") company_bacgroundPhoto: string, @Res() res) {
        
        try {
         const result=   await this.companyService.updateBackground(id, company_bacgroundPhoto);
         
            return res.status(201).json({
                message: 'Cập nhật background thành công',
            })
        } catch (error) {
            console.log(error);
            
        }
    }
    @Put('update-avatar/:id')
    async updateAvatar(@Param('id') id: number, @Body("company_avatar") company_avatar: string, @Res() res) {
        
        try {
         const result=   await this.companyService.updateAvatar(id, company_avatar);
         
            return res.status(201).json({
                message: 'Cập nhật ảnh đại diện thành công',
            })
        } catch (error) {
            console.log(error);
            
        }
    }
    @Put("create-seen-cv")
    async createSeenCv(@Body() data: any, @Res() res) {
        try {
            await this.companyService.createSeenCv(data);
            return res.status(201).json({
                message: 'success',
            })
        } catch (error) {
            console.log(error);
            
        }
    }
}
