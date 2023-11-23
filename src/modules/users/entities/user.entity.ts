import { Exclude } from "class-transformer"
import { randomUUID } from "crypto"

export class User {
    readonly id:string
    name: string

    @Exclude()
    password: string
    email: string
    phone: string
    readonly register_date: Date
    readonly account_state: string
    constructor(){
        this.id = randomUUID()
        this.register_date = new Date()
        this.account_state = 'client'
    }
}
