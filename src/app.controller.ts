import {Controller, Get, Header} from '@nestjs/common';
import {AppService} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): { name: string } {
    return {name: 'roy'};
    // return this.appService.getHello();
  }
}
