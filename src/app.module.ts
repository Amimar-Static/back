import { Module } from '@nestjs/common';
import { ProductModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ProductModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
