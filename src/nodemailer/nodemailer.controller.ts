import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('api/v1/nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}
  @Post('send')
  @HttpCode(HttpStatus.OK)
  async sendEmail(
    @Body() body: { to: string; subject: string; text: string; html: string },
  ) {
    const { to, subject, text, html } = body;
    await this.nodemailerService.sendMail(to, subject, text, html);
    return { message: 'Email sent successfully' };
  }
}
