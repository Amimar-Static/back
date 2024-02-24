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
    
    async upload(image: Express.Multer.File, id: string) {
        // Configuração da AWS
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });

        // Criar um novo objeto S3
        const s3 = new AWS.S3();

        const findProduct = await this.productsRepository.findOne(id);
        if (!findProduct) {
            throw new NotFoundException('Product not found');
        }

        // Ler o arquivo da imagem
        const fileContent = fs.readFileSync(image.path);

        // Definir parâmetros para upload
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${id}_${path.basename(image.path)}`, // Nome do arquivo no S3
            Body: fileContent,
            ACL: 'public-read', // Defina as permissões de acesso
        };

        try {
            // Fazer upload da imagem para o S3
            const uploadResult = await s3.upload(params).promise();

            // Atualizar o produto com o URL da imagem no S3
            const updateProduct = await this.productsRepository.update(id, {
                image: uploadResult.Location,
            });

            // Excluir o arquivo local depois do upload
            fs.unlinkSync(image.path);

            return updateProduct;
        } catch (error) {
            console.error('Error uploading image to S3:', error);
            throw error;
        }
    }
}