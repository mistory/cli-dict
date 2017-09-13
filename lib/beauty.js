/**
 * 数组 str 转字符串
 *
 * @param {Array} str
 * @return {String}
 */

function beauty(str){
	let space = '     '
	
	if(Array.isArray(str)){
		str = str.map(item=> space+item)
	}else{
		str = space+str
	}
	
	str.unshift('')
	str.push('')

	return str.join('\n')
}

module.exports = beauty
