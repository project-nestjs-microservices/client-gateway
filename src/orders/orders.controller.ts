import { Controller, Get, Post, Body, Param, Inject, Query, ParseUUIDPipe, Patch } from "@nestjs/common";
import { ORDER_SERVICE } from "../config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreateOrderDto, OrderPaginationDto, StatusDto } from "./dto";
import { catchError } from "rxjs";

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto)
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.ordersClient.send('findAllOrders', paginationDto)
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id })
      .pipe(
        catchError(error => { throw new RpcException(error)})
      )
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    return this.ordersClient.send('changeOrderStatus', { id, status: statusDto.status })
      .pipe(
        catchError(error => { throw new RpcException(error)})
      )
  }

}
