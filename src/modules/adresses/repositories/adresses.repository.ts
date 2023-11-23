import { CreateAdressDto } from "../dto/create-adress.dto";
import { UpdateAdressDto } from "../dto/update-adress.dto";
import { Adress } from "../entities/adress.entity";


export abstract class AdressesRepository{
    abstract create(data: CreateAdressDto): Promise<Adress>; 
    abstract findAll(): Promise<Adress[]>;
    abstract findOne(id: string): Promise<Adress>;
    abstract update(id: string, data: UpdateAdressDto): Promise<Adress>;
    abstract delete(id: string): Promise<void>;
}