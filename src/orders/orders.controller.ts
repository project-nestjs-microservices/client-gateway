import { Controller, Get, Post, Body, Param, Inject, Query, ParseUUIDPipe, Patch } from "@nestjs/common";
import { NATS_SERVICE } from "../config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreateOrderDto, OrderPaginationDto, StatusDto } from "./dto";
import { catchError } from "rxjs";

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto)
      .pipe(
        catchError(error => { throw new RpcException(error)})
      )
  }

  @Get()
  findAll(@Query() paginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', paginationDto)
        .pipe(
            catchError(error => { throw new RpcException(error)})
        )
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', { id })
      .pipe(
        catchError(error => { throw new RpcException(error)})
      )
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto
  ) {
    return this.client.send('changeOrderStatus', { id, status: statusDto.status })
      .pipe(
        catchError(error => { throw new RpcException(error)})
      )
  }

}
