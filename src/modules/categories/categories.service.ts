import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './repositories/categories.repository';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as path from 'path';

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


async upload(image: Express.Multer.File, id: string) {
  // Configuração da AWS
  AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  // Criar um novo objeto S3
  const s3 = new AWS.S3();

      const findcategory = await this.categoryRepository.findOne(id)
    if(!findcategory){
        throw new NotFoundException('category not fond')
    }
  // const findProduct = await this.productsRepository.findOne(id);
  // if (!findProduct) {
  //     throw new NotFoundException('Product not found');
  // }

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
      const updateCategory = await this.categoryRepository.update(id, {
          image: uploadResult.Location,
      });

      // Excluir o arquivo local depois do upload
      fs.unlinkSync(image.path);

      return updateCategory;
  } catch (error) {
      console.error('Error uploading image to S3:', error);
      throw error;
  }
}
}
