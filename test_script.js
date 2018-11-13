const pg = require("pg");
const settings = require("./settings"); // settings.json

const myArgs = process.argv.slice(2);
const userInput = myArgs[0];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1", [userInput], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

  function output(result) {
    console.log(`Found ${result.length} person(s) by the name ${userInput}:`);
    result.forEach(function(item, i) {
      let number = 1;
      console.log(`- ${number + i} ${item.first_name} ${item.last_name} born ${item.birthdate}`);
    });
  }
  output(result.rows);

    client.end();
  });
});
console.log("Searching ...");

