import '../css/normalize.css';
import '../css/reader.scss';

import 'imports?jQuery=zeptov12-webpack!jquery.base64';
import 'imports?jQuery=zeptov12-webpack!jquery.jsonp';
import * as Vue from 'vue';

new Vue({

});
class Util {

    constructor(public prefix: string) {
    }

    storageGetter(key: string): string {
        return window.localStorage.getItem(this.prefix + key);
    }

    storageSetter(opt: any): void {
        Object.keys(opt).forEach(key => window.localStorage.setItem(this.prefix + key, opt[key]));
    }

    getComputeStyle(el: HTMLElement): CSSStyleDeclaration {
        return el.ownerDocument.defaultView.getComputedStyle(el, null);
    }

    toggleClass(el: Element, className: string): void {
        if (typeof el === 'string') el = document.querySelector(el);
        const flag = el.className.includes(className);
        if (flag) {
            el.classList.remove(className);
        } else {
            el.classList.add(className);
        }
    }
}
const util: Util = new Util('html5_reader_');

const Dom = {
    topNav: document.getElementById('top-nav'),
    bottomNav: document.getElementById('bottom-nav'),
    settingPanel: document.getElementById('bottom-nav').querySelector('.nav-banner'),
    settingButton: document.getElementById('bottom-nav').querySelector('.setting-button'),
};
/*model*/
function ReaderModel() {
    // todo 实现阅读器数据交互的方法
}

function ReaderBaseFrame() {
    // todo 实现渲染UI结构 
}
/*controller*/
function eventHandler(): void {
    // 上中下区域点击执行不同动作
    document.body.addEventListener('click', e => {
        const clickLocation = getClickLocation(e.clientY);
        switch (true) {
            case clickLocation === 'top':
            case clickLocation === 'bottom':
                pageTurning(clickLocation);
                break;
            default:
                toggleMenuUI();
        }
    });

    window.addEventListener('scroll', () => {
        toggleMenuUI('close');
    });

    Dom.settingButton.addEventListener('click', () => {
        toggleSettingPanel();
    });
}
/*view*/
function toggleSettingPanel(): void {
    util.toggleClass(Dom.settingPanel, 'activate');
}

function toggleMenuUI(action?: string): void {
    if (action === 'close') {
        Dom.topNav.classList.remove('activate');
        Dom.bottomNav.classList.remove('activate');
    } else if (action === 'activate') {
        Dom.topNav.classList.add('activate');
        Dom.bottomNav.classList.add('activate');
    } else {
        util.toggleClass(Dom.topNav, 'activate');
        util.toggleClass(Dom.bottomNav, 'activate');
    }
}

function pageTurning(direction: string): void {
    const [target, visualHeight] = [document.body, window.innerHeight];
    if (direction === 'top') {
        target.scrollTop -= visualHeight;
    } else if (direction === 'bottom') {
        target.scrollTop += visualHeight;
    }
}

/**
 * @overview 获取点击目标在屏幕中的大概区块位置
 * @param yIndex {number} 浏览器窗口的高度
 * @returns {string} `top`|`mid`|`bottom`
 */
function getClickLocation(yIndex: number): string {
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

void function main(): void {
    // todo 整个项目的入口函数+
    eventHandler();
} ();