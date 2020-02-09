const $   = require('cheerio')
const log = console.log


/**
 * 根据翻译源名称查找翻译源
 *
 * @param {String} sourceName 翻译源名称
 * @param {Array} sourcesList 翻译源列表
 * @return {Object}
 */

function getSourceBySourceName(sourceName,sourcesList) {
    let sources = sourcesList.filter(item => item.name === sourceName ? true : false)

    if (!sources.length) {
        log('翻译源不存在')
        return;
    }

    return sources[0]
}

exports.getSourceBySourceName = getSourceBySourceName



/**
 * 根据翻译词生成翻译源
 *
 * @param {String} word 翻译词
 * @return {Array}
 */

function sourcesCreate(word){
    return [{
        name: 'yd',
        title:'有道翻译',
        zh: {
            url: `https://dict.youdao.com/w/eng/${encodeURIComponent(word)}`,
            wordSelector: 'div#phrsListTab > div.trans-container > ul',
            pronSelector: 'h2.wordbook-js > span.phonetic',
            format(body){
                let $root  = $.load(body)
                let $textNode  = $root(this.wordSelector)
                let $pronNode = $root(this.pronSelector)
                let pronText = $pronNode.text()
                let textList = $textNode.find('p.wordGroup')

                let res   = []
                if(pronText!==""){
                    res.push("pron. "+pronText)
                }
                textList.each(function(i, item) {
                    let des   = []
                    let sub   = '' // 词性

                    $(this).children().each(function(){
                        if($(this).find('.search-js').length){
                            des.push($(this).find('.search-js').text().trim())
                        }else{
                            sub = $(this).text()+' '
                        }

                    })

                    res.push(sub+des.join('；'))

                })

                return res
            }
        },
        en: {
            url: `https://dict.youdao.com/w/${word}`,
            wordSelector: 'div#phrsListTab > div.trans-container > ul',
            pronSelector: 'span.pronounce > span.phonetic',
            format(body){
                let $root  = $.load(body)
                let $textNode  = $root(this.wordSelector)
                let $pronNode = $root(this.pronSelector)
                let pronText = $pronNode.last().text() // first for uk, last for us
                let textList = $textNode.find('li')

                let res   = []
                if(pronText!==""){
                    res.push("pron. "+pronText)
                }
                textList.each(function() {
                    res.push($(this).text())
                })

                return res
            }
        }
    }]
}

exports.sourcesCreate = sourcesCreate