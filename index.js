//const perso = require ('./perso.js');

module.exports = class Index {

	constructor() {
		this.index = []; //[0] pour l'ID et [1] pour l'obj 
		this.index.push([Array(1),Array(1)])
	}

	PushArray (array) {
		const perso = require ('./perso.js');
		var pushed = []
		
		var obj;
		array.forEach((id) => {
			console.log(id)
			pushed.push(this.PushId(id));
		});
		return (pushed)

	}

	PushId (id) {

		const perso = require ('./perso.js');
		var obj;
		var exist = -1;

		for (var i=0 ; i<this.index.length; i++){
			if(this.index[i][0] === id){
				exist = i;
			}
		}

		if ( exist == -1)	{	
			obj = new perso(id, this)
			this.index.push([id, obj]);
			//console.log(this.index)
			//console.log('END')
			return obj
		}
		else {
			//console.log(this.index)
			//console.log('END')
			return (this.index[1][i])
		}

	}

	GetObj (ID) {
		return new Promise((resolve, reject) =>{
			var find = 0
			for (var i=0, L=this.index[0].length; i>L; i++){
				console.log(this.index[0][i])
				if(this.index[0][i] === ID){
					find=1
					//console.log(this.index[1][i])
					resolve (this.index[1][i])
				}
			}
			if(find === 0){
				reject(new Error('!!! N\'existe pas !!!'))
			}
		});
	}

}