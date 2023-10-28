const jwt = require('jsonwebtoken');
const SECRET_KEY = '3380team3' //This is the secret key used to sign the JWT (important)

module.exports = function(req, res, connection) {
    var jsonString = '';
        try {
            req.on('data', function (data) {
                jsonString += data;
            });

            req.on('end', function () {
                parsedData = JSON.parse(jsonString);
                if (!parsedData.username || !parsedData.password) {
                    res.end(JSON.stringify({ message: 'Invalid input'}));
                    return;
                };
                const query = `SELECT * FROM employees WHERE e_username = ? AND e_password = ?`;
                const params = [parsedData.username, parsedData.password];

                connection.query(query, params, (err, result) => { //This sends the query to the database
                    if (err) throw err;
                
                    if (result.length > 0) { //This checks if the query returned any results
                      employees_id = result[0].employees_id;
                      const token = jwt.sign({ employees_id }, SECRET_KEY, { expiresIn: '2h' }); //This signs a JWT token with the employee_id and the secret key
                      res.setHeader('Authorization', `Bearer ${token}`);
                      res.end(JSON.stringify({ message: 'Login successful', status:true, token, role:result[0].e_role}));
                    } 
                    else {
                      res.end(JSON.stringify({ message: 'Login failed, check your username and password again.' })); 
                    } 
                  });
            });
        }
        catch(error) {
            console.log(error);
            res.end(JSON.stringify({ message: 'An error occurred.' }));
        }
}