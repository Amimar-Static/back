import { hashSync } from "bcryptjs"
import { Transform } from "class-transformer"
import { 
    IsEmail, 
    IsNotEmpty, 
    IsString, 
    MinLength
} from "class-validator"


export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    phone: string
 

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    @Transform(({value}: {value: string}) => hashSync(value, 10), {
        groups: ["transform"]
    })
    password: string
}
