// next-routes returns a function
// by putting parentheses after the require
// the function will be invoked
const routes = require('next-routes')();


routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show');

module.exports = routes;
