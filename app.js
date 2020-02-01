const perso = require ('./perso.js');
const Index = require('./index.js');

global.globIndex = new Index()

//globIndex.PushId('Q7742').Image()//.then(console.log)
//globIndex.PushId('Q784173').Child().then((obj) =>{obj.forEach((mom) => {mom.Mother()}); });

//Level1('Q7742')

globIndex.PushId('Q737533').Child().then(children => {
		children.forEach((child)=>{
			Level1(child.ID)
		})
	})


async function Level1(Id) {
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

}