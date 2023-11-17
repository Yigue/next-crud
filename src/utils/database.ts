import {Pool} from 'pg'
// pg es una libreria que permite la conecion a una base de datos PostSql

let conn:any
if (!conn) {
    conn = new Pool({
      user: "postgres",
      password: "test123",
      host: "localhost",
      database: "Tasks",
    });
}

export {conn}

