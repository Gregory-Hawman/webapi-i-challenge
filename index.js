// implement your API here

// require the express application using the express module
const express = require('express');
const Users = require('./data/db')

// create an express application using the express module
const server = express();

// configures our serer to execute a function for every GET request to '/'
// the second arguement passed to the .get() method is the 'Route Handler Function'
// the route handler function will run on every GET request to '/'
server.get('/', (req, res) => {
    // express will pass the reuqest and response objects to this function
    // the .send() on the response object can be used to send a respionse to the client
    res.send('Hello World');
});

server.get('/hobbits', (req, res) => {
    const hobbits = [
        {
            id: 1,
            name: 'Samwise Gamgee'
        },
        {
            id: 2,
            name: 'Frodo Baggins'
        }
    ]
    res.status(200).json(hobbits);
})

// CHALLENGE
// Write an endpoint that returns a list of users stored in a database—return data in JSON format. 
// Production APIs return data from a data store or external source, not from an in-memory array like we have done so far. 
// Your job is to create a new /users endpoint that returns the list of users contained in the provided database. To get the list of users, require the /data/db.js file into index.js and use its .find() method to get the data. The .find() method returns a promise. Make sure to send the response after that promise has been resolved. In case of failure, return a status code of 500 and an error message to the client.
// Good luck!

server.get('/users', (req, res) => {
    Users.find()
        .then(users => {
            console.log(users)
            res.status(200).json(users)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: error.message})
        })
})

// once the server is fully configured we can have it 'listen' for connections on a particular 'port'
// the callback function passed as the second arguement will run once the server starts
server.listen(8000, () => {
    console.log('API running on port 8000')
})



