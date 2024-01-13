import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

@Get('/')
getAll(): any {
  return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }
}
