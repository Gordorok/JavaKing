const perso = require ('./perso.js');
const Index = require('./index.js');

var index = new Index([]);
//var initPerso = new perso(0,index)

//louis_14 = index.GetObj('Q7742')//.then(console.log)
index.PushId('Q7742').Mother().then((obj) => obj.Name())
//index.PushId('Q237666')




//console.log(louis_14)
//louis_14.Child().then(console.log)
//louis_14.Father().then(console.log)
//louis_14.Father().then(console.log)
//louis_14.Mother().then(console.log)



















/*index.forEach(function(id){
	id.Name().then(console.log)
})

index.forEach(function(id){
	id.Child().then((children) => {
		children.forEach(function(child){
			index.push(new perso(child));
			console.log(child)
		})
	});
})
*/
/*louis_14.Child().then((children) => {children.forEach(function(child){
	index.push(new perso(child));
	console.log(child)
})});
louis_14.Name().then(console.log)*/




