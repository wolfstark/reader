import 'normalize.css';
import '../css/reader.scss';

import 'imports?jQuery=zeptov12-webpack!jquery.base64';
import 'imports?jQuery=zeptov12-webpack!jquery.jsonp';
import * as Vue from 'vue';
new Vue();
class Util {
    prefix;
    constructor({prefix}) {
        this.prefix = prefix;
    }

    storageGetter(key) {
        return localStorage.getItem(this.prefix + key);
    }

    storageSetter(opt) {
        Object.keys(opt).forEach(key => localStorage.setItem(this.prefix + key, opt[key]));
    }

    getComputeStyle(el) {
        return el.ownerDocument.defaultView.getComputedStyle(el, null);
    }
}
const util = new Util({ prefix: 'html5_reader_' });

const Dom = {
    topNav: document.getElementById('top-nav'),
    bottomNav: document.getElementById('bottom-nav'),
    settingPanel: document.getElementById('bottom-nav').querySelector('.nav-banner'),
    settingButton: document.getElementById('bottom-nav').querySelector('.setting-button'),
};


function ReaderModel() {
    //todo 实现阅读器数据交互的方法
}

function ReaderBaseFrame() {
    //todo 实现渲染UI结构
}

function eventHandler() {
    document.body.addEventListener('click', e => {
        const clickLocation = getClickLocation(e.clientY);
        switch (true) {
            case clickLocation === 'top':
                break;
            case clickLocation === 'mid':
                toggleMenuUI();
                break;
            default:
        }
    });
    window.addEventListener('scroll', () => {
        toggleMenuUI('close');
    });
    Dom.settingButton.addEventListener('click', () => {
        toggleSettingPanel();
    });
}

function toggleSettingPanel() {
    toggleClass(Dom.settingPanel, 'activate');
}

function toggleMenuUI(action?) {
    if (action === 'close') {
        Dom.topNav.classList.remove('activate');
        Dom.bottomNav.classList.remove('activate');
    } else if (action === 'activate') {
        Dom.topNav.classList.add('activate');
        Dom.bottomNav.classList.add('activate');
    } else {
        toggleClass(Dom.topNav, 'activate');
        toggleClass(Dom.bottomNav, 'activate');
    }
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

/**
 * @overview 获取点击目标在屏幕中的大概区块位置
 * @param yIndex {Number} 浏览器窗口的高度
 * @returns {String}
 */
function getClickLocation(yIndex) {
    const browserClientHeight = document.documentElement.clientHeight;
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
} ();