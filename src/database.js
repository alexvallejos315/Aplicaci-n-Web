const mysql = require("mysql");
const { conexion } = require("./keys");
const { promisify } = require("util");
const pool = mysql.createPool(conexion);
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABASE CONNECTION WAS CLOSED");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("DATABASE HAS TO MANY CONNECTIONS");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("DATABASE CONNECTION WAS REFUSED");
    }
  }

  //if (connection) connection.release(); Si hay conexión
  // entonces empieza la conexión con el método release()
  if (connection) connection.release();
  console.log("DB is Connected");
  return;
});
//Promisfy Pool Query
pool.query = promisify(pool.query);
module.exports = pool;
