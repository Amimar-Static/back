import { Injectable } from '@nestjs/common';
import { CreateAdressDto } from './dto/create-adress.dto';
import { UpdateAdressDto } from './dto/update-adress.dto';
import { AdressesRepository } from './repositories/adresses.repository';

@Injectable()
export class AdressesService {
  constructor(private adressRepository: AdressesRepository){}
  create(createAdressDto: CreateAdressDto) {
    return 'This action adds a new adress';
  }

  findAll() {
    return `This action returns all adresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adress`;
  }

  update(id: number, updateAdressDto: UpdateAdressDto) {
    return `This action updates a #${id} adress`;
  }

  remove(id: number) {
    return `This action removes a #${id} adress`;
  }
}
