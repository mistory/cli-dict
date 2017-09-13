const request = require('request')
const $       = require('cheerio')
const chalk   = require('chalk')
const Spinner = require('cli-spinner').Spinner
const language  = require('./language')
const source    = require('./source')
const beauty    = require('./beauty')
const log 		= console.log


/**
 * 根据关键字和翻译源名称查询翻译结果
 *
 * @param {String} word 关键字
 * @param {String} sourceName 翻译源名称
 */

function query(word, sourceName = 'yd') {
	let sourcesList = source.sourcesCreate(word)
	let site        = source.getSourceBySourceName(sourceName,sourcesList)
	let type 	    = language(word)
    let spinner     = new Spinner('processing.. %s')

	if(!site) return;
	
	site = site[type]

	spinner.setSpinnerString('|/-\\')
    spinner.start()

    request({
        'url': site.url,
    }, (err, res, body) => {
        spinner.stop(true)

        if (err) {
            log('查询出错')
            return
        }

        let $root  = $.load(body)
        let $node  = $root(site.selector)
        let text   = ''

        if(site.format){
        	text = beauty(site.format($node))
        }else{
        	text = beauty($node.text())
        }

		log(chalk.cyanBright(text))
    });
}

module.exports = query



















