const perso = require ('./perso.js');
const Index = require('./index.js');

global.globIndex = new Index()

globIndex.PushId('Q151209').Father()
globIndex.PushId('Q7742').Mother().then((obj) =>{obj.Child()})
