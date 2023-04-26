var express = require('express')
var bodyParser = require('body-parser')
const { Pool } = require('pg')

const pool = new Pool({
    user: 'user',
    host: 'database.server.com',
    database: 'mydb',
    password: 'password',
    port: 3211,
})

var app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req){
    const search = req.params.q

    if (search != "") {
        var squery = "SELECT * FROM users WHERE name = \"" + search + "\""
        pool.query(squery, (err, res) => {
            console.log(err, res)
            pool.end()
        })
    }
})

app.listen(8000, function () {
    console.log("Server running");
});
