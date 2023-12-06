import { Exclude } from "class-transformer"
import { randomUUID } from "crypto"

export class User {
    readonly id:string
    name: string
    email: string
    phone: string
    readonly register_date: Date
    readonly account_state: string
    
    @Exclude()
    password: string


    constructor(){
        this.account_state = 'client'
        this.id = randomUUID()
        this.register_date = new Date()
    }
}
