const SPARQLQueryDispatcher = require ('./query.js');

const endpointUrl = 'https://query.wikidata.org/sparql';
const sparqlQuery = `SELECT ?child1 ?child1Label
{
  wd:Q7742 wdt:P40 ?child1
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],fr,en". }
}
LIMIT 100`;

const transf = function (data) {
	console.log(JSON.stringify(data))
	const obj = JSON.parse(JSON.stringify(data))
	result1 = obj.results.bindings
	console.log(result1)
}
const queryDispatcher = new SPARQLQueryDispatcher( endpointUrl );
queryDispatcher.query( sparqlQuery ).then( transf ) ;