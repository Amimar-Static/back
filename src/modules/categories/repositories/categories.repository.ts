import { Category } from "@prisma/client";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { UpdateCategoryDto } from "../dto/update-category.dto";


export abstract class CategoryRepository{
    abstract create(data: CreateCategoryDto): Promise<Category>;
    abstract findAll(): Promise<Category[]>;
    abstract findOne(id: string): Promise<Category>;
    abstract findByName(name: string): Promise<Category>;
    abstract update(id: string, data: UpdateCategoryDto): Promise<Category>;
    abstract delete(id: string): Promise<void>;
}