import { ApiProperty } from "@nestjs/swagger"
import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { 
    IsEmail, 
    IsNotEmpty, 
    IsString, 
    MinLength
} from "class-validator"


export class CreateUserDto {
    
    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    phone: string
 

    @ApiProperty()
    @IsString()
    @IsEmail()
    email: string
 
    @ApiProperty() 
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    @Transform(({value}: {value: string}) => hashSync(value, 10), {
        groups: ["transform"]
    })
    password: string
}
