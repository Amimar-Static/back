import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Request,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from "@nestjs/common";
import { ProductService } from "./products.service"
import { CreateProductDto } from "./dtos/create-product.dto";
import { JwtauthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateProductDto } from "./dtos/updatproduct.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private productService : ProductService){} 

    @Post()
    @UseGuards(JwtauthGuard)
    @ApiBearerAuth()
    create(@Body() data: CreateProductDto, @Request() req){
        return this.productService.create(data)
    }

    @Get()
    findAll(){
        return this.productService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productService.findOne(id)
    }

    @Get('category/:categoryId')
    async getProductsByCategory(@Param('categoryId') categoryId: string) {
      return this.productService.getProductsByCategory(categoryId);
    }
    
    
    @Patch(':id')
    @UseGuards(JwtauthGuard)
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
      return this.productService.update(id, updateProductDto);
    }

    @Patch('upload/:id')
    @UseInterceptors(
      FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
        // { name: 'product', maxCount: 1 },
      ]),
    )
    async upload(
      @UploadedFiles()
      files: 
      {
        image: Express.Multer.File[]; 
        // product: Express.Multer.File[] 
      },
      @Param('id') id: string,
    ) {
      const { image } = files;

      return this.productService.upload(image[0],  id);
    }
    
  
    @Delete(':id')
    @UseGuards(JwtauthGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
      return this.productService.remove(id);
    }

}

