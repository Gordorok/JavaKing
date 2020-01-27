
const query = require('./query.js');

module.exports =class SPARQLQueryDispatcher {
	constructor(ID) {
		this.ID = ID;
		this.name;
		this.child
	}

	Child() {
		this.child = query.getChild(this.ID).then( (data) => {
			//console.log(data.results.bindings)
			var array = data.results.bindings
			var ID = [];
			array.forEach(function(item){
				ID.push(item.child.value.split('entity/')[1]);
			});
			//console.log(ID)
			return (ID);
		})
		return (this.child);
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
			return(this.name)
		}
	}
}