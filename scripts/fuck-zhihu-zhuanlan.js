// ==UserScript==
// @name         过滤知乎专栏(fuck-zhihu-zhuanlan)
// @namespace    https://github.com/dyingsunlight/tampermonkey
// @supportURL   https://github.com/dyingsunlight/tampermonkey/issues
// @homepage     https://github.com/dyingsunlight/tampermonkey
// @updateURL    https://github.com/dyingsunlight/tampermonkey/raw/master/scripts/fuck-zhihu-zhuanlan.js
// @source       https://github.com/dyingsunlight/tampermonkey/raw/master/scripts/fuck-zhihu-zhuanlan.js
// @downloadURL  https://github.com/dyingsunlight/tampermonkey/raw/master/scripts/fuck-zhihu-zhuanlan.js
// @version      0.1
// @description  过滤首页推荐的所有的知乎专栏
// @author       Dogfish
// @match        https://www.zhihu.com/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  (new MutationObserver(mutations => mutations.forEach(blockExecutor))).observe(document, {
    childList: true,
    subtree: true,
    characterData: false,
    attributes: false
  });
  const checkedMarkClass = 'zhuanlan-checked'
  function blockExecutor() {
    const elements = document.querySelectorAll(`a[href*="zhuanlan.zhihu.com"]:not(.${checkedMarkClass})`)
    for (let element of elements) {
      element.classList.add(checkedMarkClass)
      const cardElement = findParentElementUntilMeetClass(element, 'Card')
      if (!cardElement) {
        console.log('cardElement not found',  cardElement, element)
        continue
      }
      cardElement.style.display = 'none!important'
    }
  }
  // Utils
  function findParentElementUntilMeetClass(element, classes) {
    
    const classList = typeof classes === 'string' ? classes.split(' ') : classes
    if (!Array.isArray(classList)) {
      throw new Error('Classes Must be an array or string!')
    }
    
    let next = element
    while (next) {
      if (classList.some(val => next.classList.contains(val))) {
        return next
      }
      if (next.parentElement) {
        next = next.parentElement
      } else {
        return
      }
    }
  }
})();
