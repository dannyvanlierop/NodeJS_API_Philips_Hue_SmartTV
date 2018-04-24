
// This function waits for an unknown amount of time
const wait = (delay, callback) => {
  // setInterval returns an ID. We need this to stop the timer
  const id = setInterval(() => {
    // Generate a random number between 0 and 1
    const rand = Math.random();

    if (rand > 0.95) {
      // Call the callback function. Note the first parameter is an error
      callback(null, 'Congratulations, you have finished waiting.');
      // Stop the timer
      clearInterval(id);
    } else if (rand < 0.01) {
      // Call the callback function. Note we're setting an error now
      callback('Could not wait any longer!', null);
      // Stop the timer
      clearInterval(id);
    } else {
      // Print to STDOUT
      console.log('Waiting ...');
    }
  }, Number(delay));
};
 


// Calling wait and passing a callback
wait(1000, (err, data) => {
  // Did the function return an error?
  if (err) throw new Error(err);
  // Output the data
  console.log(data);
});




//      const 
//        promisify = require('util').promisify,
//        bindClient = promisify(client.bind);
//      
//      let clientInstance; // defining variable in global scope
//      (async () => { // wrapping routine below to tell interpreter that it must pause (wait) for result
//        try {
//          clientInstance = await bindClient(LDAP_USER, LDAP_PASS);
//        }
//        catch(error) {
//          console.log('LDAP Master Could Not Bind. Error:', error);
//        }
//      })();



//      const co = require('co');
//      co(function*() { // wrapping routine below to tell interpreter that it must pause (wait) for result
//        clientInstance = yield bindClient(LDAP_USER, LDAP_PASS);
//      
//        if (!clientInstance) {
//          console.log('LDAP Master Could Not Bind');
//        }
//      });