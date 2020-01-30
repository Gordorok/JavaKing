const perso = require ('./perso.js');
const Index = require('./index.js');

global.globIndex = new Index()

//globIndex.PushId('Q151209').Father()
globIndex.PushId('Q784173').Child().then((obj) =>{obj.forEach((mom) => {mom.Mother()}); });
