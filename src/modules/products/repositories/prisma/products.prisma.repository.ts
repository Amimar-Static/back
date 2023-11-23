import { PrismaService } from "src/database/prisma.service";
import { CreateProductDto } from "../../dtos/create-product.dto";
import { Product } from "../../entities/product.entitie";
import { ProductsRepository } from "../product.repository";
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductPrismaRepository implements ProductsRepository{
    constructor(private prisma: PrismaService) {}

    async create(data: CreateProductDto): Promise<Product> {
        const product= new Product()
        Object.assign(product, {
            ... data
        })
        const newProduct = await this.prisma.product.create({
            data:{
                id: product.id,
                name: product.name,
                description: product.description,
                value: product.value,
                avaliable: product.avaliable,
                highlighted: product.highlighted,
                image: product.image,
                product_url: product.product_url,
                register_date: product.register_date,
                categoryId: product.categoryId
            }
        })
        return newProduct
    }
    async findAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany()
        return products
    }
    async findOne(id: string): Promise<Product> {
        const product = await this.prisma.product.findFirst({
            where: {id}
        })
        return product
    }
    async findByName(name: string): Promise<Product> {
        const product = await this.prisma.product.findUnique({
          where: { name },
        });
    
        return product;
      }
    
}