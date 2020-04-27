const rp = require("request-promise");
const $ = require("cheerio");

const listActorRelationWithDateSite = function(url) {
  return rp(url.url)
    .then(function(html) {
      //success!
      var relations = "";

      $(".usualsPartnersFilms", html).each(function(i, item) {
        //var link = $(item).attr("href");
        //console.log("Mam!");
        var name = $(item).children().last().text().match(/\(([^)]+)\)/)[1];
        //console.log(name);

        relations += url.first_number + ";" + url.second_number + ";" + name + "\n";
      });

      return {
        list: JSON.stringify(relations)
      };
    })
    .catch(function(err) {
      //handle error
      console.log(err);
    });
};

module.exports = listActorRelationWithDateSite;
