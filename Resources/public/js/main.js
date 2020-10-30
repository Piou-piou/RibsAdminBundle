(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/main"],{

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ribs_flash_message__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ribs-flash-message */ "./node_modules/ribs-flash-message/source/js/ribs-flash-message.js");
/* harmony import */ var ribs_popup_source_js_ribs_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ribs-popup/source/js/ribs-popup */ "./node_modules/ribs-popup/source/js/ribs-popup.js");


var flash = new ribs_flash_message__WEBPACK_IMPORTED_MODULE_0__["default"]();
var popups = new ribs_popup_source_js_ribs_popup__WEBPACK_IMPORTED_MODULE_1__["default"]();

/***/ }),

/***/ "./node_modules/ribs-core/RibsCore.js":
/*!********************************************!*\
  !*** ./node_modules/ribs-core/RibsCore.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/***/ "./node_modules/ribs-popup/source/js/ribs-popup.js":
/*!*********************************************************!*\
  !*** ./node_modules/ribs-popup/source/js/ribs-popup.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ribs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ribs-core */ "./node_modules/ribs-core/RibsCore.js");


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy1jb3JlL1JpYnNDb3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLWZsYXNoLW1lc3NhZ2Uvbm9kZV9tb2R1bGVzL3JpYnMtY29yZS9SaWJzQ29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy1mbGFzaC1tZXNzYWdlL3NvdXJjZS9qcy9yaWJzLWZsYXNoLW1lc3NhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtcG9wdXAvc291cmNlL2pzL3JpYnMtcG9wdXAuanMiXSwibmFtZXMiOlsiZmxhc2giLCJwb3B1cHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUEsSUFBTUEsS0FBSyxHQUFHLElBQWQsMERBQWMsRUFBZDtBQUNBLElBQU1DLE1BQU0sR0FBRyxJQUFmLHVFQUFlLEVBQWYsQzs7Ozs7Ozs7Ozs7O0FDSkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZDQUE2QyxjQUFjLHlCQUF5QixjQUFjO0FBQ2xHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsVUFBVTtBQUM3QyxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaURBQVE7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVnQix3RUFBUyxFQUFFOztBQUUzQiIsImZpbGUiOiJqcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJpYnNGbGFzaE1lc3NhZ2UgZnJvbSAncmlicy1mbGFzaC1tZXNzYWdlJztcbmltcG9ydCBSaWJzUG9wdXAgZnJvbSBcInJpYnMtcG9wdXAvc291cmNlL2pzL3JpYnMtcG9wdXBcIjtcblxuY29uc3QgZmxhc2ggPSBuZXcgUmlic0ZsYXNoTWVzc2FnZSgpO1xuY29uc3QgcG9wdXBzID0gbmV3IFJpYnNQb3B1cCgpO1xuIiwiY2xhc3MgUmlic0NvcmUge1xuICAvKipcbiAgICogZnVuY3Rpb24gdGhhdCByZXR1cm4gaGVpZ2h0IG9mIGFuIGVsZW1lbnQgdGhhdCBpcyBubyBkaXNwbGF5ZWRcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHJldHVybnMge051bWJlcn1cbiAgICovXG4gIHN0YXRpYyBnZXRIZWlnaHQoZWxlbWVudCkge1xuICAgIC8vaWYgbWF4IGhlaWdodCBnZXQgdmFsdWUgYW5kIGRlbGV0ZSBpZiBmb3IgYSBtb21lbnRcbiAgICBjb25zdCBtYXhIZWlnaHQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXgtaGVpZ2h0Jyk7XG5cbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xuICAgICAgZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSAnaW5oZXJpdCc7XG4gICAgfVxuXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcblxuICAgIGxldCBoZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSk7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJyc7XG5cbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xuICAgICAgZWxlbWVudC5zdHlsZS5tYXhIZWlnaHQgPSBtYXhIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhlaWdodDtcbiAgfVxuXG4gIC8qKlxuICAgKiBmdW5jdGlvbiB0aGF0IHJldHVybiB3aWR0aCBvZiBhbiBlbGVtZW50IHRoYXQgaXMgbm90IGRpc3BsYXllZFxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgc3RhdGljIGdldFdpZHRoKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgY29uc3Qgd2lkdGggPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCd3aWR0aCcpKTtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcblxuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCBkbyBhbmltYXRpb24gb24gaGVpZ2h0IHdoZW4gZGlzcGxheWluZyBhbiBlbGVtZW50XG4gICAqIGlmIG1heCBoZWlnaHQgPSBub25lIGl0IHNob3cgdGhlIGVsZW1lbnQgZWxzZSB0aGlzIGZ1bmN0aW9uIGhpZGUgaXRcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIGR1cmF0aW9uXG4gICAqL1xuICBzdGF0aWMgdG9nZ2xlU2xpZGUoZWxlbWVudCwgZHVyYXRpb24pIHtcbiAgICBsZXQgbWF4SGVpZ2h0ID0gMDtcbiAgICBjb25zdCBtYXhIZWlnaHREaXYgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXgtaGVpZ2h0Jyk7XG5cbiAgICBpZiAobWF4SGVpZ2h0RGl2ID09PSAnbm9uZScgfHwgbWF4SGVpZ2h0RGl2ID09PSAnMHB4Jykge1xuICAgICAgbWF4SGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gYG1heC1oZWlnaHQgJHtkdXJhdGlvbi8xMDAwfXMgZWFzZS1pbi1vdXQsIHBhZGRpbmcgJHtkdXJhdGlvbi8xMDAwfXMgZWFzZS1pbi1vdXRgO1xuICAgIGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gMDtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuICAgIGlmIChtYXhIZWlnaHQgPT09IDApIHtcbiAgICAgIGVsZW1lbnQuc3R5bGUucGFkZGluZyA9ICcwcHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdwYWRkaW5nJyk7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XG4gICAgfSwgMTApO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBhbiBlbGVtZW50IGFycm91bmQgYSBzcGVjaWZpZWQgZWxlbWVudC4gVGhpcyBmdW5jdGlvbiBpcyBsaWtlIC53cmFwKCkgaW4galF1ZXJ5XG4gICAqIEBwYXJhbSBlbGVtZW50XG4gICAqIEBwYXJhbSBuZXdFbGVtZW50XG4gICAqL1xuICBzdGF0aWMgd3JhcChlbGVtZW50LCBuZXdFbGVtZW50LCBjbGFzc05hbWUgPSBudWxsKSB7XG4gICAgY29uc3QgcGFyZW50RWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuZXdFbGVtZW50KTtcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcblxuICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsZW1lbnQpO1xuICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gZ2V0IGEgd2FudGVkIHBhcmVudCBpbiBwYXJlbnRzTm9kZXMgb2YgYW4gZWxlbWVudFxuICAgKiBAcGFyYW0gZWxlbWVudFxuICAgKiBAcGFyYW0gd2FudGVkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIHBhcmVudHMoZWxlbWVudCwgd2FudGVkKSB7XG4gICAgZm9yICggOyBlbGVtZW50ICYmIGVsZW1lbnQgIT09IGRvY3VtZW50OyBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICBpZiAodGhpcy5jaGVja1dhbnRlZCh3YW50ZWQpID09PSAnY2xhc3MnICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHdhbnRlZC5zcGxpdCgnLicpWzFdKSkge1xuICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGVja1dhbnRlZCh3YW50ZWQpID09PSAnaWQnICYmIGVsZW1lbnQuaWQgPT09IHdhbnRlZC5zcGxpdCgnIycpWzFdKSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byB0ZXN0IGlmIGEgd2FudGVyIGVsZW1lbnQgaXMgYSBjbGFzcyBvciBhbiBpZFxuICAgKiBAcGFyYW0gd2FudGVkXG4gICAqIEByZXR1cm5zIHsqfVxuICAgKi9cbiAgc3RhdGljIGNoZWNrV2FudGVkKHdhbnRlZCkge1xuICAgIGlmICh3YW50ZWQuaW5kZXhPZignLicpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdjbGFzcyc7XG4gICAgfSBlbHNlIGlmICh3YW50ZWQuaW5kZXhPZignIycpICE9PSAtMSkge1xuICAgICAgcmV0dXJuICdpZCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHZhbGlkYXRlIGEgbWFpbCBhZGRyZXNzXG4gICAqIEBwYXJhbSBtYWlsXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIHZhbGlkYXRlTWFpbChtYWlsKSB7XG4gICAgY29uc3QgcmVnZXggPSAvXigoW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChcXFtbMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFxdKXwoKFthLXpBLVpcXC0wLTldK1xcLikrW2EtekEtWl17Mix9KSkkLztcblxuICAgIHJldHVybiByZWdleC50ZXN0KG1haWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byB0ZXN0IHN0cmVuZ3RoIG9mIGEgZ2l2ZW4gcGFzc3dvcmRcbiAgICogQHBhcmFtIHBhc3N3b3JkXG4gICAqIEBwYXJhbSBzdHJlbmd0aFxuICAgKiBAcGFyYW0gbGVuZ3RoXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgc3RhdGljIHRlc3RQYXNzd29yZFN0cmVuZ3RoKHBhc3N3b3JkLCBzdHJlbmd0aCA9IDQsIGxlbmd0aCA9IDgpIHtcbiAgICBsZXQgc3RyZW5ndGhWYWx1ZSA9IDA7XG4gICAgY29uc3Qgc3RyZW5ndGhzID0gW1xuICAgICAgLyg/PS4qW2Etel0pLyxcbiAgICAgIC8oPz0uKltBLVpdKS8sXG4gICAgICAvKD89LipbMC05XSkvLFxuICAgICAgLyg/PS5bIUAjJCVcXF4mKl0pLyxcbiAgICBdO1xuXG4gICAgZm9yIChjb25zdCBzdHJlbmd0aFJlZyBvZiBzdHJlbmd0aHMpIHtcbiAgICAgIGlmIChzdHJlbmd0aFJlZy50ZXN0KHBhc3N3b3JkKSkge1xuICAgICAgICBzdHJlbmd0aFZhbHVlICs9IDEwMC9zdHJlbmd0aHMubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucGFzc3dvcmRTdHJlbmd0aCA9IHN0cmVuZ3RoVmFsdWU7XG5cbiAgICBpZiAocGFzc3dvcmQubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSBgWW91IHBhc3N3b3JkIG11c3QgY29udGFpbiBhdCBsZWFzdCAke2xlbmd0aH0gY2FyYWN0ZXJzYDtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoc3RyZW5ndGhWYWx1ZSA+PSAoc3RyZW5ndGgqKDEwMC9zdHJlbmd0aHMubGVuZ3RoKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhc3N3b3JkRXJyb3IgPSBgWW91IHBhc3N3b3JkIGlzIG5vdCBlbm91Z2ggc2VjdXJlYDtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgKFJpYnNDb3JlKTtcbiIsImNsYXNzIFJpYnNDb3JlIHtcclxuICAvKipcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqIEByZXR1cm5zIHtOdW1iZXJ9XHJcbiAgICogZnVuY3Rpb24gdGhhdCByZXR1cm4gaGVpZ2h0IG9mIGFuIGVsZW1lbnQgdGhhdCBpcyBubyBkaXNwbGF5ZWRcclxuICAgKi9cclxuICBzdGF0aWMgZ2V0SGVpZ2h0KGVsZW1lbnQpIHtcclxuICAgIC8vaWYgbWF4IGhlaWdoIGdldCB2YWx1ZSBhbmQgZGVsZXRlIGlmIGZvciBhIG1vbWVudFxyXG4gICAgY29uc3QgbWF4SGVpZ2h0ID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkuZ2V0UHJvcGVydHlWYWx1ZSgnbWF4LWhlaWdodCcpO1xyXG5cclxuICAgIGlmIChtYXhIZWlnaHQgIT09IFwibm9uZVwiKSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gJ2luaGVyaXQnO1xyXG4gICAgfVxyXG5cclxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblxyXG4gICAgbGV0IGhlaWdodCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpKTtcclxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICcnO1xyXG5cclxuICAgIGlmIChtYXhIZWlnaHQgIT09IFwibm9uZVwiKSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gbWF4SGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoZWlnaHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqIEBwYXJhbSBkdXJhdGlvblxyXG4gICAqIHRoaXMgbWV0aG9kIGRvIGFuaW1hdGlvbiBvbiBoZWlnaHQgd2hlbiBkaXNwbGF5aW5nIGFuIGVsZW1lbnRcclxuICAgKiBpZiBtYXggaGVpZ2h0ID0gbm9uZSBpdCBzaG93IHRoZSBlbGVtZW50IGVsc2UgdGhpcyBmdW5jdGlvbiBoaWRlIGl0XHJcbiAgICovXHJcbiAgc3RhdGljIHRvZ2dsZVNsaWRlKGVsZW1lbnQsIGR1cmF0aW9uKSB7XHJcbiAgICBsZXQgbWF4SGVpZ2h0ID0gMDtcclxuICAgIGNvbnN0IG1heEhlaWdodERpdiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21heC1oZWlnaHQnKTtcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0RGl2ID09PSAnbm9uZScgfHwgbWF4SGVpZ2h0RGl2ID09PSAnMHB4Jykge1xyXG4gICAgICBtYXhIZWlnaHQgPSB0aGlzLmdldEhlaWdodChlbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LnN0eWxlLnRyYW5zaXRpb24gPSAnbWF4LWhlaWdodCAwLjVzIGVhc2UtaW4tb3V0JztcclxuICAgIGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gMDtcclxuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBlbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGVsZW1lbnQuc3R5bGUubWF4SGVpZ2h0ID0gYCR7bWF4SGVpZ2h0fXB4YDtcclxuICAgIH0sIGR1cmF0aW9uKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSBlbGVtZW50XHJcbiAgICogQHBhcmFtIG5ld0VsZW1lbnRcclxuICAgKiBhZGQgYW4gZWxlbWVudCBhcnJvdW5kIGEgc3BlY2lmaWVkIGVsZW1lbnQuIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSAud3JhcCgpIGluIGpRdWVyeVxyXG4gICAqL1xyXG4gIHN0YXRpYyB3cmFwKGVsZW1lbnQsIG5ld0VsZW1lbnQsIGNsYXNzTmFtZSA9IG51bGwpIHtcclxuICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuZXdFbGVtZW50KTtcclxuICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG5cclxuICAgIHBhcmVudEVsZW1lbnQuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsZW1lbnQpO1xyXG4gICAgcGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqIEBwYXJhbSB3YW50ZWRcclxuICAgKiBAcmV0dXJucyB7Kn1cclxuICAgKiBtZXRob2QgdG8gZ2V0IGEgd2FudGVkIHBhcmVudCBpbiBwYXJlbnRzTm9kZXMgb2YgYW4gZWxlbWVudFxyXG4gICAqL1xyXG4gIHN0YXRpYyBwYXJlbnRzKGVsZW1lbnQsIHdhbnRlZCkge1xyXG4gICAgZm9yICggOyBlbGVtZW50ICYmIGVsZW1lbnQgIT09IGRvY3VtZW50OyBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSB7XHJcbiAgICAgIGlmICh0aGlzLmNoZWNrV2FudGVkKHdhbnRlZCkgPT09ICdjbGFzcycgJiYgZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMod2FudGVkLnNwbGl0KCcuJylbMV0pKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGVja1dhbnRlZCh3YW50ZWQpID09PSAnaWQnICYmIGVsZW1lbnQuaWQgPT09IHdhbnRlZC5zcGxpdCgnIycpWzFdKSB7XHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB3YW50ZWRcclxuICAgKiBAcmV0dXJucyB7Kn1cclxuICAgKiBwZXJtZXQgZGUgdGVzdGVyIHNpIHVuIMOpbMOpbWVudCBjaGVyY2jDqSBlc3QgdW5lIGNsYXNzIG91IHVuIGlkXHJcbiAgICovXHJcbiAgc3RhdGljIGNoZWNrV2FudGVkKHdhbnRlZCkge1xyXG4gICAgaWYgKHdhbnRlZC5pbmRleE9mKCcuJykgIT09IC0xKSB7XHJcbiAgICAgIHJldHVybiAnY2xhc3MnO1xyXG4gICAgfSBlbHNlIGlmICh3YW50ZWQuaW5kZXhPZignIycpICE9PSAtMSkge1xyXG4gICAgICByZXR1cm4gJ2lkJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IChSaWJzQ29yZSk7XHJcbiIsImltcG9ydCBSaWJzQ29yZSBmcm9tICdyaWJzLWNvcmUnO1xuXG5jbGFzcyBSaWJzRmxhc2hNZXNzYWdlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50ZW1wbGF0ZSA9IGBcbiAgICAgIDxkaXYgY2xhc3M9XCJub3RpZmljYXRpb25cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImxlZnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbmVcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzPSdmYSc+PC9pPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJpZ2h0XCI+XG4gICAgICAgICAgPHA+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIGA7XG5cbiAgICB0aGlzLnRvcFBvcyA9IDIwO1xuICAgIHRoaXMuaW5pdGlhbFRvcCA9IDIwO1xuXG4gICAgdGhpcy5sYXVjaEZsYXNoZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gbGF1bmNoIGFsbCBmbGFzaGVzXG4gICAqL1xuICBsYXVjaEZsYXNoZXMoKSB7XG4gICAgdGhpcy5mbGFzaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5SaWJzRmxhc2hNZXNzYWdlOm5vdCguZGlzcGxheWVkKScpO1xuXG4gICAgaWYgKHRoaXMuZmxhc2gubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZXRGbGFzaFBvc2l0aW9uKCk7XG4gICAgICB0aGlzLmRpc3BsYXlGbGFzaCgpO1xuICAgICAgdGhpcy5jbG9zZUZsYXNoKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBzZXQgdG9wIHBvc2l0aW9uIG9mIGZsYXNoZXMgbWVzc2FnZSB3aGVuIHRoZXJlIG1vcmUgdGhhbiAxIGZsYXNoIGRpc3BsYXllZFxuICAgKi9cbiAgc2V0Rmxhc2hQb3NpdGlvbigpIHtcbiAgICBjb25zdCBpbml0aWFsVG9wID0gMjA7XG5cbiAgICBBcnJheS5mcm9tKHRoaXMuZmxhc2gpLmZvckVhY2goKGVsZW1lbnQsIGluZGV4KSA9PiB7XG4gICAgICBpZiAoaW5kZXggPT09IDAgJiYgdGhpcy50b3BQb3MgPT09IGluaXRpYWxUb3ApIHtcbiAgICAgICAgdGhpcy50b3BQb3MgKz0gUmlic0NvcmUuZ2V0SGVpZ2h0KGVsZW1lbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRvcCA9IGluaXRpYWxUb3AgKyB0aGlzLnRvcFBvcztcblxuICAgICAgICBlbGVtZW50LnN0eWxlLnRvcCA9IGAke3RvcH1weGA7XG5cbiAgICAgICAgdGhpcy50b3BQb3MgKz0gaW5pdGlhbFRvcCArIFJpYnNDb3JlLmdldEhlaWdodChlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gZGlzcGxheSBhbGwgZmxhc2ggbWVzc2FnZVxuICAgKi9cbiAgZGlzcGxheUZsYXNoKCkge1xuICAgIEFycmF5LmZyb20odGhpcy5mbGFzaCkuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIFJpYnNDb3JlLnRvZ2dsZVNsaWRlKGVsZW1lbnQsIDUwMCk7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXllZCcpO1xuICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhhdC50b3BQb3MgLT0gcGFyc2VJbnQoUmlic0NvcmUuZ2V0SGVpZ2h0KGVsZW1lbnQpLCAxMCkgKyBwYXJzZUludCh0aGF0LmluaXRpYWxUb3AsIDEwKTtcbiAgICAgICAgUmlic0NvcmUudG9nZ2xlU2xpZGUoZWxlbWVudCwgNTAwKTtcbiAgICAgIH0sIDEwMDAwKTtcblxuICAgICAgdGhpcy5yZW1vdmVGbGFzaChlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY2xvc2UgYSBmbGFzaCBtZXNzYWdlXG4gICAqL1xuICBjbG9zZUZsYXNoKCkge1xuICAgIEFycmF5LmZyb20odGhpcy5mbGFzaCkuZm9yRWFjaCgoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgUmlic0NvcmUudG9nZ2xlU2xpZGUoZWxlbWVudCwgNTAwKTtcbiAgICAgICAgdGhpcy5yZW1vdmVGbGFzaChlbGVtZW50LCA3MDApO1xuICAgICAgfSk7XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcmVtb3ZlIGEgZmxhc2hcbiAgICogQHBhcmFtIGVsZW1lbnRcbiAgICogQHBhcmFtIHRpbWVyXG4gICAqL1xuICByZW1vdmVGbGFzaChlbGVtZW50LCB0aW1lciA9IDEyMDAwKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgIH0sIHRpbWVyKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYXBwZW5kIGEgZmxhc2ggbWVzc2FnZSBkaXJlY3RseSBpbiB5b3VyIGpzIHNjcmlwdFxuICAgKiBAcGFyYW0gbWVzc2FnZVxuICAgKiBAcGFyYW0gdHlwZVxuICAgKi9cbiAgYXBwZW5kKG1lc3NhZ2UsIHR5cGUpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnUmlic0ZsYXNoTWVzc2FnZScpO1xuICAgIGRpdi5pbm5lckhUTUwgPSB0aGlzLnRlbXBsYXRlO1xuXG4gICAgbGV0IGljb25lID0gJyc7XG4gICAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgIGljb25lID0gJ2ZhLXRpbWVzJ1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2luZm8nKSB7XG4gICAgICBpY29uZSA9ICdmYS1pbmZvJ1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICBpY29uZSA9ICdmYS1jaGVjaydcbiAgICB9XG5cbiAgICBkaXYucXVlcnlTZWxlY3RvcigncCcpLmlubmVyVGV4dCA9IG1lc3NhZ2U7XG4gICAgZGl2LnF1ZXJ5U2VsZWN0b3IoJ2knKS5jbGFzc0xpc3QuYWRkKGljb25lKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCh0eXBlKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoZGl2KTtcblxuICAgIHRoaXMubGF1Y2hGbGFzaGVzKCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmlic0ZsYXNoTWVzc2FnZTtcbiIsImltcG9ydCBSaWJzQ29yZSBmcm9tICdyaWJzLWNvcmUnO1xuXG5jbGFzcyBSaWJzUG9wdXAge1xuICAvKipcbiAgICogY29uc3RydWN0b3IgYWRkIGV2ZW50IGxpc3RlbmVyIG9uIGFsbCBlbGVtZW50IHdpY2ggaGF2ZVxuICAgKiBkYXRhLXJpYnNwb3B1cFxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yaWJzcG9wdXBdJyk7XG5cbiAgICBBcnJheS5mcm9tKGxpbmtzKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLm9wZW5Qb3B1cChldmVudCkpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBtZXRob2QgdG8gb3BlbiBhIHBvcHVwIHdpdGggbGluayBjbGlja2VkIGluIGV2ZW50XG4gICAqL1xuICBvcGVuUG9wdXAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgbGluayA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQucG9wdXApO1xuXG4gICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hamF4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuc2V0Q29udGVudChwb3B1cCwgZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmFqYXgpXG4gICAgfVxuXG4gICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgncmlicy1kaXNwbGF5ZWQnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3JpYnMtcG9wdXAtYm9keScpO1xuXG4gICAgY29uc3QgZGF0YUNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtcG9wdXAgW2RhdGEtY2xvc2VdJyk7XG4gICAgY29uc3QgZGF0YVZhbGlkYXRlID0gcG9wdXAucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtcG9wdXAgW2RhdGEtdmFsaWRhdGVdJyk7XG5cbiAgICBpZiAoZGF0YUNsb3NlLmxlbmd0aCA+IDApIHtcbiAgICAgIEFycmF5LmZyb20oZGF0YUNsb3NlKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHRoaXMuY2xvc2VQb3B1cChldmVudCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFWYWxpZGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFWYWxpZGF0ZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLnNldEFjdGlvblZhbGlkYXRlKGV2ZW50LCBsaW5rKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIG9wZW4gYSBwb3B1cCBieSBhIGpzIGNhbGwgZnVuY3Rpb25cbiAgICogQHBhcmFtIHBvcHVwSWRcbiAgICovXG4gIG9wZW5Kc1BvcHVwKHBvcHVwSWQpIHtcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBvcHVwSWQpO1xuXG4gICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgncmlicy1kaXNwbGF5ZWQnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3JpYnMtcG9wdXAtYm9keScpO1xuXG4gICAgY29uc3QgZGF0YUNsb3NlID0gcG9wdXAucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtcG9wdXAgW2RhdGEtY2xvc2VdJyk7XG4gICAgY29uc3QgZGF0YVZhbGlkYXRlID0gcG9wdXAucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtcG9wdXAgW2RhdGEtdmFsaWRhdGVdJyk7XG5cbiAgICBpZiAoZGF0YUNsb3NlLmxlbmd0aCA+IDApIHtcbiAgICAgIEFycmF5LmZyb20oZGF0YUNsb3NlKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHRoaXMuY2xvc2VQb3B1cChldmVudCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGFWYWxpZGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFWYWxpZGF0ZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLnNldEFjdGlvblZhbGlkYXRlKGV2ZW50LCBudWxsKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSBsaW5rXG4gICAqIG1ldGhvZCB0aGF0IHRyaWdnZXIgYWN0aW9uIHRvIGRvIG9uIGNsaWNrIG9uIGRhdGEtdmFsaWRhdGUgYnV0dG9uXG4gICAqIG9yIHNlbmQgYmFjayBvbiBhbiB1cmwgd2l0aCBkYXRhLWhyZWYgb3Igc3VibWl0IGEgZm9ybSB3aXRoIGRhdGEtZm9ybVxuICAgKi9cbiAgc2V0QWN0aW9uVmFsaWRhdGUoZXZlbnQsIGxpbmspIHtcbiAgICBpZiAobGluay5kYXRhc2V0LmhyZWYgIT09IG51bGwgJiYgbGluay5kYXRhc2V0LmhyZWYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5ocmVmID0gbGluay5kYXRhc2V0LmhyZWY7XG4gICAgfSBlbHNlIGlmIChsaW5rLmRhdGFzZXQuZm9ybSAhPT0gbnVsbCAmJiBsaW5rLmRhdGFzZXQuZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaW5rLmRhdGFzZXQuZm9ybSkuc3VibWl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY2xvc2VQb3B1cChldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBtZXRob2QgdG8gY2xvc2UgYSBwb3B1cFxuICAgKi9cbiAgY2xvc2VQb3B1cChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBwb3B1cCA9IFJpYnNDb3JlLnBhcmVudHMoZXZlbnQuY3VycmVudFRhcmdldCwgJy5yaWJzLXBvcHVwJyk7XG5cbiAgICBpZiAocG9wdXAgIT09IG51bGwpIHtcbiAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3JpYnMtZGlzcGxheWVkJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3JpYnMtcG9wdXAtYm9keScpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gcG9wdXBcbiAgICogQHBhcmFtIGFqYXhVcmxcbiAgICogbWF0aG9kIHRoYXQgYWRkIHRoZSBjb250ZW50IG9mIGFqYXggcmVxdWVzdCB0byB0aGUgcG9wdXBcbiAgICovXG4gIHNldENvbnRlbnQocG9wdXAsIGFqYXhVcmwpIHtcbiAgICBjb25zdCBwb3B1cENvbnRlbnQgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKCcjc2V0LWNvbnRlbnQnKTtcblxuICAgIGNvbnN0IHJlcXVlc3QgPSAgbmV3IFJlcXVlc3QoYWpheFVybCwge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICB9KTtcblxuICAgIGZldGNoIChyZXF1ZXN0KVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRleHQoKSlcbiAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICBwb3B1cENvbnRlbnQuaW5uZXJIVE1MID0gcmVzdWx0O1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IChSaWJzUG9wdXApO1xuXG5jb25zdCBwb3B1cCA9IG5ldyBSaWJzUG9wdXAoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=