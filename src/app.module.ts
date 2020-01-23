import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsMissingModule } from './post/dogMissing/dogsMissing.module';
import { DogsInDangerModule } from './post/dogInDanger/dogsInDanger.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './fileHandler/files.module';

@Module({
  imports: [
    DogsMissingModule,
    MongooseModule.forRoot('mongodb://localhost/mongodb'),
    AuthModule,
    UsersModule,
    FilesModule,
    DogsInDangerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
