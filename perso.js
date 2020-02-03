const query = require('./query.js');
const index = require('./index.js');
const download = require('image-downloader')

module.exports = class Perso {
	constructor(ID) {
		this.ID = ID;
		this.name;
		this.child
		this.father
		this.mother
		this.birth
		this.death
		this.age
		this.spouse
		this.image
	}

	Child() {
		return new Promise((resolve, reject) => {
			if(typeof this.child === 'undefined') {
				query.getChild(this.ID)
				.then( (data) => {
					var array = data.results.bindings
					var ID = [];
					array.forEach(function(item){
						ID.push(item.child.value.split('entity/')[1]);
					});
					this.child=globIndex.PushArray(ID)
					console.log(this.child)
					resolve (this.child);
				})
				.catch(error =>{
					var n = Math.random()*5000;
					var _this = this;
					setTimeout(function() {_this.Child()}, n)
				});
			}
			else {
				console.log(this.child)
				resolve (this.child);
			}
		});
	}

	Spouse() {
		return new Promise((resolve, reject) =>{
			if(typeof this.spouse === 'undefined') {
				query.getSpouse(this.ID).then( (data) => {
					var array = data.results.bindings
					var ID =[]
					array.forEach(function(item){
						ID.push(item.spouse.value.split('entity/')[1]);
					});
					this.spouse=globIndex.PushArray(ID)
					console.log(this.spouse)
					resolve(this.spouse)
				})
				.catch(error =>{
					var n = Math.random()*5000;
					var _this = this;
					setTimeout(function() {_this.Spouse()}, n)
				});
			}
			else {
				console.log(this.spouse)
				resolve(this.spouse)
			}
		});
	}

	Name() {
		return new Promise((resolve, reject) => {
			if(typeof this.name === 'undefined') {
				query.getName(this.ID).then((data) => {
					console.log(data.results.bindings[0])
					this.name = data.results.bindings[0].label.value
					console.log(this.name)
					resolve (this.name)
				})
				.catch(error =>{
					var n = Math.random()*5000;
					console.log(n)
					var _this = this;
					setTimeout(function() {_this.Name()}, n)
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
			if(typeof this.father === 'undefined') {
				query.getFather(this.ID).then( (data) => {
					var ID = data.results.bindings[0].father.value.split('entity/')[1];
					this.father = globIndex.PushId(ID)
					console.log(this.father)
					resolve(this.father);
				})
				.catch(error =>{
					var n = Math.random()*5000;
					var _this = this;
					setTimeout(function() {_this.Father()}, n)
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
				})
				.catch(error =>{
					var n = Math.random()*5000;
					var _this = this;
					setTimeout(function() {_this.Mother()}, n)
				});
			}
			else {
				console.log(this.mother)
				resolve(this.mother)
			}
		});
	}

	Birth(){
		return new Promise((resolve, reject) =>{
			if(typeof this.birth === 'undefined') {
				query.getBirth(this.ID).then( (data) => {
					this.birth=data.results.bindings[0].birth.value
					console.log(this.birth)
					resolve(this.Convert_DateTime(this.birth))
				})
				.catch(error =>{
					var n = Math.random()*5000;
					var _this = this;
					setTimeout(function() {_this.Birth()}, n)
				});
			}
			else {
				console.log(this.birth.match(/([^T]+)/)[0].split("-").reverse().join("/"))
				resolve(this.Convert_DateTime(this.birth))
			}
		});
	}

	Death(){
		return new Promise((resolve, reject) =>{
			if(typeof this.death === 'undefined') {
				query.getDeath(this.ID).then( (data) => {
					this.death=data.results.bindings[0].death.value
					console.log(this.death)
					resolve(this.Convert_DateTime(this.death))
				})
				.catch(error =>{
					var n = Math.random()*5000;
					var _this = this;
					setTimeout(function() {_this.Death()}, n)
				});
			}
			else {
				console.log(this.death)
				resolve(this.Convert_DateTime(this.death))
			}
		});
	}

	Age(){
		return new Promise((resolve, reject) => {
			
			var birth = new Promise((resolve, reject) =>{
				if(typeof this.age === 'undefined') {
					query.getBirth(this.ID).then( (data) => {
						this.birth=data.results.bindings[0].birth.value
						resolve(this.birth)
					});
				}
				else {
					resolve(this.birth)
				}
			});

			var death = new Promise((resolve, reject) =>{
				if(typeof this.death === 'undefined') {
					query.getDeath(this.ID).then( (data) => {
						this.death=data.results.bindings[0].death.value
						resolve(this.death)
					});
				}
				else {
					resolve(this.death)
				}
			});

			var one_day = 1000 * 60 * 60 * 24;
			Promise.all([birth, death]).then(data =>{
				var birth= Date.parse(data[0])
				var death= Date.parse(data[1])
				var diff = ((death-birth)/(3600*24*365.25*1000))
				diff = diff - diff%1
				console.log(diff)
				resolve(diff)
			})

		});
	}

	Image() {
		return new Promise ((resolve, reject) => {
			if(typeof this.image === 'undefined') {
				query.getImage(this.ID).then((data) => {
					const URL = data.results.bindings[0].image.value
					const options = {
						url: URL,
						dest: './images/'+this.ID+'.jpg'       
					}
					download.image(options)
					.then(({ filename, image }) => {
						console.log('Saved to', filename)
						this.image= this.ID;
						resolve(this.image)
					})
					.catch((err) => console.error(err))
				})
				.catch(error =>{
					var n = Math.random()*5000;
					var _this = this;
					setTimeout(function() {_this.Image()}, n)
				});
			}
			else {
				resolve (this.image)
			}
		});
	}

	Convert_DateTime(text) {
		return (text.match(/([^T]+)/)[0].split("-").reverse().join("/"));
	}

}