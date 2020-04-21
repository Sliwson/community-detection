const fs = require("fs");

var text = "first_link;first_number;second_link;second_number\n";

var contents = fs.readFileSync(
    "./data/allActorsRelation.json",
    "utf8");

var table = JSON.parse(contents);
for(var i=0; i<table.length; i++){
    text += table[i].first_link + ";" + table[i].first_number + ";" + table[i].second_link + ";" + table[i].second_number + "\n";
}

fs.writeFile(
  "./data/allActorsRelation.csv",
  text,
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    console.log(text.length);
  }
);