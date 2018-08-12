const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const defaultInclude = path.resolve(__dirname, 'src')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const commonConfig = {
     node: {
         __dirname: false
     },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    typeCheck: true,
                    emitErrors: true
                }
            },
             {
                    test: /\.css$/, // loader CSS
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
                    include: defaultInclude
             },
            {
                test: /\.tsx?$/,
               loader: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'standard-loader',
                options: {
                    typeCheck: true,
                    emitErrors: true
                }
            }, 
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.json']
    }, plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        }), 
        new MiniCssExtractPlugin({
            filename: 'bundle.css'
        }),
    ],
}


module.exports = [
        Object.assign({
                target: 'electron-main',
                entry: {
                    main: './src/main.ts'
                }
            },
            commonConfig),
        Object.assign({
                target: 'electron-renderer',
                entry: {
                    gui: './src/components/gui.tsx'
                },
                plugins: [new HtmlWebpackPlugin()]
            },
            commonConfig)
    ]