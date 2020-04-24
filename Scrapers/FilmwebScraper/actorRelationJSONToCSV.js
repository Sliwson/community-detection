const fs = require("fs");

var result = "first_number;second_number;how_many\n";
var text = "";

var contents = fs.readFileSync(
    "./data/allActorsRelation.json",
    "utf8");

var table = JSON.parse(contents);
for(var i=0; i<table.length; i++){
    text += table[i].first_number + ";" + table[i].second_number + ";" + table[i].how_many + "\n";
}

table = text.split('\n');
for(var i=1; i<table.length; i++){
  if(table[i]!==table[i-1])
    result += table[i] + '\n';
}

fs.writeFile(
  "./data/allActorsRelation2.csv",
  result,
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    console.log(result.length);
  }
);