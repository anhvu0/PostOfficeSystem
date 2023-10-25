module.exports = function(req, res, connection, customerId){

    const query = 'SELECT p.packages_id, CONCAT(p.send_f_name, " ", p.send_l_name) AS sender, CONCAT(p.receive_f_name, " ", p.receive_l_name) AS receiver, package_status FROM packages AS p JOIN customers AS c ON p.customers_send_id = c.customers_id WHERE c.customers_id = ?';
    const params = [customerId];

    connection.query(query, params, (err, result) => { //This sends the query to the database
        if (err) throw err;
    
        if (result.length > 0) { //This checks if the query returned any results
            console.log("Sending response:", JSON.stringify(result));
            res.end(JSON.stringify(result));
        } 
        else {
          res.end(JSON.stringify({ message: 'You currently do not have any packages' })); 
        }
    });
}