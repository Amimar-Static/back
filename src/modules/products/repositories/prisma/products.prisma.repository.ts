import { PrismaService } from "src/database/prisma.service";
import { CreateProductDto } from "../../dtos/create-product.dto";
import { Product } from "../../entities/product.entitie";
import { ProductsRepository } from "../product.repository";
import { Injectable } from '@nestjs/common';
import { UpdateProductDto } from "../../dtos/updatproduct.dto";

export interface IResponseGetProducts{
  prevPage: string | null
  nextPage: string | null
  count: number
  data: Product[]
}

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
                available: product.available,
                highlighted: product.highlighted,
                image: product.image,
                register_date: product.register_date,
                categoryId: product.categoryId
            }
        })
        return newProduct
    }

    async findAllProducts(): Promise<Product[]> {
      const products = await this.prisma.product.findMany()
      return products
    }
    
    async findAll(page: number, limit: number): Promise<IResponseGetProducts> {
      // Verificar se a página ou o limite são menores que 1
      if (page < 1) {
          page = 1;
      }
      if (limit < 1) {
          limit = 12; // Número padrão de elementos por página
      }
      // 
      const offset = (page - 1) * limit;
      const total = await this.prisma.product.count();
      const products = await this.prisma.product.findMany({
          skip: offset,
          take: limit,
      });
  
      const baseUrl = `${process.env.BASE_URL}/products`; // Ou qualquer rota base que você esteja usando

      let prevPage = null;
      if (offset > 0) {
          prevPage = `${baseUrl}?page=${page - 1}&limit=${limit}`;
      }
  
      let nextPage = null;
      if (offset + limit < total) {
          nextPage = `${baseUrl}?page=${page + 1}&limit=${limit}`;
      }
  
      const response: IResponseGetProducts = {
          prevPage,
          nextPage,
          count: total,
          data: products,
      };
  
      return response;
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

    async update(id: string, data: UpdateProductDto): Promise<Product> {
        const product = await this.prisma.product.update({
          where: { id },
          data: { ...data },
        });
    
        return product;
      }
    async delete(id: string): Promise<void> {
        await this.prisma.product.delete({
          where: { id },
        });
      }

    async findManyByCategory(categoryId: string, page: number, limit: number) {
      if (page < 1) {
        page = 1;
      }
      if (limit < 1) {
          limit = 12; 
      }
       
      const offset = (page - 1) * limit;
      const total = await this.prisma.product.count({
        where: { categoryId }
      });
      const products = await this.prisma.product.findMany({
        where: { categoryId },
        skip: offset,
        take: limit,
      });

      const baseUrl = `${process.env.BASE_URL}/products/category/${categoryId}`;

      const prevPage = page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;

      const nextPage = offset + limit < total ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null;

      const response: IResponseGetProducts = {
          prevPage,
          nextPage,
          count: total,
          data: products,
      };
      return response;
   
    }
    
}