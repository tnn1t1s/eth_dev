// next-routes returns a function
// by putting parentheses after the require
// the function will be invoked
const routes = require('next-routes')();


routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show')
    .add('/requests/:address', '/campaigns/requests/index')
    .add('/requests/:address/new', '/campaigns/requests/new');

module.exports = routes;
