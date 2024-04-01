import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { NodemailerController } from './nodemailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[MailerModule.forRoot({
    transport:{
       host:"smtp.gmail.com",
      ignoreTLS:false,
      secure:false,
      auth:{
        user:"topcvdemo@gmail.com",
        pass:"zqtpbypynqyorahr"
      }
    },
    defaults:{
      from: '"No Reply" <noreply@example.com>', 
    }
    
  }), ],
  controllers: [NodemailerController],
  providers: [NodemailerService],
 
  exports:[NodemailerService]
})
export class NodemailerModule {}
