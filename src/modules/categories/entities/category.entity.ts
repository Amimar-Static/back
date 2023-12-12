import { randomUUID } from "node:crypto"

export class Category {
    readonly id:string
    name: string
    image: string

    constructor(){
        this.id = randomUUID()
    }
}
