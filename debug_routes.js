const express = require('express');
const clientRoute = require('./src/routes/clientRoute.js');

console.log('Checking client routes...');

if (clientRoute && clientRoute.stack) {
  console.log('Found routes:');
  clientRoute.stack.forEach((layer, index) => {
    if (layer.route) {
      const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
      console.log(`${index + 1}. ${methods} ${layer.route.path}`);
    }
  });
} else {
  console.log('Router structure:', Object.keys(clientRoute || {}));
  console.log('Router type:', typeof clientRoute);
}

// Let's also check what the actual server configuration is
console.log('\n--- Checking server configuration ---');
try {
  const app = express();
  app.use('/fetch', clientRoute);
  
  // List all routes in the app
  app._router.stack.forEach((middleware, index) => {
    if (middleware.route) {
      console.log(`Route ${index + 1}: ${Object.keys(middleware.route.methods).join(', ').toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router' && middleware.regexp) {
      console.log(`Router ${index + 1}: ${middleware.regexp.toString()}`);
      if (middleware.handle && middleware.handle.stack) {
        middleware.handle.stack.forEach((layer, subIndex) => {
          if (layer.route) {
            const methods = Object.keys(layer.route.methods).join(', ').toUpperCase();
            console.log(`  Sub-route ${subIndex + 1}: ${methods} ${layer.route.path}`);
          }
        });
      }
    }
  });
} catch (error) {
  console.error('Error setting up test app:', error.message);
}
