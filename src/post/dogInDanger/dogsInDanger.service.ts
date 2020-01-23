import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { DogInDanger } from './dogInDanger.model';

@Injectable()
export class DogsInDangerService {
  constructor(
    @InjectModel('DogsInDanger')
    private readonly dogInDangerModel: Model<DogInDanger>,
  ) {}

  async insertDogInDanger(title: string, desc: string) {
    const newDogInDanger = new this.dogInDangerModel({
      title,
      description: desc,
    });
    const result = await newDogInDanger.save();
    return result.id as string;
  }

  async getDogsInDanger() {
    const dogsInDanger = await this.dogInDangerModel.find().exec();
    return dogsInDanger.map(dogInDanger => ({
      id: dogInDanger.id,
      title: dogInDanger.title,
      description: dogInDanger.description,
    }));
  }

  async getSingleDogInDanger(dogsInDangerId: string) {
    const dogsInDanger = await this.findDogsInDanger(dogsInDangerId);
    return {
      id: dogsInDanger.id,
      title: dogsInDanger.title,
      description: dogsInDanger.description,
    };
  }

  async updateDogInDanger(
    dogsInDangerId: string,
    title: string,
    desc: string,
  ) {
    const updatedDogsInDanger = await this.findDogsInDanger(dogsInDangerId);
    if (title) {
      updatedDogsInDanger.title = title;
    }
    if (desc) {
      updatedDogsInDanger.description = desc;
    }

    await updatedDogsInDanger.save();
  }

  async deleteDogInDanger(dogsInDangerId: string) {
    const result = await this.dogInDangerModel
      .deleteOne({ _id: dogsInDangerId })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find dog In Danger.');
    }
  }

  private async findDogsInDanger(id: string): Promise<DogInDanger> {
    let dogsInDanger;
    try {
      dogsInDanger = await this.dogInDangerModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Dog in danger Post.');
    }
    if (!dogsInDanger) {
      throw new NotFoundException('Could not find Dog in danger Post.');
    }
    return dogsInDanger;
  }
}
