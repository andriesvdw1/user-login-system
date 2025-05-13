const sqlite3 = require('sqlite3').verbose();
// Specify the path where database will be stored once created
const dbPath = './users.db';
module.exports = new sqlite3.Database(dbPath, (error) => {
    if(error){
        //Create the database file, if it is not already there
        const fs = require('fs');
        fs.writeFile(dbPath, '', (error) =>
        {
            if (error){
                console.error(error);
            }else{
                console.log(`New database created successfully at ${dbPath}`);
            }
        });
    } else {
        console.log(`Connected to database: ${dbPath}`);
    }
});

