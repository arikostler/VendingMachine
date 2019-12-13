var Soda = require('../model/appModel.js');

exports.list_products = function(req, res) {
  console.log("Product list requested.");
  Soda.getAllProducts(function(err, product){
    if (err)
      res.send(err);
    // console.log('res', product);
    res.send(product);
  });
};

exports.report_sale = function(req, res){
  // get name of soda
  // include soda name with the reportSale function
  let sodaName = req.body.name;
  console.log(`Sale of ${sodaName} reported.`);
  // console.log(req);
  Soda.reportSale(function(err, product){
    if (err) {
      res.send(err);
    }
    res.send(product);
  }, sodaName);
};