import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsRepository } from './repositories/product.repository';

@Injectable()
export class ProductService{
    constructor(private productsRepository: ProductsRepository){}
    async create(data: CreateProductDto){
        return await this.productsRepository.create(data)
    }

    async findAll(){
        return await this.productsRepository.findAll()
    }

    async findOne(id: string){
        const product = await this.productsRepository.findOne(id)
        if(!product){
            throw new NotFoundException("Produto não encontrado!")
        }
        return product
    }
}