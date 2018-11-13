const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const myArgs = process.argv.slice(2);
const userInput = myArgs[0];

knex.select('*').from('famous_people')
.where('first_name', '=', userInput)
.asCallback(function(err, rows) {
  if (err) return console.error(err);
      console.log(`Found ${rows.length} person(s) by the name ${userInput}:`);
      rows.forEach(function(item, i) { let number = 1; console.log(`- ${number + i} ${item.first_name} ${item.last_name} born ${item.birthdate}`); });
knex.destroy();
});
