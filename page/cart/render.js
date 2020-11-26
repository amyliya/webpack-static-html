const template = require('./cart.ejs');

module.exports = template({
	list:[
		{
			name:"加多宝",
			price:5
		}
	]
});