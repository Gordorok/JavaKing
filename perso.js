const query = require('./query.js');
const index = require('./index.js');

module.exports = class Perso {
	constructor(ID) {
		this.ID = ID;
		this.name;
		this.child
		this.father
		this.mother
		//console.log(this.ID)
	}

	Child() {
		return new Promise((resolve, reject) => {
			query.getChild(this.ID).then( (data) => {
				//console.log(data.results.bindings)
				var array = data.results.bindings
				var ID = [];
				array.forEach(function(item){
					ID.push(item.child.value.split('entity/')[1]);
				});
				//console.log(ID)
				globIndex.PushArray(ID)
				this.child = ID
				resolve (ID);
			});
		});
	}

	Name() {
		if(typeof this.name === 'undefined') {
			return new Promise((resolve, reject) => {
				query.getName(this.ID).then((data) => {
					//console.log(data)
					this.name = data.results.bindings[0].label.value
					//console.log(this.name)
					resolve (this.name)
				});
			});
		}
		else {
			console.log('OK')
			return(this.name)
		}
	}

	Father() {
		if(typeof this.name === 'undefined') {
			return new Promise((resolve, reject) => {
				query.getFather(this.ID).then( (data) => {
					//console.log(data)
					var array = data.results.bindings
					var ID = [];
					ID.push(data.results.bindings[0].father.value.split('entity/')[1]);
					//console.log(ID)
					resolve (ID);
					globIndex.PushArray(ID)
					this.father = ID
				});
			});

		}
		else {
			console.log('OK')
			return(this.father)
		}

	}

	Mother() {
		return new Promise((resolve, reject) => {
			if(typeof this.mother === 'undefined') {
				query.getMother(this.ID).then( (data) => {
					//console.log(data)
					var ID = data.results.bindings[0].mother.value.split('entity/')[1];
					//console.log(globIndex)
					this.mother = globIndex.PushId(ID)
					console.log(this.mother)
					resolve(this.mother);
				});


			}
			else {
				console.log('OK')
				resolve(this.mother)
			}
		});
	}
}