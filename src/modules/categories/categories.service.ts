import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/categories.repository';
import { v2 as cloudinary } from 'cloudinary'; 
import { unlink } from 'node:fs';

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

  async upload(
    image: Express.Multer.File,
    id: string
){
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    })

    const findcategory = await this.categoryRepository.findOne(id)
    if(!findcategory){
        throw new NotFoundException('category not fond')
    }

    const uploadImage = await cloudinary.uploader.upload(
        image.path,
        { resource_type: 'image'},
        (error, result) => {
            return result
        }
    )

    const updateCategory = await this.categoryRepository.update(
        id,
        { image: uploadImage.secure_url},
    );

    unlink(image.path, (error) => {
        if (error) {
          console.log(error);
        }
    });


    return updateCategory
}
}
