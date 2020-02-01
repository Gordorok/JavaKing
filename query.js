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

const getFather = (ID) => {
	const sparqlQuery = `SELECT ?father
	{
		wd:`+ ID +` wdt:P22 ?father
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return fetch( fullUrl, { headers } ).then( body => body.json());
}
exports.getFather = getFather;

const getMother = (ID) => {
	const sparqlQuery = `SELECT ?mother
	{
		wd:`+ ID +` wdt:P25 ?mother
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return fetch( fullUrl, { headers } ).then( body => body.json());
}
exports.getMother = getMother;

const getBirth = (ID) => {
	const sparqlQuery = `SELECT ?birth ?birthLabel
WHERE
	{
		 wd:`+ ID +` wdt:P569 ?birth.
         SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fr,en". }
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return fetch( fullUrl, { headers } ).then( body => body.json());
}
exports.getBirth = getBirth;

const getDeath = (ID) => {
	const sparqlQuery = `SELECT ?death ?deathLabel
WHERE
	{
		 wd:`+ ID +` wdt:P570 ?death.
         SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fr,en". }
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return fetch( fullUrl, { headers } ).then( body => body.json());
}
exports.getDeath = getDeath;

const getSpouse = (ID) => {
	const sparqlQuery = `SELECT ?spouse
WHERE
	{
		 wd:Q7742 wdt:P26 ?spouse
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return fetch( fullUrl, { headers } ).then( body => body.json());
}
exports.getSpouse = getSpouse;

const getImage = (ID) => {
	const sparqlQuery = `SELECT ?image ?imageLabel 
WHERE
	{
		 wd:Q7742 wdt:P18 ?image.
         SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fr,en". }
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return fetch( fullUrl, { headers } ).then( body => body.json());
}
exports.getImage = getImage;