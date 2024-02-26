import { Module } from '@nestjs/common';
import { AsaasController } from './asaas.controller';
import { AsaasService } from './asaas.service';


@Module({
  imports: [],
  controllers: [AsaasController],
  providers: [AsaasService],
})
export class AsaasModule {}