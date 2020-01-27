const fetch = require("node-fetch");
const endpoint = 'https://query.wikidata.org/sparql';

const getChild = (ID) => {
	const sparqlQuery = `SELECT ?child
	{
		wd:`+ ID +` wdt:P40 ?child
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return fetch( fullUrl, { headers } ).then( body => body.json());
}
exports.getChild = getChild;

const getName = (ID) => {
	const sparqlQuery = `SELECT DISTINCT * WHERE {
		wd:`+ ID +` rdfs:label ?label . 
		FILTER (langMatches( lang(?label), "FR" ) )
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return fetch( fullUrl, { headers } ).then( body => body.json());
}
exports.getName = getName;