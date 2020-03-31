const rp = require("request-promise");
const $ = require("cheerio");

const listPlayerSite = function(url) {
  return rp(url)
    .then(function(html) {
      //success!
      var players = [];

      $("#players > tbody > tr", html).each(function(i, item) {
        var year = $(item)
          .children()
          .eq(1)
          .text();

        var link = $(item)
          .children()
          .first()
          .children()
          .first()
          .attr("href");

        if (!link) {
          link = $(item)
            .children()
            .first()
            .children()
            .first()
            .children()
            .first()
            .attr("href");
        }

        players.push({
          name: $(item)
            .children()
            .first()
            .text(),
          year,
          link
        });
      });

      return {
        list: JSON.stringify(players)
      };
    })
    .catch(function(err) {
      //handle error
      console.log(err);
    });
};

module.exports = listPlayerSite;
