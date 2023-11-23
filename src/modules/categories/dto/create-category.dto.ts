import { 
    IsNotEmpty, 
    IsOptional, 
    IsString
} from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string 

    @IsString()
    @IsOptional()
    image: string

    @IsString()
    @IsOptional()
    category_url: string
}
