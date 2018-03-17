require('babel-register');

const express = require('express');
const app = express();
const path = require('path');
const fetch = require("node-fetch");

app.use(express.static(__dirname + './public'));

// CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');
    next();
});

//Make a request to get the data from the API
app.get('/api/getAllPTs/:location', async (req, res) => {
	const { location } = req.params;
	const options = {
		'method': 'GET',
		'headers': {
			'Authorization': 'Bearer 5RW2Z8biP4Z6xhrcUPhMEinWeqqCdTjXwMin7CgZFhCKqGxK_GuavmfbYDecPMVASrjkmxRwhUH4CLsyK3FIGVTl2gO7bW1Z_ZfJvj4kMYiWiDLifg6ng46-fi2tWnYx'
		}
	}
	const data = await fetch(`https://api.yelp.com/v3/businesses/search?location=${location}&categories=physicaltherapy&sort_by=rating&limit=50`, options);
	const json = await data.json();
	res.json(json);
});

app.listen(3000);