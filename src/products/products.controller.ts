import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  async addProduct(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('price') price: number,
  ) {
    return await this.productService.addProduct(title, description, price);
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getProducts();
  }
}
