const perso = require ('./perso.js');
const Index = require('./index.js');

var index = new Index();

var louis_14 = new perso('Q7742', index)
louis_14.Child()



















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




