import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete, UseGuards,
} from '@nestjs/common';

import { DogMissingPostsService } from './dogMissingPosts.service';
import { Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('dogMissingPost')
export class DogMissingPostsController {
  constructor(private readonly dogMissingPostsService: DogMissingPostsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async addDogMissingPost(
    @Body('title') dogMissingTitle: string,
    @Body('description') dogMissingDesc: string,
    @Body('breed') dogMissingBreed: string,
  ) {
    const generatedId = await this.dogMissingPostsService.insertDogMissingPost(
      dogMissingTitle,
      dogMissingDesc,
      dogMissingBreed,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllDogMissingPosts() {
    const dogMissingPosts = await this.dogMissingPostsService.getDogMissingPosts();
    return dogMissingPosts;
  }

  @Get(':id')
  getDogMissingPost(@Param('id') dogMissingId: string) {
    Logger.log('dogMissing Id', dogMissingId);
    return this.dogMissingPostsService.getSingleDogMissingPost(dogMissingId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateDogMissingPost(
    @Param('id') dogMissingId: string,
    @Body('title') dogMissingTitle: string,
    @Body('description') dogMissingDesc: string,
    @Body('breed') dogMissingBreed: string,
  ) {
    await this.dogMissingPostsService.updateDogMissingPost(
      dogMissingId,
      dogMissingTitle,
      dogMissingDesc,
      dogMissingBreed,
    );
    return null;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async removeDogMissingPost(@Param('id') dogMissingId: string) {
    await this.dogMissingPostsService.deleteDogMissingPost(dogMissingId);
    return null;
  }
}
