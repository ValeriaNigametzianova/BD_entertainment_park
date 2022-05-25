const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect:'mysql',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

// const mysql = require("mysql2");
  
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "kursovaya_park",
//   password: "зу4нчу4лф"
// });
// // тестирование подключения
//  connection.connect(function(err){
//     if (err) {
//       return console.error("Ошибка: " + err.message);
//     }
//     else{
//       console.log("Подключение к серверу MySQL успешно установлено");
//     }
//  });
 // закрытие подключения
//  connection.end(function(err) {
//   if (err) {
//     return console.log("Ошибка: " + err.message);
//   }
//   console.log("Подключение закрыто");
// });