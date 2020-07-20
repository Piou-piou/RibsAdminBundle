(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/main"],{

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ribsFlashMessage = __webpack_require__(/*! ribs-flash-message */ "./node_modules/ribs-flash-message/source/js/ribs-flash-message.js");

var _ribsFlashMessage2 = _interopRequireDefault(_ribsFlashMessage);

var _ribsPopup = __webpack_require__(/*! ribs-popup/source/js/ribs-popup */ "./node_modules/ribs-popup/source/js/ribs-popup.js");

var _ribsPopup2 = _interopRequireDefault(_ribsPopup);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var flash = new _ribsFlashMessage2.default();
var popups = new _ribsPopup2.default();

/***/ }),

/***/ "./node_modules/ribs-flash-message/node_modules/ribs-core/RibsCore.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ribs-flash-message/node_modules/ribs-core/RibsCore.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class RibsCore {
  /**
   * @param element
   * @returns {Number}
   * function that return height of an element that is no displayed
   */
  static getHeight(element) {
    //if max heigh get value and delete if for a moment
    const maxHeight = window.getComputedStyle(element).getPropertyValue('max-height');

    if (maxHeight !== "none") {
      element.style.maxHeight = 'inherit';
    }

    element.style.display = 'block';

    let height = parseInt(window.getComputedStyle(element).getPropertyValue('height'));
    element.style.display = '';

    if (maxHeight !== "none") {
      element.style.maxHeight = maxHeight;
    }

    return height;
  }

  /**
   * @param element
   * @param duration
   * this method do animation on height when displaying an element
   * if max height = none it show the element else this function hide it
   */
  static toggleSlide(element, duration) {
    let maxHeight = 0;
    const maxHeightDiv = window.getComputedStyle(element).getPropertyValue('max-height');

    if (maxHeightDiv === 'none' || maxHeightDiv === '0px') {
      maxHeight = this.getHeight(element);
    }

    element.style.transition = 'max-height 0.5s ease-in-out';
    element.style.maxHeight = 0;
    element.style.display = 'block';
    element.style.overflow = 'hidden';

    setTimeout(function () {
      element.style.maxHeight = `${maxHeight}px`;
    }, duration);
  }

  /**
   * @param element
   * @param newElement
   * add an element arround a specified element. This function is like .wrap() in jQuery
   */
  static wrap(element, newElement, className = null) {
    const parentElement = element.parentNode;
    const wrapper = document.createElement(newElement);
    wrapper.className = className;

    parentElement.insertBefore(wrapper, element);
    parentElement.removeChild(element);
    wrapper.appendChild(element);
  }

  /**
   * @param element
   * @param wanted
   * @returns {*}
   * method to get a wanted parent in parentsNodes of an element
   */
  static parents(element, wanted) {
    for ( ; element && element !== document; element = element.parentNode) {
      if (this.checkWanted(wanted) === 'class' && element.classList.contains(wanted.split('.')[1])) {
        return element;
      } else if (this.checkWanted(wanted) === 'id' && element.id === wanted.split('#')[1]) {
        return element;
      }
    }

    return null;
  }

  /**
   * @param wanted
   * @returns {*}
   * permet de tester si un élément cherché est une class ou un id
   */
  static checkWanted(wanted) {
    if (wanted.indexOf('.') !== -1) {
      return 'class';
    } else if (wanted.indexOf('#') !== -1) {
      return 'id';
    }

    return null;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RibsCore);


/***/ }),

/***/ "./node_modules/ribs-flash-message/source/js/ribs-flash-message.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ribs-flash-message/source/js/ribs-flash-message.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ribs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ribs-core */ "./node_modules/ribs-flash-message/node_modules/ribs-core/RibsCore.js");


class RibsFlashMessage {
  constructor() {
    this.template = `
      <div class="notification">
        <div class="left">
          <div class="icone">
            <i class='fa'></i>
          </div>
        </div>
        <div class="right">
          <p></p>
        </div>
      </div>
    `;

    this.topPos = 20;
    this.initialTop = 20;

    this.lauchFlashes();
  }

  /**
   * method to launch all flashes
   */
  lauchFlashes() {
    this.flash = document.querySelectorAll('.RibsFlashMessage:not(.displayed)');

    if (this.flash.length > 0) {
      this.setFlashPosition();
      this.displayFlash();
      this.closeFlash();
    }
  }

  /**
   * method to set top position of flashes message when there more than 1 flash displayed
   */
  setFlashPosition() {
    const initialTop = 20;

    Array.from(this.flash).forEach((element, index) => {
      if (index === 0 && this.topPos === initialTop) {
        this.topPos += ribs_core__WEBPACK_IMPORTED_MODULE_0__["default"].getHeight(element);
      } else {
        let top = initialTop + this.topPos;

        element.style.top = `${top}px`;

        this.topPos += initialTop + ribs_core__WEBPACK_IMPORTED_MODULE_0__["default"].getHeight(element);
      }
    });
  }

  /**
   * method to display all flash message
   */
  displayFlash() {
    Array.from(this.flash).forEach((element, index) => {
      ribs_core__WEBPACK_IMPORTED_MODULE_0__["default"].toggleSlide(element, 500);
      element.classList.add('displayed');
      let that = this;

      setTimeout(() => {
        that.topPos -= parseInt(ribs_core__WEBPACK_IMPORTED_MODULE_0__["default"].getHeight(element), 10) + parseInt(that.initialTop, 10);
        ribs_core__WEBPACK_IMPORTED_MODULE_0__["default"].toggleSlide(element, 500);
      }, 10000);

      this.removeFlash(element);
    });
  }

  /**
   * method to close a flash message
   */
  closeFlash() {
    Array.from(this.flash).forEach((element, index) => {
      element.addEventListener('click', (event) => {
        ribs_core__WEBPACK_IMPORTED_MODULE_0__["default"].toggleSlide(element, 500);
        this.removeFlash(element, 700);
      });
    })
  }

  /**
   * method to remove a flash
   * @param element
   * @param timer
   */
  removeFlash(element, timer = 12000) {
    setTimeout(() => {
      element.remove();
    }, timer);
  }

  /**
   * method to append a flash message directly in your js script
   * @param message
   * @param type
   */
  append(message, type) {
    const div = document.createElement('div');
    div.classList.add('RibsFlashMessage');
    div.innerHTML = this.template;

    let icone = '';
    if (type === 'error') {
      icone = 'fa-times'
    } else if (type === 'info') {
      icone = 'fa-info'
    } else if (type === 'success') {
      icone = 'fa-check'
    }

    div.querySelector('p').innerText = message;
    div.querySelector('i').classList.add(icone);
    div.classList.add(type);
    document.querySelector('body').appendChild(div);

    this.lauchFlashes();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RibsFlashMessage);


/***/ }),

/***/ "./node_modules/ribs-popup/node_modules/ribs-core/RibsCore.js":
/*!********************************************************************!*\
  !*** ./node_modules/ribs-popup/node_modules/ribs-core/RibsCore.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class RibsCore {
  /**
   * @param element
   * @returns {Number}
   * function that return height of an element that is no displayed
   */
  static getHeight(element) {
    //if max heigh get value and delete if for a moment
    const maxHeight = window.getComputedStyle(element).getPropertyValue('max-height');

    if (maxHeight !== "none") {
      element.style.maxHeight = 'inherit';
    }

    element.style.display = 'block';

    let height = parseInt(window.getComputedStyle(element).getPropertyValue('height'));
    element.style.display = '';

    if (maxHeight !== "none") {
      element.style.maxHeight = maxHeight;
    }

    return height;
  }

  /**
   * @param element
   * @param duration
   * this method do animation on height when displaying an element
   * if max height = none it show the element else this function hide it
   */
  static toggleSlide(element, duration) {
    let maxHeight = 0;
    const maxHeightDiv = window.getComputedStyle(element).getPropertyValue('max-height');

    if (maxHeightDiv === 'none' || maxHeightDiv === '0px') {
      maxHeight = this.getHeight(element);
    }

    element.style.transition = 'max-height 0.5s ease-in-out';
    element.style.maxHeight = 0;
    element.style.display = 'block';
    element.style.overflow = 'hidden';

    setTimeout(function () {
      element.style.maxHeight = `${maxHeight}px`;
    }, duration);
  }

  /**
   * @param element
   * @param newElement
   * add an element arround a specified element. This function is like .wrap() in jQuery
   */
  static wrap(element, newElement, className = null) {
    const parentElement = element.parentNode;
    const wrapper = document.createElement(newElement);
    wrapper.className = className;

    parentElement.insertBefore(wrapper, element);
    parentElement.removeChild(element);
    wrapper.appendChild(element);
  }

  /**
   * @param element
   * @param wanted
   * @returns {*}
   * method to get a wanted parent in parentsNodes of an element
   */
  static parents(element, wanted) {
    for ( ; element && element !== document; element = element.parentNode) {
      if (this.checkWanted(wanted) === 'class' && element.classList.contains(wanted.split('.')[1])) {
        return element;
      } else if (this.checkWanted(wanted) === 'id' && element.id === wanted.split('#')[1]) {
        return element;
      }
    }

    return null;
  }

  /**
   * @param wanted
   * @returns {*}
   * permet de tester si un élément cherché est une class ou un id
   */
  static checkWanted(wanted) {
    if (wanted.indexOf('.') !== -1) {
      return 'class';
    } else if (wanted.indexOf('#') !== -1) {
      return 'id';
    }

    return null;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RibsCore);


/***/ }),

/***/ "./node_modules/ribs-popup/source/js/ribs-popup.js":
/*!*********************************************************!*\
  !*** ./node_modules/ribs-popup/source/js/ribs-popup.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ribs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ribs-core */ "./node_modules/ribs-popup/node_modules/ribs-core/RibsCore.js");


class RibsPopup {
  /**
   * constructor add event listener on all element wich have
   * data-ribspopup
   */
  constructor() {
    const links = document.querySelectorAll('[data-ribspopup]');

    Array.from(links).forEach((element) => {
      element.addEventListener('click', (event) => this.openPopup(event));
    });
  }

  /**
   * @param event
   * method to open a popup with link clicked in event
   */
  openPopup(event) {
    event.preventDefault();

    const link = event.currentTarget;
    const popup = document.getElementById(event.currentTarget.dataset.popup);

    if (event.currentTarget.dataset.ajax !== undefined) {
      this.setContent(popup, event.currentTarget.dataset.ajax)
    }

    popup.classList.add('ribs-displayed');
    document.body.classList.add('ribs-popup-body');

    const dataClose = popup.querySelectorAll('.ribs-popup [data-close]');
    const dataValidate = popup.querySelectorAll('.ribs-popup [data-validate]');

    if (dataClose.length > 0) {
      Array.from(dataClose).forEach((element) => {
        element.addEventListener('click', (event) => this.closePopup(event));
      });
    }

    if (dataValidate.length > 0) {
      Array.from(dataValidate).forEach((element) => {
        element.addEventListener('click', (event) => this.setActionValidate(event, link));
      });
    }
  }

  /**
   * method to open a popup by a js call function
   * @param popupId
   */
  openJsPopup(popupId) {
    const popup = document.getElementById(popupId);

    popup.classList.add('ribs-displayed');
    document.body.classList.add('ribs-popup-body');

    const dataClose = popup.querySelectorAll('.ribs-popup [data-close]');
    const dataValidate = popup.querySelectorAll('.ribs-popup [data-validate]');

    if (dataClose.length > 0) {
      Array.from(dataClose).forEach((element) => {
        element.addEventListener('click', (event) => this.closePopup(event));
      });
    }

    if (dataValidate.length > 0) {
      Array.from(dataValidate).forEach((element) => {
        element.addEventListener('click', (event) => this.setActionValidate(event, null));
      });
    }
  }

  /**
   * @param event
   * @param link
   * method that trigger action to do on click on data-validate button
   * or send back on an url with data-href or submit a form with data-form
   */
  setActionValidate(event, link) {
    if (link.dataset.href !== null && link.dataset.href !== undefined) {
      event.currentTarget.href = link.dataset.href;
    } else if (link.dataset.form !== null && link.dataset.form !== undefined) {
      document.getElementById(link.dataset.form).submit();
    } else {
      this.closePopup(event);
    }
  }

  /**
   * @param event
   * method to close a popup
   */
  closePopup(event) {
    event.preventDefault();

    const popup = ribs_core__WEBPACK_IMPORTED_MODULE_0__["default"].parents(event.currentTarget, '.ribs-popup');

    if (popup !== null) {
      popup.classList.remove('ribs-displayed');
      document.body.classList.remove('ribs-popup-body');
    }
  }

  /**
   * @param popup
   * @param ajaxUrl
   * mathod that add the content of ajax request to the popup
   */
  setContent(popup, ajaxUrl) {
    const popupContent = popup.querySelector('#set-content');

    const request =  new Request(ajaxUrl, {
      method: 'POST',
      credentials: 'same-origin',
    });

    fetch (request)
    .then(response => response.text())
    .then((result) => {
      popupContent.innerHTML = result;
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RibsPopup);

const popup = new RibsPopup();


/***/ }),

/***/ 1:
/*!*********************************!*\
  !*** multi ./assets/js/main.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/js/main.js */"./assets/js/main.js");


/***/ })

},[[1,"runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy1mbGFzaC1tZXNzYWdlL25vZGVfbW9kdWxlcy9yaWJzLWNvcmUvUmlic0NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtZmxhc2gtbWVzc2FnZS9zb3VyY2UvanMvcmlicy1mbGFzaC1tZXNzYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXBvcHVwL25vZGVfbW9kdWxlcy9yaWJzLWNvcmUvUmlic0NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtcG9wdXAvc291cmNlL2pzL3JpYnMtcG9wdXAuanMiXSwibmFtZXMiOlsiZmxhc2giLCJSaWJzRmxhc2hNZXNzYWdlIiwicG9wdXBzIiwiUmlic1BvcHVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1BLFFBQVEsSUFBSUMsbUJBQWxCLE9BQWMsRUFBZDtBQUNBLElBQU1DLFNBQVMsSUFBSUMsWUFBbkIsT0FBZSxFQUFmLEM7Ozs7Ozs7Ozs7OztBQ0pBO0FBQUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxVQUFVO0FBQzdDLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUNBQWlDO0FBQzVDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVnQix1RUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0FDbkcxQjtBQUFBO0FBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsaURBQVE7QUFDL0IsT0FBTztBQUNQOztBQUVBLCtCQUErQixJQUFJOztBQUVuQyxvQ0FBb0MsaURBQVE7QUFDNUM7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saURBQVE7QUFDZDtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLGlEQUFRO0FBQ3hDLFFBQVEsaURBQVE7QUFDaEIsT0FBTzs7QUFFUDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlEQUFRO0FBQ2hCO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRWUsK0VBQWdCLEVBQUM7Ozs7Ozs7Ozs7Ozs7QUM1SGhDO0FBQUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxVQUFVO0FBQzdDLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLFdBQVcsaUNBQWlDO0FBQzVDO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVnQix1RUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7O0FDbkcxQjtBQUFBO0FBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpREFBUTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRWdCLHdFQUFTLEVBQUU7O0FBRTNCIiwiZmlsZSI6ImpzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmlic0ZsYXNoTWVzc2FnZSBmcm9tICdyaWJzLWZsYXNoLW1lc3NhZ2UnO1xuaW1wb3J0IFJpYnNQb3B1cCBmcm9tIFwicmlicy1wb3B1cC9zb3VyY2UvanMvcmlicy1wb3B1cFwiO1xuXG5jb25zdCBmbGFzaCA9IG5ldyBSaWJzRmxhc2hNZXNzYWdlKCk7XG5jb25zdCBwb3B1cHMgPSBuZXcgUmlic1BvcHVwKCk7XG4iLCJjbGFzcyBSaWJzQ29yZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIGhlaWdodCBvZiBhbiBlbGVtZW50IHRoYXQgaXMgbm8gZGlzcGxheWVkXHJcbiAgICovXHJcbiAgc3RhdGljIGdldEhlaWdodChlbGVtZW50KSB7XHJcbiAgICAvL2lmIG1heCBoZWlnaCBnZXQgdmFsdWUgYW5kIGRlbGV0ZSBpZiBmb3IgYSBtb21lbnRcclxuICAgIGNvbnN0IG1heEhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21heC1oZWlnaHQnKTtcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICdpbmhlcml0JztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgIGxldCBoZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSk7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IG1heEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgKiB0aGlzIG1ldGhvZCBkbyBhbmltYXRpb24gb24gaGVpZ2h0IHdoZW4gZGlzcGxheWluZyBhbiBlbGVtZW50XHJcbiAgICogaWYgbWF4IGhlaWdodCA9IG5vbmUgaXQgc2hvdyB0aGUgZWxlbWVudCBlbHNlIHRoaXMgZnVuY3Rpb24gaGlkZSBpdFxyXG4gICAqL1xyXG4gIHN0YXRpYyB0b2dnbGVTbGlkZShlbGVtZW50LCBkdXJhdGlvbikge1xyXG4gICAgbGV0IG1heEhlaWdodCA9IDA7XHJcbiAgICBjb25zdCBtYXhIZWlnaHREaXYgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXgtaGVpZ2h0Jyk7XHJcblxyXG4gICAgaWYgKG1heEhlaWdodERpdiA9PT0gJ25vbmUnIHx8IG1heEhlaWdodERpdiA9PT0gJzBweCcpIHtcclxuICAgICAgbWF4SGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ21heC1oZWlnaHQgMC41cyBlYXNlLWluLW91dCc7XHJcbiAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IDA7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XHJcbiAgICB9LCBkdXJhdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqIEBwYXJhbSBuZXdFbGVtZW50XHJcbiAgICogYWRkIGFuIGVsZW1lbnQgYXJyb3VuZCBhIHNwZWNpZmllZCBlbGVtZW50LiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgLndyYXAoKSBpbiBqUXVlcnlcclxuICAgKi9cclxuICBzdGF0aWMgd3JhcChlbGVtZW50LCBuZXdFbGVtZW50LCBjbGFzc05hbWUgPSBudWxsKSB7XHJcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuXHJcbiAgICBwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbGVtZW50KTtcclxuICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogbWV0aG9kIHRvIGdldCBhIHdhbnRlZCBwYXJlbnQgaW4gcGFyZW50c05vZGVzIG9mIGFuIGVsZW1lbnRcclxuICAgKi9cclxuICBzdGF0aWMgcGFyZW50cyhlbGVtZW50LCB3YW50ZWQpIHtcclxuICAgIGZvciAoIDsgZWxlbWVudCAmJiBlbGVtZW50ICE9PSBkb2N1bWVudDsgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xyXG4gICAgICBpZiAodGhpcy5jaGVja1dhbnRlZCh3YW50ZWQpID09PSAnY2xhc3MnICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHdhbnRlZC5zcGxpdCgnLicpWzFdKSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tXYW50ZWQod2FudGVkKSA9PT0gJ2lkJyAmJiBlbGVtZW50LmlkID09PSB3YW50ZWQuc3BsaXQoJyMnKVsxXSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogcGVybWV0IGRlIHRlc3RlciBzaSB1biDDqWzDqW1lbnQgY2hlcmNow6kgZXN0IHVuZSBjbGFzcyBvdSB1biBpZFxyXG4gICAqL1xyXG4gIHN0YXRpYyBjaGVja1dhbnRlZCh3YW50ZWQpIHtcclxuICAgIGlmICh3YW50ZWQuaW5kZXhPZignLicpICE9PSAtMSkge1xyXG4gICAgICByZXR1cm4gJ2NsYXNzJztcclxuICAgIH0gZWxzZSBpZiAod2FudGVkLmluZGV4T2YoJyMnKSAhPT0gLTEpIHtcclxuICAgICAgcmV0dXJuICdpZCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoUmlic0NvcmUpO1xyXG4iLCJpbXBvcnQgUmlic0NvcmUgZnJvbSAncmlicy1jb3JlJztcblxuY2xhc3MgUmlic0ZsYXNoTWVzc2FnZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJsZWZ0XCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImljb25lXCI+XG4gICAgICAgICAgICA8aSBjbGFzcz0nZmEnPjwvaT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyaWdodFwiPlxuICAgICAgICAgIDxwPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuXG4gICAgdGhpcy50b3BQb3MgPSAyMDtcbiAgICB0aGlzLmluaXRpYWxUb3AgPSAyMDtcblxuICAgIHRoaXMubGF1Y2hGbGFzaGVzKCk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGxhdW5jaCBhbGwgZmxhc2hlc1xuICAgKi9cbiAgbGF1Y2hGbGFzaGVzKCkge1xuICAgIHRoaXMuZmxhc2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuUmlic0ZsYXNoTWVzc2FnZTpub3QoLmRpc3BsYXllZCknKTtcblxuICAgIGlmICh0aGlzLmZsYXNoLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuc2V0Rmxhc2hQb3NpdGlvbigpO1xuICAgICAgdGhpcy5kaXNwbGF5Rmxhc2goKTtcbiAgICAgIHRoaXMuY2xvc2VGbGFzaCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gc2V0IHRvcCBwb3NpdGlvbiBvZiBmbGFzaGVzIG1lc3NhZ2Ugd2hlbiB0aGVyZSBtb3JlIHRoYW4gMSBmbGFzaCBkaXNwbGF5ZWRcbiAgICovXG4gIHNldEZsYXNoUG9zaXRpb24oKSB7XG4gICAgY29uc3QgaW5pdGlhbFRvcCA9IDIwO1xuXG4gICAgQXJyYXkuZnJvbSh0aGlzLmZsYXNoKS5mb3JFYWNoKChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgaWYgKGluZGV4ID09PSAwICYmIHRoaXMudG9wUG9zID09PSBpbml0aWFsVG9wKSB7XG4gICAgICAgIHRoaXMudG9wUG9zICs9IFJpYnNDb3JlLmdldEhlaWdodChlbGVtZW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0b3AgPSBpbml0aWFsVG9wICsgdGhpcy50b3BQb3M7XG5cbiAgICAgICAgZWxlbWVudC5zdHlsZS50b3AgPSBgJHt0b3B9cHhgO1xuXG4gICAgICAgIHRoaXMudG9wUG9zICs9IGluaXRpYWxUb3AgKyBSaWJzQ29yZS5nZXRIZWlnaHQoZWxlbWVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGRpc3BsYXkgYWxsIGZsYXNoIG1lc3NhZ2VcbiAgICovXG4gIGRpc3BsYXlGbGFzaCgpIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuZmxhc2gpLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBSaWJzQ29yZS50b2dnbGVTbGlkZShlbGVtZW50LCA1MDApO1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5ZWQnKTtcbiAgICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoYXQudG9wUG9zIC09IHBhcnNlSW50KFJpYnNDb3JlLmdldEhlaWdodChlbGVtZW50KSwgMTApICsgcGFyc2VJbnQodGhhdC5pbml0aWFsVG9wLCAxMCk7XG4gICAgICAgIFJpYnNDb3JlLnRvZ2dsZVNsaWRlKGVsZW1lbnQsIDUwMCk7XG4gICAgICB9LCAxMDAwMCk7XG5cbiAgICAgIHRoaXMucmVtb3ZlRmxhc2goZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGNsb3NlIGEgZmxhc2ggbWVzc2FnZVxuICAgKi9cbiAgY2xvc2VGbGFzaCgpIHtcbiAgICBBcnJheS5mcm9tKHRoaXMuZmxhc2gpLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIFJpYnNDb3JlLnRvZ2dsZVNsaWRlKGVsZW1lbnQsIDUwMCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRmxhc2goZWxlbWVudCwgNzAwKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHJlbW92ZSBhIGZsYXNoXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEBwYXJhbSB0aW1lclxuICAgKi9cbiAgcmVtb3ZlRmxhc2goZWxlbWVudCwgdGltZXIgPSAxMjAwMCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICB9LCB0aW1lcik7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFwcGVuZCBhIGZsYXNoIG1lc3NhZ2UgZGlyZWN0bHkgaW4geW91ciBqcyBzY3JpcHRcbiAgICogQHBhcmFtIG1lc3NhZ2VcbiAgICogQHBhcmFtIHR5cGVcbiAgICovXG4gIGFwcGVuZChtZXNzYWdlLCB0eXBlKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQoJ1JpYnNGbGFzaE1lc3NhZ2UnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gdGhpcy50ZW1wbGF0ZTtcblxuICAgIGxldCBpY29uZSA9ICcnO1xuICAgIGlmICh0eXBlID09PSAnZXJyb3InKSB7XG4gICAgICBpY29uZSA9ICdmYS10aW1lcydcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdpbmZvJykge1xuICAgICAgaWNvbmUgPSAnZmEtaW5mbydcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdWNjZXNzJykge1xuICAgICAgaWNvbmUgPSAnZmEtY2hlY2snXG4gICAgfVxuXG4gICAgZGl2LnF1ZXJ5U2VsZWN0b3IoJ3AnKS5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgIGRpdi5xdWVyeVNlbGVjdG9yKCdpJykuY2xhc3NMaXN0LmFkZChpY29uZSk7XG4gICAgZGl2LmNsYXNzTGlzdC5hZGQodHlwZSk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGRpdik7XG5cbiAgICB0aGlzLmxhdWNoRmxhc2hlcygpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJpYnNGbGFzaE1lc3NhZ2U7XG4iLCJjbGFzcyBSaWJzQ29yZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIGhlaWdodCBvZiBhbiBlbGVtZW50IHRoYXQgaXMgbm8gZGlzcGxheWVkXHJcbiAgICovXHJcbiAgc3RhdGljIGdldEhlaWdodChlbGVtZW50KSB7XHJcbiAgICAvL2lmIG1heCBoZWlnaCBnZXQgdmFsdWUgYW5kIGRlbGV0ZSBpZiBmb3IgYSBtb21lbnRcclxuICAgIGNvbnN0IG1heEhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21heC1oZWlnaHQnKTtcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICdpbmhlcml0JztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgIGxldCBoZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSk7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IG1heEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgKiB0aGlzIG1ldGhvZCBkbyBhbmltYXRpb24gb24gaGVpZ2h0IHdoZW4gZGlzcGxheWluZyBhbiBlbGVtZW50XHJcbiAgICogaWYgbWF4IGhlaWdodCA9IG5vbmUgaXQgc2hvdyB0aGUgZWxlbWVudCBlbHNlIHRoaXMgZnVuY3Rpb24gaGlkZSBpdFxyXG4gICAqL1xyXG4gIHN0YXRpYyB0b2dnbGVTbGlkZShlbGVtZW50LCBkdXJhdGlvbikge1xyXG4gICAgbGV0IG1heEhlaWdodCA9IDA7XHJcbiAgICBjb25zdCBtYXhIZWlnaHREaXYgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXgtaGVpZ2h0Jyk7XHJcblxyXG4gICAgaWYgKG1heEhlaWdodERpdiA9PT0gJ25vbmUnIHx8IG1heEhlaWdodERpdiA9PT0gJzBweCcpIHtcclxuICAgICAgbWF4SGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ21heC1oZWlnaHQgMC41cyBlYXNlLWluLW91dCc7XHJcbiAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IDA7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XHJcbiAgICB9LCBkdXJhdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqIEBwYXJhbSBuZXdFbGVtZW50XHJcbiAgICogYWRkIGFuIGVsZW1lbnQgYXJyb3VuZCBhIHNwZWNpZmllZCBlbGVtZW50LiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgLndyYXAoKSBpbiBqUXVlcnlcclxuICAgKi9cclxuICBzdGF0aWMgd3JhcChlbGVtZW50LCBuZXdFbGVtZW50LCBjbGFzc05hbWUgPSBudWxsKSB7XHJcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuXHJcbiAgICBwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbGVtZW50KTtcclxuICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogbWV0aG9kIHRvIGdldCBhIHdhbnRlZCBwYXJlbnQgaW4gcGFyZW50c05vZGVzIG9mIGFuIGVsZW1lbnRcclxuICAgKi9cclxuICBzdGF0aWMgcGFyZW50cyhlbGVtZW50LCB3YW50ZWQpIHtcclxuICAgIGZvciAoIDsgZWxlbWVudCAmJiBlbGVtZW50ICE9PSBkb2N1bWVudDsgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xyXG4gICAgICBpZiAodGhpcy5jaGVja1dhbnRlZCh3YW50ZWQpID09PSAnY2xhc3MnICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHdhbnRlZC5zcGxpdCgnLicpWzFdKSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tXYW50ZWQod2FudGVkKSA9PT0gJ2lkJyAmJiBlbGVtZW50LmlkID09PSB3YW50ZWQuc3BsaXQoJyMnKVsxXSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogcGVybWV0IGRlIHRlc3RlciBzaSB1biDDqWzDqW1lbnQgY2hlcmNow6kgZXN0IHVuZSBjbGFzcyBvdSB1biBpZFxyXG4gICAqL1xyXG4gIHN0YXRpYyBjaGVja1dhbnRlZCh3YW50ZWQpIHtcclxuICAgIGlmICh3YW50ZWQuaW5kZXhPZignLicpICE9PSAtMSkge1xyXG4gICAgICByZXR1cm4gJ2NsYXNzJztcclxuICAgIH0gZWxzZSBpZiAod2FudGVkLmluZGV4T2YoJyMnKSAhPT0gLTEpIHtcclxuICAgICAgcmV0dXJuICdpZCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoUmlic0NvcmUpO1xyXG4iLCJpbXBvcnQgUmlic0NvcmUgZnJvbSAncmlicy1jb3JlJztcblxuY2xhc3MgUmlic1BvcHVwIHtcbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yIGFkZCBldmVudCBsaXN0ZW5lciBvbiBhbGwgZWxlbWVudCB3aWNoIGhhdmVcbiAgICogZGF0YS1yaWJzcG9wdXBcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmlic3BvcHVwXScpO1xuXG4gICAgQXJyYXkuZnJvbShsaW5rcykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5vcGVuUG9wdXAoZXZlbnQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogbWV0aG9kIHRvIG9wZW4gYSBwb3B1cCB3aXRoIGxpbmsgY2xpY2tlZCBpbiBldmVudFxuICAgKi9cbiAgb3BlblBvcHVwKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGxpbmsgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnBvcHVwKTtcblxuICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYWpheCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldENvbnRlbnQocG9wdXAsIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hamF4KVxuICAgIH1cblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3JpYnMtZGlzcGxheWVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyaWJzLXBvcHVwLWJvZHknKTtcblxuICAgIGNvbnN0IGRhdGFDbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLWNsb3NlXScpO1xuICAgIGNvbnN0IGRhdGFWYWxpZGF0ZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLXZhbGlkYXRlXScpO1xuXG4gICAgaWYgKGRhdGFDbG9zZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFDbG9zZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkYXRhVmFsaWRhdGUubGVuZ3RoID4gMCkge1xuICAgICAgQXJyYXkuZnJvbShkYXRhVmFsaWRhdGUpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5zZXRBY3Rpb25WYWxpZGF0ZShldmVudCwgbGluaykpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBvcGVuIGEgcG9wdXAgYnkgYSBqcyBjYWxsIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBwb3B1cElkXG4gICAqL1xuICBvcGVuSnNQb3B1cChwb3B1cElkKSB7XG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3B1cElkKTtcblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3JpYnMtZGlzcGxheWVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyaWJzLXBvcHVwLWJvZHknKTtcblxuICAgIGNvbnN0IGRhdGFDbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLWNsb3NlXScpO1xuICAgIGNvbnN0IGRhdGFWYWxpZGF0ZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLXZhbGlkYXRlXScpO1xuXG4gICAgaWYgKGRhdGFDbG9zZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFDbG9zZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkYXRhVmFsaWRhdGUubGVuZ3RoID4gMCkge1xuICAgICAgQXJyYXkuZnJvbShkYXRhVmFsaWRhdGUpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5zZXRBY3Rpb25WYWxpZGF0ZShldmVudCwgbnVsbCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gbGlua1xuICAgKiBtZXRob2QgdGhhdCB0cmlnZ2VyIGFjdGlvbiB0byBkbyBvbiBjbGljayBvbiBkYXRhLXZhbGlkYXRlIGJ1dHRvblxuICAgKiBvciBzZW5kIGJhY2sgb24gYW4gdXJsIHdpdGggZGF0YS1ocmVmIG9yIHN1Ym1pdCBhIGZvcm0gd2l0aCBkYXRhLWZvcm1cbiAgICovXG4gIHNldEFjdGlvblZhbGlkYXRlKGV2ZW50LCBsaW5rKSB7XG4gICAgaWYgKGxpbmsuZGF0YXNldC5ocmVmICE9PSBudWxsICYmIGxpbmsuZGF0YXNldC5ocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaHJlZiA9IGxpbmsuZGF0YXNldC5ocmVmO1xuICAgIH0gZWxzZSBpZiAobGluay5kYXRhc2V0LmZvcm0gIT09IG51bGwgJiYgbGluay5kYXRhc2V0LmZvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluay5kYXRhc2V0LmZvcm0pLnN1Ym1pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogbWV0aG9kIHRvIGNsb3NlIGEgcG9wdXBcbiAgICovXG4gIGNsb3NlUG9wdXAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgcG9wdXAgPSBSaWJzQ29yZS5wYXJlbnRzKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcucmlicy1wb3B1cCcpO1xuXG4gICAgaWYgKHBvcHVwICE9PSBudWxsKSB7XG4gICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdyaWJzLWRpc3BsYXllZCcpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdyaWJzLXBvcHVwLWJvZHknKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBvcHVwXG4gICAqIEBwYXJhbSBhamF4VXJsXG4gICAqIG1hdGhvZCB0aGF0IGFkZCB0aGUgY29udGVudCBvZiBhamF4IHJlcXVlc3QgdG8gdGhlIHBvcHVwXG4gICAqL1xuICBzZXRDb250ZW50KHBvcHVwLCBhamF4VXJsKSB7XG4gICAgY29uc3QgcG9wdXBDb250ZW50ID0gcG9wdXAucXVlcnlTZWxlY3RvcignI3NldC1jb250ZW50Jyk7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gIG5ldyBSZXF1ZXN0KGFqYXhVcmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgfSk7XG5cbiAgICBmZXRjaCAocmVxdWVzdClcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgcG9wdXBDb250ZW50LmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoUmlic1BvcHVwKTtcblxuY29uc3QgcG9wdXAgPSBuZXcgUmlic1BvcHVwKCk7XG4iXSwic291cmNlUm9vdCI6IiJ9