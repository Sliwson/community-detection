const rp = require("request-promise");
const $ = require("cheerio");

const listActorSite = function(url) {
  return rp(url)
    .then(function(html) {
      //success!
      var actors = [];

      $(".hit__title > a", html).each(function(i, item) {
        var link = $(item).attr("href");
        var name = $(item).text();

        actors.push({
            name,
            link
          });
      });

      return {
        list: JSON.stringify(actors)
      };
    })
    .catch(function(err) {
      //handle error
      console.log(err);
    });
};

module.exports = listActorSite;
