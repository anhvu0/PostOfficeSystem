module.exports = function(req, res, connection, employeeId) {
    const currentDate = new Date().toISOString().slice(0, 10); // gives yyyy-mm-dd
    const currentTime = new Date().toTimeString().split(' ')[0]; // gives hh:mm:ss
    
    // First, get the in_hour for the employee for today
    let inHourQuery = 'SELECT in_hour FROM workhours WHERE employees_id = ? AND working_date = ?';
    let inHourParams = [employeeId, currentDate];
    
    connection.query(inHourQuery, inHourParams, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            let inHour = result[0].in_hour;

            // Then perform the update
            let updateQuery = `
                UPDATE workhours
                SET out_hour = ?, 
                    total_hour = TIME_TO_SEC(TIMEDIFF(?, ?)) / 3600
                WHERE employees_id = ? AND working_date = ?
            `;

            let updateParams = [currentTime, currentTime, inHour, employeeId, currentDate];

            connection.query(updateQuery, updateParams, (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                    res.end(JSON.stringify({ message: 'Employee out hour recorded' }));
                } else {
                    res.end(JSON.stringify({ message: 'You have not logged your in hour today. Contact manager for more supports' }));
                }
            });
        } else {
            res.end(JSON.stringify({ message: 'You have not logged your in hour today. Contact manager for more supports' }));
        }
    });
};