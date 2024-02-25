import { 
  Body,
    Controller, 
    Get, 
    Param, 
    Post
} from '@nestjs/common';
import { AsaasService } from './asaas.service';

@Controller('asaas')
export class AsaasController {
  constructor(private readonly asaasService: AsaasService) {}

  @Get('user/:cpfCnpj')
  async getUserByCpfCnpj(@Param('cpfCnpj') cpfCnpj: string) {
    return this.asaasService.getUserByCpfCnpj(cpfCnpj);
  }

  @Post('create-user')
  async createUserAsaas(@Body('name') name: string, @Body('cpfCnpj') cpfCnpj: string) {
    return this.asaasService.createUserAsaas(name, cpfCnpj);
  }

  @Post('create-billing')
  async createBilling(
    @Body('customer') customer: string,
    @Body('billingType') billingType: string,
    @Body('value') value: number,
    @Body('dueDate') dueDate: Date
  ) {
    return this.asaasService.createBilling(customer, billingType, value, dueDate);
  }

}