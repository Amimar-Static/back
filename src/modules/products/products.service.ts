import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsRepository } from './repositories/product.repository';
import { UpdateProductDto } from './dtos/updatproduct.dto';
import { v2 as cloudinary } from 'cloudinary'; 
import { unlink } from 'node:fs';
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

    async findAllProducts(){
        return await this.productsRepository.findAllProducts()
    }

    async findAll(page: number, limit: number){
        // Verificar se a página ou o limite são menores que 1
        if (page < 1) {
            page = 1;
        }
        if (limit < 1) {
            limit = 12; // Número padrão de elementos por página
        }

        return await this.productsRepository.findAll(page, limit)
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

    async getProductsByCategory(categoryId: string, page: number, limit: number) {
        return this.productsRepository.findManyByCategory(categoryId, page, limit);
    }

    async upload(
        image: Express.Multer.File,
        id: string
    ){
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })

        const findProduct = await this.productsRepository.findOne(id)
        if(!findProduct){
            throw new NotFoundException('Product not fond')
        }

        const uploadImage = await cloudinary.uploader.upload(
            image.path,
            { resource_type: 'image'},
            (error, result) => {
                return result
            }
        )

        const updateProduct = await this.productsRepository.update(
            id,
            {
                image: uploadImage.secure_url
            }
        );

        unlink(image.path, (error) => {
            if (error) {
              console.log(error);
            }
        });


        return updateProduct
    }
}