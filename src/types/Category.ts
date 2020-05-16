import { Document } from 'mongoose';

export interface ICategory extends ICategoryAdd, Document {}

export interface ICategoryAdd extends ICategoryUpdate {
  title: string;
}

export interface ICategoryUpdate {
  title?: string;
  categoryId?: string;
  description?: string;
}
