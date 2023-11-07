module.exports = function(req, res, connection, employeeId) {
    const moment = require('moment-timezone');
    const currentDate = moment.tz("America/Chicago").format('YYYY-MM-DD');

    const currentTime = moment.tz("America/Chicago").format('HH:mm:ss');	
   
    let query = 'INSERT INTO workhours(employees_id, working_date, in_hour) VALUES(?, ?, ?)';
    const params = [employeeId, currentDate, currentTime];
    connection.query(query, params, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.end(JSON.stringify({ message: 'Employee in hour recorded' }));
        } else {
            res.end(JSON.stringify({ message: 'There is a problem. Please contact your manager' }));
        }
    });
}
