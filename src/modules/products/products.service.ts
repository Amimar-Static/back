import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsRepository } from './repositories/product.repository';
import { UpdateProductDto } from './dtos/updatproduct.dto';

@Injectable()
export class ProductService{
    constructor(private productsRepository: ProductsRepository){}

    async create(data: CreateProductDto){
        const findProduct = await this.productsRepository.findByName(data.name)

        if(findProduct){
          throw new ConflictException("Product already exists!")
        }

        return await this.productsRepository.create(data)
    }

    async findAll(){
        return await this.productsRepository.findAll()
    }

    async findOne(id: string){
        const product = await this.productsRepository.findOne(id)
        if(!product){
            throw new NotFoundException("Product not found!")
        }
        return product
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const findProduct = await this.productsRepository.findOne(id)
        if(!findProduct){
            throw new NotFoundException("Product not found!")
        }
        return this.productsRepository.update(id, updateProductDto)
    }

    async remove(id: string) {
        const findProduct = await this.productsRepository.findOne(id)
        if(!findProduct){
            throw new NotFoundException("Product not found!")
        }
        return this.productsRepository.delete(id)
    }

    async getProductsByCategory(categoryId: string) {
        return this.productsRepository.findManyByCategory(categoryId);
    }
}