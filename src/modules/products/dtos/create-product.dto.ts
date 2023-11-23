import { 
    IsBoolean,
    IsNotEmpty, 
    IsOptional, 
    IsString
} from "class-validator"


export class CreateProductDto{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description: string

    @IsString()
    value: string

    @IsBoolean()
    highlighted: boolean

    @IsBoolean()
    available: boolean

    @IsString()
    @IsOptional()
    image: string | null

    @IsString()
    @IsOptional()
    product_url: string | null

    @IsString()
    categoryId: string
}