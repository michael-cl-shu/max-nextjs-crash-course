import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getProducts() {
    const products = (await this.productModel.find()) as Product[];
    return products.map((prod) => this.mapProduct(prod));
  }

  async getProductById(id: string) {
    let product;

    try {
      product = await this.productModel.findById(id);
      return this.mapProduct(product);
    } catch (error) {
      throw new NotFoundException(`Can not find the product id: ${id}`);
    }
  }

  async updateProductById(
    id: string,
    title: string,
    description: string,
    price: number,
  ) {
    const result = await this.productModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        price,
      },
      { new: true },
    );

    return this.mapProduct(result);
  }

  private mapProduct(prod: any) {
    return {
      id: prod.id,
      title: prod.title,
      description: prod.description,
      price: prod.price,
    };
  }
}
