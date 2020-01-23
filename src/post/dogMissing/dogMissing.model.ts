import * as mongoose from 'mongoose';

export const DogsMissingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  breed: { type: String, required: true },
  imageId: { type: String, required: true },
});

export interface DogsMissing extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  breed: string;
  imageId: string;
}
