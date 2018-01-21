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
        url: apiUrl
        // qs: propertiesObject
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            // res.json(body);
            var apiJson = JSON.parse(body);
            var wpRoutes = apiJson;
            arraySort(wpRoutes,'post_title');
            // console.log(apiJson);
            res.send(wpRoutes);
            // console.log(htmlentity.decode(body));
        }
    });

});

module.exports = router;
