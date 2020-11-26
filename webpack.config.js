const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const minicss = require('mini-css-extract-plugin')

const glob = require('glob');

const files = glob.sync("./page/**/index.js");

let entryParams = {};
let htmlCfgs = [];

files.forEach((filePath)=>{
    let key = filePath.split('/')[2];
	entryParams[key] = path.resolve(__dirname,filePath);
	htmlCfgs.push(new HtmlWebpackPlugin({
		chunks:[key],
		filename: key + '.html',
		template: path.resolve(__dirname,'./page/' + key + '/render.js'),
    }));
});

console.log(files);

module.exports ={
    mode:'development',
    // entry:{
    //     index:'./page/index/index.js',
	 //    cart:'./page/cart/index.js'
    // },
    entry:entryParams,
    output:{
        filename:'js/[name].js',
        path:path.resolve(__dirname,'./web'),
	    publicPath: "./"
    },
    module:{
        rules:[
            {
                test: /\.ejs$/,
                use:[
                    {
                        loader: 'ejs-loader',
                        options: {
                            esModule:false
                        }
                    }
                ]
            },
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            {
                test:/\.css$/,
                use: [
                    {
                        loader: minicss.loader,
                        options: {
                            // 这里可以指定一个 publicPath
                            // 默认使用 webpackOptions.output中的publicPath

                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use:[
                    {
                        loader:'url-loader', //esModule
                        options:{
                            limit: 8 * 1024,
                            esModule:false,
                            name:'imgs/[name][hash:8].[ext]'
                        }
                    }
                ]
            },
            { // 配置sass
                test: /\.scss$/,
                use: [
                    minicss.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins:[
	    // new HtmlWebpackPlugin({
         //    chunks:['index'],
         //    filename: 'index.html',
         //    template: './page/index/html.js',
         //    //template: './page/index/index.ejs',
         //    // header:{title:'hello'}
         //    // title:"hihi"
	    // }),
	    // new HtmlWebpackPlugin({
		 //    chunks:['cart'],
		 //    filename: 'cart.html',
		 //    template: './page/cart/html.js',
		 //    //template: './page/index/index.ejs',
		 //    // header:{title:'hello'}
		 //    // title:"hihi"
	    // }),
        new minicss({
            filename: 'css/[name].css'
        }),

        new CleanWebpackPlugin()

    ].concat(htmlCfgs),
	resolve: {
		alias: {
		    '@':path.resolve(__dirname,'public')
        }
	},
	devServer: {
        contentBase:path.resolve(__dirname,'web'),
        port:4000
    }
}