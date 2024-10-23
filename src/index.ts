
import dotenv from 'dotenv';
import app from "./app";
var cluster = require('cluster');




dotenv.config();

const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {

  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
  }

  // Listen for terminating workers
  cluster.on('exit', function (worker:any) {

      // Replace the terminated workers
      console.log('Worker ' + worker.id + ' died ');
      cluster.fork();

  });


}else{

  app.listen(PORT, () => console.log(`Running on port ${PORT} ⚡`));
}


