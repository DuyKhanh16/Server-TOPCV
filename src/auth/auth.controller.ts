import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {  RegisterDto } from 'src/users/dto/register.dto';
import { UersService } from 'src/users/uers.service';
import { CompanyService } from 'src/company/company.service';
import { JwtService } from '@nestjs/jwt';
import { LoginCompanyDto, LoginUserDto } from './dto/create-auth.dto';
import { verify } from 'argon2';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';


@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly usersservice: UersService,
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
    // private readonly nodeMailerService:NodemailerService
    )
   {}


  @Post("loginGoogle")
  async loginGoogle(@Body() data: RegisterDto, @Res() res:any) {
  const user = await this.usersservice.getUserByEmail(data.user_email);
  
  if (user) {
    const token = await this.jwtService.sign({user},{
      expiresIn: '1d',
       secret: 'token',});
   return res.status(200).json({
      message:"Đăng nhập thành công",
      token: token,
      data:user
    })
  }
  const newUser= await this.authService.CreatUserGoogle(data);
  const newId=newUser.generatedMaps[0].user_id
  const result= await this.usersservice.getUserById(newId)
    const token = await this.jwtService.sign({result},{
        secret: 'token',});
    const senmail={
      name:data.user_fullName,
      mail:data.user_email,
      password:data.user_password
    }
    //  const result1 =await this.nodeMailerService.sendMail(senmail)
   return  res.status(201).json({
      message:"Đăng nhập thành công",
      token: token,
      data:result
    })
  }

  @Post("users")
  async login(@Body() data: LoginUserDto, @Res() res:any) {
    const checkUser:any= await this.usersservice.getUserByEmail(data.user_email);
    const checkPassword= checkUser && await verify(checkUser.user_password, data.user_password)

    if (!checkUser || !checkPassword) {
      return res.status(400).json({
        message: 'Email and password chưa được đăng ký',
      })
    }

    const token = await this.jwtService.signAsync({checkUser},{
      // expiresIn: '1d',
       secret: 'token'
      });

    return res.status(200).json({
      message:"Đăng nhập thành công",
      token: token,
      data:checkUser
    })
  }

  // @Post("company")
  // async loginCompany(@Body() data:any,@Res()res){
  //   console.log(data);
    
  //   const checkCompany= await this.companyService.getCompanyByEmail(data.comany_email)
  //   const verifyPassword=checkCompany && await verify(checkCompany.company_password,data.company_password)
  //   if (!checkCompany||!verifyPassword) {
  //     return res.status(400).json({
  //       message:"Sai tài khoản hoặc mật khẩu"
  //     })
  //   }
  //   const token = await this.jwtService.signAsync({checkCompany},{
  //      secret: 'token'
  //     });
  //   return res.status(200).json({
  //     message:"Đăng nhập thành công",
  //     token:token,
  //     data:checkCompany
  //   })
  // }
  @Post("company")
  async loginCompany(@Body() data: LoginCompanyDto, @Res() res:any) {
    const checkCompany:any= await this.companyService.getCompanyByEmail(data.company_email);
    const checkPassword= checkCompany && await verify(checkCompany.company_password, data.company_password)
    if (!checkCompany||!checkPassword) {
          return res.status(400).json({
            message:"Sai tài khoản hoặc mật khẩu"
          })
        }
        const token = await this.jwtService.signAsync({checkCompany},{
           secret: 'token'
          });
        return res.status(200).json({
          message:"Đăng nhập thành công",
          token:token,
          data:checkCompany
        })
  }

}


