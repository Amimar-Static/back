import { randomUUID } from "crypto"

export class Product{
    readonly id:string
    name: string
    description: string
    value: string
    available: boolean
    category: string
    image: string | null
    product_url: string | null

    constructor(){
        this.id = randomUUID()
    }
}