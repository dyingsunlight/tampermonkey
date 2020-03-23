// ==UserScript==
// @name         过滤知乎首页推荐(fuck-zhihu-homepage)
// @namespace    https://github.com/dyingsunlight/tampermonkey
// @supportURL   https://github.com/dyingsunlight/tampermonkey/issues
// @homepage     https://github.com/dyingsunlight/tampermonkey
// @updateURL    https://github.com/dyingsunlight/tampermonkey/raw/master/scripts/fuck-zhihu-zhuanlan.js
// @source       https://github.com/dyingsunlight/tampermonkey/raw/master/scripts/fuck-zhihu-zhuanlan.js
// @downloadURL  https://github.com/dyingsunlight/tampermonkey/raw/master/scripts/fuck-zhihu-zhuanlan.js
// @version      0.14
// @description  过滤首页推荐的所有的知乎专栏，和知乎视频
// @author       Dogfish
// @match        https://www.zhihu.com/
// @match        https://www.zhihu.com/hot
// @match        https://www.zhihu.com/follow
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  //
  //
  let matchedCount = 0
  const styles = document.createElement('style')
  styles.innerHTML = `.hidden { display: none }; `;
  document.body.appendChild(styles);
  //
  //
  (new MutationObserver(mutations => mutations.forEach(blockExecutor))).observe(document, {
    childList: true,
    subtree: true,
    characterData: false,
    attributes: false
  });
  const checkedMarkClass = 'zhuanlan-checked'
  function blockExecutor() {
    const elements = document.querySelectorAll(`a[href*="zhuanlan.zhihu.com"]:not(.${checkedMarkClass}), a[href*="zhihu.com/zvideo"]:not(.${checkedMarkClass})`)
    for (let element of elements) {
      element.classList.add(checkedMarkClass)
      const cardElement = findParentElementUntilMeetClass(element, 'Card')
      if (!cardElement) {
        console.log('cardElement not found',  cardElement, element)
        continue
      }
      console.log('Block Zhuan Lan Amount: ', ++matchedCount)
      cardElement.classList.add('hidden')
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
