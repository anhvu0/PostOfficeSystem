module.exports = function(req, res, connection) {
    const query = `
    SELECT 
    p.packages_id, 
    CONCAT(p.send_f_name, " ", p.send_l_name) AS sender, 
    CONCAT(p.receive_f_name, " ", p.receive_l_name) AS receiver,
    CONCAT(a1.street_address, ", ", a1.city, ", ", a1.state, ", ", a1.zip) AS from_address,
    CONCAT(a2.street_address, ", ", a2.city, ", ", a2.state, ", ", a2.zip) AS to_address,
    p.package_status,
    p.employees_handle_id
  FROM packages AS p
  JOIN address AS a1 ON p.address_from_id = a1.address_id
  JOIN address AS a2 ON p.address_to_id = a2.address_id;`;
  
    connection.query(query, (err, result) => {
      if (err) throw err;
  
      if (result.length > 0) {
        res.end(JSON.stringify(result));
      } else {
        res.end(JSON.stringify({ message: 'You currently do not have any packages' }));
      }
    });
  };
  
  
  
  
  
  