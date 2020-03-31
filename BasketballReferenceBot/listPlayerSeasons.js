const rp = require("request-promise");
const $ = require("cheerio");

const listPlayerSeasons = function(url, link) {
  return rp(url)
    .then(function(html) {
      //success!
      var seasons = [];

      $(".stats_table > tbody > tr", html).each(function(i, item) {
        var season = $(item)
          .children()
          .first()
          .children()
          .first()
          .text();

        var club = $(item)
          .children()
          .eq(2)
          .children()
          .first()
          .text();

        if (!club) {
          club = $(item)
            .children()
            .eq(2)
            .text();
        }

        if (!club || !seasons) {
          console.log(club + " " + season + " " + link);
        }

        seasons.push({
          link,
          season,
          club
        });
      });

      return {
        seasons: JSON.stringify(seasons)
      };
    })
    .catch(function(err) {
      //handle error
      console.log(err);
    });
};

module.exports = listPlayerSeasons;
