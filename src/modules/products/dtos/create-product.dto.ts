export class CreateProductDto{
    name: string
    description: string
    value: string
    available: boolean
    category: string
    image: string | null
    product_url: string | null
    register_date: Date 
}