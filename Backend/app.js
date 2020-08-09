const perso = require ('./perso.js');
const Index = require('./index.js');

global.globIndex = new Index()

globIndex.PushId('Q130969').Child()
.then(children => {
	children.forEach((child) =>{
		child.Name()
		child.Image()
		child.Child()
		.then(children => {
			children.forEach((child) =>{
				child.Name()
				child.Image()
			})
		})
	})
})





//Level1('Q737533')






function Level1 (Id) {
	checkParent(Id)

	globIndex.PushId(Id).Child().then(children => {
		children.forEach((child)=>{
			checkParent(child.ID)
		})
	})
}


//fonction qui trouve, les parents d'un perso, check si ils sont mariés et appelle fonction pour l'affichage
async function checkParent(Id) {
	var base = globIndex.PushId(Id)

	var mother = base.Mother();
	var father = base.Father();
	Promise.all([mother, father])
	.then(
		(data) => { 
			mother = data[0]
			father = data[1]
			mother.Spouse().then( spouses => {
				spouses.forEach((spouse) => {
					if (spouse == father) {
						// appelle la fonction affich , couple marié
						console.log('OK')
					}
					else{
						console.log('NOP')
					}
				})
				// appelle la fonction affich , couple non marié	
			})
		})
	return;
}

