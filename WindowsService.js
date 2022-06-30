const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
    name: 'MN-Medsoft Time Register',
    description: 'MN-Medsoft Time Register',
    script: 'C:/mitpc/app/medsoft-time-register/Server.js',
    nodeOptions: [
        '--harmony',
        '--max_old_space_size=4096'
    ]
    //, workingDirectory: '...'
    //, allowServiceLogon: true
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
    svc.start();
});

svc.install();