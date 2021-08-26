//Creator: befrog
//Mail: befrog@devtal.de
//Usage: Testing the API from DIVERA247
//Loading node.js modules...
require('console-stamp')(console, '[HH:MM:ss]');
const axios = require('axios');
require('dotenv').config();
const token = process.env.API_TOKEN;
const request = process.env.API_REQUEST;
var Gpio = require('onoff').Gpio;
var HLF = new Gpio(6, 'high');
var DLK = new Gpio(13, 'high');
var LF = new Gpio(19, 'high');
var GW = new Gpio(26, 'high');

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
  axios.get(request + token)
    .then((response) => {
      var daten = response.data;
      console.log(daten);
      var datenStr = JSON.stringify(daten);
      //console.log('test'.includes('test'));
      if (datenStr.includes('W 25-HLF20-01') == true) {
        console.log('Alarm HLF...');
	HLF.writeSync(0);
      } else {
        //console.log('HLF bleibt in der 2');
	HLF.writeSync(1);
      } if (datenStr.includes('W 25-DLK23-01') == true) {
        console.log('Alarm DL...');
	DLK.writeSync(0);
      } else {
        //console.log('DL bleibt in der 2');
	DLK.writeSync(1);
      } if (datenStr.includes('W 25-LF10-01') == true) {
        console.log('Alarm LF10...');
	LF.writeSync(0);
      } else {
        //console.log('LF10 bleibt in der 2');
	LF.writeSync(1);
      } if (datenStr.includes('W 25-GW') == true) {
        console.log('Alarm GW-Tech...');
	GW.writeSync(0);
      } else {
        //console.log('GW-Tech bleibt in der 2');
	GW.writeSync(1);
      }
      console.log(response.status);
    });
  //console.log('Abfrage erfolgreich');
}
