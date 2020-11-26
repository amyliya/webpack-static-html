const header = require('./header.ejs');
const footer = require("./footer.ejs");

const layout = require("./html.ejs");

let pf = {
	pageTitle:'欢迎'
};

module.exports = {
	/* 处理各个页面传入而又需要在公共区域用到的参数 */
	init:function({pageTitle}){
		pf.pageTitle = pageTitle;
		return this;
	},
	render:function(content){
		//根据传进来的数据进行页面渲染并返回渲染结果字符串

		const renderData = Object.assign({},pf);

		return layout({
			//header:header({title:"fef"}),
			header:header(renderData),
			content:content,
			footer:footer(renderData)
		});
	}
};

