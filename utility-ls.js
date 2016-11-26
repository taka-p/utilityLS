/**
 * utility-LS.js
 * ローカルストレージのラッパーライブラリ
 */

;(function(root, factory) {
    // 複数の利用環境に対応させる
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.ULS = factory();
    }
})(this, function() {

    function ULS() {
        return (this instanceof ULS)
                ? this.initialize()
                // newしなくても使えるようにする
                : new ULS();
    }

    ULS.prototype.initialize = function() {
        if (! window.localStorage) {
            throw new Error('utility-LS.js Not Supported this environments');
        }
    };

    //==============================================
    //  staticスメソッド
    //==============================================

    ULS.get = function(key) {
        var ret = localStorage.getItem(key);
        return JSON.parse(ret);
    };

    // @param opt_value: プリミティブ値/配列/オブジェクトに対応
    ULS.set = function(key, opt_value) {
        // 値が空のレコードを作る
        var tmp = opt_value || '';
        // オブジェクトにも対応
        if (typeof opt_value === 'object') {
            tmp = JSON.stringify(opt_value);
        }
        localStorage.setItem(key, tmp);
    };

    ULS.rm = function(key) {
        localStorage.removeItem(key);
    };

    ULS.clear = function() {
        localStorage.clear();
    };

    // @param key: 配列とオブジェクトに対応
    ULS.each = function(key, callback) {
        var target = localStorage.getItem(key);
        var convertTarget = JSON.parse(target);

        if (typeof callback === 'function' &&
                typeof convertTarget === 'object') {
            // 配列
            if (Array.isArray(convertTarget)) {
                convertTarget.forEach(function(item, index) {
                    callback(item, index);
                });
                // オブジェクト
            } else {
                Object.keys(convertTarget).forEach(function (key) {
                    callback(key, convertTarget[key]);
                });
            }
        }
    };

    return ULS;
});

