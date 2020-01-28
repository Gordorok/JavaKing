const perso = require ('./perso.js');

module.exports = class Index {

	constructor() {
		this.list = [] 
		console.log(this)// détient la liste des obj perso existant
	}

	PushArray (array) {
		var pushed = []
		
		var obj;
		array.forEach((id) => {
			console.log(id)
			pushed.push(this.PushId(id));
		});
		return (pushed)

	}

	PushId (id) {
return new Promise((resolve,reject) =>{
		const perso = require ('./perso.js');
		this.obj;
		var exist = -1;

		for (var i=0 ; i<this.list.length; i++){
			if(this.list[i].ID == id){
				exist = i;
			}
		}

		if ( exist == -1)	{	
			this.obj = new perso(id, this)
			this.list.push(this.obj);
			//console.log(obj)
			//console.log('END')
			resolve (this.obj)
		}
		else {
			//console.log(this.index)
			//console.log('END')
			resolve (this.list[i])
		}
	});

	}

	GetObj (ID) {
		return new Promise((resolve, reject) =>{
			var find = 0
			for (var i=0, L=this.list.length; i>L; i++){
				console.log(this.list[i].ID)
				if(this.list[i].ID === ID){
					find=1
					//console.log(this.index[i])
					resolve (this.list[i])
				}
			}
			if(find === 0){
				reject(new Error('!!! N\'existe pas !!!'))
			}
		});
	}

}