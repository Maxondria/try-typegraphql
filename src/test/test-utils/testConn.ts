import { createConnection } from "typeorm";

export const testConn = function(drop: boolean = false) {
  return createConnection({
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "max",
    password: "maxondria",
    database: "typegraphql_sample_test",
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + "/../entity/*.*"]
  });
};
