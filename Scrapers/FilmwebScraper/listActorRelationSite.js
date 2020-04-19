const rp = require("request-promise");
const $ = require("cheerio");

const listActorRelationSite = function(url) {
  return rp(url.url)
    .then(function(html) {
      //success!
      var relations = [];

      $("#personUsualsPartnersList > li > div > .photoBox > a", html).each(function(i, item) {
        var link = $(item).attr("href");
        var name = $(item).text();

        relations.push({
            first_link: url.link,
            second_link: link
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
