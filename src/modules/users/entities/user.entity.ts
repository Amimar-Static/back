import { randomUUID } from "crypto"

export class User {
    readonly id:string
    name: string
    password: string
    mail: string

    constructor(){
        this.id = randomUUID()
    }
}
