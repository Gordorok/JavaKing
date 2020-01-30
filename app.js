const perso = require ('./perso.js');
const Index = require('./index.js');

global.globIndex = new Index();


globIndex.PushId('Q7742').Mother().then((obj) =>{obj.Name().then(console.log)})

