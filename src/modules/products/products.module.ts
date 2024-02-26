import { BadRequestException, Module } from '@nestjs/common';
import { ProductController } from "./products.controller";
import { ProductService } from "./products.service";
import { ProductsRepository } from './repositories/product.repository';
import { PrismaService } from 'src/database/prisma.service';
import { ProductPrismaRepository } from './repositories/prisma/products.prisma.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
    imports: [
        MulterModule.register({
          storage: diskStorage({
            destination: './tmp',
            filename: (_, file, cb) => {
              cb(null, file.originalname);
            },
          }),
          fileFilter: (_, file, cb) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'audio/mpeg' || file.mimetype === 'image/svg+xml' || file.mimetype === 'image/png') {
              cb(null, true);
            } else {
              cb(new BadRequestException('Only format allowed'), false);
            }
          },
        }),
    ],
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