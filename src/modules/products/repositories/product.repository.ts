import { CreateProductDto } from "../dtos/create-product.dto"
import { UpdateProductDto } from "../dtos/updatproduct.dto"
import { Product } from "../entities/product.entitie"
import { IResponseGetProducts } from "./prisma/products.prisma.repository"

export abstract class ProductsRepository{
    abstract create(data: CreateProductDto): Promise<Product>
    abstract findAll(page: number, limit: number): Promise<IResponseGetProducts>
    abstract findAllProducts(): Promise<Product[]>
    abstract findOne(id: string): Promise<Product>
    abstract findByName(name: string): Promise<Product>;
    abstract findManyByCategory(categoryId: string,  page: number, limit: number): Promise<IResponseGetProducts>
    abstract update(id: string, data: UpdateProductDto): Promise<Product>;
    abstract delete(id: string): Promise<void>;
}