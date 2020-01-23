import * as mongoose from 'mongoose';

export const DogInDangerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

export interface DogInDanger extends mongoose.Document {
  id: string;
  title: string;
  description: string;
}
