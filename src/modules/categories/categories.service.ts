import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository){}
   async create(createCategoryDto: CreateCategoryDto) {
    const findCategory = await this.categoryRepository.findByName(createCategoryDto.name)

    if(findCategory){
      throw new ConflictException("name already exists")
    }
    const category = await this.categoryRepository.create(createCategoryDto)
    return category
  }

  async findAll() {
    return await this.categoryRepository.findAll()
  }

  async findOne(id: string) {
    const findCategory = await this.categoryRepository.findOne(id)
    if(!findCategory){
        throw new NotFoundException("Category not found!")
    }
    return findCategory
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const findCategory = await this.categoryRepository.findOne(id)
    if(!findCategory){
        throw new NotFoundException("Category not found!")
    }
    return this.categoryRepository.update(id, updateCategoryDto)

  }

  async remove(id: string) {
    const findCategory = await this.categoryRepository.findOne(id)
    if(!findCategory){
        throw new NotFoundException("Category not found!")
    }
    return this.categoryRepository.delete(id)
  }
}
