var pgtools = require("pgtools")

const config = {
  user: "postgres",
  host: "localhost",
  password: "docker",
  port: 5432
}

pgtools.createdb(config, "gostack_desafio06", (err, res) => {
  if(err){
    console.error(err)
    process.exit(-1)
  }
  console.log(res)
})
