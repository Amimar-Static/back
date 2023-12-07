import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    Request,
    UseGuards
} from "@nestjs/common";
import { ProductService } from "./products.service"
import { CreateProductDto } from "./dtos/create-product.dto";
import { JwtauthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

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
}

