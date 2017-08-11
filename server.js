'use strict';

require('isomorphic-fetch');
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 9000
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {
        return reply('<h1>hello</h1>');
    }
});

function locationServicesData() {
  fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour',
  {
    method: 'POST',
    mode: 'cors',
  }).then(function(response) {
    console.log('worked');
    console.log(response);
    if (!response.ok) {
      console.log('Network Error');
      throw new Error(response.status);
    }
    return response.json();
  }).then(function(data) {
    console.log('Received Data');
    return data;
    console.error('Fetch Failed with error:');
    console.error(error);
  });
};

server.route({
    method: 'GET',
    path:'/location',
    handler: function (request, reply) {
        locationServicesData()
        return reply('Fetch API');
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});
