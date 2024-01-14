import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../shared/services/prisma.service';
import { Order } from '@prisma/client'

@Injectable()
export class OrdersService {
    constructor(private prismaService: PrismaService) {}

    public getAll(): Promise<Order[]> {
        return this.prismaService.order.findMany({ include: { product: true } });
      }

      public getById(id: Order['id']): Promise<Order | null> {
        return this.prismaService.order.findUnique({
          where: { id },
          include: { product: true },
        });
    }

    public deleteById(id: Order['id']): Promise<Order> {
        return this.prismaService.order.delete({
        where: { id },
        });
    }

    public create(
        orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
      ): Promise<Order> {
        const { productId, ...otherData } = orderData;
        return this.prismaService.order.create({
          data: {
            ...otherData,
            product: {
              connect: { id: productId },
            },
          }
        });
    }
      
    public updateById(
        id: Order['id'],
        orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
      ): Promise<Order> {
        const { productId, ...otherData } = orderData;
        return this.prismaService.order.update({
          where: { id },
          data: {
            ...otherData,
            product: {
              connect: { id: productId },
            },
          },
        });
    }
}
