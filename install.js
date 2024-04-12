var Service = require('node-mac').Service;

//script: require('path').join(__dirname,'index.js'),   
    svc = new Service({
      name: 'Hello World WAO',
      description: 'The nodejs.org example web server.',
      script: '/Users/gaetanoalbanese/workspace-nodejs/ExpressAppTs/dist/index.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',()=>{
  console.log('\nInstallazione completata\n---------------------');
  svc.start();
});

// Just in case this file is run twice.
svc.on('alreadyinstalled',()=>{
  console.log('Questo servizio è già installato.');
  console.log('Attendere per ripartire il servizio.');
  svc.start();
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',()=>{
  console.log(svc.name+' avviato!\nVisita http://127.0.0.1:8000/dashboard per vederlo all azione\n');
});

// Install the script as a service.
svc.install();