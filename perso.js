const fetch = require("node-fetch");

module.exports =class SPARQLQueryDispatcher {
	constructor() {
		const endpoint = 'https://query.wikidata.org/sparql';
		this.endpoint = endpoint;
	}

	getChild() {
		const sparqlQuery = `SELECT ?child ?childLabel
		{
			wd:Q7742 wdt:P40 ?child
			SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fr,en". }
		}`;
		const fullUrl = this.endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return fetch( fullUrl, { headers } ).then( body => body.json());
	}
}