const perso = require ('./perso.js');
const Index = require('./index.js');

global.globIndex = new Index()

globIndex.PushId('Q7742').Image()//.then(console.log)
//globIndex.PushId('Q784173').Child().then((obj) =>{obj.forEach((mom) => {mom.Mother()}); });

/*
Level1('Q7742')
async function Level1(Id) {
	var base = globIndex.PushId(Id)
	var promise = base.Child()
	//var child = await promise;
	//child.Name().the(console.log)

}*/