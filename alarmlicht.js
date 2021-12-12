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
var GW = new Gpio(26, 'high');
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
    exit(1)
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
      //Look up, if any of the following strings are in the stringifyed JSON object
      if (datenStr.includes('W 25-HLF20-01') == true && pimode == true) {
        //Set state of IO-Pin
        setPin('HLF');
      } else {
	      HLF.writeSync(1);
      }
      if (datenStr.includes('W 25-DLK23-01') == true && pimode == true) {
        //Set state of IO-Pin
	      setPin('DLK');
      } else {
	      DLK.writeSync(1);
      }
      if (datenStr.includes('W 25-LF10-01') == true && pimode == true) {
        //Set state of IO-Pin
	      setPin('LF');
      } else {
	      DLK.writeSync(1);
      }
      if (datenStr.includes('W 25-GW') == true && pimode == true) {
        //Set state of IO-Pin
	      setPin('GW');
      } else {
	      GW.writeSync(1);
      }
      //Print the response of the request
      if (debug == true) {console.debug(response.status);}
    });
}

function setPin (fzg) {
  //Set state of IO-Pin
  console.log('Alarm ' + fzg + '...');
  fzg.writeSync(0);
}
