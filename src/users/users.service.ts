import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { DogMissingPost } from '../dogMissingPost/dogMissingPost.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findOneByEmail(email): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
