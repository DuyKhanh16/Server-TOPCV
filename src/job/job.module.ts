import { Module, forwardRef } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from 'src/entity/job.entity';
import { CompanyModule } from 'src/company/company.module';
import { JobSaveUser } from 'src/entity/job-save-user.entity';
import { UsersModule } from 'src/users/users.module';
import { Apply } from 'src/entity/apply.entity';
import { CvModule } from 'src/cv/cv.module';
import { Notification } from 'src/entity/notification.entity';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [TypeOrmModule.forFeature([Job]),forwardRef(() => CompanyModule),
  TypeOrmModule.forFeature([JobSaveUser]),forwardRef(()=>CvModule), TypeOrmModule.forFeature([Notification]),
  TypeOrmModule.forFeature([Apply]),forwardRef(() => UsersModule)],
})
export class JobModule {}
