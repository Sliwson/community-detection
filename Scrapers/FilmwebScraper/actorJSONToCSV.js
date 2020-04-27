const fs = require("fs");

var text = "name;link;number\n";

var contents = fs.readFileSync("./data/allActors.json", "utf8");

var table = JSON.parse(contents);
for (var j = 0; j < table.length; j++) {
  var link = table[j].link;
  var start = link.length - 1;
  while (link[start] >= "0" && link[start] <= "9") {
    start--;
  }
  start++;
  var number = link.substring(start, link.length);

  text += table[j].name + ";" + table[j].link + ";" + number + "\n";
}

fs.writeFile("./data/allActors.csv", text, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("The file was saved!");
  console.log(text.length);
});
