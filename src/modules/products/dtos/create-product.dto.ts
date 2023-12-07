import { ApiProperty } from "@nestjs/swagger"
import { 
    IsBoolean,
    IsNotEmpty, 
    IsOptional, 
    IsString
} from "class-validator"


export class CreateProductDto{
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsString()
    value: string

    @ApiProperty()
    @IsBoolean()
    highlighted: boolean

    @ApiProperty()
    @IsBoolean()
    available: boolean

    @ApiProperty()
    @IsString()
    @IsOptional()
    image: string | null

    @ApiProperty()
    @IsString()
    @IsOptional()
    product_url: string | null

    @ApiProperty()
    @IsString()
    categoryId: string
}