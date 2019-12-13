module.exports = function(app){
	var sodaControl = require('../controller/sodaController');

	app.route('/ws/soda-service')
		.get(sodaControl.list_products)
		.post(sodaControl.report_sale);
};