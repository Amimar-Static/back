import { Module } from '@nestjs/common';
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { ProductInMemoryRepository } from './repositories/in-memory/product.in-memorey-repository';
import { ProductsRepository } from './repositories/product.repository';

@Module({
    controllers: [ProductController],
    providers: [
        ProductService,
        {
            provide: ProductsRepository,
            useClass: ProductInMemoryRepository
        }
    ]
})
export class ProductModule{}