module.exports = function(req, res, connection) {
    let query = `SELECT * FROM employees`;
    connection.query(query, (err, result) => {
        if (err) throw err;
    
        if (result.length > 0) {
          res.end(JSON.stringify(result));
        } else {
          res.end(JSON.stringify({ message: 'No employee exists' }));
        }
      });
};
