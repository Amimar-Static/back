import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AsaasService {
  private readonly baseUrl = 'https://sandbox.asaas.com/api/v3';
  //https://www.asaas.com/api/v3

  async getUserByCpfCnpj(cpfCnpj: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/customers?cpfCnpj=${cpfCnpj}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept':  'application/json',
            'access_token': process.env.ACCESS_TOKEN_ASAAS,
        },
      });
      const user = response.data
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error getting user by CPF/CNPJ from Asaas: ${error.message}`);
    }
  }

  async createUserAsaas(name: string, cpfCnpj: string): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/customers`, {
        name: name,
        cpfCnpj: cpfCnpj
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept':  'application/json',
          'access_token': process.env.ACCESS_TOKEN_ASAAS,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }
  
 
  async createBilling(
    customer: string, 
    billingType: string,
    value: number,
    dueDate: Date
    ): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/payments`, {
        customer: customer,
        billingType: billingType,
        value: value,
        dueDate: dueDate
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept':  'application/json',
          'access_token': process.env.ACCESS_TOKEN_ASAAS,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error: ${error.message}`);
    }
  }

}