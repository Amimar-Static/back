import { CreateProductDto } from "../dtos/create-product.dto"
import { UpdateProductDto } from "../dtos/updatproduct.dto"
import { Product } from "../entities/product.entitie"

export abstract class ProductsRepository{
    abstract create(data: CreateProductDto): Promise<Product>
    abstract findAll(): Promise<Product[]>
    abstract findOne(id: string): Promise<Product>
    abstract findByName(name: string): Promise<Product>;
    abstract findManyByCategory(categoryId: string): Promise<Product[]>
    abstract update(id: string, data: UpdateProductDto): Promise<Product>;
    abstract delete(id: string): Promise<void>;
}