/**
 * 检查 str 的语言类型
 *
 * @param {String} str
 * @return {String}
 */

function language(str) {
    if (/^[\u3220-\uFA29]+$/.test(str)) {
        return 'zh'
    } else {
        return 'en'
    }
}

module.exports = language