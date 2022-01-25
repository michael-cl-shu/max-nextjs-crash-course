import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async addProduct(title: string, description: string, price: number) {
    const newProduct = new this.productModel({ title, description, price });

    const result = await newProduct.save();

    return { id: result.id };
  }
}