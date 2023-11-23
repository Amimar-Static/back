import { CreateProductDto } from "../../dtos/create-product.dto";
import { Product } from "../../entities/product.entitie";
import { ProductsRepository } from "../product.repository";


// export class ProductInMemoryRepository implements ProductsRepository{

//     private database: Product[] = []

//     async create(data: CreateProductDto): Promise<Product> {
//         const newProduct = new Product()
//         Object.assign(newProduct , {
//             ...data
//         })
//         this.database.push(newProduct)
//         return newProduct
//     }
//     async findAll(): Promise<Product[]> {
//         return this.database
//     }
//     async findOne(id: string): Promise<Product> {
//         const product = this.database.find(product => product.id == id )
//         return product
//     }

// }