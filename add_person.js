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
const firstName = myArgs[0];
const lastName = myArgs[1];
const birth = myArgs[2];


knex('famous_people')
.insert([{first_name: firstName, last_name: lastName, birthdate: birth}])
//.then(function () { this line replaces the call back function
.asCallback(function(err) {
  if (err) return console.error(err);
  console.log("Done");
  knex.destroy();
});



