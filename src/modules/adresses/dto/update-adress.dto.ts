import { PartialType } from '@nestjs/mapped-types';
import { CreateAdressDto } from './create-adress.dto';

export class UpdateAdressDto extends PartialType(CreateAdressDto) {
    zipcode?: string
    state?: string 
    city?: string
    street?: string
    number?: string
    complement?: string
}
