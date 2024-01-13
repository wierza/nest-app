import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';
import { CreateOrderDTO } from 'src/products/dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');
    this.ordersService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  public create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }
}
