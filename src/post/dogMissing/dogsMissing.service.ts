import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DogsMissing } from './dogMissing.model';

@Injectable()
export class DogsMissingService {
  constructor(
    @InjectModel('DogsMissing')
    private readonly dogMissingModel: Model<DogsMissing>,
  ) {}

  async insertDogsMissing(title: string, desc: string, breed: string, imageId: string) {
    const newDogsMissing = new this.dogMissingModel({
      title,
      description: desc,
      breed,
      imageId
    });
    const result = await newDogsMissing.save();
    return result.id as string;
  }

  async getDogsMissing() {
    const dogsMissing = await this.dogMissingModel.find().exec();
    return dogsMissing.map(dogMissing => ({
      id: dogMissing.id,
      title: dogMissing.title,
      description: dogMissing.description,
      breed: dogMissing.breed,
    }));
  }

  async getSingleDogsMissing(dogMissingId: string) {
    const dogMissing = await this.findDogsMissing(dogMissingId);
    return {
      id: dogMissing.id,
      title: dogMissing.title,
      description: dogMissing.description,
      breed: dogMissing.breed,
    };
  }

  async updateDogsMissing(
    dogMissingId: string,
    title: string,
    desc: string,
    breed: string,
  ) {
    const updatedDogsMissing = await this.findDogsMissing(dogMissingId);
    if (title) {
      updatedDogsMissing.title = title;
    }
    if (desc) {
      updatedDogsMissing.description = desc;
    }
    if (breed) {
      updatedDogsMissing.breed = breed;
    }
    await updatedDogsMissing.save();
  }

  async deleteDogsMissing(dogMissingId: string) {
    const result = await this.dogMissingModel
      .deleteOne({ _id: dogMissingId })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find dogMissing.');
    }
  }

  private async findDogsMissing(id: string): Promise<DogsMissing> {
    let dogMissing;
    try {
      dogMissing = await this.dogMissingModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Dog Missing Post.');
    }
    if (!dogMissing) {
      throw new NotFoundException('Could not find Dog Missing Post.');
    }
    return dogMissing;
  }
}
