import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post 
} from "@nestjs/common";
import { ProductService } from "./products.service"
import { CreateProductDto } from "./dtos/create-product.dto";

@Controller('products')
export class ProductController {
    constructor(private productService : ProductService){} 

    @Post()
    create(@Body() data: CreateProductDto){
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

