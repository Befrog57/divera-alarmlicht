//Creator: befrog
//Mail: befrog@devtal.de
//Usage: Testing the API from DIVERA247
//Loading node.js modules...
require('console-stamp')(console, '[HH:MM:ss]');
const axios = require('axios');
require('dotenv').config();

//Importing .env file...
const token = process.env.API_TOKEN;
const request = process.env.API_REQUEST;
var debugValue = process.env.PRG_DEBUG;
var pimodeValue = process.env.PI_MODE;

//Get UNIX time and convert it so seconds
var currentTime = Date.now();
currentTime = Math.floor(currentTime / 1000);

//Setting debug variable
var debug = Boolean(false);
debug = debugValue;

//Setting pi-mode
var pimode = Boolean (true);
pimode = pimodeValue;

//Initialising Raspi GPIO's
if (pimode == true) {
var Gpio = require('onoff').Gpio;
var HLF = new Gpio(6, 'high');
var DLK = new Gpio(13, 'high');
var LF = new Gpio(19, 'high');
var RW = new Gpio(26, 'high');
}

//Debug message of the request url and the api-token
if (debug == true) {console.debug('API-URL: https://www.divera247.com/api/' + request + '?accesskey=' + token);}

var config = {
    responseType: 'text'
};

(async () => {

  try {
    await abfrage();
  } catch(err) {
    console.error(err)
    process.exit(1)
  }

})()

async function abfrage() {
  //Api request with url and token
  axios.get('https://www.divera247.com/api/' + request + '?accesskey=' + token)
    .then((response) => {
      //Put recieved data in variable
      var daten = response.data;
      //Display debug data, if debug setting is on
      if (debug == true) {console.debug(daten);}
      //Stringify JSON object for further parsing
      var datenStr = JSON.stringify(daten);
      //Look up for how long the Alarm has been active, if its over 20mins, do nothing
      if (typeof response.data.data !== 'undefined' && response.ts_update != "0") {
        if (debug == true) {console.debug("Seconds since last Update:", currentTime - response.data.data.ts_update)}
        if (currentTime - response.data.data.ts_update > "1200") {
          process.exit (50);
        }
      } else if (typeof response.data.data !== 'undefined' && currentTime - response.data.data.ts_publish > "1200") {
        if (debug == true) {console.debug("Seconds since creation:", currentTime - response.data.data.ts_publish)}
        process.exit (60);
      }
      //Look up, if any of the following strings are in the stringifyed JSON object
      if (datenStr.includes('W 25-HLF20-01') == true && pimode == true) {
        //Set state of IO-Pin
        console.log('Alarm HLF...');
        HLF.writeSync(0);
      }
      if (datenStr.includes('W 25-DLK23-01') == true && pimode == true) {
        //Set state of IO-Pin
        console.log('Alarm DLK...');
	      DLK.writeSync(0);
      }
      if (datenStr.includes('W 25-LF10-01') == true && pimode == true) {
        //Set state of IO-Pin
        console.log('Alarm LF...');
	      LF.writeSync(0);
      }
      if (datenStr.includes('W 25-RW-01') == true && pimode == true) {
        //Set state of IO-Pin
        console.log('Alarm RW...');
	      RW.writeSync(0);
      }
      //Print the response of the request
      if (debug == true) {console.debug(response.status);}
    });
}
