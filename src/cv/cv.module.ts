import { Module, forwardRef } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from 'src/entity/cv.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [CvController],
  providers: [CvService],
  imports: [TypeOrmModule.forFeature([Cv]),forwardRef(() => UsersModule)],
  exports: [CvService],
})
export class CvModule {}
