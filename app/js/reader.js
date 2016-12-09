import  'normalize.css';
import '../css/reader.scss';

import 'imports?jQuery=zeptov12-webpack!jquery.base64';
import 'imports?jQuery=zeptov12-webpack!jquery.jsonp';
import Vue from 'vue';

class Util {
    constructor({prefix}) {
        this.prefix = prefix;
    }

    storageGetter(key) {
        return localStorage.getItem(this.prefix + key);
    }

    storageSetter(opt) {
        Object.keys(opt).forEach(key => localStorage.setItem(this.prefix + key, opt[key]));
    }
}
const util = new Util({prefix: 'html5_reader_'});

const Dom = {
    topNav: document.getElementById('top-nav'),
    bottomNav: document.getElementById('bottom-nav'),
};
function main() {
    //todo 整个项目的入口函数
}

function ReaderModel() {
    //todo 实现阅读器数据交互的方法
}

function ReaderBaseFrame() {
    //todo 实现渲染UI结构
}

function eventHandler() {
    document.body.addEventListener('click', function (e) {
        const clickLocation = getClickLocation(e.clientX);
        switch (true) {
            case clickLocation === 'top':
                break;
            case clickLocation === 'mid':
                console.log('sad');
                toggleMenuUI();
                break;
            default:
        }
    });
}
eventHandler();
function toggleMenuUI() {
    toggleClass(Dom.topNav, 'activate');
    toggleClass(Dom.bottomNav, 'activate');
}
function toggleClass(el, className) {
    if (typeof el === 'string') el = document.querySelector(el);
    const flag = el.className.includes(className);
    if (flag) {
        el.classList.remove(className);
    } else {
        el.classList.add(className);
    }
}
function getComputeStyle(el) {
    return el.ownerDocument.defaultView.getComputedStyle(el, null);
}
/**
 * @Overview 获取点击目标在屏幕中的大概区块位置
 * @param xIndex
 * @returns {*}
 */
function getClickLocation(xIndex) {
    const browserClientHeight = document.documentElement.clientHeight;
    switch (true) {
        case xIndex < browserClientHeight * 0.3:
            return 'top';
        case xIndex < browserClientHeight * 0.7:
            return 'mid';
        default:
            return 'bottom';
    }
}