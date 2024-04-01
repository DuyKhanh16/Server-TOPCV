import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CompanyService } from 'src/company/company.service';
import { RegisterDto } from 'src/users/dto/register.dto';
import { UersService } from 'src/users/uers.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
 
  constructor(
    private readonly usersRepository: UersService,
     private readonly companyRepository: CompanyService,
     private readonly jwtService: JwtService
     
  ) {}

  async CreatUserGoogle(data: RegisterDto) {
    const hashPassword=await argon2.hash(data.user_password);
    const newData={...data,user_password:hashPassword}
    const user = await this.usersRepository.createUser(newData)
    return user
  }

  verifyAccessToken(token) {
    return this.jwtService.verify(token, {
      secret: 'token',
    });
  }
}
