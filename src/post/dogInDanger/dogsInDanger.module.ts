import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DogsInDangerController } from './dogsInDanger.controller';
import { DogsInDangerService } from './dogsInDanger.service';
import { DogInDangerSchema } from './dogInDanger.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'DogsInDanger', schema: DogInDangerSchema },
    ]),
  ],
  controllers: [DogsInDangerController],
  providers: [DogsInDangerService],
})
export class DogsInDangerModule {}
