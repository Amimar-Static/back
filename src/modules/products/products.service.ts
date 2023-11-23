import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsRepository } from './repositories/product.repository';

@Injectable()
export class ProductService{
    constructor(private productsRepository: ProductsRepository){}
    async create(data: CreateProductDto){
        const findProduct = await this.productsRepository.findByName(data.name)

        if(findProduct){
          throw new ConflictException("product already exists")
        }

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