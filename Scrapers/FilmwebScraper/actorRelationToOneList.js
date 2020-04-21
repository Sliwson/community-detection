const fs = require("fs");

var result = [];

function compareNumbers(a, b) {
  if(a.first_number != b.first_number)
    return a.first_number - b.first_number;

  return a.second_number - b.second_number;
}

for (var i = 0; i < 100; i++) {
  var contents = fs.readFileSync(
    "./data/actorsRelation" + i + ".json",
    "utf8"
  );

  var table = JSON.parse(contents);
  for(var j=0; j<table.length; j++){
    var link = table[j].first_link;
    var start = link.length-1;
    while(link[start] >= "0" && link[start] <= "9" ){       
        start--;
    }
    start++;
    var first_number = link.substring(start, link.length);

    link = table[j].second_link;
    start = link.length-1;
    while(link[start] >= "0" && link[start] <= "9"){
        start--;
    }
    start++;
    var second_number = link.substring(start, link.length);
    
    if(first_number == "" || second_number == "")
      continue;

    if(+first_number < +second_number)
        result.push({
            first_link: table[j].first_link,
            second_link: table[j].second_link,
            first_number,
            second_number
        })
    else{
      result.push({
        first_link: table[j].second_link,
        second_link: table[j].first_link,
        first_number: second_number,
        second_number: first_number
    })
    }
  }
}

result = result.sort(compareNumbers)

fs.writeFile(
  "./data/allActorsRelation.json",
  JSON.stringify(result),
  function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
    console.log(result.length);
  }
);