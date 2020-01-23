import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { DogsInDangerService } from './dogsInDanger.service';
import { Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('post/dogInDanger')
export class DogsInDangerController {
  constructor(private readonly dogInDangerService: DogsInDangerService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addDogsInDanger(
    @Body('title') dogInDangerTitle: string,
    @Body('description') dogInDangerDesc: string,
  ) {
    const generatedId = await this.dogInDangerService.insertDogInDanger(
      dogInDangerTitle,
      dogInDangerDesc,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllDogsInDanger() {
    const dogInDanger = await this.dogInDangerService.getDogsInDanger();
    return dogInDanger;
  }

  @Get(':id')
  getDogsInDanger(@Param('id') dogInDangerId: string) {
    Logger.log('dogInDanger Id', dogInDangerId);
    return this.dogInDangerService.getSingleDogInDanger(dogInDangerId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateDogsInDanger(
    @Param('id') dogInDangerId: string,
    @Body('title') dogInDangerTitle: string,
    @Body('description') dogInDangerDesc: string,
  ) {
    await this.dogInDangerService.updateDogInDanger(
      dogInDangerId,
      dogInDangerTitle,
      dogInDangerDesc,
    );
    return null;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async removeDogsInDanger(@Param('id') dogInDangerId: string) {
    await this.dogInDangerService.deleteDogInDanger(dogInDangerId);
    return null;
  }
}
