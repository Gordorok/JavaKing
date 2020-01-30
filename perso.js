const query = require('./query.js');
const index = require('./index.js');

module.exports = class Perso {
	constructor(ID) {
		this.ID = ID;
		this.name;
		this.child
		this.father
		this.mother
	}

	Child() {
		return new Promise((resolve, reject) => {
			if(typeof this.name === 'undefined') {
				query.getChild(this.ID).then( (data) => {
					var array = data.results.bindings
					var ID = [];
					array.forEach(function(item){
						ID.push(item.child.value.split('entity/')[1]);
					});
					this.child=globIndex.PushArray(ID)
					console.log(this.child)
					resolve (this.child);
				});
			}
			else {
				console.log(this.child)
				resolve (this.child);
			}
		});
	}

	Name() {
		return new Promise((resolve, reject) => {
			if(typeof this.name === 'undefined') {
				query.getName(this.ID).then((data) => {
					this.name = data.results.bindings[0].label.value
					console.log(this.name)
					resolve (this.name)
				});	
			}
			else {
				console.log(this.name)
				resolve(this.name)
			}
		});
	}

	Father() {
		return new Promise((resolve, reject) => {
			if(typeof this.name === 'undefined') {
				return new Promise((resolve, reject) => {
					query.getFather(this.ID).then( (data) => {
						var ID = data.results.bindings[0].father.value.split('entity/')[1];
						this.father=globIndex.PushId(ID)
						console.log(this.father)
						resolve (this.father);
					});
				});

			}
			else {
				console.log(this.father)
				resolve(this.father)
			}
		});
	}

	Mother() {
		return new Promise((resolve, reject) => {
			if(typeof this.mother === 'undefined') {
				query.getMother(this.ID).then( (data) => {
					var ID = data.results.bindings[0].mother.value.split('entity/')[1];
					this.mother = globIndex.PushId(ID)
					console.log(this.mother)
					resolve(this.mother);
				});


			}
			else {
				console.log(this.mother)
				resolve(this.mother)
			}
		});
	}
}