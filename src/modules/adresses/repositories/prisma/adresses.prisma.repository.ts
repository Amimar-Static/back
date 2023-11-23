import { PrismaService } from "src/database/prisma.service";
import { CreateAdressDto } from "../../dto/create-adress.dto";
import { UpdateAdressDto } from "../../dto/update-adress.dto";
import { Adress } from "../../entities/adress.entity";
import { AdressesRepository } from "../adresses.repository";
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdressPrismaRepository implements AdressesRepository{
    constructor(private prisma: PrismaService) {}
    
    async create(data: CreateAdressDto): Promise<Adress> {
        const adress = new Adress()
        Object.assign(adress, {
            ... data
        })
        const newAdress = await this.prisma.adress.create({
            data:{
                id: adress.id,
                zipcode: adress.zipcode,
                state: adress.state,
                city: adress.city,
                street: adress.street,
                number: adress.number,
                complement: adress.complement,
                userId: adress.userId
            }
        })
        return newAdress
    }
    async findAll(): Promise<Adress[]> {
        const adresses = await this.prisma.adress.findMany()
        return adresses
    }
    async findOne(id: string): Promise<Adress> {
        const adress = await this.prisma.adress.findFirst({
            where: {id}
        })
        return adress
    }
    update(id: string, data: UpdateAdressDto): Promise<Adress> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}