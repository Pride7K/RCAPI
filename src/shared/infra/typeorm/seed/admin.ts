import { v4 as uuidV4 } from "uuid"
import { hash } from "bcryptjs"
import createConnection from "../index"

create().then(() => console.log("Admin created"));

async function create() {

    console.log("droped")

    const connection = await createConnection("localhost");

    console.log("tt")

    const password = await hash("1234", 8)

    await connection.query(
        `INSERT INTO USERS(id,name,email,password,"isAdmin",created_at,driver_license)
         values(
            '${uuidV4()}',
            'admin',
            'admin',
            '${password}',
            true,
            'now()',
            'sdasdasdas'
        )`
    )

    await connection.close();
}