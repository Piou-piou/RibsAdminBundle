/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/bundles/ribsadmin/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ribsCore = __webpack_require__(/*! ribs-core */ "./node_modules/ribs-core/RibsCore.js");

var _ribsCore2 = _interopRequireDefault(_ribsCore);

var _ribsFlashMessage = __webpack_require__(/*! ribs-flash-message */ "./node_modules/ribs-flash-message/source/js/ribs-flash-message.js");

var _ribsFlashMessage2 = _interopRequireDefault(_ribsFlashMessage);

var _ribsPopup = __webpack_require__(/*! ribs-popup/source/js/ribs-popup */ "./node_modules/ribs-popup/source/js/ribs-popup.js");

var _ribsPopup2 = _interopRequireDefault(_ribsPopup);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/*const ribsAjax = new RibsAjax('main', 'nav#left-nav', '#loader');*/

/*import RibsAjax from 'ribs-admin-bundle-templates/source/js/RibsAjax';*/
var flash = new _ribsFlashMessage2.default();
var popups = new _ribsPopup2.default();

/***/ }),

/***/ "./node_modules/ribs-core/RibsCore.js":
/*!********************************************!*\
  !*** ./node_modules/ribs-core/RibsCore.js ***!
  \********************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class RibsCore {
  /**
   * function that return height of an element that is no displayed
   * @param element
   * @returns {Number}
   */
  static getHeight(element) {
    //if max height get value and delete if for a moment
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
   * function that return width of an element that is not displayed
   * @param element
   * @returns {number}
   */
  static getWidth(element) {
    element.style.display = 'block';

    const width = parseInt(window.getComputedStyle(element).getPropertyValue('width'));
    element.style.display = '';

    return width;
  }

  /**
   * this method do animation on height when displaying an element
   * if max height = none it show the element else this function hide it
   * @param element
   * @param duration
   */
  static toggleSlide(element, duration) {
    let maxHeight = 0;
    const maxHeightDiv = window.getComputedStyle(element).getPropertyValue('max-height');

    if (maxHeightDiv === 'none' || maxHeightDiv === '0px') {
      maxHeight = this.getHeight(element);
    }

    element.style.transition = `max-height ${duration/1000}s ease-in-out, padding ${duration/1000}s ease-in-out`;
    element.style.maxHeight = 0;
    element.style.display = 'block';
    element.style.overflow = 'hidden';

    if (maxHeight === 0) {
      element.style.padding = '0px';
    } else {
      element.style.removeProperty('padding');
    }

    setTimeout(function () {
      element.style.maxHeight = `${maxHeight}px`;
    }, 10);
  }

  /**
   * add an element arround a specified element. This function is like .wrap() in jQuery
   * @param element
   * @param newElement
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
   * method to get a wanted parent in parentsNodes of an element
   * @param element
   * @param wanted
   * @returns {*}
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
   * method to test if a wanter element is a class or an id
   * @param wanted
   * @returns {*}
   */
  static checkWanted(wanted) {
    if (wanted.indexOf('.') !== -1) {
      return 'class';
    } else if (wanted.indexOf('#') !== -1) {
      return 'id';
    }

    return null;
  }

  /**
   * method to validate a mail address
   * @param mail
   * @returns {boolean}
   */
  static validateMail(mail) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(mail);
  }

  /**
   * method to test strength of a given password
   * @param password
   * @param strength
   * @param length
   * @returns {boolean}
   */
  static testPasswordStrength(password, strength = 4, length = 8) {
    let strengthValue = 0;
    const strengths = [
      /(?=.*[a-z])/,
      /(?=.*[A-Z])/,
      /(?=.*[0-9])/,
      /(?=.[!@#$%\^&*])/,
    ];

    for (const strengthReg of strengths) {
      if (strengthReg.test(password)) {
        strengthValue += 100/strengths.length;
      }
    }

    this.passwordStrength = strengthValue;

    if (password.length < length) {
      this.passwordError = `You password must contain at least ${length} caracters`;
      return false;
    }

    if (strengthValue >= (strength*(100/strengths.length))) {
      return true;
    } else {
      this.passwordError = `You password is not enough secure`;
      return false;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RibsCore);


/***/ }),

/***/ "./node_modules/ribs-flash-message/node_modules/ribs-core/RibsCore.js":
/*!****************************************************************************!*\
  !*** ./node_modules/ribs-flash-message/node_modules/ribs-core/RibsCore.js ***!
  \****************************************************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (RibsCore);


/***/ }),

/***/ "./node_modules/ribs-flash-message/source/js/ribs-flash-message.js":
/*!*************************************************************************!*\
  !*** ./node_modules/ribs-flash-message/source/js/ribs-flash-message.js ***!
  \*************************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ribs_core__ = __webpack_require__(/*! ribs-core */ "./node_modules/ribs-flash-message/node_modules/ribs-core/RibsCore.js");


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
        this.topPos += __WEBPACK_IMPORTED_MODULE_0_ribs_core__["a" /* default */].getHeight(element);
      } else {
        let top = initialTop + this.topPos;

        element.style.top = `${top}px`;

        this.topPos += initialTop + __WEBPACK_IMPORTED_MODULE_0_ribs_core__["a" /* default */].getHeight(element);
      }
    });
  }

  /**
   * method to display all flash message
   */
  displayFlash() {
    Array.from(this.flash).forEach((element, index) => {
      __WEBPACK_IMPORTED_MODULE_0_ribs_core__["a" /* default */].toggleSlide(element, 500);
      element.classList.add('displayed');
      let that = this;

      setTimeout(() => {
        that.topPos -= parseInt(__WEBPACK_IMPORTED_MODULE_0_ribs_core__["a" /* default */].getHeight(element), 10) + parseInt(that.initialTop, 10);
        __WEBPACK_IMPORTED_MODULE_0_ribs_core__["a" /* default */].toggleSlide(element, 500);
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
        __WEBPACK_IMPORTED_MODULE_0_ribs_core__["a" /* default */].toggleSlide(element, 500);
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
/*! exports used: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (RibsCore);


/***/ }),

/***/ "./node_modules/ribs-popup/source/js/ribs-popup.js":
/*!*********************************************************!*\
  !*** ./node_modules/ribs-popup/source/js/ribs-popup.js ***!
  \*********************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ribs_core__ = __webpack_require__(/*! ribs-core */ "./node_modules/ribs-popup/node_modules/ribs-core/RibsCore.js");


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

    const popup = __WEBPACK_IMPORTED_MODULE_0_ribs_core__["a" /* default */].parents(event.currentTarget, '.ribs-popup');

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
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/js/main.js */"./assets/js/main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWVjZmU0MDkzMTc3ZjUyNWUwOGYiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtY29yZS9SaWJzQ29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy1mbGFzaC1tZXNzYWdlL25vZGVfbW9kdWxlcy9yaWJzLWNvcmUvUmlic0NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtZmxhc2gtbWVzc2FnZS9zb3VyY2UvanMvcmlicy1mbGFzaC1tZXNzYWdlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXBvcHVwL25vZGVfbW9kdWxlcy9yaWJzLWNvcmUvUmlic0NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtcG9wdXAvc291cmNlL2pzL3JpYnMtcG9wdXAuanMiXSwibmFtZXMiOlsiZmxhc2giLCJSaWJzRmxhc2hNZXNzYWdlIiwicG9wdXBzIiwiUmlic1BvcHVwIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLEtBQUs7UUFDTDtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOztRQUVBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3REE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7OztBQUVBOztBQUpBO0FBTUEs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ZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRWdCLGlFQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O0FDbkcxQjtBQUFBO0FBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQiwwREFBUTs7QUFFMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRWdCLHdFQUFTLEVBQUU7O0FBRTNCIiwiZmlsZSI6ImpzL21haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVuZGxlcy9yaWJzYWRtaW4vXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWVjZmU0MDkzMTc3ZjUyNWUwOGYiLCJpbXBvcnQgUmlic0NvcmUgZnJvbSAncmlicy1jb3JlJztcbi8qaW1wb3J0IFJpYnNBamF4IGZyb20gJ3JpYnMtYWRtaW4tYnVuZGxlLXRlbXBsYXRlcy9zb3VyY2UvanMvUmlic0FqYXgnOyovXG5pbXBvcnQgUmlic0ZsYXNoTWVzc2FnZSBmcm9tICdyaWJzLWZsYXNoLW1lc3NhZ2UnO1xuaW1wb3J0IFJpYnNQb3B1cCBmcm9tIFwicmlicy1wb3B1cC9zb3VyY2UvanMvcmlicy1wb3B1cFwiO1xuXG4vKmNvbnN0IHJpYnNBamF4ID0gbmV3IFJpYnNBamF4KCdtYWluJywgJ25hdiNsZWZ0LW5hdicsICcjbG9hZGVyJyk7Ki9cblxuY29uc3QgZmxhc2ggPSBuZXcgUmlic0ZsYXNoTWVzc2FnZSgpO1xuY29uc3QgcG9wdXBzID0gbmV3IFJpYnNQb3B1cCgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXNzZXRzL2pzL21haW4uanMiLCJjbGFzcyBSaWJzQ29yZSB7XG4gIC8qKlxuICAgKiBmdW5jdGlvbiB0aGF0IHJldHVybiBoZWlnaHQgb2YgYW4gZWxlbWVudCB0aGF0IGlzIG5vIGRpc3BsYXllZFxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgKi9cbiAgc3RhdGljIGdldEhlaWdodChlbGVtZW50KSB7XG4gICAgLy9pZiBtYXggaGVpZ2h0IGdldCB2YWx1ZSBhbmQgZGVsZXRlIGlmIGZvciBhIG1vbWVudFxuICAgIGNvbnN0IG1heEhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21heC1oZWlnaHQnKTtcblxuICAgIGlmIChtYXhIZWlnaHQgIT09IFwibm9uZVwiKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICdpbmhlcml0JztcbiAgICB9XG5cbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgbGV0IGhlaWdodCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpKTtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgIGlmIChtYXhIZWlnaHQgIT09IFwibm9uZVwiKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IG1heEhlaWdodDtcbiAgICB9XG5cbiAgICByZXR1cm4gaGVpZ2h0O1xuICB9XG5cbiAgLyoqXG4gICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIHdpZHRoIG9mIGFuIGVsZW1lbnQgdGhhdCBpcyBub3QgZGlzcGxheWVkXG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBzdGF0aWMgZ2V0V2lkdGgoZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJykpO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuXG4gICAgcmV0dXJuIHdpZHRoO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIGRvIGFuaW1hdGlvbiBvbiBoZWlnaHQgd2hlbiBkaXNwbGF5aW5nIGFuIGVsZW1lbnRcbiAgICogaWYgbWF4IGhlaWdodCA9IG5vbmUgaXQgc2hvdyB0aGUgZWxlbWVudCBlbHNlIHRoaXMgZnVuY3Rpb24gaGlkZSBpdFxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcGFyYW0gZHVyYXRpb25cbiAgICovXG4gIHN0YXRpYyB0b2dnbGVTbGlkZShlbGVtZW50LCBkdXJhdGlvbikge1xuICAgIGxldCBtYXhIZWlnaHQgPSAwO1xuICAgIGNvbnN0IG1heEhlaWdodERpdiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21heC1oZWlnaHQnKTtcblxuICAgIGlmIChtYXhIZWlnaHREaXYgPT09ICdub25lJyB8fCBtYXhIZWlnaHREaXYgPT09ICcwcHgnKSB7XG4gICAgICBtYXhIZWlnaHQgPSB0aGlzLmdldEhlaWdodChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSBgbWF4LWhlaWdodCAke2R1cmF0aW9uLzEwMDB9cyBlYXNlLWluLW91dCwgcGFkZGluZyAke2R1cmF0aW9uLzEwMDB9cyBlYXNlLWluLW91dGA7XG4gICAgZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAwO1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gICAgaWYgKG1heEhlaWdodCA9PT0gMCkge1xuICAgICAgZWxlbWVudC5zdHlsZS5wYWRkaW5nID0gJzBweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3BhZGRpbmcnKTtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gYCR7bWF4SGVpZ2h0fXB4YDtcbiAgICB9LCAxMCk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIGFuIGVsZW1lbnQgYXJyb3VuZCBhIHNwZWNpZmllZCBlbGVtZW50LiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgLndyYXAoKSBpbiBqUXVlcnlcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIG5ld0VsZW1lbnRcbiAgICovXG4gIHN0YXRpYyB3cmFwKGVsZW1lbnQsIG5ld0VsZW1lbnQsIGNsYXNzTmFtZSA9IG51bGwpIHtcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld0VsZW1lbnQpO1xuICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuXG4gICAgcGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUod3JhcHBlciwgZWxlbWVudCk7XG4gICAgcGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBnZXQgYSB3YW50ZWQgcGFyZW50IGluIHBhcmVudHNOb2RlcyBvZiBhbiBlbGVtZW50XG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEBwYXJhbSB3YW50ZWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgcGFyZW50cyhlbGVtZW50LCB3YW50ZWQpIHtcbiAgICBmb3IgKCA7IGVsZW1lbnQgJiYgZWxlbWVudCAhPT0gZG9jdW1lbnQ7IGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIGlmICh0aGlzLmNoZWNrV2FudGVkKHdhbnRlZCkgPT09ICdjbGFzcycgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMod2FudGVkLnNwbGl0KCcuJylbMV0pKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrV2FudGVkKHdhbnRlZCkgPT09ICdpZCcgJiYgZWxlbWVudC5pZCA9PT0gd2FudGVkLnNwbGl0KCcjJylbMV0pIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHRlc3QgaWYgYSB3YW50ZXIgZWxlbWVudCBpcyBhIGNsYXNzIG9yIGFuIGlkXG4gICAqIEBwYXJhbSB3YW50ZWRcbiAgICogQHJldHVybnMgeyp9XG4gICAqL1xuICBzdGF0aWMgY2hlY2tXYW50ZWQod2FudGVkKSB7XG4gICAgaWYgKHdhbnRlZC5pbmRleE9mKCcuJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2NsYXNzJztcbiAgICB9IGVsc2UgaWYgKHdhbnRlZC5pbmRleE9mKCcjJykgIT09IC0xKSB7XG4gICAgICByZXR1cm4gJ2lkJztcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gdmFsaWRhdGUgYSBtYWlsIGFkZHJlc3NcbiAgICogQHBhcmFtIG1haWxcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgdmFsaWRhdGVNYWlsKG1haWwpIHtcbiAgICBjb25zdCByZWdleCA9IC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvO1xuXG4gICAgcmV0dXJuIHJlZ2V4LnRlc3QobWFpbCk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHRlc3Qgc3RyZW5ndGggb2YgYSBnaXZlbiBwYXNzd29yZFxuICAgKiBAcGFyYW0gcGFzc3dvcmRcbiAgICogQHBhcmFtIHN0cmVuZ3RoXG4gICAqIEBwYXJhbSBsZW5ndGhcbiAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAqL1xuICBzdGF0aWMgdGVzdFBhc3N3b3JkU3RyZW5ndGgocGFzc3dvcmQsIHN0cmVuZ3RoID0gNCwgbGVuZ3RoID0gOCkge1xuICAgIGxldCBzdHJlbmd0aFZhbHVlID0gMDtcbiAgICBjb25zdCBzdHJlbmd0aHMgPSBbXG4gICAgICAvKD89LipbYS16XSkvLFxuICAgICAgLyg/PS4qW0EtWl0pLyxcbiAgICAgIC8oPz0uKlswLTldKS8sXG4gICAgICAvKD89LlshQCMkJVxcXiYqXSkvLFxuICAgIF07XG5cbiAgICBmb3IgKGNvbnN0IHN0cmVuZ3RoUmVnIG9mIHN0cmVuZ3Rocykge1xuICAgICAgaWYgKHN0cmVuZ3RoUmVnLnRlc3QocGFzc3dvcmQpKSB7XG4gICAgICAgIHN0cmVuZ3RoVmFsdWUgKz0gMTAwL3N0cmVuZ3Rocy5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wYXNzd29yZFN0cmVuZ3RoID0gc3RyZW5ndGhWYWx1ZTtcblxuICAgIGlmIChwYXNzd29yZC5sZW5ndGggPCBsZW5ndGgpIHtcbiAgICAgIHRoaXMucGFzc3dvcmRFcnJvciA9IGBZb3UgcGFzc3dvcmQgbXVzdCBjb250YWluIGF0IGxlYXN0ICR7bGVuZ3RofSBjYXJhY3RlcnNgO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChzdHJlbmd0aFZhbHVlID49IChzdHJlbmd0aCooMTAwL3N0cmVuZ3Rocy5sZW5ndGgpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFzc3dvcmRFcnJvciA9IGBZb3UgcGFzc3dvcmQgaXMgbm90IGVub3VnaCBzZWN1cmVgO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoUmlic0NvcmUpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmlicy1jb3JlL1JpYnNDb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yaWJzLWNvcmUvUmlic0NvcmUuanNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiY2xhc3MgUmlic0NvcmUge1xyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICogQHJldHVybnMge051bWJlcn1cclxuICAgKiBmdW5jdGlvbiB0aGF0IHJldHVybiBoZWlnaHQgb2YgYW4gZWxlbWVudCB0aGF0IGlzIG5vIGRpc3BsYXllZFxyXG4gICAqL1xyXG4gIHN0YXRpYyBnZXRIZWlnaHQoZWxlbWVudCkge1xyXG4gICAgLy9pZiBtYXggaGVpZ2ggZ2V0IHZhbHVlIGFuZCBkZWxldGUgaWYgZm9yIGEgbW9tZW50XHJcbiAgICBjb25zdCBtYXhIZWlnaHQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXgtaGVpZ2h0Jyk7XHJcblxyXG4gICAgaWYgKG1heEhlaWdodCAhPT0gXCJub25lXCIpIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnaW5oZXJpdCc7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHJcbiAgICBsZXQgaGVpZ2h0ID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JykpO1xyXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XHJcblxyXG4gICAgaWYgKG1heEhlaWdodCAhPT0gXCJub25lXCIpIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSBtYXhIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGhlaWdodDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICogQHBhcmFtIGR1cmF0aW9uXHJcbiAgICogdGhpcyBtZXRob2QgZG8gYW5pbWF0aW9uIG9uIGhlaWdodCB3aGVuIGRpc3BsYXlpbmcgYW4gZWxlbWVudFxyXG4gICAqIGlmIG1heCBoZWlnaHQgPSBub25lIGl0IHNob3cgdGhlIGVsZW1lbnQgZWxzZSB0aGlzIGZ1bmN0aW9uIGhpZGUgaXRcclxuICAgKi9cclxuICBzdGF0aWMgdG9nZ2xlU2xpZGUoZWxlbWVudCwgZHVyYXRpb24pIHtcclxuICAgIGxldCBtYXhIZWlnaHQgPSAwO1xyXG4gICAgY29uc3QgbWF4SGVpZ2h0RGl2ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnbWF4LWhlaWdodCcpO1xyXG5cclxuICAgIGlmIChtYXhIZWlnaHREaXYgPT09ICdub25lJyB8fCBtYXhIZWlnaHREaXYgPT09ICcwcHgnKSB7XHJcbiAgICAgIG1heEhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0KGVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUudHJhbnNpdGlvbiA9ICdtYXgtaGVpZ2h0IDAuNXMgZWFzZS1pbi1vdXQnO1xyXG4gICAgZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAwO1xyXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSBgJHttYXhIZWlnaHR9cHhgO1xyXG4gICAgfSwgZHVyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gbmV3RWxlbWVudFxyXG4gICAqIGFkZCBhbiBlbGVtZW50IGFycm91bmQgYSBzcGVjaWZpZWQgZWxlbWVudC4gVGhpcyBmdW5jdGlvbiBpcyBsaWtlIC53cmFwKCkgaW4galF1ZXJ5XHJcbiAgICovXHJcbiAgc3RhdGljIHdyYXAoZWxlbWVudCwgbmV3RWxlbWVudCwgY2xhc3NOYW1lID0gbnVsbCkge1xyXG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5ld0VsZW1lbnQpO1xyXG4gICAgd3JhcHBlci5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcblxyXG4gICAgcGFyZW50RWxlbWVudC5pbnNlcnRCZWZvcmUod3JhcHBlciwgZWxlbWVudCk7XHJcbiAgICBwYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xyXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChlbGVtZW50KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICogQHBhcmFtIHdhbnRlZFxyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqIG1ldGhvZCB0byBnZXQgYSB3YW50ZWQgcGFyZW50IGluIHBhcmVudHNOb2RlcyBvZiBhbiBlbGVtZW50XHJcbiAgICovXHJcbiAgc3RhdGljIHBhcmVudHMoZWxlbWVudCwgd2FudGVkKSB7XHJcbiAgICBmb3IgKCA7IGVsZW1lbnQgJiYgZWxlbWVudCAhPT0gZG9jdW1lbnQ7IGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGUpIHtcclxuICAgICAgaWYgKHRoaXMuY2hlY2tXYW50ZWQod2FudGVkKSA9PT0gJ2NsYXNzJyAmJiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh3YW50ZWQuc3BsaXQoJy4nKVsxXSkpIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLmNoZWNrV2FudGVkKHdhbnRlZCkgPT09ICdpZCcgJiYgZWxlbWVudC5pZCA9PT0gd2FudGVkLnNwbGl0KCcjJylbMV0pIHtcclxuICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHdhbnRlZFxyXG4gICAqIEByZXR1cm5zIHsqfVxyXG4gICAqIHBlcm1ldCBkZSB0ZXN0ZXIgc2kgdW4gw6lsw6ltZW50IGNoZXJjaMOpIGVzdCB1bmUgY2xhc3Mgb3UgdW4gaWRcclxuICAgKi9cclxuICBzdGF0aWMgY2hlY2tXYW50ZWQod2FudGVkKSB7XHJcbiAgICBpZiAod2FudGVkLmluZGV4T2YoJy4nKSAhPT0gLTEpIHtcclxuICAgICAgcmV0dXJuICdjbGFzcyc7XHJcbiAgICB9IGVsc2UgaWYgKHdhbnRlZC5pbmRleE9mKCcjJykgIT09IC0xKSB7XHJcbiAgICAgIHJldHVybiAnaWQnO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgKFJpYnNDb3JlKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmlicy1mbGFzaC1tZXNzYWdlL25vZGVfbW9kdWxlcy9yaWJzLWNvcmUvUmlic0NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JpYnMtZmxhc2gtbWVzc2FnZS9ub2RlX21vZHVsZXMvcmlicy1jb3JlL1JpYnNDb3JlLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBSaWJzQ29yZSBmcm9tICdyaWJzLWNvcmUnO1xuXG5jbGFzcyBSaWJzRmxhc2hNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbmVcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPSdmYSc+PC9pPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XG4gICAgICAgICAgPHA+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLnRvcFBvcyA9IDIwO1xuICAgIHRoaXMuaW5pdGlhbFRvcCA9IDIwO1xuXG4gICAgdGhpcy5sYXVjaEZsYXNoZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gbGF1bmNoIGFsbCBmbGFzaGVzXG4gICAqL1xuICBsYXVjaEZsYXNoZXMoKSB7XG4gICAgdGhpcy5mbGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5SaWJzRmxhc2hNZXNzYWdlOm5vdCguZGlzcGxheWVkKScpO1xuXG4gICAgaWYgKHRoaXMuZmxhc2gubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXRGbGFzaFBvc2l0aW9uKCk7XG4gICAgICB0aGlzLmRpc3BsYXlGbGFzaCgpO1xuICAgICAgdGhpcy5jbG9zZUZsYXNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBzZXQgdG9wIHBvc2l0aW9uIG9mIGZsYXNoZXMgbWVzc2FnZSB3aGVuIHRoZXJlIG1vcmUgdGhhbiAxIGZsYXNoIGRpc3BsYXllZFxuICAgKi9cbiAgc2V0Rmxhc2hQb3NpdGlvbigpIHtcbiAgICBjb25zdCBpbml0aWFsVG9wID0gMjA7XG5cbiAgICBBcnJheS5mcm9tKHRoaXMuZmxhc2gpLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT09IDAgJiYgdGhpcy50b3BQb3MgPT09IGluaXRpYWxUb3ApIHtcbiAgICAgICAgdGhpcy50b3BQb3MgKz0gUmlic0NvcmUuZ2V0SGVpZ2h0KGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRvcCA9IGluaXRpYWxUb3AgKyB0aGlzLnRvcFBvcztcblxuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IGAke3RvcH1weGA7XG5cbiAgICAgICAgdGhpcy50b3BQb3MgKz0gaW5pdGlhbFRvcCArIFJpYnNDb3JlLmdldEhlaWdodChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gZGlzcGxheSBhbGwgZmxhc2ggbWVzc2FnZVxuICAgKi9cbiAgZGlzcGxheUZsYXNoKCkge1xuICAgIEFycmF5LmZyb20odGhpcy5mbGFzaCkuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIFJpYnNDb3JlLnRvZ2dsZVNsaWRlKGVsZW1lbnQsIDUwMCk7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXllZCcpO1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhhdC50b3BQb3MgLT0gcGFyc2VJbnQoUmlic0NvcmUuZ2V0SGVpZ2h0KGVsZW1lbnQpLCAxMCkgKyBwYXJzZUludCh0aGF0LmluaXRpYWxUb3AsIDEwKTtcbiAgICAgICAgUmlic0NvcmUudG9nZ2xlU2xpZGUoZWxlbWVudCwgNTAwKTtcbiAgICAgIH0sIDEwMDAwKTtcblxuICAgICAgdGhpcy5yZW1vdmVGbGFzaChlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY2xvc2UgYSBmbGFzaCBtZXNzYWdlXG4gICAqL1xuICBjbG9zZUZsYXNoKCkge1xuICAgIEFycmF5LmZyb20odGhpcy5mbGFzaCkuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgUmlic0NvcmUudG9nZ2xlU2xpZGUoZWxlbWVudCwgNTAwKTtcbiAgICAgICAgdGhpcy5yZW1vdmVGbGFzaChlbGVtZW50LCA3MDApO1xuICAgICAgfSk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcmVtb3ZlIGEgZmxhc2hcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIHRpbWVyXG4gICAqL1xuICByZW1vdmVGbGFzaChlbGVtZW50LCB0aW1lciA9IDEyMDAwKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIH0sIHRpbWVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYXBwZW5kIGEgZmxhc2ggbWVzc2FnZSBkaXJlY3RseSBpbiB5b3VyIGpzIHNjcmlwdFxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKiBAcGFyYW0gdHlwZVxuICAgKi9cbiAgYXBwZW5kKG1lc3NhZ2UsIHR5cGUpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnUmlic0ZsYXNoTWVzc2FnZScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlO1xuXG4gICAgbGV0IGljb25lID0gJyc7XG4gICAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgIGljb25lID0gJ2ZhLXRpbWVzJ1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2luZm8nKSB7XG4gICAgICBpY29uZSA9ICdmYS1pbmZvJ1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICBpY29uZSA9ICdmYS1jaGVjaydcbiAgICB9XG5cbiAgICBkaXYucXVlcnlTZWxlY3RvcigncCcpLmlubmVyVGV4dCA9IG1lc3NhZ2U7XG4gICAgZGl2LnF1ZXJ5U2VsZWN0b3IoJ2knKS5jbGFzc0xpc3QuYWRkKGljb25lKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCh0eXBlKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAgIHRoaXMubGF1Y2hGbGFzaGVzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmlic0ZsYXNoTWVzc2FnZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JpYnMtZmxhc2gtbWVzc2FnZS9zb3VyY2UvanMvcmlicy1mbGFzaC1tZXNzYWdlLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yaWJzLWZsYXNoLW1lc3NhZ2Uvc291cmNlL2pzL3JpYnMtZmxhc2gtbWVzc2FnZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJjbGFzcyBSaWJzQ29yZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIGhlaWdodCBvZiBhbiBlbGVtZW50IHRoYXQgaXMgbm8gZGlzcGxheWVkXHJcbiAgICovXHJcbiAgc3RhdGljIGdldEhlaWdodChlbGVtZW50KSB7XHJcbiAgICAvL2lmIG1heCBoZWlnaCBnZXQgdmFsdWUgYW5kIGRlbGV0ZSBpZiBmb3IgYSBtb21lbnRcclxuICAgIGNvbnN0IG1heEhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21heC1oZWlnaHQnKTtcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICdpbmhlcml0JztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgIGxldCBoZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSk7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IG1heEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgKiB0aGlzIG1ldGhvZCBkbyBhbmltYXRpb24gb24gaGVpZ2h0IHdoZW4gZGlzcGxheWluZyBhbiBlbGVtZW50XHJcbiAgICogaWYgbWF4IGhlaWdodCA9IG5vbmUgaXQgc2hvdyB0aGUgZWxlbWVudCBlbHNlIHRoaXMgZnVuY3Rpb24gaGlkZSBpdFxyXG4gICAqL1xyXG4gIHN0YXRpYyB0b2dnbGVTbGlkZShlbGVtZW50LCBkdXJhdGlvbikge1xyXG4gICAgbGV0IG1heEhlaWdodCA9IDA7XHJcbiAgICBjb25zdCBtYXhIZWlnaHREaXYgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXgtaGVpZ2h0Jyk7XHJcblxyXG4gICAgaWYgKG1heEhlaWdodERpdiA9PT0gJ25vbmUnIHx8IG1heEhlaWdodERpdiA9PT0gJzBweCcpIHtcclxuICAgICAgbWF4SGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ21heC1oZWlnaHQgMC41cyBlYXNlLWluLW91dCc7XHJcbiAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IDA7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XHJcbiAgICB9LCBkdXJhdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqIEBwYXJhbSBuZXdFbGVtZW50XHJcbiAgICogYWRkIGFuIGVsZW1lbnQgYXJyb3VuZCBhIHNwZWNpZmllZCBlbGVtZW50LiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgLndyYXAoKSBpbiBqUXVlcnlcclxuICAgKi9cclxuICBzdGF0aWMgd3JhcChlbGVtZW50LCBuZXdFbGVtZW50LCBjbGFzc05hbWUgPSBudWxsKSB7XHJcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuXHJcbiAgICBwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbGVtZW50KTtcclxuICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogbWV0aG9kIHRvIGdldCBhIHdhbnRlZCBwYXJlbnQgaW4gcGFyZW50c05vZGVzIG9mIGFuIGVsZW1lbnRcclxuICAgKi9cclxuICBzdGF0aWMgcGFyZW50cyhlbGVtZW50LCB3YW50ZWQpIHtcclxuICAgIGZvciAoIDsgZWxlbWVudCAmJiBlbGVtZW50ICE9PSBkb2N1bWVudDsgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xyXG4gICAgICBpZiAodGhpcy5jaGVja1dhbnRlZCh3YW50ZWQpID09PSAnY2xhc3MnICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHdhbnRlZC5zcGxpdCgnLicpWzFdKSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tXYW50ZWQod2FudGVkKSA9PT0gJ2lkJyAmJiBlbGVtZW50LmlkID09PSB3YW50ZWQuc3BsaXQoJyMnKVsxXSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogcGVybWV0IGRlIHRlc3RlciBzaSB1biDDqWzDqW1lbnQgY2hlcmNow6kgZXN0IHVuZSBjbGFzcyBvdSB1biBpZFxyXG4gICAqL1xyXG4gIHN0YXRpYyBjaGVja1dhbnRlZCh3YW50ZWQpIHtcclxuICAgIGlmICh3YW50ZWQuaW5kZXhPZignLicpICE9PSAtMSkge1xyXG4gICAgICByZXR1cm4gJ2NsYXNzJztcclxuICAgIH0gZWxzZSBpZiAod2FudGVkLmluZGV4T2YoJyMnKSAhPT0gLTEpIHtcclxuICAgICAgcmV0dXJuICdpZCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoUmlic0NvcmUpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yaWJzLXBvcHVwL25vZGVfbW9kdWxlcy9yaWJzLWNvcmUvUmlic0NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IC4vbm9kZV9tb2R1bGVzL3JpYnMtcG9wdXAvbm9kZV9tb2R1bGVzL3JpYnMtY29yZS9SaWJzQ29yZS5qc1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmlic0NvcmUgZnJvbSAncmlicy1jb3JlJztcblxuY2xhc3MgUmlic1BvcHVwIHtcbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yIGFkZCBldmVudCBsaXN0ZW5lciBvbiBhbGwgZWxlbWVudCB3aWNoIGhhdmVcbiAgICogZGF0YS1yaWJzcG9wdXBcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmlic3BvcHVwXScpO1xuXG4gICAgQXJyYXkuZnJvbShsaW5rcykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5vcGVuUG9wdXAoZXZlbnQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogbWV0aG9kIHRvIG9wZW4gYSBwb3B1cCB3aXRoIGxpbmsgY2xpY2tlZCBpbiBldmVudFxuICAgKi9cbiAgb3BlblBvcHVwKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGxpbmsgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnBvcHVwKTtcblxuICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYWpheCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldENvbnRlbnQocG9wdXAsIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hamF4KVxuICAgIH1cblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3JpYnMtZGlzcGxheWVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyaWJzLXBvcHVwLWJvZHknKTtcblxuICAgIGNvbnN0IGRhdGFDbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLWNsb3NlXScpO1xuICAgIGNvbnN0IGRhdGFWYWxpZGF0ZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLXZhbGlkYXRlXScpO1xuXG4gICAgaWYgKGRhdGFDbG9zZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFDbG9zZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkYXRhVmFsaWRhdGUubGVuZ3RoID4gMCkge1xuICAgICAgQXJyYXkuZnJvbShkYXRhVmFsaWRhdGUpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5zZXRBY3Rpb25WYWxpZGF0ZShldmVudCwgbGluaykpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBvcGVuIGEgcG9wdXAgYnkgYSBqcyBjYWxsIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBwb3B1cElkXG4gICAqL1xuICBvcGVuSnNQb3B1cChwb3B1cElkKSB7XG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3B1cElkKTtcblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3JpYnMtZGlzcGxheWVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyaWJzLXBvcHVwLWJvZHknKTtcblxuICAgIGNvbnN0IGRhdGFDbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLWNsb3NlXScpO1xuICAgIGNvbnN0IGRhdGFWYWxpZGF0ZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLXZhbGlkYXRlXScpO1xuXG4gICAgaWYgKGRhdGFDbG9zZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFDbG9zZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkYXRhVmFsaWRhdGUubGVuZ3RoID4gMCkge1xuICAgICAgQXJyYXkuZnJvbShkYXRhVmFsaWRhdGUpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5zZXRBY3Rpb25WYWxpZGF0ZShldmVudCwgbnVsbCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gbGlua1xuICAgKiBtZXRob2QgdGhhdCB0cmlnZ2VyIGFjdGlvbiB0byBkbyBvbiBjbGljayBvbiBkYXRhLXZhbGlkYXRlIGJ1dHRvblxuICAgKiBvciBzZW5kIGJhY2sgb24gYW4gdXJsIHdpdGggZGF0YS1ocmVmIG9yIHN1Ym1pdCBhIGZvcm0gd2l0aCBkYXRhLWZvcm1cbiAgICovXG4gIHNldEFjdGlvblZhbGlkYXRlKGV2ZW50LCBsaW5rKSB7XG4gICAgaWYgKGxpbmsuZGF0YXNldC5ocmVmICE9PSBudWxsICYmIGxpbmsuZGF0YXNldC5ocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaHJlZiA9IGxpbmsuZGF0YXNldC5ocmVmO1xuICAgIH0gZWxzZSBpZiAobGluay5kYXRhc2V0LmZvcm0gIT09IG51bGwgJiYgbGluay5kYXRhc2V0LmZvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluay5kYXRhc2V0LmZvcm0pLnN1Ym1pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogbWV0aG9kIHRvIGNsb3NlIGEgcG9wdXBcbiAgICovXG4gIGNsb3NlUG9wdXAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgcG9wdXAgPSBSaWJzQ29yZS5wYXJlbnRzKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcucmlicy1wb3B1cCcpO1xuXG4gICAgaWYgKHBvcHVwICE9PSBudWxsKSB7XG4gICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdyaWJzLWRpc3BsYXllZCcpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdyaWJzLXBvcHVwLWJvZHknKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBvcHVwXG4gICAqIEBwYXJhbSBhamF4VXJsXG4gICAqIG1hdGhvZCB0aGF0IGFkZCB0aGUgY29udGVudCBvZiBhamF4IHJlcXVlc3QgdG8gdGhlIHBvcHVwXG4gICAqL1xuICBzZXRDb250ZW50KHBvcHVwLCBhamF4VXJsKSB7XG4gICAgY29uc3QgcG9wdXBDb250ZW50ID0gcG9wdXAucXVlcnlTZWxlY3RvcignI3NldC1jb250ZW50Jyk7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gIG5ldyBSZXF1ZXN0KGFqYXhVcmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgfSk7XG5cbiAgICBmZXRjaCAocmVxdWVzdClcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgcG9wdXBDb250ZW50LmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoUmlic1BvcHVwKTtcblxuY29uc3QgcG9wdXAgPSBuZXcgUmlic1BvcHVwKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yaWJzLXBvcHVwL3NvdXJjZS9qcy9yaWJzLXBvcHVwLmpzXG4vLyBtb2R1bGUgaWQgPSAuL25vZGVfbW9kdWxlcy9yaWJzLXBvcHVwL3NvdXJjZS9qcy9yaWJzLXBvcHVwLmpzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=