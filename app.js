const perso = require ('./perso.js');

var index = [];
index.push(new perso('Q7742'));

index.forEach(function(id){
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

/*louis_14.Child().then((children) => {children.forEach(function(child){
	index.push(new perso(child));
	console.log(child)
})});
louis_14.Name().then(console.log)*/




