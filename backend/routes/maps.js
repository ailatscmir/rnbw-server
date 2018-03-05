var express = require('express');
var router = express.Router();
var request = require('request');
var entities = require('html-entities').AllHtmlEntities;

const apiUrl = "http://trkraduga.ru/wp-json/waysApi/mapSvg";

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
              res.send(apiJson);
            };
        } else res.send({error:'serverDown'})
    });

});

module.exports = router;
