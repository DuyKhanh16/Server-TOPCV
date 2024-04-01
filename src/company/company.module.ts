import { Module, forwardRef } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/entity/company.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Notification } from 'src/entity/notification.entity';
import { CompanyCv } from 'src/entity/company_cv.entity';
import { CvModule } from 'src/cv/cv.module';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports:[TypeOrmModule.forFeature([Company]),forwardRef(() => AuthModule),
  forwardRef(() => CvModule),TypeOrmModule.forFeature([Notification]),TypeOrmModule.forFeature([CompanyCv])],
  exports:[CompanyService]
})
export class CompanyModule {}
