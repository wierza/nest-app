import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ParseUUIDPipe, NotFoundException } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

  @Get('/')
  getAll(): any {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }
}
