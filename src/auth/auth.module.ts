import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { CompanyModule } from 'src/company/company.module';
import { JwtModule } from '@nestjs/jwt';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [forwardRef(() => UsersModule),forwardRef(()=>NodemailerModule), forwardRef(() => CompanyModule), JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
