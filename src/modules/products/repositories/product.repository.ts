import { CreateProductDto } from "../dtos/create-product.dto"
import { Product } from "../entities/product.entitie"

export abstract class ProductsRepository{
    abstract create(data: CreateProductDto): Promise<Product>
    abstract findAll(): Promise<Product[]>
    abstract findOne(id: string): Promise<Product>
    abstract findByName(name: string): Promise<Product>;
}