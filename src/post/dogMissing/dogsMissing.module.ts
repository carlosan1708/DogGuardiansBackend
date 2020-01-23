import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DogsMissingController } from './dogsMissing.controller';
import { DogsMissingService } from './dogsMissing.service';
import { DogsMissingSchema } from './dogMissing.model';
import { GridFsMulterConfigService } from '../../fileHandler/multer-config.service';
import { MulterModule } from '@nestjs/platform-express';
import { FilesService } from '../../fileHandler/files.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DogsMissing', schema: DogsMissingSchema },
    ]),
    MulterModule.registerAsync({
      useClass: GridFsMulterConfigService,
  }),
  ],
  controllers: [DogsMissingController],
  providers: [DogsMissingService, GridFsMulterConfigService, FilesService],
})
export class DogsMissingModule {}
