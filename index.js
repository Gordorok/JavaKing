const perso = require ('./perso.js');

module.exports = class Index {
	constructor() {
		this.index = [];
		this.Push = this.Push.bind(this) 
	}

	Push (array) {
		//console.log(array)
		var index = [];
		array.forEach(function (id) {
			index.push(id);
		});
		this.index = index
		//console.log(this.index)
	}

}