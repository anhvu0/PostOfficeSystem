const http = require('http');
const fs = require('fs');
const mysql = require('mysql2');
const c_login = require('./c_login.js');
const c_signup = require('./c_signup.js');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vietnamese123',
  database: 'PostOffice'
});
// connect to the MySQL database
connection.connect((error) => {
if (error) {
  console.error('Error connecting to MySQL database:', error);
} else {
  console.log('Connected to MySQL database!');
}
});
// close the MySQL connection
// connection.end();

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => { 
  if (req.url === "/customer_login"){ //This checks if the request is for the customer_login page
    if(req.method === "POST"){
      c_login(req,res,connection);
    }
  }

  else if (req.url === "/customer_signup"){ //This checks if the request is for the customer_signup page
    if(req.method === "POST"){
      c_signup(req,res,connection);
    }
  }

  else{
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello World \n');
    res.end()
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
