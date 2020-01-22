import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DogMissingPostsController } from './dogMissingPosts.controller';
import { DogMissingPostsService } from './dogMissingPosts.service';
import { DogMissingPostSchema } from './dogMissingPost.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'DogMissingPost', schema: DogMissingPostSchema }]),
  ],
  controllers: [DogMissingPostsController],
  providers: [DogMissingPostsService],
})
export class DogMissingPostsModule {}
