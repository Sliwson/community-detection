const fs = require("fs");

var actors = [];

for (var i = 1; i < 11; i++) {
  var contents = fs.readFileSync(
    "./data/actors" + i + ".json",
    "utf8"
  );

  var table = JSON.parse(contents);
  actors = actors.concat(table);
}

fs.writeFile(
  "./data/allActors.json",
  JSON.stringify(actors),
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }
);