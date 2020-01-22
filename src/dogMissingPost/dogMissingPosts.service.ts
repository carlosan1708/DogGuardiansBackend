import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DogMissingPost } from './dogMissingPost.model';

@Injectable()
export class DogMissingPostsService {
  constructor(
    @InjectModel('DogMissingPost') private readonly dogMissingPostModel: Model<DogMissingPost>,
  ) {}

  async insertDogMissingPost(title: string, desc: string, breed: string) {
    const newDogMissingPost = new this.dogMissingPostModel({
      title,
      description: desc,
      breed,
    });
    const result = await newDogMissingPost.save();
    return result.id as string;
  }

  async getDogMissingPosts() {
    const dogMissingPosts = await this.dogMissingPostModel.find().exec();
    return dogMissingPosts.map(dogMissingPost => ({
      id: dogMissingPost.id,
      title: dogMissingPost.title,
      description: dogMissingPost.description,
      breed: dogMissingPost.breed,
    }));
  }

  async getSingleDogMissingPost(dogMissingId: string) {
    const dogMissingPost = await this.findDogMissingPost(dogMissingId);
    return {
      id: dogMissingPost.id,
      title: dogMissingPost.title,
      description: dogMissingPost.description,
      breed: dogMissingPost.breed,
    };
  }

  async updateDogMissingPost(
    dogMissingId: string,
    title: string,
    desc: string,
    breed: string,
  ) {
    const updatedDogMissingPost = await this.findDogMissingPost(dogMissingId);
    if (title) {
      updatedDogMissingPost.title = title;
    }
    if (desc) {
      updatedDogMissingPost.description = desc;
    }
    if (breed) {
      updatedDogMissingPost.breed = breed;
    }
    await updatedDogMissingPost.save();
  }

  async deleteDogMissingPost(dogMissingId: string) {
    const result = await this.dogMissingPostModel.deleteOne({_id: dogMissingId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find dogMissingPost.');
    }
  }

  private async findDogMissingPost(id: string): Promise<DogMissingPost> {
    let dogMissingPost;
    try {
      dogMissingPost = await this.dogMissingPostModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Dog Missing Post.');
    }
    if (!dogMissingPost) {
      throw new NotFoundException('Could not find Dog Missing Post.');
    }
    return dogMissingPost;
  }
}
