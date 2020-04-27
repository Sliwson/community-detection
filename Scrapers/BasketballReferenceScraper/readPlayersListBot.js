const rp = require("request-promise");
const $ = require("cheerio");
const fs = require("fs");

const listPlayerSite = require("./listPlayerSite");
const url = "https://www.basketball-reference.com/players/";

var alphabet = "abcdefghijklmnopqrstuvwyz".split("");

rp(url)
  .then(function(html) {
    //success!
    const urls = [];
    for (var i = 0; i < alphabet.length; i++) {
      urls.push(url + alphabet[i]);
    }

    //console.log(urls);

    return Promise.all(
      urls.map(function(url) {
        return listPlayerSite(url);
      })
    );
  })
  .then(function(presidents) {
    var result = [];

    presidents.forEach(x => {
      var table = JSON.parse(x.list);
      //console.log(table);
      result = result.concat(table);
    });
    console.log(result.length);

    fs.writeFile("./players.json", JSON.stringify(result), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });
  })
  .catch(function(err) {
    console.log(err);
  });
