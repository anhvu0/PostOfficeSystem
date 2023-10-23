function getRandom(length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * 9 * Math.pow(10, length-1));
};

async function doesExist(connection, query, params) { //This function checks if the randomly generated ID or inputted information already exists in the database
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            if (err) reject(err);
            resolve(result.length === 0 ? false : true);
        });
    });
}

function executeQuery(connection, query, params, res, successMessage) { //Since connection.query doesn't return a promise, we have to wrap it in a promise
    return new Promise((resolve, reject) => {
        connection.query(query, params, (err, result) => {
            if (err) {
                reject(err);
                res.end(JSON.stringify({message: "An error occurred"}));
            } else {
                resolve(result);
                res.end(JSON.stringify({message: successMessage}));
            }
        });
    });
}


//Have to use async function because we have to wait for the database to return a result. Otherwise the while loop will not wait and run forever.
module.exports = async function(req,res,connection){
    try{
        var jsonString = "";
        req.on("data", function(data){
            jsonString += data;
        });

        req.on("end", async function(){
            parsedData = JSON.parse(jsonString);
            if(!parsedData.username || !parsedData.password || !parsedData.first_name || !parsedData.last_name 
                || !parsedData.date_of_birth || !parsedData.street_address || !parsedData.state || !parsedData.city || !parsedData.zip_code){
                res.end(JSON.stringify({message: "Please enter all required fields"}));
                return;
            }

            let exists = true;
            let customer_id;
            while(exists) { 
                customer_id = getRandom(8); //Customer id is 8 digits long
                exists = await doesExist(connection, 'SELECT customers_id FROM customers WHERE customers_id = ?', [customer_id]);
            }
        
            exists = true;
            let address_id;
            while(exists) {
                address_id = getRandom(3); //Address id is 3 digits long
                exists = await doesExist(connection, 'SELECT address_id FROM address WHERE address_id = ?', [address_id]);
            }

            exists = true;
            while(exists) {
                exists = await doesExist(connection, 'SELECT Fname, Lname, dob FROM customers WHERE Fname = ? AND Lname = ? AND dob = ?', 
                                            [parsedData.first_name, parsedData.last_name, parsedData.date_of_birth]);
                if(exists === true){
                    res.end(JSON.stringify({message: "Customer already exists"}));
                    return;
                }
            }

            while(exists) {
                exists = await doesExist(connection, 'SELECT c_username FROM customers WHERE c_username = ?', [parsedData.username]);
                if(exists === true){
                    res.end(JSON.stringify({message: "Username already exists"}));
                    return;
                }
            }

            //Insert data without address_id due to CONSTRAINTS FOREIGN KEY
            const query1 = `INSERT INTO customers(customers_id, Fname, Lname, c_username, c_password, dob) VALUES(?, ?, ?, ?, ?, ?);`; 
            const params1 = [customer_id, parsedData.first_name, parsedData.last_name, parsedData.username, parsedData.password, parsedData.date_of_birth];

            await executeQuery(connection, query1, params1, res, "Customer's information updated successfully");

            const query2 =`INSERT INTO address(address_id, street_address, state, city, zip, customers_id) VALUES(?, ?, ?, ?, ?, ?);`;
            const params2 = [address_id, parsedData.street_address, parsedData.state, parsedData.city, parsedData.zip_code, customer_id];

            await executeQuery(connection, query2, params2, res, "Address information updated successfully");

            //Update address_id in customers table
            const query3 = `UPDATE customers SET address_id = ? WHERE customers_id = ?;`;
            const params3 = [address_id, customer_id];

            await executeQuery(connection, query3, params3, res, "Address information updated successfully");
        });
    }
    catch(error){
        console.log(error);
    };
};