import { v4 as uuidv4 } from "uuid";

export class Specification{
    name: string;
    description: string;
    id?: string;
    created_at?: Date

    constructor() {
        if (!this.id) {
            this.id = uuidv4()
        }
        if (!this.created_at) {
            this.created_at = new Date()
        }
    }
}

