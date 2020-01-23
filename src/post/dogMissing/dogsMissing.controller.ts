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

import { DogsMissingService } from './dogsMissing.service';
import { Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('post/dogMissing')
export class DogsMissingController {
  constructor(private readonly dogMissingService: DogsMissingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addDogsMissing(
    @Body('title') dogMissingTitle: string,
    @Body('description') dogMissingDesc: string,
    @Body('breed') dogMissingBreed: string,
  ) {
    const generatedId = await this.dogMissingService.insertDogsMissing(
      dogMissingTitle,
      dogMissingDesc,
      dogMissingBreed,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllDogsMissing() {
    const dogMissing = await this.dogMissingService.getDogsMissing();
    return dogMissing;
  }

  @Get(':id')
  getDogsMissing(@Param('id') dogMissingId: string) {
    Logger.log('dogMissing Id', dogMissingId);
    return this.dogMissingService.getSingleDogsMissing(dogMissingId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateDogsMissing(
    @Param('id') dogMissingId: string,
    @Body('title') dogMissingTitle: string,
    @Body('description') dogMissingDesc: string,
    @Body('breed') dogMissingBreed: string,
  ) {
    await this.dogMissingService.updateDogsMissing(
      dogMissingId,
      dogMissingTitle,
      dogMissingDesc,
      dogMissingBreed,
    );
    return null;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async removeDogsMissing(@Param('id') dogMissingId: string) {
    await this.dogMissingService.deleteDogsMissing(dogMissingId);
    return null;
  }
}
