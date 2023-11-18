import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsRepository } from './repositories/product.repository';

@Injectable()
export class ProductService{
    constructor(private productsRepository: ProductsRepository){}
    create(data: CreateProductDto){
        return this.productsRepository.create(data)
    }

    findAll(){
        return this.productsRepository.findAll()
    }

    findOne(id: string){
        const product = this.productsRepository.findOne(id)
        if(!product){
            throw new NotFoundException("Produto não encontrado!")
        }
        return product
    }
}