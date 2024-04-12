var Service = require('node-mac').Service;

// Create a new service object
svc = new Service({
    name: 'Hello World WAO',
    description: 'Progetto pilota.',
    script: '/Users/gaetanoalbanese/workspace-nodejs/ExpressAppTs/dist/index.js'
  });

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Disinstallazione completata.');
  console.log('Servizio esistente: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();