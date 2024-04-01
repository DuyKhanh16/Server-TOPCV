import { Body, Controller, Get, Param, Patch, Post, Put, Res } from '@nestjs/common';
import { UersService } from './uers.service';
import { RegisterDto } from './dto/register.dto';
import * as argon2 from 'argon2';
import { CvService } from 'src/cv/cv.service';
import { log } from 'console';

@Controller('api/v1/users')
export class UsersController {
  constructor(
    private usersService: UersService,
    private cvService: CvService,
  ) {}

  @Post('register')
  async register(@Body() data: RegisterDto, @Res() res) {
    const checkUser = await this.usersService.getUserByEmail(data.user_email);
    if (checkUser) {
      return res.status(400).send({
        message: 'Email đã tồn tại! ',
      });
    }
    const hasdPassword = await argon2.hash(data.user_password);
    const newData = { ...data, user_password: hasdPassword };
    const result = await this.usersService.createUser(newData);
    return res.status(201).send({
      message: 'Đăng ký thành công',
    });
  }

  @Put('inforedit/:id')
  async editInfor(@Body() data: any, @Param() param: any, @Res() res) {
    const result = await this.usersService.uploadInfor(data, param);
    return res.status(201).json({
      message: 'Thông tin đã được cập nhật',
    });
  }
  @Put('updatepassword/:id')
  async editPassword(@Body() data: any, @Param() param: any, @Res() res) {
    const result = await this.usersService.getUserById(param.id);
    const checkPassword = await argon2.verify(
      result.user_password,
      data.oldPassword,
    );
    if (!checkPassword) {
      return res.status(400).json({
        messgae: 'Sai mật khẩu',
      });
    }
    const newhash = await argon2.hash(data.newPassword);
    const result1 = await this.usersService.updatePassword(newhash, param.id);
    return res.status(201).json({
      message: 'Thay đổi mật khẩu thành cồng',
    });
  }
  @Patch('recruitment/:id')
  async updateRecruitment(
    @Body() data: any,
    @Param('id') id: string,
    @Res() res,
  ) {
    if (data.user_recruitment == 0) {
      try {
        await this.usersService.updateRecruitment(
          data.user_recruitment,
          Number(id),
        );
        await this.cvService.resetStatus(Number(id));
      } catch (error) {
        console.log(error);
      }
      return res.status(201).json({
        message: 'Tắt chế độ tìm việc thành công',
      });
    }
    try {
      await this.usersService.updateRecruitment(
        data.user_recruitment,Number(id),
      )
      await this.cvService.activeJob(data.cv_id)
    } catch (error) {
      log(error);
    }
    return res.status(201).json({
      message:"Bật thành công chế độ tìm việc"
    })
  }
 
}
