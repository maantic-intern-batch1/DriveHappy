// For running any query as a test :

// Import the query first ... 
/*             Database Queries                  */
const { createCarTable } = require('./models/car.js');
const { createUrlTable } = require('./models/url.js');
const { createImperfectionTable } = require('./models/imperfection.js');
const { createTyreTable } = require('./models/tyre.js');
const runQuery = async () => {
    // create{Tablename}Table is the format 
    // change the below line
    await createTyreTable();
};

runQuery()
    .then(() => {
        console.log('Query executed successfully.');
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error executing query', err);
        process.exit(1);
    });