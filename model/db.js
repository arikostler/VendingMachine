var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
	host:'localhost',
	user:'vendingmachine',
	password:'sodapop',
	database:'VendingMachine'
});

connection.connect(function (err) {
	if(err) throw err;
});

module.exports = connection;