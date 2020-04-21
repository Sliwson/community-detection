const rp = require("request-promise");
const $ = require("cheerio");
const fs = require("fs");

const listActorRelationSite = require("./listActorRelationSite");
const url = "https://www.filmweb.pl";
const n = 100;

var content = fs.readFileSync(
    "./data/allActors.json",
    "utf8"
  );

  var actors = JSON.parse(content);

rp(url)
  .then(function(html) {
    //success!
    const urls = [];
    for (var i = n*100; i < (n+1)*100; i++) {
      urls.push({
          url: url + actors[i].link + '/partners',
          link: actors[i].link
      });
    }

    //console.log(urls);

    return Promise.all(
      urls.map(function(url) {
        return listActorRelationSite(url);
      })
    );
  })
  .then(function(relations) {
    var result = [];

    relations.forEach(x => {
      var table = JSON.parse(x.list);
      //console.log(x);
      result = result.concat(table);
    });
    console.log(result.length);

    fs.writeFile("./data/actorsRelation" + n + ".json", JSON.stringify(result), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  })
  .catch(function(err) {
    console.log(err);
  });
