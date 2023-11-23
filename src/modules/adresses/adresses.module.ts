import { Module } from '@nestjs/common';
import { AdressesService } from './adresses.service';
import { AdressesController } from './adresses.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AdressesRepository } from './repositories/adresses.repository';
import { AdressPrismaRepository } from './repositories/prisma/adresses.prisma.repository';

@Module({
  controllers: [AdressesController],
  providers: [
    AdressesService,
    PrismaService,
    {
        provide: AdressesRepository,
        useClass: AdressPrismaRepository
    }
  ],
})
export class AdressesModule {}
