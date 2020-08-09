const endpoint = 'https://query.wikidata.org/sparql';
const axios = require('axios').default;
const Queue = require('smart-request-balancer');

const queue = new Queue({
  rules: {                     // Describing our rules by rule name
    common: {                  // Common rule. Will be used if you won't provide rule argument
      rate: 30,                // Allow to send 30 messages
      limit: 1,                // per 1 second
      priority: 1,             // Rule priority. The lower priority is, the higher chance that
                               // this rule will execute faster 
                           }
                       },
  retryTime: 1,              // Default retry time. Can be configured in retry fn
  ignoreOverallOverheat: true  // Should we ignore overheat of queue itself
})

const getChild = (ID) => {
		const sparqlQuery = `SELECT ?child
		{
			wd:`+ ID +` wdt:P40 ?child
		}`;
		const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return Axios(fullUrl, headers, ID)
}
exports.getChild = getChild;

const getName = (ID) => {
	const sparqlQuery = `SELECT DISTINCT  ?label WHERE {
		wd:`+ ID +` rdfs:label ?label_en.
		filter(lang(?label_en) = 'en').
		OPTIONAL{wd:`+ ID +` rdfs:label ?label_fr.
			filter(lang(?label_fr) = 'fr')}
			BIND(IF(BOUND(?label_fr),?label_fr,?label_en) AS ?label).

		}`;
		const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
		const headers = { 'Accept': 'application/sparql-results+json' };

		return Axios(fullUrl, headers, ID)
	}

exports.getName = getName;

const getFather = (ID) => {
	const sparqlQuery = `SELECT ?father
	{
		wd:`+ ID +` wdt:P22 ?father
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return Axios(fullUrl, headers, ID)
}
exports.getFather = getFather;

const getMother = (ID) => {
	const sparqlQuery = `SELECT ?mother
	{
		wd:`+ ID +` wdt:P25 ?mother
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return Axios(fullUrl, headers, ID)
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

	return Axios(fullUrl, headers, ID)
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

	return Axios(fullUrl, headers, ID)
}
exports.getDeath = getDeath;

const getSpouse = (ID) => {
	const sparqlQuery = `SELECT ?spouse
	WHERE
	{
		wd:`+ ID +` wdt:P26 ?spouse
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return Axios(fullUrl, headers, ID)
}
exports.getSpouse = getSpouse;

const getImage = (ID) => {
	const sparqlQuery = `SELECT ?image
	WHERE
	{
		OPTIONAL{wd:`+ ID +` wdt:P18 ?image2}
		BIND(COALESCE(?image2, "NO") AS ?image)
	}`;
	const fullUrl = endpoint + '?query=' + encodeURIComponent( sparqlQuery );
	const headers = { 'Accept': 'application/sparql-results+json' };

	return Axios(fullUrl, headers, ID)
}
exports.getImage = getImage;


const Axios = (fullUrl, headers, ID) => {
	return new Promise((resolve, reject) =>{
		queue.request((retry) => axios.get( fullUrl, { headers } )
			.then(response => resolve(response))
			.catch(error => {
				if (error.response.status === 429) {
					console.log('ERROR 429') 
					return retry() 
				}
				throw error; 
			}), ID, 'common');

	})

}