import { Module } from '@nestjs/common';
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { ProductsRepository } from './repositories/product.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ProductPrismaRepository } from './repositories/prisma/products.prisma.repository';

@Module({
    controllers: [ProductController],
    providers: [
        ProductService,
        PrismaService,
        {
            provide: ProductsRepository,
            useClass: ProductPrismaRepository
        }
    ]
})
export class ProductModule{}