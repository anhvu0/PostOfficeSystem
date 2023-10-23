// Description: This file is used to handle the login request from the client.
const jwt = require('jsonwebtoken');

const secretKey = '3380team3' //This is the secret key used to sign the JWT (important)

module.exports = function(req,res,connection){
    var jsonString = '';
      try{ //This try-catch block is used to catch any errors that may occur
        req.on('data', function (data) {    //This takes the data from the client
          jsonString += data;               //and stores it in a string
        });

        req.on('end', function () {         //This is called when the client is done sending data
          parsedData = JSON.parse(jsonString);  //This parses the string into a JSON object
          if (!parsedData.username || !parsedData.password) {  //This checks if the JSON object has the required fields
            res.end(JSON.stringify({ message: 'Invalid input' })); 
            return;
          };
          const query = `SELECT * FROM customers WHERE c_username = ? AND c_password = ?`; //This is the query to be sent to the database
          const params = [parsedData.username, parsedData.password]; //This is the parameters to be sent to the database. They will replace the '?'s in the query

          connection.query(query, params, (err, result) => { //This sends the query to the database
            if (err) throw err;
        
            if (result.length > 0) { //This checks if the query returned any results
              const token = jwt.sign({ customer_id: 'yourCustomerID' }, SECRET_KEY, { expiresIn: '2h' });
              res.setHeader('Authorization', `Bearer ${token}`);
              res.end(JSON.stringify({ message: 'Login successful', token }));
            } 
            else {
              res.end(JSON.stringify({ message: 'Login failed' })); 
            } 
          });
        });
      }
      catch(error){ //This catches any errors that may occur
        console.log(error); 
      }
}