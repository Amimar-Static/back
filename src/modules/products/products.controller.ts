import { 
  BadRequestException,
    Body, 
    Controller, 
    Delete, 
    Get, 
    InternalServerErrorException, 
    Param, 
    Patch, 
    Post, 
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    Query
} from "@nestjs/common";
import { ProductService } from "./products.service"
import { CreateProductDto } from "./dtos/create-product.dto";
import { JwtauthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateProductDto } from "./dtos/updatproduct.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roules.guard";

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private productService : ProductService){} 

    @Post()
    @Roles(['admin'])
    @UseGuards(JwtauthGuard, RolesGuard)
    @ApiBearerAuth()
    create(@Body() data: CreateProductDto, @Request() req){
        return this.productService.create(data)
    }

    @Get()
    findAllProducts(){
        return this.productService.findAllProducts()
    }


    @Get('findAllPaged')
    findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 12) {
      return this.productService.findAll(page, limit);
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productService.findOne(id)
    }

    @Get('category/:categoryId')
    async getProductsByCategory(@Param('categoryId') categoryId: string, @Query('page') page: number = 1, @Query('limit') limit: number = 12) {
      return this.productService.getProductsByCategory(categoryId, page, limit);
    }
    
    
    @Patch(':id')
    @Roles(['admin'])
    @UseGuards(JwtauthGuard, RolesGuard)
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
      return this.productService.update(id, updateProductDto);
    }

    @Patch('upload/:id')
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
      ]),
    )
    @Roles(['admin'])
    @UseGuards(JwtauthGuard, RolesGuard)
    async upload(
      @UploadedFiles()
      files: 
      {
        image?: Express.Multer.File[];  
      },
      @Param('id') id: string,
    ) {
      try {
        // Verifique se 'files' e 'files.image' são definidos
        if (!files || !files.image || files.image.length === 0) {
          throw new BadRequestException('Image file is missing.');
        }
        const { image } = files;
  
        return this.productService.upload(image[0],  id);
      } catch (error) {
        // Trate o erro adequadamente e retorne uma resposta apropriada
        throw new InternalServerErrorException('Failed to process the image upload.');
      }
    }
    
  
    @Delete(':id')
    @Roles(['admin'])
    @UseGuards(JwtauthGuard, RolesGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
      return this.productService.remove(id);
    }

}

