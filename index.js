const perso = require ('./perso.js');

module.exports = class Index {

	constructor() {
		this.list = [] // détient la liste des obj perso existant
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
		const perso = require ('./perso.js');
		this.obj;
		var exist = -1;

		for (var i=0 ; i<this.list.length; i++){
			if(this.list[i].ID == id){
				exist = i;
			}
		}

		if ( exist == -1)	{	
			this.obj = new perso(id)
			this.list.push(this.obj);
			console.log(this.obj)
			//console.log(this.list)
			//console.log('END')
			return(this.obj)
		}
		else {
			//console.log(this.index)
			//console.log('END')
			return (this.list[i])
		}

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