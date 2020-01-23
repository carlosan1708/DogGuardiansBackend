import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DogsMissingController } from './dogsMissing.controller';
import { DogsMissingService } from './dogsMissing.service';
import { DogsMissingSchema } from './dogMissing.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DogsMissing', schema: DogsMissingSchema },
    ]),
  ],
  controllers: [DogsMissingController],
  providers: [DogsMissingService],
})
export class DogsMissingModule {}
