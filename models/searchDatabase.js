var db = require("../db.js");
var pgp = require("pg-promise")({ noLocking: true });
var prepareQueryForDatabaseSearch = require("./prepareQueryString");

function searchDatabase(search) {
  search = prepareQueryForDatabaseSearch(search);

  var database_search = [];

  for (i = 0; i < search.length; i++) {
    database_search.push(
      db.any("SELECT * FROM weburlsandcontent WHERE description LIKE ${str} OR title LIKE ${str} OR keywords LIKE ${str} OR weburl LIKE ${str}", {
        str: search[i]
      })
    );
    return Promise.all(database_search);
    // database_search.push(
    //   db.any("SELECT * FROM weburlsandcontent WHERE title LIKE ${str}", {
    //     str: search[i]
    //   })
    // );
    // database_search.push(
    //   db.any("SELECT * FROM weburlsandcontent WHERE keywords LIKE ${str}", {
    //     str: search[i]
    //   })
    // );
  }
}

module.exports = searchDatabase;
