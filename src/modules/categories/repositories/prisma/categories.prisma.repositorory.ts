import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../categories.repository';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Category } from '../../entities/category.entity';

@Injectable()
export class CategoryPrismaRepository implements CategoryRepository{
    constructor(private prisma: PrismaService) {}
    async create(data: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        Object.assign(category, {
          ...data,
        });
        const newCategory = await this.prisma.category.create({
          data: { ...category },
        });
        return newCategory
    }
    async findAll(): Promise<Category[]> {
        const categories = await this.prisma.category.findMany();
        return categories
    }

    async findOne(id: string): Promise<Category> {
        const category = await this.prisma.category.findUnique({
          where: { id },
        });
        return category
    }
    async findByName(name: string): Promise<Category> {
      const category = await this.prisma.category.findUnique({
        where: { name },
      });
  
      return category;
    }
    async update(id: string, data: UpdateCategoryDto): Promise<Category> {
        const category = await this.prisma.category.update({
          where: { id },
          data: { ...data },
        });
    
        return category;
      }
      async delete(id: string): Promise<void> {
        await this.prisma.category.delete({
          where: { id },
        });
      }

}