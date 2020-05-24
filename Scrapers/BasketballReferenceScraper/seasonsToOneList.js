const fs = require("fs");

var seasons = [];

for (var i = 0; i < 200; i++) {
  var contents = fs.readFileSync(
    "./playersSeasons/seasons" + i + ".json",
    "utf8"
  );

  var table = JSON.parse(contents);
  seasons = seasons.concat(table);
}

fs.writeFile(
  "./playersSeasons/allSeasons1.json",
  JSON.stringify(seasons),
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  }
);
