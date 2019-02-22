const pokemonQuery = require("./pokemonQuery");
const pokemonCountQuery = require("./pokemonCountQuery");
const moveQuery = require("./moveQuery");
const moveCountQuery = require("./moveCountQuery");

const { Client } = require("pg");
const client = new Client();

// the requests are finishing too fast to actually show
// the loader... so let's add a delay for demo purposes
const wait = (ms) => 
  new Promise(resolve => {
    setTimeout(() => { resolve() }, ms)
  })

module.exports = async (server) => {
  await client.connect();

  server.get("/api/pokemon", async (req, res) => {
    const { limit = 10, offset = 0 } = req.query;

    Promise.all([
      client.query(pokemonQuery, [ limit, offset ]),
      client.query(pokemonCountQuery),
      wait(750)
    ]).then(([pokemon, count]) => {
      res.send({
        pokemon: pokemon.rows,
        total: parseInt(count.rows[0].count, 10)
      });
    })
  })

  server.get("/api/pokemon/:pokemonId/moves", (req, res) => {
    const { pokemonId } = req.params;
    const { limit = 10, offset = 0 } = req.query;

    Promise.all([
      client.query(moveQuery, [ pokemonId, limit, offset ]),
      client.query(moveCountQuery, [ pokemonId ]),
      wait(750)
    ]).then(([moves, count]) => {
      res.send({
        moves: moves.rows,
        total: parseInt(count.rows[0].count, 10)
      });
    })
  })
};