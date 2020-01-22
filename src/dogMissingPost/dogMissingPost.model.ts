import * as mongoose from 'mongoose';

export const DogMissingPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  breed: { type: String, required: true },
});

export interface DogMissingPost extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  breed: string;
}
