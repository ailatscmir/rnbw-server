var express = require('express');
var router = express.Router();
var request = require('request');
var entities = require('html-entities').AllHtmlEntities;
var arraySort = require('array-sort');

const apiUrl = "http://trkraduga.ru/wp-json/waysApi/stores";
// const propertiesObject = { per_page:'60' };
/* GET home page. */
const htmlentity = new entities();
router.get('/', function(req, res, next) {
    request.get({
        url: apiUrl,
        timeout: 3000
        // qs: propertiesObject
    }, function(error, response, body) {
        if (!error) {

            var apiJson = JSON.parse(body);
            if (apiJson.data) {if (apiJson.data.status) res.send({error: 'apiError'})}
            else {
              console.log('itworks');
              arraySort(apiJson,'post_title');
              res.send(apiJson);
            };

        } else res.send({error:'serverDown'})
    });

});

module.exports = router;
