import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UersService } from './uers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CvModule } from 'src/cv/cv.module';

@Module({
  controllers: [UsersController],
  providers: [UersService],
  imports:[TypeOrmModule.forFeature([UserEntity]),forwardRef(() => AuthModule),forwardRef(()=>CvModule)],
  exports:[UersService]
})
export class UsersModule {}
