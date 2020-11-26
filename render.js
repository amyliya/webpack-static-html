const  template = require('./form.ejs')
console.log(template)
module.exports = template({
	title:'hello11323',
	age:100,
	people:['geddy', 'neil', 'alex']

})