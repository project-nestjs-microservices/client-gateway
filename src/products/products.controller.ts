import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query
} from "@nestjs/common";
import { PRODUCT_SERVICE } from "../config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { PaginationDto } from "../common";
import { CreateProductDto } from "./dto/create-product.dto";
import { catchError } from "rxjs";
import { UpdateProductDto } from "./dto/update-product.dto";

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto){
    return this.productsClient.send({ cmd: 'create_product' }, createProductDto)
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto){
    return this.productsClient.send({ cmd: 'find_all_products'}, paginationDto)
  }

  @Get(':id')
  async findOne(@Param('id') id){

    // --- This is the short way to do it
    return this.productsClient.send({ cmd: 'find_one_product' }, { id })
      .pipe(
        catchError(error => { throw new RpcException(error)})
      )

    /* --- This is the long way to do it
      try {
        return await firstValueFrom(
          this.productsClient.send({ cmd: 'find_one_product' }, { id })
        )
      } catch (error) {
        throw new RpcException(error);
      } */
  }

  @Patch(':id')
  updateProduct(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto){
    return this.productsClient.send({ cmd: 'update_product' }, { id: +id, ...updateProductDto })
      .pipe(
        catchError(error => { throw new RpcException(error)})
      )
  }

  @Delete(':id')
  deleteProduct(@Param('id') id){
    return this.productsClient.send({ cmd: 'delete_product' }, { id })
      .pipe(
        catchError(error => { throw new RpcException(error)})
      )
  }

}
