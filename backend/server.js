// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const snowflake = require('snowflake-sdk');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Snowflake connection
const connection = snowflake.createConnection({
    account: '<your_account>',
    username: '<your_username>',
    password: '<your_password>',
    warehouse: '<your_warehouse>',
    database: '<your_database>',
    schema: '<your_schema>',
});

connection.connect((err, conn) => {
    if (err) {
        console.error('Unable to connect: ' + err.message);
    } else {
        console.log('Successfully connected to Snowflake.');
    }
});

// Endpoint to fetch data from Snowflake
app.post('/api/fetch-data', (req, res) => {
    const query = req.body.query; // Example: "SELECT * FROM your_table"

    connection.execute({
        sqlText: query,
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
                return res.status(500).send(err.message);
            }
            return res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});