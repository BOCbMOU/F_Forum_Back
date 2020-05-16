import * as mongoose from 'mongoose';
import { ICategoryAdd, ICategory, ICategoryUpdate } from '../types/Category';

export const schema = new mongoose.Schema(
  {
    title: { type: String, trim: true, unique: false, required: true },
    categoryId: { type: String, trim: true, unique: false, required: false },
    description: {
      type: String,
      trim: true,
      unique: false,
      required: false,
      default: '',
    },
  },
  { timestamps: true }
);

const Model = mongoose.model('Category', schema);

// add
export const addCategory = async (model: ICategoryAdd) =>
  (new Model(model).save() as unknown) as ICategory;

// update
export const updateCategory = async (_id: string, update: ICategoryUpdate) =>
  (Model.findOneAndUpdate({ _id }, update, {
    new: true,
  }) as unknown) as ICategory;

// get
export const getCategoryById = async (_id: string) =>
  (Model.findById(_id) as unknown) as ICategory;

export const getCategoriesByTitle = async (
  title: string,
  { skip, limit }: { skip: number; limit: number }
) =>
  (Model.find({ title }, null, { skip, limit }).sort({
    createdAt: 1,
  }) as unknown) as ICategory[];

export const getCategoriesByCategoryId = async (
  categoryId: string,
  { skip, limit }: { skip: number; limit: number }
) =>
  (Model.find({ categoryId }, null, { skip, limit }).sort({
    createdAt: 1,
  }) as unknown) as ICategory[];
