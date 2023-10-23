module.exports = function(req, res, connection, customerID){

    const query = 'SELECT p.packages_id, Fname, Lname, package_status FROM packages AS p JOIN customers AS c ON p.customers_send_id = c.customer_id WHERE c.customer_id = ?';
    const params = [customerID];

    connection.query(query, params, (err, result) => { //This sends the query to the database
        if (err) throw err;
    
        if (result.length > 0) { //This checks if the query returned any results
            res.end(JSON.stringify(result));
        } 
        else {
          res.end(JSON.stringify({ message: 'You currently do not have any packages' })); 
        }
    });
}