const perso = require ('./perso.js');
const Index = require('./index.js');

global.globIndex = new Index()

globIndex.PushId('Q7742').Age().then(console.log)
//globIndex.PushId('Q784173').Child().then((obj) =>{obj.forEach((mom) => {mom.Mother()}); });
