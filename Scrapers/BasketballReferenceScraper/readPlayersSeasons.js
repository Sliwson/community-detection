const rp = require("request-promise");
const $ = require("cheerio");
const fs = require("fs");

const listPlayerSeasons = require("./listPlayerSeasons");
const url = "https://www.basketball-reference.com";

const counter = parseInt(process.argv[2]);

fs.readFile("./players.json", "utf8", (err, data) => {
  if (err) {
    console.log("error");
    console.log(err);
  }

  var players = JSON.parse(data);
  //var counter = 199;

  console.log("Start");
  const urls = [];
  for (var i = counter * 24; i < (counter + 1) * 24; i++) {
    urls.push({ url: url + players[i].link, link: players[i].link });
  }

  //console.log(urls);

  return Promise.all(
    urls.map(function(url) {
      return listPlayerSeasons(url.url, url.link);
    })
  )
    .then(function(seasons) {
      var result = [];

      seasons.forEach(x => {
        var table = JSON.parse(x.seasons);
        result = result.concat(table);
      });

      fs.writeFile(
        "./playersSeasons/seasons" + counter + ".json",
        JSON.stringify(result),
        function(err) {
          if (err) {
            return console.log(err);
          }
          console.log("The file was saved!");
        }
      );
    })
    .catch(function(err) {
      console.log(err);
    });
});
