import { randomUUID } from "crypto"

export class Product{
    readonly id:string
    name: string
    description: string
    value: string
    available: boolean
    highlighted: boolean
    image: string | null
    product_url: string | null
    readonly register_date: Date
    categoryId: string
    
    constructor(){
        this.id = randomUUID()
        this.register_date = new Date()
    }
}