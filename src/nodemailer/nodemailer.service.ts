import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Cấu hình transporter tùy thuộc vào dịch vụ email bạn sử dụng (SMTP)
      host: 'smtp.example.com', // Thay đổi bằng thông tin của SMTP server bạn sử dụng
      port: 567,
      ignoreTLS: false,
      secure: false, // t
      service: 'gmail',
      auth: {
        user:"topcvdemo@gmail.com",
        pass:"zqtpbypynqyorahr" // Thay đổi bằng mật khẩu email của bạn
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<void> {
    const mailOptions = {
      from: 'thelion2141998@gmail.com', // Địa chỉ email người gửi
      to, // Địa chỉ email người nhận
      subject, // Tiêu đề email
      text, // Nội dung dạng text
      html, // Nội dung dạng HTML
    };

    await this.transporter.sendMail(mailOptions);
  }
  }

