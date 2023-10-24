
const http = require('http');
const fs = require('fs');
const mysql = require('mysql2');
const c_login = require('./c_login.js');
const c_signup = require('./c_signup.js');
const c_login_page = fs.readFileSync('./frontend/src/customer_handle/loginpage.jsx');
const jwt = require('jsonwebtoken');
const customer_packages = require('./customer_packages.js');
const main_page = fs.readFileSync('./frontend/src/main_page/mainpage.jsx');
const c_mainpage = fs.readFileSync('./frontend/src/main_page/c_mainpage.jsx');

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); //This allows request to be sent from react called CORS

  const incomingToken = req.headers.authorization?.split(' ')[1]; //This checks for any incoming tokens
  if (incomingToken) {
    try {
      const decoded = jwt.verify(incomingToken, SECRET_KEY);
      const customerId = decoded.customer_id; //Store the customer_id in the token into the customerID variable
      // Now use customer_id in your SQL queries to check for packages, etc.
    } catch (err) {
      res.end('Invalid or expired token');
    }
  }


  if (req.url === "/customer_login"){ //This checks if the request is for the customer_login page
    if(req.method === "POST"){
      c_login(req,res,connection);
    }

    else {
      res.end(c_login_page);
    }
  }

  else if (req.url === "/customer_signup"){ //This checks if the request is for the customer_signup page
    if(req.method === "POST"){
      c_signup(req,res,connection);
    }

    else {
      res.end(html_c_signup)
    }
  }

  else if (req.url === "/customer_packages"){
    if(req.method === "GET"){
      customer_packages(req,res,connection, customerID);
    }

    else {
      res.end(html_c_login) //*Need to fix this */
    }
  }

  else if (req.url === "/customer_mainpage"){
    res.end(c_mainpage);
  }

  else{
    res.end(main_page);
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
