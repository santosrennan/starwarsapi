const fetch = require('node-fetch');

const SWAPI_URL= "https://swapi.dev/api"

async function getShowMovie(name) { 
    const req = await fetch(`${SWAPI_URL}/planets?search=${name}`);

    const res = await req.json();

    if(!res.results[0]) {
        console.log("Resultado Zerado não temos filmes com esse planeta")
        return 0;
       
    }

    console.log("Achamos filmes")
    return res.results[0].films.length;
}

module.exports = { getShowMovie }