import { BadRequestException, Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from 'src/database/prisma.service';
import { CategoryRepository } from './repositories/categories.repository';
import { CategoryPrismaRepository } from './repositories/prisma/categories.prisma.repositorory';
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
          cb(new BadRequestException('Only jpeg format allowed'), false);
        }
      },
    }),
],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    PrismaService,
    {
        provide: CategoryRepository,
        useClass: CategoryPrismaRepository
    }
  ],
})
export class CategoriesModule {}
