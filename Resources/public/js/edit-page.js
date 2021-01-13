(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/edit-page"],{

/***/ "./assets/js/page/edit.js":
/*!********************************!*\
  !*** ./assets/js/page/edit.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ribs_wysiwyg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ribs-wysiwyg */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwyg.js");

var wysiwyg = new ribs_wysiwyg__WEBPACK_IMPORTED_MODULE_0__["default"]({
  mode: 'inline',
  selector: '[data-ribs-wysiwyg]',
  height: 400
});

/***/ }),

/***/ "./node_modules/ribs-popup/dist/css/style.min.css":
/*!********************************************************!*\
  !*** ./node_modules/ribs-popup/dist/css/style.min.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins sync recursive ^\\.\\/.*\\.js$":
/*!***********************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins sync ^\.\/.*\.js$ ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./Blocks.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/Blocks.js",
	"./Bold.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/Bold.js",
	"./FontSize.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/FontSize.js",
	"./IndentOutdent.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/IndentOutdent.js",
	"./Italic.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/Italic.js",
	"./Justify.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/Justify.js",
	"./Link.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/Link.js",
	"./Lists.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/Lists.js",
	"./Strikethrough.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/Strikethrough.js",
	"./Underline.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/Underline.js",
	"./UndoRedo.js": "./node_modules/ribs-wysiwyg/source/js/Plugins/UndoRedo.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/ribs-wysiwyg/source/js/Plugins sync recursive ^\\.\\/.*\\.js$";

/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/Blocks.js":
/*!***************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/Blocks.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class Blocks {
  /**
   * method to initialize Blocks plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.options = options;
    this.defineOptions();
    this.addButtonToToolbar();
    this.addSelectEventListener('click');
    this.addSelectEventListener('keydown');
  }

  /**
   * method to add bold button to toolbar
   */
  addButtonToToolbar() {
    const div = document.createElement('div');
    const blocksMenu = document.createElement('select');
    blocksMenu.id = 'ribs-wysiwyg-toolbar-blocks';
    blocksMenu.addEventListener('change', (event) => this.changeBlock(event));
    div.append(blocksMenu);
    this.toolbarDiv.append(div);

    for (const block in this.options.blocks) {
      const option = document.createElement('option');
      option.text = `${this.options.blocks[block]}`;
      option.value = `${block}`;
      blocksMenu.add(option);
      this.blocksMenu = blocksMenu;
    }
  }

  /**
   * define options of the plugin
   */
  defineOptions() {
    if (!this.options.blocks) {
      this.options.blocks = {
        'p': 'Paragraph',
        'h1': 'Heading 1',
        'h2': 'Heading 2',
        'h3': 'Heading 3',
        'h4': 'Heading 4',
        'h5': 'Heading 5',
        'h6': 'Heading 6',
      };
    }
  }

  /**
   * add event to change value of font size selected
   * @param triggerEvent
   */
  addSelectEventListener(triggerEvent) {
    this.editableDiv.addEventListener(triggerEvent, () => {
      if (window.getSelection && window.getSelection().getRangeAt && window.getSelection().anchorNode) {
        let element = window.getSelection().anchorNode;

        if (element && element && element.parentNode && this.options.blocks.hasOwnProperty(element.parentNode.tagName.toLowerCase()) >= 0) {
          this.blocksMenu.value = element.parentNode.tagName.toLowerCase();
        }
      }
    });
  }

  /**
   * method to change current element by selected block
   * @param event
   */
  changeBlock(event) {
    document.execCommand('formatBlock', false, `<${event.currentTarget.value}>`);
    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
  }
}

/**
 * function to load Blocks class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const blocks = new Blocks(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/Bold.js":
/*!*************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/Bold.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class Bold {
  /**
   * method to initialize Bold plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.addButtonToToolbar();
  }

  /**
   * method to add bold button to toolbar
   */
  addButtonToToolbar() {
    const div = document.createElement('div');
    const boldMenu = document.createElement('button');
    boldMenu.id = 'ribs-wysiwyg-toolbar-bold';
    boldMenu.innerHTML = '<span style="font-weight: bold">B</span>';
    boldMenu.addEventListener('click', () => this.setTextToBold());
    div.append(boldMenu);
    this.toolbarDiv.append(div);
  }

  /**
   * method to put text in bold
   */
  setTextToBold() {
    document.execCommand('bold');
    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
  }
}

/**
 * function to load Bold class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const bold = new Bold(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/FontSize.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/FontSize.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class FontSize {
  /**
   * method to initialize FontSize plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.options = options;
    this.defineOptions();
    this.addButtonToToolbar();
    this.addSelectEventListener('click');
    this.addSelectEventListener('keydown');
  }

  /**
   * method to add bold button to toolbar
   */
  addButtonToToolbar() {
    const div = document.createElement('div');
    const fontSizeMenu = document.createElement('select');
    fontSizeMenu.id = 'ribs-wysiwyg-toolbar-fontsize';
    fontSizeMenu.addEventListener('change', (event) => this.changeFontSize(event));
    div.append(fontSizeMenu);
    this.toolbarDiv.append(div);

    const bodyFontSize = window.getComputedStyle(document.querySelector('body'), null).getPropertyValue('font-size');

    for (const fontSize of this.options.fontSize) {
      const option = document.createElement('option');

      if (parseInt(fontSize) === parseInt(bodyFontSize)) {
        option.selected = true;
        option.dataset.default = true;
      }

      option.text = `${fontSize}px`;
      option.value = `${fontSize}px`;
      fontSizeMenu.add(option);
      this.fontSizeMenu = fontSizeMenu;
    }

    const defaultValue = this.fontSizeMenu.querySelector('[data-default]');
    if (!defaultValue) {
      const option = this.fontSizeMenu.querySelector('option:first-of-type');
      option.selected = true;
      option.dataset.default = true;
    }
  }

  /**
   * define options of the plugin
   */
  defineOptions() {
    if (!this.options.fontSize) {
      this.options.fontSize = [8, 10, 12, 14, 16, 18, 24, 36];
    }
  }

  /**
   * add event to change value of font size selected
   * @param triggerEvent
   */
  addSelectEventListener(triggerEvent) {
    this.editableDiv.addEventListener(triggerEvent, () => {
      if (window.getSelection && window.getSelection().getRangeAt && window.getSelection().anchorNode) {
        let element = window.getSelection().anchorNode;

        if (element && element && element.parentNode !== undefined && element.parentNode.style && element.parentNode.style.fontSize) {
          this.fontSizeMenu.value = element.parentNode.style.fontSize;
        } else {
          this.fontSizeMenu.value = this.fontSizeMenu.querySelector('[data-default]').value;
        }
      }
    });
  }

  /**
   * method to replace create font element by a span
   * @param fontElement
   * @param fontSize
   */
  replaceFontBySpan(fontElement, fontSize) {
    const parentDiv = fontElement.parentNode;
    const span = document.createElement('span');
    span.appendChild(document.createTextNode(fontElement.textContent));
    span.style.fontSize = fontSize;

    parentDiv.replaceChild(span, fontElement);

    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(this.editableDiv);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    this.editableDiv.focus();
    range.detach();
  }

  /**
   * method to change font size of current selection
   * @param event
   */
  changeFontSize(event) {
    this.editableDiv.focus();
    document.execCommand("fontSize", false, '1');
    const fontSize = event.currentTarget.value;
    const fontElement = document.getElementsByTagName('font')[0];

    if (!fontElement) {
      this.editableDiv.addEventListener('keydown', () => {
        const fontElement = document.getElementsByTagName('font')[0];
        this.replaceFontBySpan(fontElement, fontSize);
      });
    } else {
      this.replaceFontBySpan(fontElement, fontSize);
    }
  }
}

/**
 * function to load FontSize class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const fontSize = new FontSize(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/IndentOutdent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/IndentOutdent.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class IndentOutdent {
  /**
   * method to initialize IndentOutdent plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.addButtonToToolbar();
    this.addIndentEventListener('click');
    this.addIndentEventListener('keyup');
  }

  /**
   * method to add indentOutdent button to toolbar
   */
  addButtonToToolbar() {
    const indents = ['Indent', 'Outdent'];

    for (const indentType of indents) {
      const div = document.createElement('div');
      const indentMenu = document.createElement('button');
      indentMenu.id = `ribs-wysiwyg-toolbar-indentOutdent-${indentType}`;
      if (indentType === 'Outdent') {
        indentMenu.classList.add('disabled');
      }
      indentMenu.innerHTML = indentType;
      indentMenu.addEventListener('click', () => this.indentOutdent(indentType));
      div.append(indentMenu);
      this.toolbarDiv.append(div);
    }
  }

  /**
   * add event to change value of font size selected
   * @param triggerEvent
   */
  addIndentEventListener(triggerEvent) {
    const outdentMenu = document.getElementById('ribs-wysiwyg-toolbar-indentOutdent-Outdent');
    this.editableDiv.addEventListener(triggerEvent, () => {
      if (window.getSelection && window.getSelection().getRangeAt && window.getSelection().anchorNode) {
        let parentElement = window.getSelection().anchorNode.parentElement;

        if (parentElement.id === this.editableDiv.id) {
          parentElement = window.getSelection().anchorNode;
        }

        if (parentElement && parentElement.style) {
          let marginLeft = parentElement.style.marginLeft.split('px')[0];
          marginLeft = parseInt(marginLeft) ? parseInt(marginLeft) : 0;

          if (marginLeft === 0) {
            outdentMenu.classList.add('disabled');
          } else {
            outdentMenu.classList.remove('disabled')
          }
        } else {
          outdentMenu.classList.add('disabled');
        }
      }
    });
  }

  /**
   * method indent or outdent an element
   */
  indentOutdent(indentType) {
    const outdentMenu = document.getElementById('ribs-wysiwyg-toolbar-indentOutdent-Outdent');
    let parentElement = window.getSelection().anchorNode.parentElement;

    if (parentElement.id === this.editableDiv.id) {
      parentElement = window.getSelection().anchorNode;
    }

    if (parentElement) {
      let marginLeft = parentElement.style.marginLeft.split('px')[0];
      marginLeft = parseInt(marginLeft) ? parseInt(marginLeft) : 0;

      if (indentType === 'Indent') {
        parentElement.style.marginLeft = `${marginLeft+40}px`;
        outdentMenu.classList.remove('disabled')
      } else if (indentType === 'Outdent' && marginLeft > 0) {
        const newMarginLeft = marginLeft-40;
        parentElement.style.marginLeft = `${newMarginLeft}px`;

        if (newMarginLeft === 0) {
          outdentMenu.classList.add('disabled')
        }
      }
    }

    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
  }
}

/**
 * function to load IndentOutdent class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const indentOutdent = new IndentOutdent(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/Italic.js":
/*!***************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/Italic.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class Italic {
  /**
   * method to initialize Italic plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.addButtonToToolbar();
  }

  /**
   * method to add italic button to toolbar
   */
  addButtonToToolbar() {
    const div = document.createElement('div');
    const italicMenu = document.createElement('button');
    italicMenu.id = 'ribs-wysiwyg-toolbar-italic';
    italicMenu.innerHTML = '<span style="font-style: italic">I</span>';
    italicMenu.addEventListener('click', () => this.setTextToItalic());
    div.append(italicMenu);
    this.toolbarDiv.append(div);
  }

  /**
   * method to put text in italic
   */
  setTextToItalic() {
    document.execCommand('italic');
    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
  }
}

/**
 * function to load Italic class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const italic = new Italic(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/Justify.js":
/*!****************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/Justify.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class Justify {
  /**
   * method to initialize Justify plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.addButtonToToolbar();
  }

  /**
   * method to add justify buttons to toolbar
   */
  addButtonToToolbar() {
    const justifyTypes = ['Left', 'Center', 'Right', 'Full'];

    for (const justifyType of justifyTypes) {
      const div = document.createElement('div');
      const justifyMenu = document.createElement('button');
      justifyMenu.id = `ribs-wysiwyg-toolbar-justify-${justifyType}`;
      justifyMenu.innerHTML = justifyType;
      justifyMenu.addEventListener('click', () => this.setTextToJustify(justifyType));
      div.append(justifyMenu);
      this.toolbarDiv.append(div);
    }
  }

  /**
   * method to put text in justify
   */
  setTextToJustify(justifyType) {
    document.execCommand(`justify${justifyType}`);
    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
  }
}

/**
 * function to load Justify class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const justify = new Justify(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/Link.js":
/*!*************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/Link.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");
/* harmony import */ var ribs_popup_source_js_ribs_popup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ribs-popup/source/js/ribs-popup */ "./node_modules/ribs-popup/source/js/ribs-popup.js");
/* harmony import */ var ribs_popup_dist_css_style_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ribs-popup/dist/css/style.min.css */ "./node_modules/ribs-popup/dist/css/style.min.css");
/* harmony import */ var ribs_popup_dist_css_style_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(ribs_popup_dist_css_style_min_css__WEBPACK_IMPORTED_MODULE_2__);




class Link {
  /**
   * method to initialize Link plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.ribsPopup = new ribs_popup_source_js_ribs_popup__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.addButtonToToolbar();

    const head  = document.getElementsByTagName('head')[0];
    const style  = document.createElement('style');
    style.innerText = ribs_popup_dist_css_style_min_css__WEBPACK_IMPORTED_MODULE_2___default.a.toString();
    head.appendChild(style);
  }

  /**
   * method to add link button to toolbar
   */
  addButtonToToolbar() {
    const div = document.createElement('div');
    const linkMenu = document.createElement('button');
    linkMenu.id = 'ribs-wysiwyg-toolbar-link';
    linkMenu.innerHTML = '<span>Link</span>';
    linkMenu.addEventListener('click', () => this.showPopup());
    div.append(linkMenu);
    this.toolbarDiv.append(div);
  }

  /**
   * method to create div for inputs of popup
   * @param id
   * @param label
   * @returns {HTMLDivElement}
   */
  createInputPopup(id, label) {
    const inputDiv = document.createElement('div');
    const labelElement = document.createElement('label');
    labelElement.innerText = label;
    labelElement.for = id;
    const input = document.createElement('input');
    input.id = id;
    input.name = id;

    if (id === 'ribs-wysiwyg-link-text') {
      input.value = _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getSelectionText();
    }

    inputDiv.appendChild(labelElement);
    inputDiv.appendChild(input);

    return inputDiv;
  }

  /**
   * method to create set content div
   * @returns {HTMLDivElement}
   */
  createContentDivPopup() {
    const setContentDiv = document.createElement('div');
    setContentDiv.id = 'set-content';

    const urlDiv = this.createInputPopup('ribs-wysiwyg-link-url', 'URL');
    const DisplayTextDiv = this.createInputPopup('ribs-wysiwyg-link-text', 'Text to display');
    const TitleDiv = this.createInputPopup('ribs-wysiwyg-link-title', 'Title');

    setContentDiv.appendChild(urlDiv);
    setContentDiv.appendChild(DisplayTextDiv);
    setContentDiv.appendChild(TitleDiv);

    return setContentDiv;
  }

  /**
   * method to create links div
   * @returns {HTMLDivElement}
   */
  createLinksDivPopup() {
    const linkDiv = document.createElement('div');
    linkDiv.classList.add('link');
    const cancelLink = document.createElement('a');
    cancelLink.classList.add('cancel');
    cancelLink.dataset.close = '';
    cancelLink.innerText = 'Close';
    linkDiv.appendChild(cancelLink);
    const validateLink = document.createElement('a');
    validateLink.classList.add('validate');
    validateLink.dataset.linkValidate = '';
    validateLink.innerText = 'Validate';
    linkDiv.appendChild(validateLink);

    return linkDiv;
  }

  /**
   * method to create popup element and append it to the dom
   */
  createPopup() {
    const popupDiv = document.createElement('div');
    popupDiv.id = 'ribs-wysiwyg-link-popup';
    popupDiv.classList.add('ribs-popup');

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');

    const setContentDiv = this.createContentDivPopup();
    const linkDiv = this.createLinksDivPopup();

    const clearDiv = document.createElement('div');
    clearDiv.classList.add('clear');

    contentDiv.appendChild(setContentDiv);
    contentDiv.appendChild(linkDiv);
    contentDiv.appendChild(clearDiv);
    popupDiv.appendChild(contentDiv);
    const container = document.getElementById('ribs-wysiwyg-container') ? document.getElementById('ribs-wysiwyg-container') : document.getElementById('ribs-wysiwyg-editableDiv-current').parentElement ;
    container.appendChild(popupDiv);

    this.popup = document.getElementById('ribs-wysiwyg-link-popup');
    this.addEventsOnInputs();
  }

  /**
   * method to show popup
   */
  showPopup() {
    this.selection = _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].saveSelection();
    this.createPopup();
    this.ribsPopup.openJsPopup('ribs-wysiwyg-link-popup');

    const dataValidate = this.popup.querySelectorAll('.ribs-popup [data-link-validate]');

    if (dataValidate.length > 0) {
      Array.from(dataValidate).forEach((element) => {
        element.addEventListener('click', (event) => this.addEventValidate());
      });
    }
  }

  /**
   * add event on input for url and text. If enter text in url
   * it is duplicated in text input if empty
   */
  addEventsOnInputs() {
    const inputUrl = document.getElementById('ribs-wysiwyg-link-url');
    const inputText = document.getElementById('ribs-wysiwyg-link-text');
    let nullText = false;

    inputUrl.addEventListener('keyup', (event) => {
      if (inputText.value === '') {
        nullText = true
      }
      if (nullText) {
        inputText.value = inputUrl.value;
      }
    });

    inputText.addEventListener('keyup', (event) => {
      if (inputText.value !== inputUrl.value) {
        nullText = false;
      }
    });
  }

  /**
   * method to put text in link
   */
  addEventValidate() {
    const url = document.getElementById('ribs-wysiwyg-link-url').value;
    const text = document.getElementById('ribs-wysiwyg-link-text').value;
    const title = document.getElementById('ribs-wysiwyg-link-title').value;

    if (!url) {
      this.ribsPopup.closePopup(event);
    } else {
      _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].restoreSelection(this.selection);
      document.execCommand('createLink', false, url);
      this.ribsPopup.closePopup(event);
    }

    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
    document.getElementById(this.popup.id).remove();

    this.changeValuesOfLink(text, title);
  }

  /**
   * add method to define text, id and title of link
   * @param text
   * @param title
   */
  changeValuesOfLink(text, title) {
    const id = 'ribs-wysiwyg-a-number-';
    let number = this.editableDiv.querySelectorAll('a').length + 1;

    this.editableDiv.querySelectorAll('a').forEach((element) => {
      if (element.id === undefined || element.id === '') {
        element.id = `${id}${number}`;
        element.innerText = text;
        element.title = title;
      }
    });
  }
}

/**
 * function to load Link class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const link = new Link(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/Lists.js":
/*!**************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/Lists.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class Lists {
  /**
   * method to initialize Lists plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.addButtonToToolbar();
  }

  /**
   * method to add lists button to toolbar
   */
  addButtonToToolbar() {
    const lists = ['OrderedList', 'UnorderedList'];

    for (const listType of lists) {
      const div = document.createElement('div');
      const indentMenu = document.createElement('button');
      indentMenu.id = `ribs-wysiwyg-toolbar-lists-${listType}`;
      indentMenu.innerHTML = listType;
      indentMenu.addEventListener('click', () => this.createLists(listType));
      div.append(indentMenu);
      this.toolbarDiv.append(div);
    }
  }

  /**
   * method create list element
   */
  createLists(listType) {
    document.execCommand(`insert${listType}`);
    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
  }
}

/**
 * function to load Lists class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const lists = new Lists(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/Strikethrough.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/Strikethrough.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class Strikethrough {
  /**
   * method to initialize Strikethrough plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.addButtonToToolbar();
  }

  /**
   * method to add strikethrough button to toolbar
   */
  addButtonToToolbar() {
    const div = document.createElement('div');
    const strikethroughMenu = document.createElement('button');
    strikethroughMenu.id = 'ribs-wysiwyg-toolbar-strikethrough';
    strikethroughMenu.innerHTML = '<span style="text-decoration: line-through">S</span>';
    strikethroughMenu.addEventListener('click', () => this.setTextToStrikethrough());
    div.append(strikethroughMenu);
    this.toolbarDiv.append(div);
  }

  /**
   * method to put text in strikethrough
   */
  setTextToStrikethrough() {
    document.execCommand('strikethrough');
    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
  }
}

/**
 * function to load Strikethrough class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const strikethrough = new Strikethrough(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/Underline.js":
/*!******************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/Underline.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class Underline {
  /**
   * method to initialize Underline plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.addButtonToToolbar();
  }

  /**
   * method to add underline button to toolbar
   */
  addButtonToToolbar() {
    const div = document.createElement('div');
    const underlineMenu = document.createElement('button');
    underlineMenu.id = 'ribs-wysiwyg-toolbar-underline';
    underlineMenu.innerHTML = '<span style="text-decoration: underline">U</span>';
    underlineMenu.addEventListener('click', () => this.setTextToUnderline());
    div.append(underlineMenu);
    this.toolbarDiv.append(div);
  }

  /**
   * method to put text in underline
   */
  setTextToUnderline() {
    document.execCommand('underline');
    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
  }
}

/**
 * function to load Underline class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const underline = new Underline(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/Plugins/UndoRedo.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/Plugins/UndoRedo.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class UndoRedo {
  /**
   * method to initialize UndoRedo plugin
   * @param toolbarDiv
   * @param editableDiv
   * @param options
   */
  constructor(toolbarDiv, editableDiv, options) {
    this.toolbarDiv = toolbarDiv;
    this.editableDiv = editableDiv;
    this.addButtonToToolbar();
    this.addUndoEventListener();
  }

  /**
   * method to add undoRedo button to toolbar
   */
  addButtonToToolbar() {
    const undos = ['Undo', 'Redo'];

    for (const undoType of undos) {
      const div = document.createElement('div');
      const undoMenu = document.createElement('button');
      undoMenu.id = `ribs-wysiwyg-toolbar-undoRedo-${undoType}`;
      undoMenu.classList.add('disabled');
      undoMenu.innerHTML = undoType;
      undoMenu.addEventListener('click', (event) => this.undoRedo(event, undoType));
      div.append(undoMenu);
      this.toolbarDiv.append(div);
      sessionStorage.removeItem('undoCount');
      sessionStorage.removeItem('redoCount');
    }
  }

  /**
   * method to put text in undoRedo and disabled or enable button in toolbar
   */
  undoRedo(event, undoType) {
    if (event.target.classList.contains('disabled')) {
      return
    }

    if (undoType === 'Undo') {
      sessionStorage.setItem('undoCount', parseInt(sessionStorage.getItem('undoCount')) - 1);
      sessionStorage.setItem('redoCount', parseInt((sessionStorage.getItem('redoCount') ? sessionStorage.getItem('redoCount') : 0)) + 1);
      if (parseInt(sessionStorage.getItem('undoCount')) === 0) {
        event.target.classList.add('disabled');
      }
      if (parseInt(sessionStorage.getItem('redoCount')) > 0) {
        const redoMenu = document.getElementById('ribs-wysiwyg-toolbar-undoRedo-Redo');
        redoMenu.classList.remove('disabled');
      }
    }

    if (undoType === 'Redo') {
      sessionStorage.setItem('redoCount', parseInt(sessionStorage.getItem('redoCount')) - 1);
      sessionStorage.setItem('undoCount', parseInt((sessionStorage.getItem('undoCount') ? sessionStorage.getItem('undoCount') : 0)) + 1);
      if (parseInt(sessionStorage.getItem('redoCount')) === 0) {
        event.target.classList.add('disabled');
      }
      if (parseInt(sessionStorage.getItem('undoCount')) > 0) {
        const redoMenu = document.getElementById('ribs-wysiwyg-toolbar-undoRedo-Undo');
        redoMenu.classList.remove('disabled');
      }
    }

    document.execCommand(undoType);
    this.editableDiv.focus();
    _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
  }

  /**
   * method to add event listener on keydown to store value in sessionStorage of redo and undo count
   */
  addUndoEventListener() {
    this.editableDiv.addEventListener('keydown', () => {
      const undoValue = sessionStorage.getItem('undoCount');
      sessionStorage.setItem('undoCount', parseInt(undoValue ? undoValue : 0) + 1);
      
      sessionStorage.setItem('redoCount', 0);
      const redoMenu = document.getElementById('ribs-wysiwyg-toolbar-undoRedo-Redo');
      redoMenu.classList.remove('disabled');

      if (undoValue) {
        const undoMenu = document.getElementById('ribs-wysiwyg-toolbar-undoRedo-Undo');
        undoMenu.classList.remove('disabled');
      }
    });
  }
}

/**
 * function to load UndoRedo class
 * @param toolbarDiv
 * @param editableDiv
 * @param options
 */
function launchClass(toolbarDiv, editableDiv, options) {
  const undoRedo = new UndoRedo(toolbarDiv, editableDiv, options);
}

/* harmony default export */ __webpack_exports__["default"] = ({launchClass});


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwyg.js":
/*!************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/RibsWysiwyg.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RibsWysiwygUtils */ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js");


class RibsWysiwyg {
  /**
   * method to launch construction au editor
   * @param options
   */
  constructor(options = {}) {
    if (!options.selector) {
      console.error('Selector is mandatory');
      return;
    } else if (!document.querySelector(options.selector)) {
      console.error('Selector can\'t be found in document');
      return;
    }

    this.defineOptions(options);

    if (options.mode && options.mode === 'inline') {
      this.initWysiwygInlineDivs();
    } else {
      this.selector = document.querySelector(options.selector);
      this.initWysiwygDivs();
    }
  }

  /**
   * method to defined options of wysiwyg
   * @param options
   */
  defineOptions(options) {
    if (!options.height) {
      options.height = '200px';
    }

    if (!options.mode) {
      options.mode = 'standard';
    }

    if (!options.toolbar) {
      options.toolbar = ['UndoRedo', '|', 'Justify', '|', 'IndentOutdent', '|',  'Lists', '|', 'Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'FontSize', 'Blocks', '|', 'Link'];
    } else {
      options.toolbar = options.toolbar.split(' ');
    }

    this.options = options;
  }

  /**
   * init wysiwyg div
   */
  initWysiwygDivs() {
    this.selector.style.display = 'none';

    const wysiwygDiv = document.createElement('div');
    wysiwygDiv.id = 'ribs-wysiwyg-container';
    this.selector.parentNode.prepend(wysiwygDiv);

    const editableDiv = document.createElement('div');
    editableDiv.id = 'ribs-wysiwyg-editable';
    wysiwygDiv.append(editableDiv);
    editableDiv.style.height = Number.isInteger(this.options.height) ? `${this.options.height}px` : this.options.height;
    editableDiv.contentEditable = true;

    const caretLocationDiv = document.createElement('div');
    caretLocationDiv.id = 'ribs-wysiwyg-caret-location';
    wysiwygDiv.append(caretLocationDiv);

    this.addEventsListenersEditableDiv(wysiwygDiv, editableDiv);
    editableDiv.innerHTML = this.selector.value;
  }

  /**
   * method to initialise inline wysiwyg editor
   */
  initWysiwygInlineDivs() {
    const selectors = document.querySelectorAll(this.options.selector);

    selectors.forEach((element) => {
      element.contentEditable = true;
      this.addEventsListenersEditableDiv(element, element);
    });
  }

  /**
   * method to add event listener on editable div
   * @param wysiwygDiv
   * @param editableDiv
   */
  addEventsListenersEditableDiv(wysiwygDiv, editableDiv) {
    editableDiv.addEventListener('keydown', (event) => {
      if(event.keyCode === 13 && !event.shiftKey) {
        document.execCommand('defaultParagraphSeparator', false, 'p');
      }

      this.options.mode === 'standard' ? _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv() : null;
    });

    editableDiv.addEventListener('click', () => {
      const caretPosition = _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].getCaretPosition();
      const lastPosition = caretPosition[caretPosition.length - 1];

      if (lastPosition === undefined) {
        document.execCommand('formatBlock', false, 'p');
      }

      if (this.options.mode === 'inline') {
        if (editableDiv.id !== 'ribs-wysiwyg-editableDiv-current' && document.getElementById('ribs-wysiwyg-toolbar')) {
          document.getElementById('ribs-wysiwyg-toolbar').remove();
        }
      }

      if (this.options.mode === 'inline' && !document.getElementById('ribs-wysiwyg-toolbar')) {
        const currentEditable = document.getElementById('ribs-wysiwyg-editableDiv-current');
        currentEditable ? currentEditable.removeAttribute('id') : null;
        editableDiv.id = 'ribs-wysiwyg-editableDiv-current';
        this.initToolbar(wysiwygDiv, editableDiv, 'inline');
      } else {
        _RibsWysiwygUtils__WEBPACK_IMPORTED_MODULE_0__["default"].refreshCaretLocationDiv();
      }
    });

    if (this.options.mode === 'inline') {
    } else {
      this.initToolbar(wysiwygDiv, editableDiv);
    }
  }

  /**
   * method to init toolbar
   */
  initToolbar(wysiwygDiv, editableDiv, mode = null) {
    const toolbarDiv = document.createElement('div');
    toolbarDiv.id = 'ribs-wysiwyg-toolbar';
    if (mode === null) {
      wysiwygDiv.prepend(toolbarDiv)
    } else {
      toolbarDiv.classList.add('inline');
      const parentDiv = wysiwygDiv.parentElement;
      parentDiv.insertBefore(toolbarDiv, wysiwygDiv);
    }

    for (let plugin of this.options.toolbar) {
      console.log(plugin);
      if (plugin === '|') {
        const boldMenu = document.createElement('div');
        boldMenu.classList.add('ribs-wysiwyg-toolbar-separator');
        toolbarDiv.append(boldMenu);
      } else {
        (__webpack_require__("./node_modules/ribs-wysiwyg/source/js/Plugins sync recursive ^\\.\\/.*\\.js$")(`./${plugin}.js`)).default.launchClass(toolbarDiv, editableDiv, this.options);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RibsWysiwyg);


/***/ }),

/***/ "./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/ribs-wysiwyg/source/js/RibsWysiwygUtils.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class RibsWysiwygUtils {
  /**
   * method to get current target position as array
   * @returns {array}
   */
  static getCaretPosition() {
    if (window.getSelection && window.getSelection().getRangeAt && window.getSelection().anchorNode) {
      const editableDiv = document.getElementById('ribs-wysiwyg-editable');
      let element = window.getSelection().anchorNode;
      const breadcrumbs = [];

      for ( ; element && element !== editableDiv; element = element.parentNode) {
        if (element.tagName !== undefined) {
          breadcrumbs.push(element.tagName.toLowerCase());
        }
      }
      return breadcrumbs.reverse();
    }

    return [];
  }

  /**
   * method to get current target position as string
   * @returns {string}
   */
  static getCaretPositionAsString() {
    const arrayCaret = this.getCaretPosition();

    if (arrayCaret.length) {
      return arrayCaret.join(' > ');
    }

    return '';
  }

  /**
   * method to refresh caret location div content
   */
  static refreshCaretLocationDiv() {
    const caretLocationDiv = document.getElementById('ribs-wysiwyg-caret-location');
    if (caretLocationDiv) {
      caretLocationDiv.innerHTML = RibsWysiwygUtils.getCaretPositionAsString();
    }
  }

  /**
   * save current selection of contentn editable
   * @returns {null|[]|Range}
   */
  static saveSelection() {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection.getRangeAt && selection.rangeCount) {
        const ranges = [];
        for (let i = 0, length = selection.rangeCount; i < length; ++i) {
          ranges.push(selection.getRangeAt(i));
        }
        return ranges;
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    return null;
  }

  /**
   * restore a given selection
   * @param currentSelection
   */
  static restoreSelection(currentSelection) {
    if (currentSelection) {
      if (window.getSelection) {
        const selection = window.getSelection();
        selection.removeAllRanges();
        for (let i = 0, length = currentSelection.length; i < length; ++i) {
          selection.addRange(currentSelection[i]);
        }
      } else if (document.selection && currentSelection.select) {
        currentSelection.select();
      }
    }
  }

  /**
   * method to get current text selected in contenteditable div
   * @returns {string}
   */
  static getSelectionText() {
    let text = '';
    if (window.getSelection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    return text;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RibsWysiwygUtils);


/***/ }),

/***/ 2:
/*!**************************************!*\
  !*** multi ./assets/js/page/edit.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/js/page/edit.js */"./assets/js/page/edit.js");


/***/ })

},[[2,"runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcGFnZS9lZGl0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXBvcHVwL2Rpc3QvY3NzL3N0eWxlLm1pbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtcG9wdXAvbm9kZV9tb2R1bGVzL3JpYnMtY29yZS9SaWJzQ29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy1wb3B1cC9zb3VyY2UvanMvcmlicy1wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zIHN5bmMgXlxcLlxcLy4qXFwuanMkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvQmxvY2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvQm9sZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0ZvbnRTaXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvSW5kZW50T3V0ZGVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0l0YWxpYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0p1c3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9MaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvTGlzdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9TdHJpa2V0aHJvdWdoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvVW5kZXJsaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvVW5kb1JlZG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUmlic1d5c2l3eWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUmlic1d5c2l3eWdVdGlscy5qcyJdLCJuYW1lcyI6WyJ3eXNpd3lnIiwibW9kZSIsInNlbGVjdG9yIiwiaGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBRUEsSUFBTUEsT0FBTyxHQUFHLHlEQUFnQjtBQUM5QkMsTUFBSSxFQUQwQjtBQUU5QkMsVUFBUSxFQUZzQjtBQUc5QkMsUUFBTSxFQUFFO0FBSHNCLENBQWhCLENBQWhCLEM7Ozs7Ozs7Ozs7O0FDRkEsdUM7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxVQUFVO0FBQzdDLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtB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Z0VBQUMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDaEQ3QjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLFNBQVM7QUFDaEMsd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsZ0VBQUMsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7O0FDckk3QjtBQUFBO0FBQW1EOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNERBQTRELFdBQVc7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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VyxFQUFDOzs7Ozs7Ozs7Ozs7O0FDM0ozQjtBQUFBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxvQ0FBb0M7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFlBQVk7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELFlBQVk7QUFDckU7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSwrRUFBZ0IsRUFBQyIsImZpbGUiOiJqcy9lZGl0LXBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmlic1d5c2l3eWcgZnJvbSBcInJpYnMtd3lzaXd5Z1wiO1xuXG5jb25zdCB3eXNpd3lnID0gbmV3IFJpYnNXeXNpd3lnKHtcbiAgbW9kZTogJ2lubGluZScsXG4gIHNlbGVjdG9yOiAnW2RhdGEtcmlicy13eXNpd3lnXScsXG4gIGhlaWdodDogNDAwLFxufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJjbGFzcyBSaWJzQ29yZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIGhlaWdodCBvZiBhbiBlbGVtZW50IHRoYXQgaXMgbm8gZGlzcGxheWVkXHJcbiAgICovXHJcbiAgc3RhdGljIGdldEhlaWdodChlbGVtZW50KSB7XHJcbiAgICAvL2lmIG1heCBoZWlnaCBnZXQgdmFsdWUgYW5kIGRlbGV0ZSBpZiBmb3IgYSBtb21lbnRcclxuICAgIGNvbnN0IG1heEhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21heC1oZWlnaHQnKTtcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICdpbmhlcml0JztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgIGxldCBoZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSk7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IG1heEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgKiB0aGlzIG1ldGhvZCBkbyBhbmltYXRpb24gb24gaGVpZ2h0IHdoZW4gZGlzcGxheWluZyBhbiBlbGVtZW50XHJcbiAgICogaWYgbWF4IGhlaWdodCA9IG5vbmUgaXQgc2hvdyB0aGUgZWxlbWVudCBlbHNlIHRoaXMgZnVuY3Rpb24gaGlkZSBpdFxyXG4gICAqL1xyXG4gIHN0YXRpYyB0b2dnbGVTbGlkZShlbGVtZW50LCBkdXJhdGlvbikge1xyXG4gICAgbGV0IG1heEhlaWdodCA9IDA7XHJcbiAgICBjb25zdCBtYXhIZWlnaHREaXYgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXgtaGVpZ2h0Jyk7XHJcblxyXG4gICAgaWYgKG1heEhlaWdodERpdiA9PT0gJ25vbmUnIHx8IG1heEhlaWdodERpdiA9PT0gJzBweCcpIHtcclxuICAgICAgbWF4SGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ21heC1oZWlnaHQgMC41cyBlYXNlLWluLW91dCc7XHJcbiAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IDA7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XHJcbiAgICB9LCBkdXJhdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqIEBwYXJhbSBuZXdFbGVtZW50XHJcbiAgICogYWRkIGFuIGVsZW1lbnQgYXJyb3VuZCBhIHNwZWNpZmllZCBlbGVtZW50LiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgLndyYXAoKSBpbiBqUXVlcnlcclxuICAgKi9cclxuICBzdGF0aWMgd3JhcChlbGVtZW50LCBuZXdFbGVtZW50LCBjbGFzc05hbWUgPSBudWxsKSB7XHJcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuXHJcbiAgICBwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbGVtZW50KTtcclxuICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogbWV0aG9kIHRvIGdldCBhIHdhbnRlZCBwYXJlbnQgaW4gcGFyZW50c05vZGVzIG9mIGFuIGVsZW1lbnRcclxuICAgKi9cclxuICBzdGF0aWMgcGFyZW50cyhlbGVtZW50LCB3YW50ZWQpIHtcclxuICAgIGZvciAoIDsgZWxlbWVudCAmJiBlbGVtZW50ICE9PSBkb2N1bWVudDsgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xyXG4gICAgICBpZiAodGhpcy5jaGVja1dhbnRlZCh3YW50ZWQpID09PSAnY2xhc3MnICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHdhbnRlZC5zcGxpdCgnLicpWzFdKSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tXYW50ZWQod2FudGVkKSA9PT0gJ2lkJyAmJiBlbGVtZW50LmlkID09PSB3YW50ZWQuc3BsaXQoJyMnKVsxXSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogcGVybWV0IGRlIHRlc3RlciBzaSB1biDDqWzDqW1lbnQgY2hlcmNow6kgZXN0IHVuZSBjbGFzcyBvdSB1biBpZFxyXG4gICAqL1xyXG4gIHN0YXRpYyBjaGVja1dhbnRlZCh3YW50ZWQpIHtcclxuICAgIGlmICh3YW50ZWQuaW5kZXhPZignLicpICE9PSAtMSkge1xyXG4gICAgICByZXR1cm4gJ2NsYXNzJztcclxuICAgIH0gZWxzZSBpZiAod2FudGVkLmluZGV4T2YoJyMnKSAhPT0gLTEpIHtcclxuICAgICAgcmV0dXJuICdpZCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoUmlic0NvcmUpO1xyXG4iLCJpbXBvcnQgUmlic0NvcmUgZnJvbSAncmlicy1jb3JlJztcblxuY2xhc3MgUmlic1BvcHVwIHtcbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yIGFkZCBldmVudCBsaXN0ZW5lciBvbiBhbGwgZWxlbWVudCB3aWNoIGhhdmVcbiAgICogZGF0YS1yaWJzcG9wdXBcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmlic3BvcHVwXScpO1xuXG4gICAgQXJyYXkuZnJvbShsaW5rcykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5vcGVuUG9wdXAoZXZlbnQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogbWV0aG9kIHRvIG9wZW4gYSBwb3B1cCB3aXRoIGxpbmsgY2xpY2tlZCBpbiBldmVudFxuICAgKi9cbiAgb3BlblBvcHVwKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGxpbmsgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnBvcHVwKTtcblxuICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYWpheCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldENvbnRlbnQocG9wdXAsIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hamF4KVxuICAgIH1cblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3JpYnMtZGlzcGxheWVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyaWJzLXBvcHVwLWJvZHknKTtcblxuICAgIGNvbnN0IGRhdGFDbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLWNsb3NlXScpO1xuICAgIGNvbnN0IGRhdGFWYWxpZGF0ZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLXZhbGlkYXRlXScpO1xuXG4gICAgaWYgKGRhdGFDbG9zZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFDbG9zZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkYXRhVmFsaWRhdGUubGVuZ3RoID4gMCkge1xuICAgICAgQXJyYXkuZnJvbShkYXRhVmFsaWRhdGUpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5zZXRBY3Rpb25WYWxpZGF0ZShldmVudCwgbGluaykpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBvcGVuIGEgcG9wdXAgYnkgYSBqcyBjYWxsIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBwb3B1cElkXG4gICAqL1xuICBvcGVuSnNQb3B1cChwb3B1cElkKSB7XG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3B1cElkKTtcblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3JpYnMtZGlzcGxheWVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyaWJzLXBvcHVwLWJvZHknKTtcblxuICAgIGNvbnN0IGRhdGFDbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLWNsb3NlXScpO1xuICAgIGNvbnN0IGRhdGFWYWxpZGF0ZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLXZhbGlkYXRlXScpO1xuXG4gICAgaWYgKGRhdGFDbG9zZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFDbG9zZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkYXRhVmFsaWRhdGUubGVuZ3RoID4gMCkge1xuICAgICAgQXJyYXkuZnJvbShkYXRhVmFsaWRhdGUpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5zZXRBY3Rpb25WYWxpZGF0ZShldmVudCwgbnVsbCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gbGlua1xuICAgKiBtZXRob2QgdGhhdCB0cmlnZ2VyIGFjdGlvbiB0byBkbyBvbiBjbGljayBvbiBkYXRhLXZhbGlkYXRlIGJ1dHRvblxuICAgKiBvciBzZW5kIGJhY2sgb24gYW4gdXJsIHdpdGggZGF0YS1ocmVmIG9yIHN1Ym1pdCBhIGZvcm0gd2l0aCBkYXRhLWZvcm1cbiAgICovXG4gIHNldEFjdGlvblZhbGlkYXRlKGV2ZW50LCBsaW5rKSB7XG4gICAgaWYgKGxpbmsuZGF0YXNldC5ocmVmICE9PSBudWxsICYmIGxpbmsuZGF0YXNldC5ocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaHJlZiA9IGxpbmsuZGF0YXNldC5ocmVmO1xuICAgIH0gZWxzZSBpZiAobGluay5kYXRhc2V0LmZvcm0gIT09IG51bGwgJiYgbGluay5kYXRhc2V0LmZvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluay5kYXRhc2V0LmZvcm0pLnN1Ym1pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogbWV0aG9kIHRvIGNsb3NlIGEgcG9wdXBcbiAgICovXG4gIGNsb3NlUG9wdXAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgcG9wdXAgPSBSaWJzQ29yZS5wYXJlbnRzKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcucmlicy1wb3B1cCcpO1xuXG4gICAgaWYgKHBvcHVwICE9PSBudWxsKSB7XG4gICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdyaWJzLWRpc3BsYXllZCcpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdyaWJzLXBvcHVwLWJvZHknKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBvcHVwXG4gICAqIEBwYXJhbSBhamF4VXJsXG4gICAqIG1hdGhvZCB0aGF0IGFkZCB0aGUgY29udGVudCBvZiBhamF4IHJlcXVlc3QgdG8gdGhlIHBvcHVwXG4gICAqL1xuICBzZXRDb250ZW50KHBvcHVwLCBhamF4VXJsKSB7XG4gICAgY29uc3QgcG9wdXBDb250ZW50ID0gcG9wdXAucXVlcnlTZWxlY3RvcignI3NldC1jb250ZW50Jyk7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gIG5ldyBSZXF1ZXN0KGFqYXhVcmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgfSk7XG5cbiAgICBmZXRjaCAocmVxdWVzdClcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgcG9wdXBDb250ZW50LmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoUmlic1BvcHVwKTtcblxuY29uc3QgcG9wdXAgPSBuZXcgUmlic1BvcHVwKCk7XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vQmxvY2tzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0Jsb2Nrcy5qc1wiLFxuXHRcIi4vQm9sZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9Cb2xkLmpzXCIsXG5cdFwiLi9Gb250U2l6ZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9Gb250U2l6ZS5qc1wiLFxuXHRcIi4vSW5kZW50T3V0ZGVudC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9JbmRlbnRPdXRkZW50LmpzXCIsXG5cdFwiLi9JdGFsaWMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvSXRhbGljLmpzXCIsXG5cdFwiLi9KdXN0aWZ5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0p1c3RpZnkuanNcIixcblx0XCIuL0xpbmsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvTGluay5qc1wiLFxuXHRcIi4vTGlzdHMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvTGlzdHMuanNcIixcblx0XCIuL1N0cmlrZXRocm91Z2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvU3RyaWtldGhyb3VnaC5qc1wiLFxuXHRcIi4vVW5kZXJsaW5lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL1VuZGVybGluZS5qc1wiLFxuXHRcIi4vVW5kb1JlZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvVW5kb1JlZG8uanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLipcXFxcLmpzJFwiOyIsImltcG9ydCBSaWJzV3lzaXd5Z1V0aWxzIGZyb20gXCIuLi9SaWJzV3lzaXd5Z1V0aWxzXCI7XG5cbmNsYXNzIEJsb2NrcyB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBCbG9ja3MgcGx1Z2luXG4gICAqIEBwYXJhbSB0b29sYmFyRGl2XG4gICAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnRvb2xiYXJEaXYgPSB0b29sYmFyRGl2O1xuICAgIHRoaXMuZWRpdGFibGVEaXYgPSBlZGl0YWJsZURpdjtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuZGVmaW5lT3B0aW9ucygpO1xuICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyKCk7XG4gICAgdGhpcy5hZGRTZWxlY3RFdmVudExpc3RlbmVyKCdjbGljaycpO1xuICAgIHRoaXMuYWRkU2VsZWN0RXZlbnRMaXN0ZW5lcigna2V5ZG93bicpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgYm9sZCBidXR0b24gdG8gdG9vbGJhclxuICAgKi9cbiAgYWRkQnV0dG9uVG9Ub29sYmFyKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJsb2Nrc01lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICBibG9ja3NNZW51LmlkID0gJ3JpYnMtd3lzaXd5Zy10b29sYmFyLWJsb2Nrcyc7XG4gICAgYmxvY2tzTWVudS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHRoaXMuY2hhbmdlQmxvY2soZXZlbnQpKTtcbiAgICBkaXYuYXBwZW5kKGJsb2Nrc01lbnUpO1xuICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcblxuICAgIGZvciAoY29uc3QgYmxvY2sgaW4gdGhpcy5vcHRpb25zLmJsb2Nrcykge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICBvcHRpb24udGV4dCA9IGAke3RoaXMub3B0aW9ucy5ibG9ja3NbYmxvY2tdfWA7XG4gICAgICBvcHRpb24udmFsdWUgPSBgJHtibG9ja31gO1xuICAgICAgYmxvY2tzTWVudS5hZGQob3B0aW9uKTtcbiAgICAgIHRoaXMuYmxvY2tzTWVudSA9IGJsb2Nrc01lbnU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlZmluZSBvcHRpb25zIG9mIHRoZSBwbHVnaW5cbiAgICovXG4gIGRlZmluZU9wdGlvbnMoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYmxvY2tzKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYmxvY2tzID0ge1xuICAgICAgICAncCc6ICdQYXJhZ3JhcGgnLFxuICAgICAgICAnaDEnOiAnSGVhZGluZyAxJyxcbiAgICAgICAgJ2gyJzogJ0hlYWRpbmcgMicsXG4gICAgICAgICdoMyc6ICdIZWFkaW5nIDMnLFxuICAgICAgICAnaDQnOiAnSGVhZGluZyA0JyxcbiAgICAgICAgJ2g1JzogJ0hlYWRpbmcgNScsXG4gICAgICAgICdoNic6ICdIZWFkaW5nIDYnLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIGV2ZW50IHRvIGNoYW5nZSB2YWx1ZSBvZiBmb250IHNpemUgc2VsZWN0ZWRcbiAgICogQHBhcmFtIHRyaWdnZXJFdmVudFxuICAgKi9cbiAgYWRkU2VsZWN0RXZlbnRMaXN0ZW5lcih0cmlnZ2VyRXZlbnQpIHtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmFkZEV2ZW50TGlzdGVuZXIodHJpZ2dlckV2ZW50LCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZSkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnROb2RlICYmIHRoaXMub3B0aW9ucy5ibG9ja3MuaGFzT3duUHJvcGVydHkoZWxlbWVudC5wYXJlbnROb2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgPj0gMCkge1xuICAgICAgICAgIHRoaXMuYmxvY2tzTWVudS52YWx1ZSA9IGVsZW1lbnQucGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY2hhbmdlIGN1cnJlbnQgZWxlbWVudCBieSBzZWxlY3RlZCBibG9ja1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGNoYW5nZUJsb2NrKGV2ZW50KSB7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsIGA8JHtldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlfT5gKTtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmZvY3VzKCk7XG4gICAgUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpO1xuICB9XG59XG5cbi8qKlxuICogZnVuY3Rpb24gdG8gbG9hZCBCbG9ja3MgY2xhc3NcbiAqIEBwYXJhbSB0b29sYmFyRGl2XG4gKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGxhdW5jaENsYXNzKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gIGNvbnN0IGJsb2NrcyA9IG5ldyBCbG9ja3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGF1bmNoQ2xhc3N9O1xuIiwiaW1wb3J0IFJpYnNXeXNpd3lnVXRpbHMgZnJvbSBcIi4uL1JpYnNXeXNpd3lnVXRpbHNcIjtcblxuY2xhc3MgQm9sZCB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBCb2xkIHBsdWdpblxuICAgKiBAcGFyYW0gdG9vbGJhckRpdlxuICAgKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gICAgdGhpcy50b29sYmFyRGl2ID0gdG9vbGJhckRpdjtcbiAgICB0aGlzLmVkaXRhYmxlRGl2ID0gZWRpdGFibGVEaXY7XG4gICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGJvbGQgYnV0dG9uIHRvIHRvb2xiYXJcbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbGJhcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBib2xkTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJvbGRNZW51LmlkID0gJ3JpYnMtd3lzaXd5Zy10b29sYmFyLWJvbGQnO1xuICAgIGJvbGRNZW51LmlubmVySFRNTCA9ICc8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkXCI+Qjwvc3Bhbj4nO1xuICAgIGJvbGRNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRUZXh0VG9Cb2xkKCkpO1xuICAgIGRpdi5hcHBlbmQoYm9sZE1lbnUpO1xuICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcHV0IHRleHQgaW4gYm9sZFxuICAgKi9cbiAgc2V0VGV4dFRvQm9sZCgpIHtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnYm9sZCcpO1xuICAgIHRoaXMuZWRpdGFibGVEaXYuZm9jdXMoKTtcbiAgICBSaWJzV3lzaXd5Z1V0aWxzLnJlZnJlc2hDYXJldExvY2F0aW9uRGl2KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBmdW5jdGlvbiB0byBsb2FkIEJvbGQgY2xhc3NcbiAqIEBwYXJhbSB0b29sYmFyRGl2XG4gKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGxhdW5jaENsYXNzKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gIGNvbnN0IGJvbGQgPSBuZXcgQm9sZCh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtsYXVuY2hDbGFzc307XG4iLCJjbGFzcyBGb250U2l6ZSB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBGb250U2l6ZSBwbHVnaW5cbiAgICogQHBhcmFtIHRvb2xiYXJEaXZcbiAgICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICAgIHRoaXMudG9vbGJhckRpdiA9IHRvb2xiYXJEaXY7XG4gICAgdGhpcy5lZGl0YWJsZURpdiA9IGVkaXRhYmxlRGl2O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5kZWZpbmVPcHRpb25zKCk7XG4gICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIoKTtcbiAgICB0aGlzLmFkZFNlbGVjdEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyk7XG4gICAgdGhpcy5hZGRTZWxlY3RFdmVudExpc3RlbmVyKCdrZXlkb3duJyk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFkZCBib2xkIGJ1dHRvbiB0byB0b29sYmFyXG4gICAqL1xuICBhZGRCdXR0b25Ub1Rvb2xiYXIoKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgZm9udFNpemVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgZm9udFNpemVNZW51LmlkID0gJ3JpYnMtd3lzaXd5Zy10b29sYmFyLWZvbnRzaXplJztcbiAgICBmb250U2l6ZU1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50KSA9PiB0aGlzLmNoYW5nZUZvbnRTaXplKGV2ZW50KSk7XG4gICAgZGl2LmFwcGVuZChmb250U2l6ZU1lbnUpO1xuICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcblxuICAgIGNvbnN0IGJvZHlGb250U2l6ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJyk7XG5cbiAgICBmb3IgKGNvbnN0IGZvbnRTaXplIG9mIHRoaXMub3B0aW9ucy5mb250U2l6ZSkge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cbiAgICAgIGlmIChwYXJzZUludChmb250U2l6ZSkgPT09IHBhcnNlSW50KGJvZHlGb250U2l6ZSkpIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9uLmRhdGFzZXQuZGVmYXVsdCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbi50ZXh0ID0gYCR7Zm9udFNpemV9cHhgO1xuICAgICAgb3B0aW9uLnZhbHVlID0gYCR7Zm9udFNpemV9cHhgO1xuICAgICAgZm9udFNpemVNZW51LmFkZChvcHRpb24pO1xuICAgICAgdGhpcy5mb250U2l6ZU1lbnUgPSBmb250U2l6ZU1lbnU7XG4gICAgfVxuXG4gICAgY29uc3QgZGVmYXVsdFZhbHVlID0gdGhpcy5mb250U2l6ZU1lbnUucXVlcnlTZWxlY3RvcignW2RhdGEtZGVmYXVsdF0nKTtcbiAgICBpZiAoIWRlZmF1bHRWYWx1ZSkge1xuICAgICAgY29uc3Qgb3B0aW9uID0gdGhpcy5mb250U2l6ZU1lbnUucXVlcnlTZWxlY3Rvcignb3B0aW9uOmZpcnN0LW9mLXR5cGUnKTtcbiAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICBvcHRpb24uZGF0YXNldC5kZWZhdWx0ID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZGVmaW5lIG9wdGlvbnMgb2YgdGhlIHBsdWdpblxuICAgKi9cbiAgZGVmaW5lT3B0aW9ucygpIHtcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5mb250U2l6ZSkge1xuICAgICAgdGhpcy5vcHRpb25zLmZvbnRTaXplID0gWzgsIDEwLCAxMiwgMTQsIDE2LCAxOCwgMjQsIDM2XTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIGV2ZW50IHRvIGNoYW5nZSB2YWx1ZSBvZiBmb250IHNpemUgc2VsZWN0ZWRcbiAgICogQHBhcmFtIHRyaWdnZXJFdmVudFxuICAgKi9cbiAgYWRkU2VsZWN0RXZlbnRMaXN0ZW5lcih0cmlnZ2VyRXZlbnQpIHtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmFkZEV2ZW50TGlzdGVuZXIodHJpZ2dlckV2ZW50LCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZSkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnROb2RlICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudC5wYXJlbnROb2RlLnN0eWxlICYmIGVsZW1lbnQucGFyZW50Tm9kZS5zdHlsZS5mb250U2l6ZSkge1xuICAgICAgICAgIHRoaXMuZm9udFNpemVNZW51LnZhbHVlID0gZWxlbWVudC5wYXJlbnROb2RlLnN0eWxlLmZvbnRTaXplO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZm9udFNpemVNZW51LnZhbHVlID0gdGhpcy5mb250U2l6ZU1lbnUucXVlcnlTZWxlY3RvcignW2RhdGEtZGVmYXVsdF0nKS52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byByZXBsYWNlIGNyZWF0ZSBmb250IGVsZW1lbnQgYnkgYSBzcGFuXG4gICAqIEBwYXJhbSBmb250RWxlbWVudFxuICAgKiBAcGFyYW0gZm9udFNpemVcbiAgICovXG4gIHJlcGxhY2VGb250QnlTcGFuKGZvbnRFbGVtZW50LCBmb250U2l6ZSkge1xuICAgIGNvbnN0IHBhcmVudERpdiA9IGZvbnRFbGVtZW50LnBhcmVudE5vZGU7XG4gICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBzcGFuLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGZvbnRFbGVtZW50LnRleHRDb250ZW50KSk7XG4gICAgc3Bhbi5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplO1xuXG4gICAgcGFyZW50RGl2LnJlcGxhY2VDaGlsZChzcGFuLCBmb250RWxlbWVudCk7XG5cbiAgICBjb25zdCByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cyh0aGlzLmVkaXRhYmxlRGl2KTtcbiAgICByYW5nZS5jb2xsYXBzZShmYWxzZSk7XG4gICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5mb2N1cygpO1xuICAgIHJhbmdlLmRldGFjaCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBjaGFuZ2UgZm9udCBzaXplIG9mIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgY2hhbmdlRm9udFNpemUoZXZlbnQpIHtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmZvY3VzKCk7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJmb250U2l6ZVwiLCBmYWxzZSwgJzEnKTtcbiAgICBjb25zdCBmb250U2l6ZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgY29uc3QgZm9udEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZm9udCcpWzBdO1xuXG4gICAgaWYgKCFmb250RWxlbWVudCkge1xuICAgICAgdGhpcy5lZGl0YWJsZURpdi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBmb250RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb250JylbMF07XG4gICAgICAgIHRoaXMucmVwbGFjZUZvbnRCeVNwYW4oZm9udEVsZW1lbnQsIGZvbnRTaXplKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlcGxhY2VGb250QnlTcGFuKGZvbnRFbGVtZW50LCBmb250U2l6ZSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogZnVuY3Rpb24gdG8gbG9hZCBGb250U2l6ZSBjbGFzc1xuICogQHBhcmFtIHRvb2xiYXJEaXZcbiAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbGF1bmNoQ2xhc3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgY29uc3QgZm9udFNpemUgPSBuZXcgRm9udFNpemUodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGF1bmNoQ2xhc3N9O1xuIiwiaW1wb3J0IFJpYnNXeXNpd3lnVXRpbHMgZnJvbSBcIi4uL1JpYnNXeXNpd3lnVXRpbHNcIjtcblxuY2xhc3MgSW5kZW50T3V0ZGVudCB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBJbmRlbnRPdXRkZW50IHBsdWdpblxuICAgKiBAcGFyYW0gdG9vbGJhckRpdlxuICAgKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gICAgdGhpcy50b29sYmFyRGl2ID0gdG9vbGJhckRpdjtcbiAgICB0aGlzLmVkaXRhYmxlRGl2ID0gZWRpdGFibGVEaXY7XG4gICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIoKTtcbiAgICB0aGlzLmFkZEluZGVudEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyk7XG4gICAgdGhpcy5hZGRJbmRlbnRFdmVudExpc3RlbmVyKCdrZXl1cCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgaW5kZW50T3V0ZGVudCBidXR0b24gdG8gdG9vbGJhclxuICAgKi9cbiAgYWRkQnV0dG9uVG9Ub29sYmFyKCkge1xuICAgIGNvbnN0IGluZGVudHMgPSBbJ0luZGVudCcsICdPdXRkZW50J107XG5cbiAgICBmb3IgKGNvbnN0IGluZGVudFR5cGUgb2YgaW5kZW50cykge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBpbmRlbnRNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBpbmRlbnRNZW51LmlkID0gYHJpYnMtd3lzaXd5Zy10b29sYmFyLWluZGVudE91dGRlbnQtJHtpbmRlbnRUeXBlfWA7XG4gICAgICBpZiAoaW5kZW50VHlwZSA9PT0gJ091dGRlbnQnKSB7XG4gICAgICAgIGluZGVudE1lbnUuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICAgIGluZGVudE1lbnUuaW5uZXJIVE1MID0gaW5kZW50VHlwZTtcbiAgICAgIGluZGVudE1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmluZGVudE91dGRlbnQoaW5kZW50VHlwZSkpO1xuICAgICAgZGl2LmFwcGVuZChpbmRlbnRNZW51KTtcbiAgICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIGV2ZW50IHRvIGNoYW5nZSB2YWx1ZSBvZiBmb250IHNpemUgc2VsZWN0ZWRcbiAgICogQHBhcmFtIHRyaWdnZXJFdmVudFxuICAgKi9cbiAgYWRkSW5kZW50RXZlbnRMaXN0ZW5lcih0cmlnZ2VyRXZlbnQpIHtcbiAgICBjb25zdCBvdXRkZW50TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctdG9vbGJhci1pbmRlbnRPdXRkZW50LU91dGRlbnQnKTtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmFkZEV2ZW50TGlzdGVuZXIodHJpZ2dlckV2ZW50LCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZSkge1xuICAgICAgICBsZXQgcGFyZW50RWxlbWVudCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgaWYgKHBhcmVudEVsZW1lbnQuaWQgPT09IHRoaXMuZWRpdGFibGVEaXYuaWQpIHtcbiAgICAgICAgICBwYXJlbnRFbGVtZW50ID0gd2luZG93LmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50RWxlbWVudCAmJiBwYXJlbnRFbGVtZW50LnN0eWxlKSB7XG4gICAgICAgICAgbGV0IG1hcmdpbkxlZnQgPSBwYXJlbnRFbGVtZW50LnN0eWxlLm1hcmdpbkxlZnQuc3BsaXQoJ3B4JylbMF07XG4gICAgICAgICAgbWFyZ2luTGVmdCA9IHBhcnNlSW50KG1hcmdpbkxlZnQpID8gcGFyc2VJbnQobWFyZ2luTGVmdCkgOiAwO1xuXG4gICAgICAgICAgaWYgKG1hcmdpbkxlZnQgPT09IDApIHtcbiAgICAgICAgICAgIG91dGRlbnRNZW51LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dGRlbnRNZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb3V0ZGVudE1lbnUuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCBpbmRlbnQgb3Igb3V0ZGVudCBhbiBlbGVtZW50XG4gICAqL1xuICBpbmRlbnRPdXRkZW50KGluZGVudFR5cGUpIHtcbiAgICBjb25zdCBvdXRkZW50TWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctdG9vbGJhci1pbmRlbnRPdXRkZW50LU91dGRlbnQnKTtcbiAgICBsZXQgcGFyZW50RWxlbWVudCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlLnBhcmVudEVsZW1lbnQ7XG5cbiAgICBpZiAocGFyZW50RWxlbWVudC5pZCA9PT0gdGhpcy5lZGl0YWJsZURpdi5pZCkge1xuICAgICAgcGFyZW50RWxlbWVudCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlO1xuICAgIH1cblxuICAgIGlmIChwYXJlbnRFbGVtZW50KSB7XG4gICAgICBsZXQgbWFyZ2luTGVmdCA9IHBhcmVudEVsZW1lbnQuc3R5bGUubWFyZ2luTGVmdC5zcGxpdCgncHgnKVswXTtcbiAgICAgIG1hcmdpbkxlZnQgPSBwYXJzZUludChtYXJnaW5MZWZ0KSA/IHBhcnNlSW50KG1hcmdpbkxlZnQpIDogMDtcblxuICAgICAgaWYgKGluZGVudFR5cGUgPT09ICdJbmRlbnQnKSB7XG4gICAgICAgIHBhcmVudEVsZW1lbnQuc3R5bGUubWFyZ2luTGVmdCA9IGAke21hcmdpbkxlZnQrNDB9cHhgO1xuICAgICAgICBvdXRkZW50TWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpXG4gICAgICB9IGVsc2UgaWYgKGluZGVudFR5cGUgPT09ICdPdXRkZW50JyAmJiBtYXJnaW5MZWZ0ID4gMCkge1xuICAgICAgICBjb25zdCBuZXdNYXJnaW5MZWZ0ID0gbWFyZ2luTGVmdC00MDtcbiAgICAgICAgcGFyZW50RWxlbWVudC5zdHlsZS5tYXJnaW5MZWZ0ID0gYCR7bmV3TWFyZ2luTGVmdH1weGA7XG5cbiAgICAgICAgaWYgKG5ld01hcmdpbkxlZnQgPT09IDApIHtcbiAgICAgICAgICBvdXRkZW50TWVudS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmVkaXRhYmxlRGl2LmZvY3VzKCk7XG4gICAgUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpO1xuICB9XG59XG5cbi8qKlxuICogZnVuY3Rpb24gdG8gbG9hZCBJbmRlbnRPdXRkZW50IGNsYXNzXG4gKiBAcGFyYW0gdG9vbGJhckRpdlxuICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBsYXVuY2hDbGFzcyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICBjb25zdCBpbmRlbnRPdXRkZW50ID0gbmV3IEluZGVudE91dGRlbnQodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGF1bmNoQ2xhc3N9O1xuIiwiaW1wb3J0IFJpYnNXeXNpd3lnVXRpbHMgZnJvbSBcIi4uL1JpYnNXeXNpd3lnVXRpbHNcIjtcblxuY2xhc3MgSXRhbGljIHtcbiAgLyoqXG4gICAqIG1ldGhvZCB0byBpbml0aWFsaXplIEl0YWxpYyBwbHVnaW5cbiAgICogQHBhcmFtIHRvb2xiYXJEaXZcbiAgICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICAgIHRoaXMudG9vbGJhckRpdiA9IHRvb2xiYXJEaXY7XG4gICAgdGhpcy5lZGl0YWJsZURpdiA9IGVkaXRhYmxlRGl2O1xuICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyKCk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFkZCBpdGFsaWMgYnV0dG9uIHRvIHRvb2xiYXJcbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbGJhcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBpdGFsaWNNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgaXRhbGljTWVudS5pZCA9ICdyaWJzLXd5c2l3eWctdG9vbGJhci1pdGFsaWMnO1xuICAgIGl0YWxpY01lbnUuaW5uZXJIVE1MID0gJzxzcGFuIHN0eWxlPVwiZm9udC1zdHlsZTogaXRhbGljXCI+STwvc3Bhbj4nO1xuICAgIGl0YWxpY01lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNldFRleHRUb0l0YWxpYygpKTtcbiAgICBkaXYuYXBwZW5kKGl0YWxpY01lbnUpO1xuICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcHV0IHRleHQgaW4gaXRhbGljXG4gICAqL1xuICBzZXRUZXh0VG9JdGFsaWMoKSB7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2l0YWxpYycpO1xuICAgIHRoaXMuZWRpdGFibGVEaXYuZm9jdXMoKTtcbiAgICBSaWJzV3lzaXd5Z1V0aWxzLnJlZnJlc2hDYXJldExvY2F0aW9uRGl2KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBmdW5jdGlvbiB0byBsb2FkIEl0YWxpYyBjbGFzc1xuICogQHBhcmFtIHRvb2xiYXJEaXZcbiAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbGF1bmNoQ2xhc3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgY29uc3QgaXRhbGljID0gbmV3IEl0YWxpYyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtsYXVuY2hDbGFzc307XG4iLCJpbXBvcnQgUmlic1d5c2l3eWdVdGlscyBmcm9tIFwiLi4vUmlic1d5c2l3eWdVdGlsc1wiO1xuXG5jbGFzcyBKdXN0aWZ5IHtcbiAgLyoqXG4gICAqIG1ldGhvZCB0byBpbml0aWFsaXplIEp1c3RpZnkgcGx1Z2luXG4gICAqIEBwYXJhbSB0b29sYmFyRGl2XG4gICAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnRvb2xiYXJEaXYgPSB0b29sYmFyRGl2O1xuICAgIHRoaXMuZWRpdGFibGVEaXYgPSBlZGl0YWJsZURpdjtcbiAgICB0aGlzLmFkZEJ1dHRvblRvVG9vbGJhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQganVzdGlmeSBidXR0b25zIHRvIHRvb2xiYXJcbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbGJhcigpIHtcbiAgICBjb25zdCBqdXN0aWZ5VHlwZXMgPSBbJ0xlZnQnLCAnQ2VudGVyJywgJ1JpZ2h0JywgJ0Z1bGwnXTtcblxuICAgIGZvciAoY29uc3QganVzdGlmeVR5cGUgb2YganVzdGlmeVR5cGVzKSB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IGp1c3RpZnlNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBqdXN0aWZ5TWVudS5pZCA9IGByaWJzLXd5c2l3eWctdG9vbGJhci1qdXN0aWZ5LSR7anVzdGlmeVR5cGV9YDtcbiAgICAgIGp1c3RpZnlNZW51LmlubmVySFRNTCA9IGp1c3RpZnlUeXBlO1xuICAgICAganVzdGlmeU1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNldFRleHRUb0p1c3RpZnkoanVzdGlmeVR5cGUpKTtcbiAgICAgIGRpdi5hcHBlbmQoanVzdGlmeU1lbnUpO1xuICAgICAgdGhpcy50b29sYmFyRGl2LmFwcGVuZChkaXYpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcHV0IHRleHQgaW4ganVzdGlmeVxuICAgKi9cbiAgc2V0VGV4dFRvSnVzdGlmeShqdXN0aWZ5VHlwZSkge1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKGBqdXN0aWZ5JHtqdXN0aWZ5VHlwZX1gKTtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmZvY3VzKCk7XG4gICAgUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpO1xuICB9XG59XG5cbi8qKlxuICogZnVuY3Rpb24gdG8gbG9hZCBKdXN0aWZ5IGNsYXNzXG4gKiBAcGFyYW0gdG9vbGJhckRpdlxuICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBsYXVuY2hDbGFzcyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICBjb25zdCBqdXN0aWZ5ID0gbmV3IEp1c3RpZnkodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGF1bmNoQ2xhc3N9O1xuIiwiaW1wb3J0IFJpYnNXeXNpd3lnVXRpbHMgZnJvbSBcIi4uL1JpYnNXeXNpd3lnVXRpbHNcIjtcbmltcG9ydCBSaWJzUG9wdXAgZnJvbSBcInJpYnMtcG9wdXAvc291cmNlL2pzL3JpYnMtcG9wdXBcIjtcbmltcG9ydCBSaWJzUG9wdXBDc3MgZnJvbSAncmlicy1wb3B1cC9kaXN0L2Nzcy9zdHlsZS5taW4uY3NzJztcblxuY2xhc3MgTGluayB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBMaW5rIHBsdWdpblxuICAgKiBAcGFyYW0gdG9vbGJhckRpdlxuICAgKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gICAgdGhpcy50b29sYmFyRGl2ID0gdG9vbGJhckRpdjtcbiAgICB0aGlzLmVkaXRhYmxlRGl2ID0gZWRpdGFibGVEaXY7XG4gICAgdGhpcy5yaWJzUG9wdXAgPSBuZXcgUmlic1BvcHVwKCk7XG4gICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIoKTtcblxuICAgIGNvbnN0IGhlYWQgID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTtcbiAgICBjb25zdCBzdHlsZSAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlLmlubmVyVGV4dCA9IFJpYnNQb3B1cENzcy50b1N0cmluZygpO1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgbGluayBidXR0b24gdG8gdG9vbGJhclxuICAgKi9cbiAgYWRkQnV0dG9uVG9Ub29sYmFyKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGxpbmtNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgbGlua01lbnUuaWQgPSAncmlicy13eXNpd3lnLXRvb2xiYXItbGluayc7XG4gICAgbGlua01lbnUuaW5uZXJIVE1MID0gJzxzcGFuPkxpbms8L3NwYW4+JztcbiAgICBsaW5rTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2hvd1BvcHVwKCkpO1xuICAgIGRpdi5hcHBlbmQobGlua01lbnUpO1xuICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY3JlYXRlIGRpdiBmb3IgaW5wdXRzIG9mIHBvcHVwXG4gICAqIEBwYXJhbSBpZFxuICAgKiBAcGFyYW0gbGFiZWxcbiAgICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlSW5wdXRQb3B1cChpZCwgbGFiZWwpIHtcbiAgICBjb25zdCBpbnB1dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGxhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGFiZWxFbGVtZW50LmlubmVyVGV4dCA9IGxhYmVsO1xuICAgIGxhYmVsRWxlbWVudC5mb3IgPSBpZDtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQuaWQgPSBpZDtcbiAgICBpbnB1dC5uYW1lID0gaWQ7XG5cbiAgICBpZiAoaWQgPT09ICdyaWJzLXd5c2l3eWctbGluay10ZXh0Jykge1xuICAgICAgaW5wdXQudmFsdWUgPSBSaWJzV3lzaXd5Z1V0aWxzLmdldFNlbGVjdGlvblRleHQoKTtcbiAgICB9XG5cbiAgICBpbnB1dERpdi5hcHBlbmRDaGlsZChsYWJlbEVsZW1lbnQpO1xuICAgIGlucHV0RGl2LmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgIHJldHVybiBpbnB1dERpdjtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY3JlYXRlIHNldCBjb250ZW50IGRpdlxuICAgKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVDb250ZW50RGl2UG9wdXAoKSB7XG4gICAgY29uc3Qgc2V0Q29udGVudERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHNldENvbnRlbnREaXYuaWQgPSAnc2V0LWNvbnRlbnQnO1xuXG4gICAgY29uc3QgdXJsRGl2ID0gdGhpcy5jcmVhdGVJbnB1dFBvcHVwKCdyaWJzLXd5c2l3eWctbGluay11cmwnLCAnVVJMJyk7XG4gICAgY29uc3QgRGlzcGxheVRleHREaXYgPSB0aGlzLmNyZWF0ZUlucHV0UG9wdXAoJ3JpYnMtd3lzaXd5Zy1saW5rLXRleHQnLCAnVGV4dCB0byBkaXNwbGF5Jyk7XG4gICAgY29uc3QgVGl0bGVEaXYgPSB0aGlzLmNyZWF0ZUlucHV0UG9wdXAoJ3JpYnMtd3lzaXd5Zy1saW5rLXRpdGxlJywgJ1RpdGxlJyk7XG5cbiAgICBzZXRDb250ZW50RGl2LmFwcGVuZENoaWxkKHVybERpdik7XG4gICAgc2V0Q29udGVudERpdi5hcHBlbmRDaGlsZChEaXNwbGF5VGV4dERpdik7XG4gICAgc2V0Q29udGVudERpdi5hcHBlbmRDaGlsZChUaXRsZURpdik7XG5cbiAgICByZXR1cm4gc2V0Q29udGVudERpdjtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY3JlYXRlIGxpbmtzIGRpdlxuICAgKiBAcmV0dXJucyB7SFRNTERpdkVsZW1lbnR9XG4gICAqL1xuICBjcmVhdGVMaW5rc0RpdlBvcHVwKCkge1xuICAgIGNvbnN0IGxpbmtEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBsaW5rRGl2LmNsYXNzTGlzdC5hZGQoJ2xpbmsnKTtcbiAgICBjb25zdCBjYW5jZWxMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGNhbmNlbExpbmsuY2xhc3NMaXN0LmFkZCgnY2FuY2VsJyk7XG4gICAgY2FuY2VsTGluay5kYXRhc2V0LmNsb3NlID0gJyc7XG4gICAgY2FuY2VsTGluay5pbm5lclRleHQgPSAnQ2xvc2UnO1xuICAgIGxpbmtEaXYuYXBwZW5kQ2hpbGQoY2FuY2VsTGluayk7XG4gICAgY29uc3QgdmFsaWRhdGVMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhbGlkYXRlTGluay5jbGFzc0xpc3QuYWRkKCd2YWxpZGF0ZScpO1xuICAgIHZhbGlkYXRlTGluay5kYXRhc2V0LmxpbmtWYWxpZGF0ZSA9ICcnO1xuICAgIHZhbGlkYXRlTGluay5pbm5lclRleHQgPSAnVmFsaWRhdGUnO1xuICAgIGxpbmtEaXYuYXBwZW5kQ2hpbGQodmFsaWRhdGVMaW5rKTtcblxuICAgIHJldHVybiBsaW5rRGl2O1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBjcmVhdGUgcG9wdXAgZWxlbWVudCBhbmQgYXBwZW5kIGl0IHRvIHRoZSBkb21cbiAgICovXG4gIGNyZWF0ZVBvcHVwKCkge1xuICAgIGNvbnN0IHBvcHVwRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcG9wdXBEaXYuaWQgPSAncmlicy13eXNpd3lnLWxpbmstcG9wdXAnO1xuICAgIHBvcHVwRGl2LmNsYXNzTGlzdC5hZGQoJ3JpYnMtcG9wdXAnKTtcblxuICAgIGNvbnN0IGNvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb250ZW50RGl2LmNsYXNzTGlzdC5hZGQoJ2NvbnRlbnQnKTtcblxuICAgIGNvbnN0IHNldENvbnRlbnREaXYgPSB0aGlzLmNyZWF0ZUNvbnRlbnREaXZQb3B1cCgpO1xuICAgIGNvbnN0IGxpbmtEaXYgPSB0aGlzLmNyZWF0ZUxpbmtzRGl2UG9wdXAoKTtcblxuICAgIGNvbnN0IGNsZWFyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2xlYXJEaXYuY2xhc3NMaXN0LmFkZCgnY2xlYXInKTtcblxuICAgIGNvbnRlbnREaXYuYXBwZW5kQ2hpbGQoc2V0Q29udGVudERpdik7XG4gICAgY29udGVudERpdi5hcHBlbmRDaGlsZChsaW5rRGl2KTtcbiAgICBjb250ZW50RGl2LmFwcGVuZENoaWxkKGNsZWFyRGl2KTtcbiAgICBwb3B1cERpdi5hcHBlbmRDaGlsZChjb250ZW50RGl2KTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLWNvbnRhaW5lcicpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy1jb250YWluZXInKSA6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctZWRpdGFibGVEaXYtY3VycmVudCcpLnBhcmVudEVsZW1lbnQgO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChwb3B1cERpdik7XG5cbiAgICB0aGlzLnBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy1saW5rLXBvcHVwJyk7XG4gICAgdGhpcy5hZGRFdmVudHNPbklucHV0cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBzaG93IHBvcHVwXG4gICAqL1xuICBzaG93UG9wdXAoKSB7XG4gICAgdGhpcy5zZWxlY3Rpb24gPSBSaWJzV3lzaXd5Z1V0aWxzLnNhdmVTZWxlY3Rpb24oKTtcbiAgICB0aGlzLmNyZWF0ZVBvcHVwKCk7XG4gICAgdGhpcy5yaWJzUG9wdXAub3BlbkpzUG9wdXAoJ3JpYnMtd3lzaXd5Zy1saW5rLXBvcHVwJyk7XG5cbiAgICBjb25zdCBkYXRhVmFsaWRhdGUgPSB0aGlzLnBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLWxpbmstdmFsaWRhdGVdJyk7XG5cbiAgICBpZiAoZGF0YVZhbGlkYXRlLmxlbmd0aCA+IDApIHtcbiAgICAgIEFycmF5LmZyb20oZGF0YVZhbGlkYXRlKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHRoaXMuYWRkRXZlbnRWYWxpZGF0ZSgpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgZXZlbnQgb24gaW5wdXQgZm9yIHVybCBhbmQgdGV4dC4gSWYgZW50ZXIgdGV4dCBpbiB1cmxcbiAgICogaXQgaXMgZHVwbGljYXRlZCBpbiB0ZXh0IGlucHV0IGlmIGVtcHR5XG4gICAqL1xuICBhZGRFdmVudHNPbklucHV0cygpIHtcbiAgICBjb25zdCBpbnB1dFVybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctbGluay11cmwnKTtcbiAgICBjb25zdCBpbnB1dFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLWxpbmstdGV4dCcpO1xuICAgIGxldCBudWxsVGV4dCA9IGZhbHNlO1xuXG4gICAgaW5wdXRVcmwuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChpbnB1dFRleHQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgIG51bGxUZXh0ID0gdHJ1ZVxuICAgICAgfVxuICAgICAgaWYgKG51bGxUZXh0KSB7XG4gICAgICAgIGlucHV0VGV4dC52YWx1ZSA9IGlucHV0VXJsLnZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaW5wdXRUZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoaW5wdXRUZXh0LnZhbHVlICE9PSBpbnB1dFVybC52YWx1ZSkge1xuICAgICAgICBudWxsVGV4dCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBwdXQgdGV4dCBpbiBsaW5rXG4gICAqL1xuICBhZGRFdmVudFZhbGlkYXRlKCkge1xuICAgIGNvbnN0IHVybCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctbGluay11cmwnKS52YWx1ZTtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy1saW5rLXRleHQnKS52YWx1ZTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctbGluay10aXRsZScpLnZhbHVlO1xuXG4gICAgaWYgKCF1cmwpIHtcbiAgICAgIHRoaXMucmlic1BvcHVwLmNsb3NlUG9wdXAoZXZlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBSaWJzV3lzaXd5Z1V0aWxzLnJlc3RvcmVTZWxlY3Rpb24odGhpcy5zZWxlY3Rpb24pO1xuICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NyZWF0ZUxpbmsnLCBmYWxzZSwgdXJsKTtcbiAgICAgIHRoaXMucmlic1BvcHVwLmNsb3NlUG9wdXAoZXZlbnQpO1xuICAgIH1cblxuICAgIHRoaXMuZWRpdGFibGVEaXYuZm9jdXMoKTtcbiAgICBSaWJzV3lzaXd5Z1V0aWxzLnJlZnJlc2hDYXJldExvY2F0aW9uRGl2KCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5wb3B1cC5pZCkucmVtb3ZlKCk7XG5cbiAgICB0aGlzLmNoYW5nZVZhbHVlc09mTGluayh0ZXh0LCB0aXRsZSk7XG4gIH1cblxuICAvKipcbiAgICogYWRkIG1ldGhvZCB0byBkZWZpbmUgdGV4dCwgaWQgYW5kIHRpdGxlIG9mIGxpbmtcbiAgICogQHBhcmFtIHRleHRcbiAgICogQHBhcmFtIHRpdGxlXG4gICAqL1xuICBjaGFuZ2VWYWx1ZXNPZkxpbmsodGV4dCwgdGl0bGUpIHtcbiAgICBjb25zdCBpZCA9ICdyaWJzLXd5c2l3eWctYS1udW1iZXItJztcbiAgICBsZXQgbnVtYmVyID0gdGhpcy5lZGl0YWJsZURpdi5xdWVyeVNlbGVjdG9yQWxsKCdhJykubGVuZ3RoICsgMTtcblxuICAgIHRoaXMuZWRpdGFibGVEaXYucXVlcnlTZWxlY3RvckFsbCgnYScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgIGlmIChlbGVtZW50LmlkID09PSB1bmRlZmluZWQgfHwgZWxlbWVudC5pZCA9PT0gJycpIHtcbiAgICAgICAgZWxlbWVudC5pZCA9IGAke2lkfSR7bnVtYmVyfWA7XG4gICAgICAgIGVsZW1lbnQuaW5uZXJUZXh0ID0gdGV4dDtcbiAgICAgICAgZWxlbWVudC50aXRsZSA9IHRpdGxlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogZnVuY3Rpb24gdG8gbG9hZCBMaW5rIGNsYXNzXG4gKiBAcGFyYW0gdG9vbGJhckRpdlxuICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBsYXVuY2hDbGFzcyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICBjb25zdCBsaW5rID0gbmV3IExpbmsodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGF1bmNoQ2xhc3N9O1xuIiwiaW1wb3J0IFJpYnNXeXNpd3lnVXRpbHMgZnJvbSBcIi4uL1JpYnNXeXNpd3lnVXRpbHNcIjtcblxuY2xhc3MgTGlzdHMge1xuICAvKipcbiAgICogbWV0aG9kIHRvIGluaXRpYWxpemUgTGlzdHMgcGx1Z2luXG4gICAqIEBwYXJhbSB0b29sYmFyRGl2XG4gICAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnRvb2xiYXJEaXYgPSB0b29sYmFyRGl2O1xuICAgIHRoaXMuZWRpdGFibGVEaXYgPSBlZGl0YWJsZURpdjtcbiAgICB0aGlzLmFkZEJ1dHRvblRvVG9vbGJhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgbGlzdHMgYnV0dG9uIHRvIHRvb2xiYXJcbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbGJhcigpIHtcbiAgICBjb25zdCBsaXN0cyA9IFsnT3JkZXJlZExpc3QnLCAnVW5vcmRlcmVkTGlzdCddO1xuXG4gICAgZm9yIChjb25zdCBsaXN0VHlwZSBvZiBsaXN0cykge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBpbmRlbnRNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBpbmRlbnRNZW51LmlkID0gYHJpYnMtd3lzaXd5Zy10b29sYmFyLWxpc3RzLSR7bGlzdFR5cGV9YDtcbiAgICAgIGluZGVudE1lbnUuaW5uZXJIVE1MID0gbGlzdFR5cGU7XG4gICAgICBpbmRlbnRNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jcmVhdGVMaXN0cyhsaXN0VHlwZSkpO1xuICAgICAgZGl2LmFwcGVuZChpbmRlbnRNZW51KTtcbiAgICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIGNyZWF0ZSBsaXN0IGVsZW1lbnRcbiAgICovXG4gIGNyZWF0ZUxpc3RzKGxpc3RUeXBlKSB7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoYGluc2VydCR7bGlzdFR5cGV9YCk7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5mb2N1cygpO1xuICAgIFJpYnNXeXNpd3lnVXRpbHMucmVmcmVzaENhcmV0TG9jYXRpb25EaXYoKTtcbiAgfVxufVxuXG4vKipcbiAqIGZ1bmN0aW9uIHRvIGxvYWQgTGlzdHMgY2xhc3NcbiAqIEBwYXJhbSB0b29sYmFyRGl2XG4gKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGxhdW5jaENsYXNzKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gIGNvbnN0IGxpc3RzID0gbmV3IExpc3RzKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2xhdW5jaENsYXNzfTtcbiIsImltcG9ydCBSaWJzV3lzaXd5Z1V0aWxzIGZyb20gXCIuLi9SaWJzV3lzaXd5Z1V0aWxzXCI7XG5cbmNsYXNzIFN0cmlrZXRocm91Z2gge1xuICAvKipcbiAgICogbWV0aG9kIHRvIGluaXRpYWxpemUgU3RyaWtldGhyb3VnaCBwbHVnaW5cbiAgICogQHBhcmFtIHRvb2xiYXJEaXZcbiAgICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICAgIHRoaXMudG9vbGJhckRpdiA9IHRvb2xiYXJEaXY7XG4gICAgdGhpcy5lZGl0YWJsZURpdiA9IGVkaXRhYmxlRGl2O1xuICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyKCk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFkZCBzdHJpa2V0aHJvdWdoIGJ1dHRvbiB0byB0b29sYmFyXG4gICAqL1xuICBhZGRCdXR0b25Ub1Rvb2xiYXIoKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3Qgc3RyaWtldGhyb3VnaE1lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdHJpa2V0aHJvdWdoTWVudS5pZCA9ICdyaWJzLXd5c2l3eWctdG9vbGJhci1zdHJpa2V0aHJvdWdoJztcbiAgICBzdHJpa2V0aHJvdWdoTWVudS5pbm5lckhUTUwgPSAnPHNwYW4gc3R5bGU9XCJ0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaFwiPlM8L3NwYW4+JztcbiAgICBzdHJpa2V0aHJvdWdoTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2V0VGV4dFRvU3RyaWtldGhyb3VnaCgpKTtcbiAgICBkaXYuYXBwZW5kKHN0cmlrZXRocm91Z2hNZW51KTtcbiAgICB0aGlzLnRvb2xiYXJEaXYuYXBwZW5kKGRpdik7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHB1dCB0ZXh0IGluIHN0cmlrZXRocm91Z2hcbiAgICovXG4gIHNldFRleHRUb1N0cmlrZXRocm91Z2goKSB7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ3N0cmlrZXRocm91Z2gnKTtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmZvY3VzKCk7XG4gICAgUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpO1xuICB9XG59XG5cbi8qKlxuICogZnVuY3Rpb24gdG8gbG9hZCBTdHJpa2V0aHJvdWdoIGNsYXNzXG4gKiBAcGFyYW0gdG9vbGJhckRpdlxuICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBsYXVuY2hDbGFzcyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICBjb25zdCBzdHJpa2V0aHJvdWdoID0gbmV3IFN0cmlrZXRocm91Z2godG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGF1bmNoQ2xhc3N9O1xuIiwiaW1wb3J0IFJpYnNXeXNpd3lnVXRpbHMgZnJvbSBcIi4uL1JpYnNXeXNpd3lnVXRpbHNcIjtcblxuY2xhc3MgVW5kZXJsaW5lIHtcbiAgLyoqXG4gICAqIG1ldGhvZCB0byBpbml0aWFsaXplIFVuZGVybGluZSBwbHVnaW5cbiAgICogQHBhcmFtIHRvb2xiYXJEaXZcbiAgICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICAgIHRoaXMudG9vbGJhckRpdiA9IHRvb2xiYXJEaXY7XG4gICAgdGhpcy5lZGl0YWJsZURpdiA9IGVkaXRhYmxlRGl2O1xuICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyKCk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFkZCB1bmRlcmxpbmUgYnV0dG9uIHRvIHRvb2xiYXJcbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbGJhcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCB1bmRlcmxpbmVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgdW5kZXJsaW5lTWVudS5pZCA9ICdyaWJzLXd5c2l3eWctdG9vbGJhci11bmRlcmxpbmUnO1xuICAgIHVuZGVybGluZU1lbnUuaW5uZXJIVE1MID0gJzxzcGFuIHN0eWxlPVwidGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmVcIj5VPC9zcGFuPic7XG4gICAgdW5kZXJsaW5lTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2V0VGV4dFRvVW5kZXJsaW5lKCkpO1xuICAgIGRpdi5hcHBlbmQodW5kZXJsaW5lTWVudSk7XG4gICAgdGhpcy50b29sYmFyRGl2LmFwcGVuZChkaXYpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBwdXQgdGV4dCBpbiB1bmRlcmxpbmVcbiAgICovXG4gIHNldFRleHRUb1VuZGVybGluZSgpIHtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgndW5kZXJsaW5lJyk7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5mb2N1cygpO1xuICAgIFJpYnNXeXNpd3lnVXRpbHMucmVmcmVzaENhcmV0TG9jYXRpb25EaXYoKTtcbiAgfVxufVxuXG4vKipcbiAqIGZ1bmN0aW9uIHRvIGxvYWQgVW5kZXJsaW5lIGNsYXNzXG4gKiBAcGFyYW0gdG9vbGJhckRpdlxuICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBsYXVuY2hDbGFzcyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICBjb25zdCB1bmRlcmxpbmUgPSBuZXcgVW5kZXJsaW5lKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2xhdW5jaENsYXNzfTtcbiIsImltcG9ydCBSaWJzV3lzaXd5Z1V0aWxzIGZyb20gXCIuLi9SaWJzV3lzaXd5Z1V0aWxzXCI7XG5cbmNsYXNzIFVuZG9SZWRvIHtcbiAgLyoqXG4gICAqIG1ldGhvZCB0byBpbml0aWFsaXplIFVuZG9SZWRvIHBsdWdpblxuICAgKiBAcGFyYW0gdG9vbGJhckRpdlxuICAgKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gICAgdGhpcy50b29sYmFyRGl2ID0gdG9vbGJhckRpdjtcbiAgICB0aGlzLmVkaXRhYmxlRGl2ID0gZWRpdGFibGVEaXY7XG4gICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIoKTtcbiAgICB0aGlzLmFkZFVuZG9FdmVudExpc3RlbmVyKCk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFkZCB1bmRvUmVkbyBidXR0b24gdG8gdG9vbGJhclxuICAgKi9cbiAgYWRkQnV0dG9uVG9Ub29sYmFyKCkge1xuICAgIGNvbnN0IHVuZG9zID0gWydVbmRvJywgJ1JlZG8nXTtcblxuICAgIGZvciAoY29uc3QgdW5kb1R5cGUgb2YgdW5kb3MpIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgdW5kb01lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIHVuZG9NZW51LmlkID0gYHJpYnMtd3lzaXd5Zy10b29sYmFyLXVuZG9SZWRvLSR7dW5kb1R5cGV9YDtcbiAgICAgIHVuZG9NZW51LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICB1bmRvTWVudS5pbm5lckhUTUwgPSB1bmRvVHlwZTtcbiAgICAgIHVuZG9NZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLnVuZG9SZWRvKGV2ZW50LCB1bmRvVHlwZSkpO1xuICAgICAgZGl2LmFwcGVuZCh1bmRvTWVudSk7XG4gICAgICB0aGlzLnRvb2xiYXJEaXYuYXBwZW5kKGRpdik7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCd1bmRvQ291bnQnKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oJ3JlZG9Db3VudCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcHV0IHRleHQgaW4gdW5kb1JlZG8gYW5kIGRpc2FibGVkIG9yIGVuYWJsZSBidXR0b24gaW4gdG9vbGJhclxuICAgKi9cbiAgdW5kb1JlZG8oZXZlbnQsIHVuZG9UeXBlKSB7XG4gICAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh1bmRvVHlwZSA9PT0gJ1VuZG8nKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1bmRvQ291bnQnLCBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1bmRvQ291bnQnKSkgLSAxKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JlZG9Db3VudCcsIHBhcnNlSW50KChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyZWRvQ291bnQnKSA/IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3JlZG9Db3VudCcpIDogMCkpICsgMSk7XG4gICAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndW5kb0NvdW50JykpID09PSAwKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3JlZG9Db3VudCcpKSA+IDApIHtcbiAgICAgICAgY29uc3QgcmVkb01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLXRvb2xiYXItdW5kb1JlZG8tUmVkbycpO1xuICAgICAgICByZWRvTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh1bmRvVHlwZSA9PT0gJ1JlZG8nKSB7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZWRvQ291bnQnLCBwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyZWRvQ291bnQnKSkgLSAxKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VuZG9Db3VudCcsIHBhcnNlSW50KChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1bmRvQ291bnQnKSA/IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VuZG9Db3VudCcpIDogMCkpICsgMSk7XG4gICAgICBpZiAocGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncmVkb0NvdW50JykpID09PSAwKSB7XG4gICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VuZG9Db3VudCcpKSA+IDApIHtcbiAgICAgICAgY29uc3QgcmVkb01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLXRvb2xiYXItdW5kb1JlZG8tVW5kbycpO1xuICAgICAgICByZWRvTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKHVuZG9UeXBlKTtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmZvY3VzKCk7XG4gICAgUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgZXZlbnQgbGlzdGVuZXIgb24ga2V5ZG93biB0byBzdG9yZSB2YWx1ZSBpbiBzZXNzaW9uU3RvcmFnZSBvZiByZWRvIGFuZCB1bmRvIGNvdW50XG4gICAqL1xuICBhZGRVbmRvRXZlbnRMaXN0ZW5lcigpIHtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoKSA9PiB7XG4gICAgICBjb25zdCB1bmRvVmFsdWUgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1bmRvQ291bnQnKTtcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3VuZG9Db3VudCcsIHBhcnNlSW50KHVuZG9WYWx1ZSA/IHVuZG9WYWx1ZSA6IDApICsgMSk7XG4gICAgICBcbiAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3JlZG9Db3VudCcsIDApO1xuICAgICAgY29uc3QgcmVkb01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLXRvb2xiYXItdW5kb1JlZG8tUmVkbycpO1xuICAgICAgcmVkb01lbnUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcblxuICAgICAgaWYgKHVuZG9WYWx1ZSkge1xuICAgICAgICBjb25zdCB1bmRvTWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctdG9vbGJhci11bmRvUmVkby1VbmRvJyk7XG4gICAgICAgIHVuZG9NZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBmdW5jdGlvbiB0byBsb2FkIFVuZG9SZWRvIGNsYXNzXG4gKiBAcGFyYW0gdG9vbGJhckRpdlxuICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBsYXVuY2hDbGFzcyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICBjb25zdCB1bmRvUmVkbyA9IG5ldyBVbmRvUmVkbyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtsYXVuY2hDbGFzc307XG4iLCJpbXBvcnQgUmlic1d5c2l3eWdVdGlscyBmcm9tICcuL1JpYnNXeXNpd3lnVXRpbHMnXG5cbmNsYXNzIFJpYnNXeXNpd3lnIHtcbiAgLyoqXG4gICAqIG1ldGhvZCB0byBsYXVuY2ggY29uc3RydWN0aW9uIGF1IGVkaXRvclxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgaWYgKCFvcHRpb25zLnNlbGVjdG9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdTZWxlY3RvciBpcyBtYW5kYXRvcnknKTtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKCFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9wdGlvbnMuc2VsZWN0b3IpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdTZWxlY3RvciBjYW5cXCd0IGJlIGZvdW5kIGluIGRvY3VtZW50Jyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5kZWZpbmVPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMubW9kZSAmJiBvcHRpb25zLm1vZGUgPT09ICdpbmxpbmUnKSB7XG4gICAgICB0aGlzLmluaXRXeXNpd3lnSW5saW5lRGl2cygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnNlbGVjdG9yKTtcbiAgICAgIHRoaXMuaW5pdFd5c2l3eWdEaXZzKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBkZWZpbmVkIG9wdGlvbnMgb2Ygd3lzaXd5Z1xuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgZGVmaW5lT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zLmhlaWdodCkge1xuICAgICAgb3B0aW9ucy5oZWlnaHQgPSAnMjAwcHgnO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy5tb2RlKSB7XG4gICAgICBvcHRpb25zLm1vZGUgPSAnc3RhbmRhcmQnO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9ucy50b29sYmFyKSB7XG4gICAgICBvcHRpb25zLnRvb2xiYXIgPSBbJ1VuZG9SZWRvJywgJ3wnLCAnSnVzdGlmeScsICd8JywgJ0luZGVudE91dGRlbnQnLCAnfCcsICAnTGlzdHMnLCAnfCcsICdCb2xkJywgJ0l0YWxpYycsICdVbmRlcmxpbmUnLCAnU3RyaWtldGhyb3VnaCcsICd8JywgJ0ZvbnRTaXplJywgJ0Jsb2NrcycsICd8JywgJ0xpbmsnXTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy50b29sYmFyID0gb3B0aW9ucy50b29sYmFyLnNwbGl0KCcgJyk7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBpbml0IHd5c2l3eWcgZGl2XG4gICAqL1xuICBpbml0V3lzaXd5Z0RpdnMoKSB7XG4gICAgdGhpcy5zZWxlY3Rvci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgY29uc3Qgd3lzaXd5Z0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHd5c2l3eWdEaXYuaWQgPSAncmlicy13eXNpd3lnLWNvbnRhaW5lcic7XG4gICAgdGhpcy5zZWxlY3Rvci5wYXJlbnROb2RlLnByZXBlbmQod3lzaXd5Z0Rpdik7XG5cbiAgICBjb25zdCBlZGl0YWJsZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGVkaXRhYmxlRGl2LmlkID0gJ3JpYnMtd3lzaXd5Zy1lZGl0YWJsZSc7XG4gICAgd3lzaXd5Z0Rpdi5hcHBlbmQoZWRpdGFibGVEaXYpO1xuICAgIGVkaXRhYmxlRGl2LnN0eWxlLmhlaWdodCA9IE51bWJlci5pc0ludGVnZXIodGhpcy5vcHRpb25zLmhlaWdodCkgPyBgJHt0aGlzLm9wdGlvbnMuaGVpZ2h0fXB4YCA6IHRoaXMub3B0aW9ucy5oZWlnaHQ7XG4gICAgZWRpdGFibGVEaXYuY29udGVudEVkaXRhYmxlID0gdHJ1ZTtcblxuICAgIGNvbnN0IGNhcmV0TG9jYXRpb25EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjYXJldExvY2F0aW9uRGl2LmlkID0gJ3JpYnMtd3lzaXd5Zy1jYXJldC1sb2NhdGlvbic7XG4gICAgd3lzaXd5Z0Rpdi5hcHBlbmQoY2FyZXRMb2NhdGlvbkRpdik7XG5cbiAgICB0aGlzLmFkZEV2ZW50c0xpc3RlbmVyc0VkaXRhYmxlRGl2KHd5c2l3eWdEaXYsIGVkaXRhYmxlRGl2KTtcbiAgICBlZGl0YWJsZURpdi5pbm5lckhUTUwgPSB0aGlzLnNlbGVjdG9yLnZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBpbml0aWFsaXNlIGlubGluZSB3eXNpd3lnIGVkaXRvclxuICAgKi9cbiAgaW5pdFd5c2l3eWdJbmxpbmVEaXZzKCkge1xuICAgIGNvbnN0IHNlbGVjdG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5vcHRpb25zLnNlbGVjdG9yKTtcblxuICAgIHNlbGVjdG9ycy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IHRydWU7XG4gICAgICB0aGlzLmFkZEV2ZW50c0xpc3RlbmVyc0VkaXRhYmxlRGl2KGVsZW1lbnQsIGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgZXZlbnQgbGlzdGVuZXIgb24gZWRpdGFibGUgZGl2XG4gICAqIEBwYXJhbSB3eXNpd3lnRGl2XG4gICAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICAgKi9cbiAgYWRkRXZlbnRzTGlzdGVuZXJzRWRpdGFibGVEaXYod3lzaXd5Z0RpdiwgZWRpdGFibGVEaXYpIHtcbiAgICBlZGl0YWJsZURpdi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZihldmVudC5rZXlDb2RlID09PSAxMyAmJiAhZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2RlZmF1bHRQYXJhZ3JhcGhTZXBhcmF0b3InLCBmYWxzZSwgJ3AnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5vcHRpb25zLm1vZGUgPT09ICdzdGFuZGFyZCcgPyBSaWJzV3lzaXd5Z1V0aWxzLnJlZnJlc2hDYXJldExvY2F0aW9uRGl2KCkgOiBudWxsO1xuICAgIH0pO1xuXG4gICAgZWRpdGFibGVEaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBjb25zdCBjYXJldFBvc2l0aW9uID0gUmlic1d5c2l3eWdVdGlscy5nZXRDYXJldFBvc2l0aW9uKCk7XG4gICAgICBjb25zdCBsYXN0UG9zaXRpb24gPSBjYXJldFBvc2l0aW9uW2NhcmV0UG9zaXRpb24ubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmIChsYXN0UG9zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnZm9ybWF0QmxvY2snLCBmYWxzZSwgJ3AnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5tb2RlID09PSAnaW5saW5lJykge1xuICAgICAgICBpZiAoZWRpdGFibGVEaXYuaWQgIT09ICdyaWJzLXd5c2l3eWctZWRpdGFibGVEaXYtY3VycmVudCcgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy10b29sYmFyJykpIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLXRvb2xiYXInKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLm1vZGUgPT09ICdpbmxpbmUnICYmICFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLXRvb2xiYXInKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50RWRpdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLWVkaXRhYmxlRGl2LWN1cnJlbnQnKTtcbiAgICAgICAgY3VycmVudEVkaXRhYmxlID8gY3VycmVudEVkaXRhYmxlLnJlbW92ZUF0dHJpYnV0ZSgnaWQnKSA6IG51bGw7XG4gICAgICAgIGVkaXRhYmxlRGl2LmlkID0gJ3JpYnMtd3lzaXd5Zy1lZGl0YWJsZURpdi1jdXJyZW50JztcbiAgICAgICAgdGhpcy5pbml0VG9vbGJhcih3eXNpd3lnRGl2LCBlZGl0YWJsZURpdiwgJ2lubGluZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMub3B0aW9ucy5tb2RlID09PSAnaW5saW5lJykge1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRUb29sYmFyKHd5c2l3eWdEaXYsIGVkaXRhYmxlRGl2KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGluaXQgdG9vbGJhclxuICAgKi9cbiAgaW5pdFRvb2xiYXIod3lzaXd5Z0RpdiwgZWRpdGFibGVEaXYsIG1vZGUgPSBudWxsKSB7XG4gICAgY29uc3QgdG9vbGJhckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRvb2xiYXJEaXYuaWQgPSAncmlicy13eXNpd3lnLXRvb2xiYXInO1xuICAgIGlmIChtb2RlID09PSBudWxsKSB7XG4gICAgICB3eXNpd3lnRGl2LnByZXBlbmQodG9vbGJhckRpdilcbiAgICB9IGVsc2Uge1xuICAgICAgdG9vbGJhckRpdi5jbGFzc0xpc3QuYWRkKCdpbmxpbmUnKTtcbiAgICAgIGNvbnN0IHBhcmVudERpdiA9IHd5c2l3eWdEaXYucGFyZW50RWxlbWVudDtcbiAgICAgIHBhcmVudERpdi5pbnNlcnRCZWZvcmUodG9vbGJhckRpdiwgd3lzaXd5Z0Rpdik7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcGx1Z2luIG9mIHRoaXMub3B0aW9ucy50b29sYmFyKSB7XG4gICAgICBjb25zb2xlLmxvZyhwbHVnaW4pO1xuICAgICAgaWYgKHBsdWdpbiA9PT0gJ3wnKSB7XG4gICAgICAgIGNvbnN0IGJvbGRNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJvbGRNZW51LmNsYXNzTGlzdC5hZGQoJ3JpYnMtd3lzaXd5Zy10b29sYmFyLXNlcGFyYXRvcicpO1xuICAgICAgICB0b29sYmFyRGl2LmFwcGVuZChib2xkTWVudSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAocmVxdWlyZShgLi9QbHVnaW5zLyR7cGx1Z2lufS5qc2ApKS5kZWZhdWx0LmxhdW5jaENsYXNzKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSaWJzV3lzaXd5ZztcbiIsImNsYXNzIFJpYnNXeXNpd3lnVXRpbHMge1xuICAvKipcbiAgICogbWV0aG9kIHRvIGdldCBjdXJyZW50IHRhcmdldCBwb3NpdGlvbiBhcyBhcnJheVxuICAgKiBAcmV0dXJucyB7YXJyYXl9XG4gICAqL1xuICBzdGF0aWMgZ2V0Q2FyZXRQb3NpdGlvbigpIHtcbiAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZSkge1xuICAgICAgY29uc3QgZWRpdGFibGVEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLWVkaXRhYmxlJyk7XG4gICAgICBsZXQgZWxlbWVudCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlO1xuICAgICAgY29uc3QgYnJlYWRjcnVtYnMgPSBbXTtcblxuICAgICAgZm9yICggOyBlbGVtZW50ICYmIGVsZW1lbnQgIT09IGVkaXRhYmxlRGl2OyBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICAgIGlmIChlbGVtZW50LnRhZ05hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJyZWFkY3J1bWJzLnB1c2goZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYnJlYWRjcnVtYnMucmV2ZXJzZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gZ2V0IGN1cnJlbnQgdGFyZ2V0IHBvc2l0aW9uIGFzIHN0cmluZ1xuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldENhcmV0UG9zaXRpb25Bc1N0cmluZygpIHtcbiAgICBjb25zdCBhcnJheUNhcmV0ID0gdGhpcy5nZXRDYXJldFBvc2l0aW9uKCk7XG5cbiAgICBpZiAoYXJyYXlDYXJldC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBhcnJheUNhcmV0LmpvaW4oJyA+ICcpO1xuICAgIH1cblxuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcmVmcmVzaCBjYXJldCBsb2NhdGlvbiBkaXYgY29udGVudFxuICAgKi9cbiAgc3RhdGljIHJlZnJlc2hDYXJldExvY2F0aW9uRGl2KCkge1xuICAgIGNvbnN0IGNhcmV0TG9jYXRpb25EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLWNhcmV0LWxvY2F0aW9uJyk7XG4gICAgaWYgKGNhcmV0TG9jYXRpb25EaXYpIHtcbiAgICAgIGNhcmV0TG9jYXRpb25EaXYuaW5uZXJIVE1MID0gUmlic1d5c2l3eWdVdGlscy5nZXRDYXJldFBvc2l0aW9uQXNTdHJpbmcoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogc2F2ZSBjdXJyZW50IHNlbGVjdGlvbiBvZiBjb250ZW50biBlZGl0YWJsZVxuICAgKiBAcmV0dXJucyB7bnVsbHxbXXxSYW5nZX1cbiAgICovXG4gIHN0YXRpYyBzYXZlU2VsZWN0aW9uKCkge1xuICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICBpZiAoc2VsZWN0aW9uLmdldFJhbmdlQXQgJiYgc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcbiAgICAgICAgY29uc3QgcmFuZ2VzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBzZWxlY3Rpb24ucmFuZ2VDb3VudDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgcmFuZ2VzLnB1c2goc2VsZWN0aW9uLmdldFJhbmdlQXQoaSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByYW5nZXM7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIHJlc3RvcmUgYSBnaXZlbiBzZWxlY3Rpb25cbiAgICogQHBhcmFtIGN1cnJlbnRTZWxlY3Rpb25cbiAgICovXG4gIHN0YXRpYyByZXN0b3JlU2VsZWN0aW9uKGN1cnJlbnRTZWxlY3Rpb24pIHtcbiAgICBpZiAoY3VycmVudFNlbGVjdGlvbikge1xuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBjdXJyZW50U2VsZWN0aW9uLmxlbmd0aDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgc2VsZWN0aW9uLmFkZFJhbmdlKGN1cnJlbnRTZWxlY3Rpb25baV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LnNlbGVjdGlvbiAmJiBjdXJyZW50U2VsZWN0aW9uLnNlbGVjdCkge1xuICAgICAgICBjdXJyZW50U2VsZWN0aW9uLnNlbGVjdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gZ2V0IGN1cnJlbnQgdGV4dCBzZWxlY3RlZCBpbiBjb250ZW50ZWRpdGFibGUgZGl2XG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBzdGF0aWMgZ2V0U2VsZWN0aW9uVGV4dCgpIHtcbiAgICBsZXQgdGV4dCA9ICcnO1xuICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICB0ZXh0ID0gd2luZG93LmdldFNlbGVjdGlvbigpLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgZG9jdW1lbnQuc2VsZWN0aW9uLnR5cGUgIT0gXCJDb250cm9sXCIpIHtcbiAgICAgIHRleHQgPSBkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0O1xuICAgIH1cbiAgICByZXR1cm4gdGV4dDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSaWJzV3lzaXd5Z1V0aWxzO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==