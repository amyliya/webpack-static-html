// const template = require('./index.ejs');
//
// module.exports = template({
// 	title:"您好",
// 	img:require('@/img/2.png'),
// 	 htmlImg:require("@/img/html.jpg")  // /img/html.jpg -- localhost:4000/img/html.jpg
// });

const layout = require('../layout/html.js');

const template = require('./index.ejs');

const pageStr = template({
	title:"您好",
	img:require('@/img/2.png'),
	 htmlImg:require("@/img/html.jpg")  // /img/html.jpg -- localhost:4000/img/html.jpg
});

module.exports = layout.init({
	pageTitle:"首页"
}).render(pageStr);