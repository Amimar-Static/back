import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Patch, 
    Post, 
    Request,
    UseGuards
} from "@nestjs/common";
import { ProductService } from "./products.service"
import { CreateProductDto } from "./dtos/create-product.dto";
import { JwtauthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UpdateProductDto } from "./dtos/updatproduct.dto";

@ApiTags('Products')
@Controller('products')
export class ProductController {
    constructor(private productService : ProductService){} 

    @Post()
    @UseGuards(JwtauthGuard)
    @ApiBearerAuth()
    create(@Body() data: CreateProductDto, @Request() req){
        console.log(req.user)
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
  
    @Delete(':id')
    @UseGuards(JwtauthGuard)
    @ApiBearerAuth()
    remove(@Param('id') id: string) {
      return this.productService.remove(id);
    }

}

