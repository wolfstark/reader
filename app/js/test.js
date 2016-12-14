"use strict";
require('normalize.css');
require('../css/reader.scss');
require('imports?jQuery=zeptov12-webpack!jquery.base64');
require('imports?jQuery=zeptov12-webpack!jquery.jsonp');
var Vue = require('vue');
new Vue();
var Util = (function () {
    function Util(_a) {
        var prefix = _a.prefix;
        this.prefix = prefix;
    }
    Util.prototype.storageGetter = function (key) {
        return localStorage.getItem(this.prefix + key);
    };
    Util.prototype.storageSetter = function (opt) {
        var _this = this;
        Object.keys(opt).forEach(function (key) { return localStorage.setItem(_this.prefix + key, opt[key]); });
    };
    Util.prototype.getComputeStyle = function (el) {
        return el.ownerDocument.defaultView.getComputedStyle(el, null);
    };
    return Util;
}());
var util = new Util({ prefix: 'html5_reader_' });
var Dom = {
    topNav: document.getElementById('top-nav'),
    bottomNav: document.getElementById('bottom-nav'),
    settingPanel: document.getElementById('bottom-nav').querySelector('.nav-banner'),
    settingButton: document.getElementById('bottom-nav').querySelector('.setting-button')
};
function ReaderModel() {
    //todo 实现阅读器数据交互的方法
}
function ReaderBaseFrame() {
    //todo 实现渲染UI结构
}
function eventHandler() {
    document.body.addEventListener('click', function (e) {
        var clickLocation = getClickLocation(e.clientY);
        switch (true) {
            case clickLocation === 'top':
                break;
            case clickLocation === 'mid':
                toggleMenuUI();
                break;
            default:
        }
    });
    window.addEventListener('scroll', function () {
        toggleMenuUI('close');
    });
    Dom.settingButton.addEventListener('click', function () {
        toggleSettingPanel();
    });
}
function toggleSettingPanel() {
    toggleClass(Dom.settingPanel, 'activate');
}
function toggleMenuUI(action) {
    if (action === 'close') {
        Dom.topNav.classList.remove('activate');
        Dom.bottomNav.classList.remove('activate');
    }
    else if (action === 'activate') {
        Dom.topNav.classList.add('activate');
        Dom.bottomNav.classList.add('activate');
    }
    else {
        toggleClass(Dom.topNav, 'activate');
        toggleClass(Dom.bottomNav, 'activate');
    }
}
function toggleClass(el, className) {
    if (typeof el === 'string')
        el = document.querySelector(el);
    var flag = el.className.includes(className);
    if (flag) {
        el.classList.remove(className);
    }
    else {
        el.classList.add(className);
    }
}
/**
 * @overview 获取点击目标在屏幕中的大概区块位置
 * @param yIndex {Number} 浏览器窗口的高度
 * @returns {String}
 */
function getClickLocation(yIndex) {
    var browserClientHeight = document.documentElement.clientHeight;
    switch (true) {
        case yIndex < browserClientHeight * 0.3:
            return 'top';
        case yIndex < browserClientHeight * 0.7:
            return 'mid';
        default:
            return 'bottom';
    }
}
void function main() {
    //todo 整个项目的入口函数
    eventHandler();
}();
//# sourceMappingURL=test.js.map