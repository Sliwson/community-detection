const rp = require("request-promise");
const $ = require("cheerio");
const fs = require("fs");

const listActorSite = require("./listActorSite");
const url = "https://www.filmweb.pl/persons/search?country=42&orderBy=popularity&descending=true&page=";

rp(url)
  .then(function(html) {
    //success!
    const urls = [];
    for (var i = 900; i <= 1000; i++) {
      urls.push(url + i);
    }

    //console.log(urls);

    return Promise.all(
      urls.map(function(url) {
        return listActorSite(url);
      })
    );
  })
  .then(function(presidents) {
    var result = [];

    presidents.forEach(x => {
      var table = JSON.parse(x.list);
      //console.log(x);
      result = result.concat(table);
    });
    console.log(result.length);

    fs.writeFile("./data/actors10.json", JSON.stringify(result), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  })
  .catch(function(err) {
    console.log(err);
  });
