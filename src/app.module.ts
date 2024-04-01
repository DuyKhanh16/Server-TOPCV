import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { UserEntity } from './entity/users.entity';
import { Company } from './entity/company.entity';
import { Apply } from './entity/apply.entity';
import { Job } from './entity/job.entity';
import { Cv } from './entity/cv.entity';
import { JobSaveUser } from './entity/job-save-user.entity';
import { Admin } from './entity/admin.entity';
import { AddressEntity } from './entity/address.entity';
import { CompanyCv } from './entity/company_cv.entity';
import { Notification } from './entity/notification.entity';
import { AuthModule } from './auth/auth.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { CvModule } from './cv/cv.module';
import { JobModule } from './job/job.module';
import { NodemailerController } from './nodemailer/nodemailer.controller';

@Module({
  imports: 
    [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Kh@nh1223',
      database: 'PRJM5_TOPCV',
      entities: [UserEntity,Company,Apply,Job,Cv,JobSaveUser,Admin,AddressEntity,
        CompanyCv,Notification],
      // synchronize: true,
    }), UsersModule, CompanyModule, AuthModule,NodemailerModule, CvModule, JobModule
  ],
  controllers: [AppController,NodemailerController],
  providers: [AppService],
})
export class AppModule {}
