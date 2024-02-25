import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import {AsaasModule} from './modules/asaas/asaas.module'


@Module({
  imports: [
    ProductModule, 
    UsersModule, 
    CategoriesModule, 
    AuthModule,
    AsaasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
