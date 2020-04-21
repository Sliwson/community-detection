const rp = require("request-promise");
const $ = require("cheerio");
const fs = require("fs");

const listActorRelationWithDateSite = require("./listActorRelationWithDateSite");
const url = "https://www.filmweb.pl";
const n = parseInt(process.argv[2]);

var content = fs.readFileSync(
    "./data/allActorsRelation.csv",
    "utf8"
  );

  var relations = content.split('\n');
  relations.shift();

rp(url)
  .then(function(html) {
    //success!
    const urls = [];
    //console.log("Test");
    for (var i = n*100; i < (n+1)*100; i++){
        //console.log(i);
        var numbers = relations[i].split(";");
        var first_number = numbers[0];
        var second_number = numbers[1];

        //console.log(first_number + " ! " + second_number);

      urls.push({
          url: url + '/json/person/' + first_number + '/partner/' + second_number + '/details',
          first_number,
          second_number
      });
    }

    //console.log(urls);

    return Promise.all(
      urls.map(function(url) {
        return listActorRelationWithDateSite(url);
      })
    );
  })
  .then(function(relations) {
    var result = "";
    //console.log(relations);
    relations.forEach(x => {
      var line = JSON.parse(x.list);
      //console.log(line);
      //console.log(x);
      result += line;
    });
    console.log(result.length);

    fs.writeFile("./data/withDate/actorsRelationWithDate" + n + ".csv", result, function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  })
  .catch(function(err) {
    console.log(err);
  });
