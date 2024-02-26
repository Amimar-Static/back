import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { CreateProductDto } from './dtos/create-product.dto'
import { ProductsRepository } from './repositories/product.repository'
import { UpdateProductDto } from './dtos/updatproduct.dto'
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

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
        if (page < 1) {
            page = 1;
        }
        if (limit < 1) {
            limit = 12; 
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
    
    async upload(image: Express.Multer.File, id: string) {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });

        const s3 = new AWS.S3();

        const findProduct = await this.productsRepository.findOne(id);
        if (!findProduct) {
            throw new NotFoundException('Product not found');
        }

        const fileContent = fs.readFileSync(image.path);

        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${id}_${path.basename(image.path)}`, 
            Body: fileContent,
            ACL: 'public-read', 
        };

        try {
            const uploadResult = await s3.upload(params).promise();

            const updateProduct = await this.productsRepository.update(id, {
                image: uploadResult.Location,
            });

            fs.unlinkSync(image.path);

            return updateProduct;
        } catch (error) {
            console.error('Error uploading image to S3:', error);
            throw error;
        }
    }
}