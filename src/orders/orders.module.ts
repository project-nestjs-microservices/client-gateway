import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { envs, ORDER_SERVICE } from "../config";

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE,
        transport: Transport.TCP,
        options: {

        }
      }
    ])
  ]
})
export class OrdersModule {}
