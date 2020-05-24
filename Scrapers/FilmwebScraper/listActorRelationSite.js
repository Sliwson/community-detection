const rp = require("request-promise");
const $ = require("cheerio");

const listActorRelationSite = function(url) {
  return rp(url.url)
    .then(function(html) {
      //success!
      var relations = [];

      $("#personUsualsPartnersList > li > div", html).each(function(i, item) {
        var a = $(item).children().first().children().first();
        var link = a.attr("href");

        var how_many = $(item).children().last().text().match(/\d+/)[0];
        //console.log(how_many);
        //var name = $(item).text();

        relations.push({
            first_link: url.link,
            second_link: link,
            how_many
          });
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

module.exports = listActorRelationSite;
