var sql = require('./db.js');

var Product = function(product){
    this.name = product.product_name;
    this.price = product.price;
    this.remaining = product.remaining;
}

Product.getAllProducts = function(result){
    sql.query("Select * from product_info", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                // console.log('tasks : ', res); 
                let sodas = {};
                for (let i = 0; i < res.length; i++) {
                  sodas[res[i].product_name] = {};
                  sodas[res[i].product_name].id = res[i].product_id;
                  sodas[res[i].product_name].name = res[i].product_name;
                  sodas[res[i].product_name].price = res[i].price;
                  sodas[res[i].product_name].remaining = res[i].remaining;
                }

                result(null, sodas);
            }
        });
};

Product.reportSale = function(result, sold){
    // console.log(sold);
    sql.query("Select * from product_info;", function (err, res) {
            if(err) {
                console.log(`error: ${err}`);
                result(null, err);
            }
            else{
                let sodas = {};
                for (let i = 0; i < res.length; i++) {
                  sodas[res[i].product_name] = {};
                  sodas[res[i].product_name].id = res[i].product_id;
                  sodas[res[i].product_name].name = res[i].product_name;
                  sodas[res[i].product_name].price = res[i].price;
                  sodas[res[i].product_name].remaining = res[i].remaining;
                }

                // let dateTime = moment().utc().format('yyyy-MM-dd hh:mm:ss');
                // console.log(sodas[sold]);
                // save sale in sales table
                // Use retrieved product id for foreign key
                sql.query(`INSERT INTO sales(timestamp, item_sold) VALUES(NOW(), ${sodas[sold].id});`, function(salesError, salesRes){
                    if(salesError){
                        console.log(`error: ${salesError}`);
                        result(null, salesError);
                    } else {
                        // decrement the remaining sodas for the item sold
                        if (sodas[sold].remaining>0) {
                            sql.query(`UPDATE product_info SET remaining = ${sodas[sold].remaining-1} WHERE product_id = ${sodas[sold].id};`, function(e,r){
                                if (e) {
                                    console.log(`error: ${e}`);
                                    result(null, e);
                                } else {
                                    result(null, true);
                                }
                            })
                        } else {
                            result(null, false);
                        }
                    }
                });



            }
        });
    
};

module.exports = Product;