import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';

import { DogsMissingService } from './dogsMissing.service';
import { Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../../fileHandler/files.service';
import { FileResponseVm } from '../../fileHandler/view-models/file-response-vm.model';

@Controller('post/dogMissing')
export class DogsMissingController {
  constructor(private readonly dogMissingService: DogsMissingService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('file'))
  async addDogsMissing(
    @Body('title') dogMissingTitle: string,
    @Body('description') dogMissingDesc: string,
    @Body('breed') dogMissingBreed: string,
    @UploadedFiles() files,
  ) {
    const response = [];
    const imageIds = [];

    files.forEach(file => {
      const fileReponse = {
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        id: file.id,
        filename: file.filename,
        metadata: file.metadata,
        bucketName: file.bucketName,
        chunkSize: file.chunkSize,
        size: file.size,
        md5: file.md5,
        uploadDate: file.uploadDate,
        contentType: file.contentType,
      };
      response.push(fileReponse);
      imageIds.push(fileReponse.id);
    });

    const generatedId = await this.dogMissingService.insertDogsMissing(
      dogMissingTitle,
      dogMissingDesc,
      dogMissingBreed,
      imageIds[0],
    );

    response.push({ postId: generatedId });

    return response;
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
