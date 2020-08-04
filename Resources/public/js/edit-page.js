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
  selector: '#ribs-wysiwyg',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcGFnZS9lZGl0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXBvcHVwL2Rpc3QvY3NzL3N0eWxlLm1pbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtcG9wdXAvbm9kZV9tb2R1bGVzL3JpYnMtY29yZS9SaWJzQ29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy1wb3B1cC9zb3VyY2UvanMvcmlicy1wb3B1cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zIHN5bmMgXlxcLlxcLy4qXFwuanMkIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvQmxvY2tzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvQm9sZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0ZvbnRTaXplLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvSW5kZW50T3V0ZGVudC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0l0YWxpYy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0p1c3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9MaW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvTGlzdHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9TdHJpa2V0aHJvdWdoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvVW5kZXJsaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvVW5kb1JlZG8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUmlic1d5c2l3eWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUmlic1d5c2l3eWdVdGlscy5qcyJdLCJuYW1lcyI6WyJ3eXNpd3lnIiwic2VsZWN0b3IiLCJoZWlnaHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxJQUFNQSxPQUFPLEdBQUcseURBQWdCO0FBQzlCQyxVQUFRLEVBRHNCO0FBRTlCQyxRQUFNLEVBQUU7QUFGc0IsQ0FBaEIsQ0FBaEIsQzs7Ozs7Ozs7Ozs7QUNGQSx1Qzs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0MsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsV0FBVyxp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Ozs7QUNoRDdCO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUIsU0FBUztBQUNoQyx3QkFBd0IsU0FBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLGdFQUFDLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7OztBQzlIN0I7QUFBQTtBQUFtRDs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCxXQUFXO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsb0NBQW9DO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxZQUFZO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxZQUFZO0FBQ3JFO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsK0VBQWdCLEVBQUMiLCJmaWxlIjoianMvZWRpdC1wYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJpYnNXeXNpd3lnIGZyb20gXCJyaWJzLXd5c2l3eWdcIjtcblxuY29uc3Qgd3lzaXd5ZyA9IG5ldyBSaWJzV3lzaXd5Zyh7XG4gIHNlbGVjdG9yOiAnI3JpYnMtd3lzaXd5ZycsXG4gIGhlaWdodDogNDAwLFxufSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJjbGFzcyBSaWJzQ29yZSB7XHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcmV0dXJucyB7TnVtYmVyfVxyXG4gICAqIGZ1bmN0aW9uIHRoYXQgcmV0dXJuIGhlaWdodCBvZiBhbiBlbGVtZW50IHRoYXQgaXMgbm8gZGlzcGxheWVkXHJcbiAgICovXHJcbiAgc3RhdGljIGdldEhlaWdodChlbGVtZW50KSB7XHJcbiAgICAvL2lmIG1heCBoZWlnaCBnZXQgdmFsdWUgYW5kIGRlbGV0ZSBpZiBmb3IgYSBtb21lbnRcclxuICAgIGNvbnN0IG1heEhlaWdodCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpLmdldFByb3BlcnR5VmFsdWUoJ21heC1oZWlnaHQnKTtcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9ICdpbmhlcml0JztcclxuICAgIH1cclxuXHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG5cclxuICAgIGxldCBoZWlnaHQgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdoZWlnaHQnKSk7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnJztcclxuXHJcbiAgICBpZiAobWF4SGVpZ2h0ICE9PSBcIm5vbmVcIikge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IG1heEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gZHVyYXRpb25cclxuICAgKiB0aGlzIG1ldGhvZCBkbyBhbmltYXRpb24gb24gaGVpZ2h0IHdoZW4gZGlzcGxheWluZyBhbiBlbGVtZW50XHJcbiAgICogaWYgbWF4IGhlaWdodCA9IG5vbmUgaXQgc2hvdyB0aGUgZWxlbWVudCBlbHNlIHRoaXMgZnVuY3Rpb24gaGlkZSBpdFxyXG4gICAqL1xyXG4gIHN0YXRpYyB0b2dnbGVTbGlkZShlbGVtZW50LCBkdXJhdGlvbikge1xyXG4gICAgbGV0IG1heEhlaWdodCA9IDA7XHJcbiAgICBjb25zdCBtYXhIZWlnaHREaXYgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS5nZXRQcm9wZXJ0eVZhbHVlKCdtYXgtaGVpZ2h0Jyk7XHJcblxyXG4gICAgaWYgKG1heEhlaWdodERpdiA9PT0gJ25vbmUnIHx8IG1heEhlaWdodERpdiA9PT0gJzBweCcpIHtcclxuICAgICAgbWF4SGVpZ2h0ID0gdGhpcy5nZXRIZWlnaHQoZWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgZWxlbWVudC5zdHlsZS50cmFuc2l0aW9uID0gJ21heC1oZWlnaHQgMC41cyBlYXNlLWluLW91dCc7XHJcbiAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IDA7XHJcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgZWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBlbGVtZW50LnN0eWxlLm1heEhlaWdodCA9IGAke21heEhlaWdodH1weGA7XHJcbiAgICB9LCBkdXJhdGlvbik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gZWxlbWVudFxyXG4gICAqIEBwYXJhbSBuZXdFbGVtZW50XHJcbiAgICogYWRkIGFuIGVsZW1lbnQgYXJyb3VuZCBhIHNwZWNpZmllZCBlbGVtZW50LiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgLndyYXAoKSBpbiBqUXVlcnlcclxuICAgKi9cclxuICBzdGF0aWMgd3JhcChlbGVtZW50LCBuZXdFbGVtZW50LCBjbGFzc05hbWUgPSBudWxsKSB7XHJcbiAgICBjb25zdCBwYXJlbnRFbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmV3RWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuXHJcbiAgICBwYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbGVtZW50KTtcclxuICAgIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIGVsZW1lbnRcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogbWV0aG9kIHRvIGdldCBhIHdhbnRlZCBwYXJlbnQgaW4gcGFyZW50c05vZGVzIG9mIGFuIGVsZW1lbnRcclxuICAgKi9cclxuICBzdGF0aWMgcGFyZW50cyhlbGVtZW50LCB3YW50ZWQpIHtcclxuICAgIGZvciAoIDsgZWxlbWVudCAmJiBlbGVtZW50ICE9PSBkb2N1bWVudDsgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xyXG4gICAgICBpZiAodGhpcy5jaGVja1dhbnRlZCh3YW50ZWQpID09PSAnY2xhc3MnICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKHdhbnRlZC5zcGxpdCgnLicpWzFdKSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY2hlY2tXYW50ZWQod2FudGVkKSA9PT0gJ2lkJyAmJiBlbGVtZW50LmlkID09PSB3YW50ZWQuc3BsaXQoJyMnKVsxXSkge1xyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0gd2FudGVkXHJcbiAgICogQHJldHVybnMgeyp9XHJcbiAgICogcGVybWV0IGRlIHRlc3RlciBzaSB1biDDqWzDqW1lbnQgY2hlcmNow6kgZXN0IHVuZSBjbGFzcyBvdSB1biBpZFxyXG4gICAqL1xyXG4gIHN0YXRpYyBjaGVja1dhbnRlZCh3YW50ZWQpIHtcclxuICAgIGlmICh3YW50ZWQuaW5kZXhPZignLicpICE9PSAtMSkge1xyXG4gICAgICByZXR1cm4gJ2NsYXNzJztcclxuICAgIH0gZWxzZSBpZiAod2FudGVkLmluZGV4T2YoJyMnKSAhPT0gLTEpIHtcclxuICAgICAgcmV0dXJuICdpZCc7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCAoUmlic0NvcmUpO1xyXG4iLCJpbXBvcnQgUmlic0NvcmUgZnJvbSAncmlicy1jb3JlJztcblxuY2xhc3MgUmlic1BvcHVwIHtcbiAgLyoqXG4gICAqIGNvbnN0cnVjdG9yIGFkZCBldmVudCBsaXN0ZW5lciBvbiBhbGwgZWxlbWVudCB3aWNoIGhhdmVcbiAgICogZGF0YS1yaWJzcG9wdXBcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmlic3BvcHVwXScpO1xuXG4gICAgQXJyYXkuZnJvbShsaW5rcykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5vcGVuUG9wdXAoZXZlbnQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogbWV0aG9kIHRvIG9wZW4gYSBwb3B1cCB3aXRoIGxpbmsgY2xpY2tlZCBpbiBldmVudFxuICAgKi9cbiAgb3BlblBvcHVwKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGxpbmsgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LnBvcHVwKTtcblxuICAgIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuYWpheCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldENvbnRlbnQocG9wdXAsIGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5hamF4KVxuICAgIH1cblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3JpYnMtZGlzcGxheWVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyaWJzLXBvcHVwLWJvZHknKTtcblxuICAgIGNvbnN0IGRhdGFDbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLWNsb3NlXScpO1xuICAgIGNvbnN0IGRhdGFWYWxpZGF0ZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLXZhbGlkYXRlXScpO1xuXG4gICAgaWYgKGRhdGFDbG9zZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFDbG9zZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkYXRhVmFsaWRhdGUubGVuZ3RoID4gMCkge1xuICAgICAgQXJyYXkuZnJvbShkYXRhVmFsaWRhdGUpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5zZXRBY3Rpb25WYWxpZGF0ZShldmVudCwgbGluaykpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBvcGVuIGEgcG9wdXAgYnkgYSBqcyBjYWxsIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSBwb3B1cElkXG4gICAqL1xuICBvcGVuSnNQb3B1cChwb3B1cElkKSB7XG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwb3B1cElkKTtcblxuICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3JpYnMtZGlzcGxheWVkJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyaWJzLXBvcHVwLWJvZHknKTtcblxuICAgIGNvbnN0IGRhdGFDbG9zZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLWNsb3NlXScpO1xuICAgIGNvbnN0IGRhdGFWYWxpZGF0ZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLXBvcHVwIFtkYXRhLXZhbGlkYXRlXScpO1xuXG4gICAgaWYgKGRhdGFDbG9zZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFDbG9zZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChkYXRhVmFsaWRhdGUubGVuZ3RoID4gMCkge1xuICAgICAgQXJyYXkuZnJvbShkYXRhVmFsaWRhdGUpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy5zZXRBY3Rpb25WYWxpZGF0ZShldmVudCwgbnVsbCkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gbGlua1xuICAgKiBtZXRob2QgdGhhdCB0cmlnZ2VyIGFjdGlvbiB0byBkbyBvbiBjbGljayBvbiBkYXRhLXZhbGlkYXRlIGJ1dHRvblxuICAgKiBvciBzZW5kIGJhY2sgb24gYW4gdXJsIHdpdGggZGF0YS1ocmVmIG9yIHN1Ym1pdCBhIGZvcm0gd2l0aCBkYXRhLWZvcm1cbiAgICovXG4gIHNldEFjdGlvblZhbGlkYXRlKGV2ZW50LCBsaW5rKSB7XG4gICAgaWYgKGxpbmsuZGF0YXNldC5ocmVmICE9PSBudWxsICYmIGxpbmsuZGF0YXNldC5ocmVmICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaHJlZiA9IGxpbmsuZGF0YXNldC5ocmVmO1xuICAgIH0gZWxzZSBpZiAobGluay5kYXRhc2V0LmZvcm0gIT09IG51bGwgJiYgbGluay5kYXRhc2V0LmZvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGluay5kYXRhc2V0LmZvcm0pLnN1Ym1pdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsb3NlUG9wdXAoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICogbWV0aG9kIHRvIGNsb3NlIGEgcG9wdXBcbiAgICovXG4gIGNsb3NlUG9wdXAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgcG9wdXAgPSBSaWJzQ29yZS5wYXJlbnRzKGV2ZW50LmN1cnJlbnRUYXJnZXQsICcucmlicy1wb3B1cCcpO1xuXG4gICAgaWYgKHBvcHVwICE9PSBudWxsKSB7XG4gICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdyaWJzLWRpc3BsYXllZCcpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdyaWJzLXBvcHVwLWJvZHknKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHBvcHVwXG4gICAqIEBwYXJhbSBhamF4VXJsXG4gICAqIG1hdGhvZCB0aGF0IGFkZCB0aGUgY29udGVudCBvZiBhamF4IHJlcXVlc3QgdG8gdGhlIHBvcHVwXG4gICAqL1xuICBzZXRDb250ZW50KHBvcHVwLCBhamF4VXJsKSB7XG4gICAgY29uc3QgcG9wdXBDb250ZW50ID0gcG9wdXAucXVlcnlTZWxlY3RvcignI3NldC1jb250ZW50Jyk7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gIG5ldyBSZXF1ZXN0KGFqYXhVcmwsIHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgfSk7XG5cbiAgICBmZXRjaCAocmVxdWVzdClcbiAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS50ZXh0KCkpXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgcG9wdXBDb250ZW50LmlubmVySFRNTCA9IHJlc3VsdDtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCAoUmlic1BvcHVwKTtcblxuY29uc3QgcG9wdXAgPSBuZXcgUmlic1BvcHVwKCk7XG4iLCJ2YXIgbWFwID0ge1xuXHRcIi4vQmxvY2tzLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0Jsb2Nrcy5qc1wiLFxuXHRcIi4vQm9sZC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9Cb2xkLmpzXCIsXG5cdFwiLi9Gb250U2l6ZS5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9Gb250U2l6ZS5qc1wiLFxuXHRcIi4vSW5kZW50T3V0ZGVudC5qc1wiOiBcIi4vbm9kZV9tb2R1bGVzL3JpYnMtd3lzaXd5Zy9zb3VyY2UvanMvUGx1Z2lucy9JbmRlbnRPdXRkZW50LmpzXCIsXG5cdFwiLi9JdGFsaWMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvSXRhbGljLmpzXCIsXG5cdFwiLi9KdXN0aWZ5LmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL0p1c3RpZnkuanNcIixcblx0XCIuL0xpbmsuanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvTGluay5qc1wiLFxuXHRcIi4vTGlzdHMuanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvTGlzdHMuanNcIixcblx0XCIuL1N0cmlrZXRocm91Z2guanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvU3RyaWtldGhyb3VnaC5qc1wiLFxuXHRcIi4vVW5kZXJsaW5lLmpzXCI6IFwiLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zL1VuZGVybGluZS5qc1wiLFxuXHRcIi4vVW5kb1JlZG8uanNcIjogXCIuL25vZGVfbW9kdWxlcy9yaWJzLXd5c2l3eWcvc291cmNlL2pzL1BsdWdpbnMvVW5kb1JlZG8uanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvcmlicy13eXNpd3lnL3NvdXJjZS9qcy9QbHVnaW5zIHN5bmMgcmVjdXJzaXZlIF5cXFxcLlxcXFwvLipcXFxcLmpzJFwiOyIsImltcG9ydCBSaWJzV3lzaXd5Z1V0aWxzIGZyb20gXCIuLi9SaWJzV3lzaXd5Z1V0aWxzXCI7XG5cbmNsYXNzIEJsb2NrcyB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBCbG9ja3MgcGx1Z2luXG4gICAqIEBwYXJhbSB0b29sYmFyRGl2XG4gICAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnRvb2xiYXJEaXYgPSB0b29sYmFyRGl2O1xuICAgIHRoaXMuZWRpdGFibGVEaXYgPSBlZGl0YWJsZURpdjtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMuZGVmaW5lT3B0aW9ucygpO1xuICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyKCk7XG4gICAgdGhpcy5hZGRTZWxlY3RFdmVudExpc3RlbmVyKCdjbGljaycpO1xuICAgIHRoaXMuYWRkU2VsZWN0RXZlbnRMaXN0ZW5lcigna2V5ZG93bicpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgYm9sZCBidXR0b24gdG8gdG9vbGJhclxuICAgKi9cbiAgYWRkQnV0dG9uVG9Ub29sYmFyKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IGJsb2Nrc01lbnUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWxlY3QnKTtcbiAgICBibG9ja3NNZW51LmlkID0gJ3JpYnMtd3lzaXd5Zy10b29sYmFyLWJsb2Nrcyc7XG4gICAgYmxvY2tzTWVudS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHRoaXMuY2hhbmdlQmxvY2soZXZlbnQpKTtcbiAgICBkaXYuYXBwZW5kKGJsb2Nrc01lbnUpO1xuICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcblxuICAgIGZvciAoY29uc3QgYmxvY2sgaW4gdGhpcy5vcHRpb25zLmJsb2Nrcykge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICBvcHRpb24udGV4dCA9IGAke3RoaXMub3B0aW9ucy5ibG9ja3NbYmxvY2tdfWA7XG4gICAgICBvcHRpb24udmFsdWUgPSBgJHtibG9ja31gO1xuICAgICAgYmxvY2tzTWVudS5hZGQob3B0aW9uKTtcbiAgICAgIHRoaXMuYmxvY2tzTWVudSA9IGJsb2Nrc01lbnU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlZmluZSBvcHRpb25zIG9mIHRoZSBwbHVnaW5cbiAgICovXG4gIGRlZmluZU9wdGlvbnMoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuYmxvY2tzKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuYmxvY2tzID0ge1xuICAgICAgICAncCc6ICdQYXJhZ3JhcGgnLFxuICAgICAgICAnaDEnOiAnSGVhZGluZyAxJyxcbiAgICAgICAgJ2gyJzogJ0hlYWRpbmcgMicsXG4gICAgICAgICdoMyc6ICdIZWFkaW5nIDMnLFxuICAgICAgICAnaDQnOiAnSGVhZGluZyA0JyxcbiAgICAgICAgJ2g1JzogJ0hlYWRpbmcgNScsXG4gICAgICAgICdoNic6ICdIZWFkaW5nIDYnLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIGV2ZW50IHRvIGNoYW5nZSB2YWx1ZSBvZiBmb250IHNpemUgc2VsZWN0ZWRcbiAgICogQHBhcmFtIHRyaWdnZXJFdmVudFxuICAgKi9cbiAgYWRkU2VsZWN0RXZlbnRMaXN0ZW5lcih0cmlnZ2VyRXZlbnQpIHtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmFkZEV2ZW50TGlzdGVuZXIodHJpZ2dlckV2ZW50LCAoKSA9PiB7XG4gICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbiAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuZ2V0UmFuZ2VBdCAmJiB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZSkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlO1xuXG4gICAgICAgIGlmIChlbGVtZW50ICYmIGVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnROb2RlICYmIHRoaXMub3B0aW9ucy5ibG9ja3MuaGFzT3duUHJvcGVydHkoZWxlbWVudC5wYXJlbnROb2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgPj0gMCkge1xuICAgICAgICAgIHRoaXMuYmxvY2tzTWVudS52YWx1ZSA9IGVsZW1lbnQucGFyZW50Tm9kZS50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY2hhbmdlIGN1cnJlbnQgZWxlbWVudCBieSBzZWxlY3RlZCBibG9ja1xuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGNoYW5nZUJsb2NrKGV2ZW50KSB7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsIGA8JHtldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlfT5gKTtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmZvY3VzKCk7XG4gICAgUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpO1xuICB9XG59XG5cbi8qKlxuICogZnVuY3Rpb24gdG8gbG9hZCBCbG9ja3MgY2xhc3NcbiAqIEBwYXJhbSB0b29sYmFyRGl2XG4gKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGxhdW5jaENsYXNzKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gIGNvbnN0IGJsb2NrcyA9IG5ldyBCbG9ja3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGF1bmNoQ2xhc3N9O1xuIiwiaW1wb3J0IFJpYnNXeXNpd3lnVXRpbHMgZnJvbSBcIi4uL1JpYnNXeXNpd3lnVXRpbHNcIjtcblxuY2xhc3MgQm9sZCB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBCb2xkIHBsdWdpblxuICAgKiBAcGFyYW0gdG9vbGJhckRpdlxuICAgKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gICAgdGhpcy50b29sYmFyRGl2ID0gdG9vbGJhckRpdjtcbiAgICB0aGlzLmVkaXRhYmxlRGl2ID0gZWRpdGFibGVEaXY7XG4gICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGJvbGQgYnV0dG9uIHRvIHRvb2xiYXJcbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbGJhcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBib2xkTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJvbGRNZW51LmlkID0gJ3JpYnMtd3lzaXd5Zy10b29sYmFyLWJvbGQnO1xuICAgIGJvbGRNZW51LmlubmVySFRNTCA9ICc8c3BhbiBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkXCI+Qjwvc3Bhbj4nO1xuICAgIGJvbGRNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRUZXh0VG9Cb2xkKCkpO1xuICAgIGRpdi5hcHBlbmQoYm9sZE1lbnUpO1xuICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcHV0IHRleHQgaW4gYm9sZFxuICAgKi9cbiAgc2V0VGV4dFRvQm9sZCgpIHtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnYm9sZCcpO1xuICAgIHRoaXMuZWRpdGFibGVEaXYuZm9jdXMoKTtcbiAgICBSaWJzV3lzaXd5Z1V0aWxzLnJlZnJlc2hDYXJldExvY2F0aW9uRGl2KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBmdW5jdGlvbiB0byBsb2FkIEJvbGQgY2xhc3NcbiAqIEBwYXJhbSB0b29sYmFyRGl2XG4gKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGxhdW5jaENsYXNzKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gIGNvbnN0IGJvbGQgPSBuZXcgQm9sZCh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtsYXVuY2hDbGFzc307XG4iLCJjbGFzcyBGb250U2l6ZSB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBGb250U2l6ZSBwbHVnaW5cbiAgICogQHBhcmFtIHRvb2xiYXJEaXZcbiAgICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICAgIHRoaXMudG9vbGJhckRpdiA9IHRvb2xiYXJEaXY7XG4gICAgdGhpcy5lZGl0YWJsZURpdiA9IGVkaXRhYmxlRGl2O1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdGhpcy5kZWZpbmVPcHRpb25zKCk7XG4gICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIoKTtcbiAgICB0aGlzLmFkZFNlbGVjdEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyk7XG4gICAgdGhpcy5hZGRTZWxlY3RFdmVudExpc3RlbmVyKCdrZXlkb3duJyk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFkZCBib2xkIGJ1dHRvbiB0byB0b29sYmFyXG4gICAqL1xuICBhZGRCdXR0b25Ub1Rvb2xiYXIoKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgZm9udFNpemVNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2VsZWN0Jyk7XG4gICAgZm9udFNpemVNZW51LmlkID0gJ3JpYnMtd3lzaXd5Zy10b29sYmFyLWZvbnRzaXplJztcbiAgICBmb250U2l6ZU1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50KSA9PiB0aGlzLmNoYW5nZUZvbnRTaXplKGV2ZW50KSk7XG4gICAgZGl2LmFwcGVuZChmb250U2l6ZU1lbnUpO1xuICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcblxuICAgIGNvbnN0IGJvZHlGb250U2l6ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZSgnZm9udC1zaXplJyk7XG5cbiAgICBmb3IgKGNvbnN0IGZvbnRTaXplIG9mIHRoaXMub3B0aW9ucy5mb250U2l6ZSkge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG5cbiAgICAgIGlmIChwYXJzZUludChmb250U2l6ZSkgPT09IHBhcnNlSW50KGJvZHlGb250U2l6ZSkpIHtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9uLmRhdGFzZXQuZGVmYXVsdCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIG9wdGlvbi50ZXh0ID0gYCR7Zm9udFNpemV9cHhgO1xuICAgICAgb3B0aW9uLnZhbHVlID0gYCR7Zm9udFNpemV9cHhgO1xuICAgICAgZm9udFNpemVNZW51LmFkZChvcHRpb24pO1xuICAgICAgdGhpcy5mb250U2l6ZU1lbnUgPSBmb250U2l6ZU1lbnU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGRlZmluZSBvcHRpb25zIG9mIHRoZSBwbHVnaW5cbiAgICovXG4gIGRlZmluZU9wdGlvbnMoKSB7XG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZm9udFNpemUpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5mb250U2l6ZSA9IFs4LCAxMCwgMTIsIDE0LCAxNiwgMTgsIDI0LCAzNl07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBldmVudCB0byBjaGFuZ2UgdmFsdWUgb2YgZm9udCBzaXplIHNlbGVjdGVkXG4gICAqIEBwYXJhbSB0cmlnZ2VyRXZlbnRcbiAgICovXG4gIGFkZFNlbGVjdEV2ZW50TGlzdGVuZXIodHJpZ2dlckV2ZW50KSB7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5hZGRFdmVudExpc3RlbmVyKHRyaWdnZXJFdmVudCwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24gJiYgd2luZG93LmdldFNlbGVjdGlvbigpLmdldFJhbmdlQXQgJiYgd2luZG93LmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGUpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZTtcblxuICAgICAgICBpZiAoZWxlbWVudCAmJiBlbGVtZW50ICYmIGVsZW1lbnQucGFyZW50Tm9kZSAhPT0gdW5kZWZpbmVkICYmIGVsZW1lbnQucGFyZW50Tm9kZS5zdHlsZSAmJiBlbGVtZW50LnBhcmVudE5vZGUuc3R5bGUuZm9udFNpemUpIHtcbiAgICAgICAgICB0aGlzLmZvbnRTaXplTWVudS52YWx1ZSA9IGVsZW1lbnQucGFyZW50Tm9kZS5zdHlsZS5mb250U2l6ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmZvbnRTaXplTWVudS52YWx1ZSA9IHRoaXMuZm9udFNpemVNZW51LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRlZmF1bHRdJykudmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcmVwbGFjZSBjcmVhdGUgZm9udCBlbGVtZW50IGJ5IGEgc3BhblxuICAgKiBAcGFyYW0gZm9udEVsZW1lbnRcbiAgICogQHBhcmFtIGZvbnRTaXplXG4gICAqL1xuICByZXBsYWNlRm9udEJ5U3Bhbihmb250RWxlbWVudCwgZm9udFNpemUpIHtcbiAgICBjb25zdCBwYXJlbnREaXYgPSBmb250RWxlbWVudC5wYXJlbnROb2RlO1xuICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgc3Bhbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShmb250RWxlbWVudC50ZXh0Q29udGVudCkpO1xuICAgIHNwYW4uc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZTtcblxuICAgIHBhcmVudERpdi5yZXBsYWNlQ2hpbGQoc3BhbiwgZm9udEVsZW1lbnQpO1xuXG4gICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHModGhpcy5lZGl0YWJsZURpdik7XG4gICAgcmFuZ2UuY29sbGFwc2UoZmFsc2UpO1xuICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICAgIHRoaXMuZWRpdGFibGVEaXYuZm9jdXMoKTtcbiAgICByYW5nZS5kZXRhY2goKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY2hhbmdlIGZvbnQgc2l6ZSBvZiBjdXJyZW50IHNlbGVjdGlvblxuICAgKiBAcGFyYW0gZXZlbnRcbiAgICovXG4gIGNoYW5nZUZvbnRTaXplKGV2ZW50KSB7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5mb2N1cygpO1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiZm9udFNpemVcIiwgZmFsc2UsICcxJyk7XG4gICAgY29uc3QgZm9udFNpemUgPSBldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlO1xuICAgIGNvbnN0IGZvbnRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ZvbnQnKVswXTtcblxuICAgIGlmICghZm9udEVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWRpdGFibGVEaXYuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsICgpID0+IHtcbiAgICAgICAgY29uc3QgZm9udEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZm9udCcpWzBdO1xuICAgICAgICB0aGlzLnJlcGxhY2VGb250QnlTcGFuKGZvbnRFbGVtZW50LCBmb250U2l6ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXBsYWNlRm9udEJ5U3Bhbihmb250RWxlbWVudCwgZm9udFNpemUpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGZ1bmN0aW9uIHRvIGxvYWQgRm9udFNpemUgY2xhc3NcbiAqIEBwYXJhbSB0b29sYmFyRGl2XG4gKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGxhdW5jaENsYXNzKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gIGNvbnN0IGZvbnRTaXplID0gbmV3IEZvbnRTaXplKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2xhdW5jaENsYXNzfTtcbiIsImltcG9ydCBSaWJzV3lzaXd5Z1V0aWxzIGZyb20gXCIuLi9SaWJzV3lzaXd5Z1V0aWxzXCI7XG5cbmNsYXNzIEluZGVudE91dGRlbnQge1xuICAvKipcbiAgICogbWV0aG9kIHRvIGluaXRpYWxpemUgSW5kZW50T3V0ZGVudCBwbHVnaW5cbiAgICogQHBhcmFtIHRvb2xiYXJEaXZcbiAgICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICAgIHRoaXMudG9vbGJhckRpdiA9IHRvb2xiYXJEaXY7XG4gICAgdGhpcy5lZGl0YWJsZURpdiA9IGVkaXRhYmxlRGl2O1xuICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyKCk7XG4gICAgdGhpcy5hZGRJbmRlbnRFdmVudExpc3RlbmVyKCdjbGljaycpO1xuICAgIHRoaXMuYWRkSW5kZW50RXZlbnRMaXN0ZW5lcigna2V5dXAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGluZGVudE91dGRlbnQgYnV0dG9uIHRvIHRvb2xiYXJcbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbGJhcigpIHtcbiAgICBjb25zdCBpbmRlbnRzID0gWydJbmRlbnQnLCAnT3V0ZGVudCddO1xuXG4gICAgZm9yIChjb25zdCBpbmRlbnRUeXBlIG9mIGluZGVudHMpIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgaW5kZW50TWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgaW5kZW50TWVudS5pZCA9IGByaWJzLXd5c2l3eWctdG9vbGJhci1pbmRlbnRPdXRkZW50LSR7aW5kZW50VHlwZX1gO1xuICAgICAgaWYgKGluZGVudFR5cGUgPT09ICdPdXRkZW50Jykge1xuICAgICAgICBpbmRlbnRNZW51LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgICBpbmRlbnRNZW51LmlubmVySFRNTCA9IGluZGVudFR5cGU7XG4gICAgICBpbmRlbnRNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5pbmRlbnRPdXRkZW50KGluZGVudFR5cGUpKTtcbiAgICAgIGRpdi5hcHBlbmQoaW5kZW50TWVudSk7XG4gICAgICB0aGlzLnRvb2xiYXJEaXYuYXBwZW5kKGRpdik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBldmVudCB0byBjaGFuZ2UgdmFsdWUgb2YgZm9udCBzaXplIHNlbGVjdGVkXG4gICAqIEBwYXJhbSB0cmlnZ2VyRXZlbnRcbiAgICovXG4gIGFkZEluZGVudEV2ZW50TGlzdGVuZXIodHJpZ2dlckV2ZW50KSB7XG4gICAgY29uc3Qgb3V0ZGVudE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLXRvb2xiYXItaW5kZW50T3V0ZGVudC1PdXRkZW50Jyk7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5hZGRFdmVudExpc3RlbmVyKHRyaWdnZXJFdmVudCwgKCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24gJiYgd2luZG93LmdldFNlbGVjdGlvbigpLmdldFJhbmdlQXQgJiYgd2luZG93LmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGUpIHtcbiAgICAgICAgbGV0IHBhcmVudEVsZW1lbnQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIGlmIChwYXJlbnRFbGVtZW50LmlkID09PSB0aGlzLmVkaXRhYmxlRGl2LmlkKSB7XG4gICAgICAgICAgcGFyZW50RWxlbWVudCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5hbmNob3JOb2RlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudEVsZW1lbnQgJiYgcGFyZW50RWxlbWVudC5zdHlsZSkge1xuICAgICAgICAgIGxldCBtYXJnaW5MZWZ0ID0gcGFyZW50RWxlbWVudC5zdHlsZS5tYXJnaW5MZWZ0LnNwbGl0KCdweCcpWzBdO1xuICAgICAgICAgIG1hcmdpbkxlZnQgPSBwYXJzZUludChtYXJnaW5MZWZ0KSA/IHBhcnNlSW50KG1hcmdpbkxlZnQpIDogMDtcblxuICAgICAgICAgIGlmIChtYXJnaW5MZWZ0ID09PSAwKSB7XG4gICAgICAgICAgICBvdXRkZW50TWVudS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXRkZW50TWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG91dGRlbnRNZW51LmNsYXNzTGlzdC5hZGQoJ2Rpc2FibGVkJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgaW5kZW50IG9yIG91dGRlbnQgYW4gZWxlbWVudFxuICAgKi9cbiAgaW5kZW50T3V0ZGVudChpbmRlbnRUeXBlKSB7XG4gICAgY29uc3Qgb3V0ZGVudE1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLXRvb2xiYXItaW5kZW50T3V0ZGVudC1PdXRkZW50Jyk7XG4gICAgbGV0IHBhcmVudEVsZW1lbnQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZS5wYXJlbnRFbGVtZW50O1xuXG4gICAgaWYgKHBhcmVudEVsZW1lbnQuaWQgPT09IHRoaXMuZWRpdGFibGVEaXYuaWQpIHtcbiAgICAgIHBhcmVudEVsZW1lbnQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZTtcbiAgICB9XG5cbiAgICBpZiAocGFyZW50RWxlbWVudCkge1xuICAgICAgbGV0IG1hcmdpbkxlZnQgPSBwYXJlbnRFbGVtZW50LnN0eWxlLm1hcmdpbkxlZnQuc3BsaXQoJ3B4JylbMF07XG4gICAgICBtYXJnaW5MZWZ0ID0gcGFyc2VJbnQobWFyZ2luTGVmdCkgPyBwYXJzZUludChtYXJnaW5MZWZ0KSA6IDA7XG5cbiAgICAgIGlmIChpbmRlbnRUeXBlID09PSAnSW5kZW50Jykge1xuICAgICAgICBwYXJlbnRFbGVtZW50LnN0eWxlLm1hcmdpbkxlZnQgPSBgJHttYXJnaW5MZWZ0KzQwfXB4YDtcbiAgICAgICAgb3V0ZGVudE1lbnUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKVxuICAgICAgfSBlbHNlIGlmIChpbmRlbnRUeXBlID09PSAnT3V0ZGVudCcgJiYgbWFyZ2luTGVmdCA+IDApIHtcbiAgICAgICAgY29uc3QgbmV3TWFyZ2luTGVmdCA9IG1hcmdpbkxlZnQtNDA7XG4gICAgICAgIHBhcmVudEVsZW1lbnQuc3R5bGUubWFyZ2luTGVmdCA9IGAke25ld01hcmdpbkxlZnR9cHhgO1xuXG4gICAgICAgIGlmIChuZXdNYXJnaW5MZWZ0ID09PSAwKSB7XG4gICAgICAgICAgb3V0ZGVudE1lbnUuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5lZGl0YWJsZURpdi5mb2N1cygpO1xuICAgIFJpYnNXeXNpd3lnVXRpbHMucmVmcmVzaENhcmV0TG9jYXRpb25EaXYoKTtcbiAgfVxufVxuXG4vKipcbiAqIGZ1bmN0aW9uIHRvIGxvYWQgSW5kZW50T3V0ZGVudCBjbGFzc1xuICogQHBhcmFtIHRvb2xiYXJEaXZcbiAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbGF1bmNoQ2xhc3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgY29uc3QgaW5kZW50T3V0ZGVudCA9IG5ldyBJbmRlbnRPdXRkZW50KHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2xhdW5jaENsYXNzfTtcbiIsImltcG9ydCBSaWJzV3lzaXd5Z1V0aWxzIGZyb20gXCIuLi9SaWJzV3lzaXd5Z1V0aWxzXCI7XG5cbmNsYXNzIEl0YWxpYyB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBJdGFsaWMgcGx1Z2luXG4gICAqIEBwYXJhbSB0b29sYmFyRGl2XG4gICAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnRvb2xiYXJEaXYgPSB0b29sYmFyRGl2O1xuICAgIHRoaXMuZWRpdGFibGVEaXYgPSBlZGl0YWJsZURpdjtcbiAgICB0aGlzLmFkZEJ1dHRvblRvVG9vbGJhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgaXRhbGljIGJ1dHRvbiB0byB0b29sYmFyXG4gICAqL1xuICBhZGRCdXR0b25Ub1Rvb2xiYXIoKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgaXRhbGljTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGl0YWxpY01lbnUuaWQgPSAncmlicy13eXNpd3lnLXRvb2xiYXItaXRhbGljJztcbiAgICBpdGFsaWNNZW51LmlubmVySFRNTCA9ICc8c3BhbiBzdHlsZT1cImZvbnQtc3R5bGU6IGl0YWxpY1wiPkk8L3NwYW4+JztcbiAgICBpdGFsaWNNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRUZXh0VG9JdGFsaWMoKSk7XG4gICAgZGl2LmFwcGVuZChpdGFsaWNNZW51KTtcbiAgICB0aGlzLnRvb2xiYXJEaXYuYXBwZW5kKGRpdik7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHB1dCB0ZXh0IGluIGl0YWxpY1xuICAgKi9cbiAgc2V0VGV4dFRvSXRhbGljKCkge1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdpdGFsaWMnKTtcbiAgICB0aGlzLmVkaXRhYmxlRGl2LmZvY3VzKCk7XG4gICAgUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpO1xuICB9XG59XG5cbi8qKlxuICogZnVuY3Rpb24gdG8gbG9hZCBJdGFsaWMgY2xhc3NcbiAqIEBwYXJhbSB0b29sYmFyRGl2XG4gKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAqIEBwYXJhbSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGxhdW5jaENsYXNzKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gIGNvbnN0IGl0YWxpYyA9IG5ldyBJdGFsaWModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGF1bmNoQ2xhc3N9O1xuIiwiaW1wb3J0IFJpYnNXeXNpd3lnVXRpbHMgZnJvbSBcIi4uL1JpYnNXeXNpd3lnVXRpbHNcIjtcblxuY2xhc3MgSnVzdGlmeSB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBKdXN0aWZ5IHBsdWdpblxuICAgKiBAcGFyYW0gdG9vbGJhckRpdlxuICAgKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gICAgdGhpcy50b29sYmFyRGl2ID0gdG9vbGJhckRpdjtcbiAgICB0aGlzLmVkaXRhYmxlRGl2ID0gZWRpdGFibGVEaXY7XG4gICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGp1c3RpZnkgYnV0dG9ucyB0byB0b29sYmFyXG4gICAqL1xuICBhZGRCdXR0b25Ub1Rvb2xiYXIoKSB7XG4gICAgY29uc3QganVzdGlmeVR5cGVzID0gWydMZWZ0JywgJ0NlbnRlcicsICdSaWdodCcsICdGdWxsJ107XG5cbiAgICBmb3IgKGNvbnN0IGp1c3RpZnlUeXBlIG9mIGp1c3RpZnlUeXBlcykge1xuICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb25zdCBqdXN0aWZ5TWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAganVzdGlmeU1lbnUuaWQgPSBgcmlicy13eXNpd3lnLXRvb2xiYXItanVzdGlmeS0ke2p1c3RpZnlUeXBlfWA7XG4gICAgICBqdXN0aWZ5TWVudS5pbm5lckhUTUwgPSBqdXN0aWZ5VHlwZTtcbiAgICAgIGp1c3RpZnlNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zZXRUZXh0VG9KdXN0aWZ5KGp1c3RpZnlUeXBlKSk7XG4gICAgICBkaXYuYXBwZW5kKGp1c3RpZnlNZW51KTtcbiAgICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHB1dCB0ZXh0IGluIGp1c3RpZnlcbiAgICovXG4gIHNldFRleHRUb0p1c3RpZnkoanVzdGlmeVR5cGUpIHtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZChganVzdGlmeSR7anVzdGlmeVR5cGV9YCk7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5mb2N1cygpO1xuICAgIFJpYnNXeXNpd3lnVXRpbHMucmVmcmVzaENhcmV0TG9jYXRpb25EaXYoKTtcbiAgfVxufVxuXG4vKipcbiAqIGZ1bmN0aW9uIHRvIGxvYWQgSnVzdGlmeSBjbGFzc1xuICogQHBhcmFtIHRvb2xiYXJEaXZcbiAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbGF1bmNoQ2xhc3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgY29uc3QganVzdGlmeSA9IG5ldyBKdXN0aWZ5KHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2xhdW5jaENsYXNzfTtcbiIsImltcG9ydCBSaWJzV3lzaXd5Z1V0aWxzIGZyb20gXCIuLi9SaWJzV3lzaXd5Z1V0aWxzXCI7XG5pbXBvcnQgUmlic1BvcHVwIGZyb20gXCJyaWJzLXBvcHVwL3NvdXJjZS9qcy9yaWJzLXBvcHVwXCI7XG5pbXBvcnQgUmlic1BvcHVwQ3NzIGZyb20gJ3JpYnMtcG9wdXAvZGlzdC9jc3Mvc3R5bGUubWluLmNzcyc7XG5cbmNsYXNzIExpbmsge1xuICAvKipcbiAgICogbWV0aG9kIHRvIGluaXRpYWxpemUgTGluayBwbHVnaW5cbiAgICogQHBhcmFtIHRvb2xiYXJEaXZcbiAgICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICAgIHRoaXMudG9vbGJhckRpdiA9IHRvb2xiYXJEaXY7XG4gICAgdGhpcy5lZGl0YWJsZURpdiA9IGVkaXRhYmxlRGl2O1xuICAgIHRoaXMucmlic1BvcHVwID0gbmV3IFJpYnNQb3B1cCgpO1xuICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyKCk7XG5cbiAgICBjb25zdCBoZWFkICA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gICAgY29uc3Qgc3R5bGUgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZS5pbm5lclRleHQgPSBSaWJzUG9wdXBDc3MudG9TdHJpbmcoKTtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGxpbmsgYnV0dG9uIHRvIHRvb2xiYXJcbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbGJhcigpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBsaW5rTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGxpbmtNZW51LmlkID0gJ3JpYnMtd3lzaXd5Zy10b29sYmFyLWxpbmsnO1xuICAgIGxpbmtNZW51LmlubmVySFRNTCA9ICc8c3Bhbj5MaW5rPC9zcGFuPic7XG4gICAgbGlua01lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNob3dQb3B1cCgpKTtcbiAgICBkaXYuYXBwZW5kKGxpbmtNZW51KTtcbiAgICB0aGlzLnRvb2xiYXJEaXYuYXBwZW5kKGRpdik7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGNyZWF0ZSBkaXYgZm9yIGlucHV0cyBvZiBwb3B1cFxuICAgKiBAcGFyYW0gaWRcbiAgICogQHBhcmFtIGxhYmVsXG4gICAqIEByZXR1cm5zIHtIVE1MRGl2RWxlbWVudH1cbiAgICovXG4gIGNyZWF0ZUlucHV0UG9wdXAoaWQsIGxhYmVsKSB7XG4gICAgY29uc3QgaW5wdXREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBjb25zdCBsYWJlbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIGxhYmVsRWxlbWVudC5pbm5lclRleHQgPSBsYWJlbDtcbiAgICBsYWJlbEVsZW1lbnQuZm9yID0gaWQ7XG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIGlucHV0LmlkID0gaWQ7XG4gICAgaW5wdXQubmFtZSA9IGlkO1xuXG4gICAgaWYgKGlkID09PSAncmlicy13eXNpd3lnLWxpbmstdGV4dCcpIHtcbiAgICAgIGlucHV0LnZhbHVlID0gUmlic1d5c2l3eWdVdGlscy5nZXRTZWxlY3Rpb25UZXh0KCk7XG4gICAgfVxuXG4gICAgaW5wdXREaXYuYXBwZW5kQ2hpbGQobGFiZWxFbGVtZW50KTtcbiAgICBpbnB1dERpdi5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICByZXR1cm4gaW5wdXREaXY7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGNyZWF0ZSBzZXQgY29udGVudCBkaXZcbiAgICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlQ29udGVudERpdlBvcHVwKCkge1xuICAgIGNvbnN0IHNldENvbnRlbnREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBzZXRDb250ZW50RGl2LmlkID0gJ3NldC1jb250ZW50JztcblxuICAgIGNvbnN0IHVybERpdiA9IHRoaXMuY3JlYXRlSW5wdXRQb3B1cCgncmlicy13eXNpd3lnLWxpbmstdXJsJywgJ1VSTCcpO1xuICAgIGNvbnN0IERpc3BsYXlUZXh0RGl2ID0gdGhpcy5jcmVhdGVJbnB1dFBvcHVwKCdyaWJzLXd5c2l3eWctbGluay10ZXh0JywgJ1RleHQgdG8gZGlzcGxheScpO1xuICAgIGNvbnN0IFRpdGxlRGl2ID0gdGhpcy5jcmVhdGVJbnB1dFBvcHVwKCdyaWJzLXd5c2l3eWctbGluay10aXRsZScsICdUaXRsZScpO1xuXG4gICAgc2V0Q29udGVudERpdi5hcHBlbmRDaGlsZCh1cmxEaXYpO1xuICAgIHNldENvbnRlbnREaXYuYXBwZW5kQ2hpbGQoRGlzcGxheVRleHREaXYpO1xuICAgIHNldENvbnRlbnREaXYuYXBwZW5kQ2hpbGQoVGl0bGVEaXYpO1xuXG4gICAgcmV0dXJuIHNldENvbnRlbnREaXY7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGNyZWF0ZSBsaW5rcyBkaXZcbiAgICogQHJldHVybnMge0hUTUxEaXZFbGVtZW50fVxuICAgKi9cbiAgY3JlYXRlTGlua3NEaXZQb3B1cCgpIHtcbiAgICBjb25zdCBsaW5rRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbGlua0Rpdi5jbGFzc0xpc3QuYWRkKCdsaW5rJyk7XG4gICAgY29uc3QgY2FuY2VsTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBjYW5jZWxMaW5rLmNsYXNzTGlzdC5hZGQoJ2NhbmNlbCcpO1xuICAgIGNhbmNlbExpbmsuZGF0YXNldC5jbG9zZSA9ICcnO1xuICAgIGNhbmNlbExpbmsuaW5uZXJUZXh0ID0gJ0Nsb3NlJztcbiAgICBsaW5rRGl2LmFwcGVuZENoaWxkKGNhbmNlbExpbmspO1xuICAgIGNvbnN0IHZhbGlkYXRlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YWxpZGF0ZUxpbmsuY2xhc3NMaXN0LmFkZCgndmFsaWRhdGUnKTtcbiAgICB2YWxpZGF0ZUxpbmsuZGF0YXNldC5saW5rVmFsaWRhdGUgPSAnJztcbiAgICB2YWxpZGF0ZUxpbmsuaW5uZXJUZXh0ID0gJ1ZhbGlkYXRlJztcbiAgICBsaW5rRGl2LmFwcGVuZENoaWxkKHZhbGlkYXRlTGluayk7XG5cbiAgICByZXR1cm4gbGlua0RpdjtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY3JlYXRlIHBvcHVwIGVsZW1lbnQgYW5kIGFwcGVuZCBpdCB0byB0aGUgZG9tXG4gICAqL1xuICBjcmVhdGVQb3B1cCgpIHtcbiAgICBjb25zdCBwb3B1cERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBvcHVwRGl2LmlkID0gJ3JpYnMtd3lzaXd5Zy1saW5rLXBvcHVwJztcbiAgICBwb3B1cERpdi5jbGFzc0xpc3QuYWRkKCdyaWJzLXBvcHVwJyk7XG5cbiAgICBjb25zdCBjb250ZW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29udGVudERpdi5jbGFzc0xpc3QuYWRkKCdjb250ZW50Jyk7XG5cbiAgICBjb25zdCBzZXRDb250ZW50RGl2ID0gdGhpcy5jcmVhdGVDb250ZW50RGl2UG9wdXAoKTtcbiAgICBjb25zdCBsaW5rRGl2ID0gdGhpcy5jcmVhdGVMaW5rc0RpdlBvcHVwKCk7XG5cbiAgICBjb25zdCBjbGVhckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNsZWFyRGl2LmNsYXNzTGlzdC5hZGQoJ2NsZWFyJyk7XG5cbiAgICBjb250ZW50RGl2LmFwcGVuZENoaWxkKHNldENvbnRlbnREaXYpO1xuICAgIGNvbnRlbnREaXYuYXBwZW5kQ2hpbGQobGlua0Rpdik7XG4gICAgY29udGVudERpdi5hcHBlbmRDaGlsZChjbGVhckRpdik7XG4gICAgcG9wdXBEaXYuYXBwZW5kQ2hpbGQoY29udGVudERpdik7XG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy1jb250YWluZXInKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctY29udGFpbmVyJykgOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLWVkaXRhYmxlRGl2LWN1cnJlbnQnKS5wYXJlbnRFbGVtZW50IDtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQocG9wdXBEaXYpO1xuXG4gICAgdGhpcy5wb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctbGluay1wb3B1cCcpO1xuICAgIHRoaXMuYWRkRXZlbnRzT25JbnB1dHMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gc2hvdyBwb3B1cFxuICAgKi9cbiAgc2hvd1BvcHVwKCkge1xuICAgIHRoaXMuc2VsZWN0aW9uID0gUmlic1d5c2l3eWdVdGlscy5zYXZlU2VsZWN0aW9uKCk7XG4gICAgdGhpcy5jcmVhdGVQb3B1cCgpO1xuICAgIHRoaXMucmlic1BvcHVwLm9wZW5Kc1BvcHVwKCdyaWJzLXd5c2l3eWctbGluay1wb3B1cCcpO1xuXG4gICAgY29uc3QgZGF0YVZhbGlkYXRlID0gdGhpcy5wb3B1cC5xdWVyeVNlbGVjdG9yQWxsKCcucmlicy1wb3B1cCBbZGF0YS1saW5rLXZhbGlkYXRlXScpO1xuXG4gICAgaWYgKGRhdGFWYWxpZGF0ZS5sZW5ndGggPiAwKSB7XG4gICAgICBBcnJheS5mcm9tKGRhdGFWYWxpZGF0ZSkuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmFkZEV2ZW50VmFsaWRhdGUoKSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogYWRkIGV2ZW50IG9uIGlucHV0IGZvciB1cmwgYW5kIHRleHQuIElmIGVudGVyIHRleHQgaW4gdXJsXG4gICAqIGl0IGlzIGR1cGxpY2F0ZWQgaW4gdGV4dCBpbnB1dCBpZiBlbXB0eVxuICAgKi9cbiAgYWRkRXZlbnRzT25JbnB1dHMoKSB7XG4gICAgY29uc3QgaW5wdXRVcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLWxpbmstdXJsJyk7XG4gICAgY29uc3QgaW5wdXRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy1saW5rLXRleHQnKTtcbiAgICBsZXQgbnVsbFRleHQgPSBmYWxzZTtcblxuICAgIGlucHV0VXJsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoaW5wdXRUZXh0LnZhbHVlID09PSAnJykge1xuICAgICAgICBudWxsVGV4dCA9IHRydWVcbiAgICAgIH1cbiAgICAgIGlmIChudWxsVGV4dCkge1xuICAgICAgICBpbnB1dFRleHQudmFsdWUgPSBpbnB1dFVybC52YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlucHV0VGV4dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xuICAgICAgaWYgKGlucHV0VGV4dC52YWx1ZSAhPT0gaW5wdXRVcmwudmFsdWUpIHtcbiAgICAgICAgbnVsbFRleHQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcHV0IHRleHQgaW4gbGlua1xuICAgKi9cbiAgYWRkRXZlbnRWYWxpZGF0ZSgpIHtcbiAgICBjb25zdCB1cmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLWxpbmstdXJsJykudmFsdWU7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctbGluay10ZXh0JykudmFsdWU7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLWxpbmstdGl0bGUnKS52YWx1ZTtcblxuICAgIGlmICghdXJsKSB7XG4gICAgICB0aGlzLnJpYnNQb3B1cC5jbG9zZVBvcHVwKGV2ZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgUmlic1d5c2l3eWdVdGlscy5yZXN0b3JlU2VsZWN0aW9uKHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjcmVhdGVMaW5rJywgZmFsc2UsIHVybCk7XG4gICAgICB0aGlzLnJpYnNQb3B1cC5jbG9zZVBvcHVwKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLmVkaXRhYmxlRGl2LmZvY3VzKCk7XG4gICAgUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMucG9wdXAuaWQpLnJlbW92ZSgpO1xuXG4gICAgdGhpcy5jaGFuZ2VWYWx1ZXNPZkxpbmsodGV4dCwgdGl0bGUpO1xuICB9XG5cbiAgLyoqXG4gICAqIGFkZCBtZXRob2QgdG8gZGVmaW5lIHRleHQsIGlkIGFuZCB0aXRsZSBvZiBsaW5rXG4gICAqIEBwYXJhbSB0ZXh0XG4gICAqIEBwYXJhbSB0aXRsZVxuICAgKi9cbiAgY2hhbmdlVmFsdWVzT2ZMaW5rKHRleHQsIHRpdGxlKSB7XG4gICAgY29uc3QgaWQgPSAncmlicy13eXNpd3lnLWEtbnVtYmVyLSc7XG4gICAgbGV0IG51bWJlciA9IHRoaXMuZWRpdGFibGVEaXYucXVlcnlTZWxlY3RvckFsbCgnYScpLmxlbmd0aCArIDE7XG5cbiAgICB0aGlzLmVkaXRhYmxlRGl2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBpZiAoZWxlbWVudC5pZCA9PT0gdW5kZWZpbmVkIHx8IGVsZW1lbnQuaWQgPT09ICcnKSB7XG4gICAgICAgIGVsZW1lbnQuaWQgPSBgJHtpZH0ke251bWJlcn1gO1xuICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRleHQ7XG4gICAgICAgIGVsZW1lbnQudGl0bGUgPSB0aXRsZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIGZ1bmN0aW9uIHRvIGxvYWQgTGluayBjbGFzc1xuICogQHBhcmFtIHRvb2xiYXJEaXZcbiAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbGF1bmNoQ2xhc3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgY29uc3QgbGluayA9IG5ldyBMaW5rKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2xhdW5jaENsYXNzfTtcbiIsImltcG9ydCBSaWJzV3lzaXd5Z1V0aWxzIGZyb20gXCIuLi9SaWJzV3lzaXd5Z1V0aWxzXCI7XG5cbmNsYXNzIExpc3RzIHtcbiAgLyoqXG4gICAqIG1ldGhvZCB0byBpbml0aWFsaXplIExpc3RzIHBsdWdpblxuICAgKiBAcGFyYW0gdG9vbGJhckRpdlxuICAgKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKSB7XG4gICAgdGhpcy50b29sYmFyRGl2ID0gdG9vbGJhckRpdjtcbiAgICB0aGlzLmVkaXRhYmxlRGl2ID0gZWRpdGFibGVEaXY7XG4gICAgdGhpcy5hZGRCdXR0b25Ub1Rvb2xiYXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGxpc3RzIGJ1dHRvbiB0byB0b29sYmFyXG4gICAqL1xuICBhZGRCdXR0b25Ub1Rvb2xiYXIoKSB7XG4gICAgY29uc3QgbGlzdHMgPSBbJ09yZGVyZWRMaXN0JywgJ1Vub3JkZXJlZExpc3QnXTtcblxuICAgIGZvciAoY29uc3QgbGlzdFR5cGUgb2YgbGlzdHMpIHtcbiAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29uc3QgaW5kZW50TWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgaW5kZW50TWVudS5pZCA9IGByaWJzLXd5c2l3eWctdG9vbGJhci1saXN0cy0ke2xpc3RUeXBlfWA7XG4gICAgICBpbmRlbnRNZW51LmlubmVySFRNTCA9IGxpc3RUeXBlO1xuICAgICAgaW5kZW50TWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY3JlYXRlTGlzdHMobGlzdFR5cGUpKTtcbiAgICAgIGRpdi5hcHBlbmQoaW5kZW50TWVudSk7XG4gICAgICB0aGlzLnRvb2xiYXJEaXYuYXBwZW5kKGRpdik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCBjcmVhdGUgbGlzdCBlbGVtZW50XG4gICAqL1xuICBjcmVhdGVMaXN0cyhsaXN0VHlwZSkge1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKGBpbnNlcnQke2xpc3RUeXBlfWApO1xuICAgIHRoaXMuZWRpdGFibGVEaXYuZm9jdXMoKTtcbiAgICBSaWJzV3lzaXd5Z1V0aWxzLnJlZnJlc2hDYXJldExvY2F0aW9uRGl2KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBmdW5jdGlvbiB0byBsb2FkIExpc3RzIGNsYXNzXG4gKiBAcGFyYW0gdG9vbGJhckRpdlxuICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5mdW5jdGlvbiBsYXVuY2hDbGFzcyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICBjb25zdCBsaXN0cyA9IG5ldyBMaXN0cyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtsYXVuY2hDbGFzc307XG4iLCJpbXBvcnQgUmlic1d5c2l3eWdVdGlscyBmcm9tIFwiLi4vUmlic1d5c2l3eWdVdGlsc1wiO1xuXG5jbGFzcyBTdHJpa2V0aHJvdWdoIHtcbiAgLyoqXG4gICAqIG1ldGhvZCB0byBpbml0aWFsaXplIFN0cmlrZXRocm91Z2ggcGx1Z2luXG4gICAqIEBwYXJhbSB0b29sYmFyRGl2XG4gICAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnRvb2xiYXJEaXYgPSB0b29sYmFyRGl2O1xuICAgIHRoaXMuZWRpdGFibGVEaXYgPSBlZGl0YWJsZURpdjtcbiAgICB0aGlzLmFkZEJ1dHRvblRvVG9vbGJhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgc3RyaWtldGhyb3VnaCBidXR0b24gdG8gdG9vbGJhclxuICAgKi9cbiAgYWRkQnV0dG9uVG9Ub29sYmFyKCkge1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHN0cmlrZXRocm91Z2hNZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3RyaWtldGhyb3VnaE1lbnUuaWQgPSAncmlicy13eXNpd3lnLXRvb2xiYXItc3RyaWtldGhyb3VnaCc7XG4gICAgc3RyaWtldGhyb3VnaE1lbnUuaW5uZXJIVE1MID0gJzxzcGFuIHN0eWxlPVwidGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2hcIj5TPC9zcGFuPic7XG4gICAgc3RyaWtldGhyb3VnaE1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNldFRleHRUb1N0cmlrZXRocm91Z2goKSk7XG4gICAgZGl2LmFwcGVuZChzdHJpa2V0aHJvdWdoTWVudSk7XG4gICAgdGhpcy50b29sYmFyRGl2LmFwcGVuZChkaXYpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBwdXQgdGV4dCBpbiBzdHJpa2V0aHJvdWdoXG4gICAqL1xuICBzZXRUZXh0VG9TdHJpa2V0aHJvdWdoKCkge1xuICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdzdHJpa2V0aHJvdWdoJyk7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5mb2N1cygpO1xuICAgIFJpYnNXeXNpd3lnVXRpbHMucmVmcmVzaENhcmV0TG9jYXRpb25EaXYoKTtcbiAgfVxufVxuXG4vKipcbiAqIGZ1bmN0aW9uIHRvIGxvYWQgU3RyaWtldGhyb3VnaCBjbGFzc1xuICogQHBhcmFtIHRvb2xiYXJEaXZcbiAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbGF1bmNoQ2xhc3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgY29uc3Qgc3RyaWtldGhyb3VnaCA9IG5ldyBTdHJpa2V0aHJvdWdoKHRvb2xiYXJEaXYsIGVkaXRhYmxlRGl2LCBvcHRpb25zKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2xhdW5jaENsYXNzfTtcbiIsImltcG9ydCBSaWJzV3lzaXd5Z1V0aWxzIGZyb20gXCIuLi9SaWJzV3lzaXd5Z1V0aWxzXCI7XG5cbmNsYXNzIFVuZGVybGluZSB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBVbmRlcmxpbmUgcGx1Z2luXG4gICAqIEBwYXJhbSB0b29sYmFyRGl2XG4gICAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICAgKiBAcGFyYW0gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IodG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnRvb2xiYXJEaXYgPSB0b29sYmFyRGl2O1xuICAgIHRoaXMuZWRpdGFibGVEaXYgPSBlZGl0YWJsZURpdjtcbiAgICB0aGlzLmFkZEJ1dHRvblRvVG9vbGJhcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgdW5kZXJsaW5lIGJ1dHRvbiB0byB0b29sYmFyXG4gICAqL1xuICBhZGRCdXR0b25Ub1Rvb2xiYXIoKSB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY29uc3QgdW5kZXJsaW5lTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHVuZGVybGluZU1lbnUuaWQgPSAncmlicy13eXNpd3lnLXRvb2xiYXItdW5kZXJsaW5lJztcbiAgICB1bmRlcmxpbmVNZW51LmlubmVySFRNTCA9ICc8c3BhbiBzdHlsZT1cInRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lXCI+VTwvc3Bhbj4nO1xuICAgIHVuZGVybGluZU1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNldFRleHRUb1VuZGVybGluZSgpKTtcbiAgICBkaXYuYXBwZW5kKHVuZGVybGluZU1lbnUpO1xuICAgIHRoaXMudG9vbGJhckRpdi5hcHBlbmQoZGl2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcHV0IHRleHQgaW4gdW5kZXJsaW5lXG4gICAqL1xuICBzZXRUZXh0VG9VbmRlcmxpbmUoKSB7XG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ3VuZGVybGluZScpO1xuICAgIHRoaXMuZWRpdGFibGVEaXYuZm9jdXMoKTtcbiAgICBSaWJzV3lzaXd5Z1V0aWxzLnJlZnJlc2hDYXJldExvY2F0aW9uRGl2KCk7XG4gIH1cbn1cblxuLyoqXG4gKiBmdW5jdGlvbiB0byBsb2FkIFVuZGVybGluZSBjbGFzc1xuICogQHBhcmFtIHRvb2xiYXJEaXZcbiAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbGF1bmNoQ2xhc3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgY29uc3QgdW5kZXJsaW5lID0gbmV3IFVuZGVybGluZSh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtsYXVuY2hDbGFzc307XG4iLCJpbXBvcnQgUmlic1d5c2l3eWdVdGlscyBmcm9tIFwiLi4vUmlic1d5c2l3eWdVdGlsc1wiO1xuXG5jbGFzcyBVbmRvUmVkbyB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGl6ZSBVbmRvUmVkbyBwbHVnaW5cbiAgICogQHBhcmFtIHRvb2xiYXJEaXZcbiAgICogQHBhcmFtIGVkaXRhYmxlRGl2XG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgb3B0aW9ucykge1xuICAgIHRoaXMudG9vbGJhckRpdiA9IHRvb2xiYXJEaXY7XG4gICAgdGhpcy5lZGl0YWJsZURpdiA9IGVkaXRhYmxlRGl2O1xuICAgIHRoaXMuYWRkQnV0dG9uVG9Ub29sYmFyKCk7XG4gICAgdGhpcy5hZGRVbmRvRXZlbnRMaXN0ZW5lcigpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgdW5kb1JlZG8gYnV0dG9uIHRvIHRvb2xiYXJcbiAgICovXG4gIGFkZEJ1dHRvblRvVG9vbGJhcigpIHtcbiAgICBjb25zdCB1bmRvcyA9IFsnVW5kbycsICdSZWRvJ107XG5cbiAgICBmb3IgKGNvbnN0IHVuZG9UeXBlIG9mIHVuZG9zKSB7XG4gICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnN0IHVuZG9NZW51ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICB1bmRvTWVudS5pZCA9IGByaWJzLXd5c2l3eWctdG9vbGJhci11bmRvUmVkby0ke3VuZG9UeXBlfWA7XG4gICAgICB1bmRvTWVudS5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgdW5kb01lbnUuaW5uZXJIVE1MID0gdW5kb1R5cGU7XG4gICAgICB1bmRvTWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudCkgPT4gdGhpcy51bmRvUmVkbyhldmVudCwgdW5kb1R5cGUpKTtcbiAgICAgIGRpdi5hcHBlbmQodW5kb01lbnUpO1xuICAgICAgdGhpcy50b29sYmFyRGl2LmFwcGVuZChkaXYpO1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgndW5kb0NvdW50Jyk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCdyZWRvQ291bnQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHB1dCB0ZXh0IGluIHVuZG9SZWRvIGFuZCBkaXNhYmxlZCBvciBlbmFibGUgYnV0dG9uIGluIHRvb2xiYXJcbiAgICovXG4gIHVuZG9SZWRvKGV2ZW50LCB1bmRvVHlwZSkge1xuICAgIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodW5kb1R5cGUgPT09ICdVbmRvJykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgndW5kb0NvdW50JywgcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndW5kb0NvdW50JykpIC0gMSk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZWRvQ291bnQnLCBwYXJzZUludCgoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncmVkb0NvdW50JykgPyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyZWRvQ291bnQnKSA6IDApKSArIDEpO1xuICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3VuZG9Db3VudCcpKSA9PT0gMCkge1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdyZWRvQ291bnQnKSkgPiAwKSB7XG4gICAgICAgIGNvbnN0IHJlZG9NZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy10b29sYmFyLXVuZG9SZWRvLVJlZG8nKTtcbiAgICAgICAgcmVkb01lbnUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodW5kb1R5cGUgPT09ICdSZWRvJykge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncmVkb0NvdW50JywgcGFyc2VJbnQoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncmVkb0NvdW50JykpIC0gMSk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1bmRvQ291bnQnLCBwYXJzZUludCgoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndW5kb0NvdW50JykgPyBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1bmRvQ291bnQnKSA6IDApKSArIDEpO1xuICAgICAgaWYgKHBhcnNlSW50KHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3JlZG9Db3VudCcpKSA9PT0gMCkge1xuICAgICAgICBldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJzZUludChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCd1bmRvQ291bnQnKSkgPiAwKSB7XG4gICAgICAgIGNvbnN0IHJlZG9NZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy10b29sYmFyLXVuZG9SZWRvLVVuZG8nKTtcbiAgICAgICAgcmVkb01lbnUuY2xhc3NMaXN0LnJlbW92ZSgnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCh1bmRvVHlwZSk7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5mb2N1cygpO1xuICAgIFJpYnNXeXNpd3lnVXRpbHMucmVmcmVzaENhcmV0TG9jYXRpb25EaXYoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGV2ZW50IGxpc3RlbmVyIG9uIGtleWRvd24gdG8gc3RvcmUgdmFsdWUgaW4gc2Vzc2lvblN0b3JhZ2Ugb2YgcmVkbyBhbmQgdW5kbyBjb3VudFxuICAgKi9cbiAgYWRkVW5kb0V2ZW50TGlzdGVuZXIoKSB7XG4gICAgdGhpcy5lZGl0YWJsZURpdi5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKCkgPT4ge1xuICAgICAgY29uc3QgdW5kb1ZhbHVlID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgndW5kb0NvdW50Jyk7XG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCd1bmRvQ291bnQnLCBwYXJzZUludCh1bmRvVmFsdWUgPyB1bmRvVmFsdWUgOiAwKSArIDEpO1xuICAgICAgXG4gICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdyZWRvQ291bnQnLCAwKTtcbiAgICAgIGNvbnN0IHJlZG9NZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy10b29sYmFyLXVuZG9SZWRvLVJlZG8nKTtcbiAgICAgIHJlZG9NZW51LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG5cbiAgICAgIGlmICh1bmRvVmFsdWUpIHtcbiAgICAgICAgY29uc3QgdW5kb01lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmlicy13eXNpd3lnLXRvb2xiYXItdW5kb1JlZG8tVW5kbycpO1xuICAgICAgICB1bmRvTWVudS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogZnVuY3Rpb24gdG8gbG9hZCBVbmRvUmVkbyBjbGFzc1xuICogQHBhcmFtIHRvb2xiYXJEaXZcbiAqIEBwYXJhbSBlZGl0YWJsZURpdlxuICogQHBhcmFtIG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gbGF1bmNoQ2xhc3ModG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpIHtcbiAgY29uc3QgdW5kb1JlZG8gPSBuZXcgVW5kb1JlZG8odG9vbGJhckRpdiwgZWRpdGFibGVEaXYsIG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGF1bmNoQ2xhc3N9O1xuIiwiaW1wb3J0IFJpYnNXeXNpd3lnVXRpbHMgZnJvbSAnLi9SaWJzV3lzaXd5Z1V0aWxzJ1xuXG5jbGFzcyBSaWJzV3lzaXd5ZyB7XG4gIC8qKlxuICAgKiBtZXRob2QgdG8gbGF1bmNoIGNvbnN0cnVjdGlvbiBhdSBlZGl0b3JcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGlmICghb3B0aW9ucy5zZWxlY3Rvcikge1xuICAgICAgY29uc29sZS5lcnJvcignU2VsZWN0b3IgaXMgbWFuZGF0b3J5Jyk7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICghZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zLnNlbGVjdG9yKSkge1xuICAgICAgY29uc29sZS5lcnJvcignU2VsZWN0b3IgY2FuXFwndCBiZSBmb3VuZCBpbiBkb2N1bWVudCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZGVmaW5lT3B0aW9ucyhvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zLm1vZGUgJiYgb3B0aW9ucy5tb2RlID09PSAnaW5saW5lJykge1xuICAgICAgdGhpcy5pbml0V3lzaXd5Z0lubGluZURpdnMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob3B0aW9ucy5zZWxlY3Rvcik7XG4gICAgICB0aGlzLmluaXRXeXNpd3lnRGl2cygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gZGVmaW5lZCBvcHRpb25zIG9mIHd5c2l3eWdcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGRlZmluZU9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy5oZWlnaHQpIHtcbiAgICAgIG9wdGlvbnMuaGVpZ2h0ID0gJzIwMHB4JztcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMubW9kZSkge1xuICAgICAgb3B0aW9ucy5tb2RlID0gJ3N0YW5kYXJkJztcbiAgICB9XG5cbiAgICBpZiAoIW9wdGlvbnMudG9vbGJhcikge1xuICAgICAgb3B0aW9ucy50b29sYmFyID0gWydVbmRvUmVkbycsICd8JywgJ0p1c3RpZnknLCAnfCcsICdJbmRlbnRPdXRkZW50JywgJ3wnLCAgJ0xpc3RzJywgJ3wnLCAnQm9sZCcsICdJdGFsaWMnLCAnVW5kZXJsaW5lJywgJ1N0cmlrZXRocm91Z2gnLCAnfCcsICdGb250U2l6ZScsICdCbG9ja3MnLCAnfCcsICdMaW5rJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMudG9vbGJhciA9IG9wdGlvbnMudG9vbGJhci5zcGxpdCgnICcpO1xuICAgIH1cblxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICAvKipcbiAgICogaW5pdCB3eXNpd3lnIGRpdlxuICAgKi9cbiAgaW5pdFd5c2l3eWdEaXZzKCkge1xuICAgIHRoaXMuc2VsZWN0b3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgIGNvbnN0IHd5c2l3eWdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB3eXNpd3lnRGl2LmlkID0gJ3JpYnMtd3lzaXd5Zy1jb250YWluZXInO1xuICAgIHRoaXMuc2VsZWN0b3IucGFyZW50Tm9kZS5wcmVwZW5kKHd5c2l3eWdEaXYpO1xuXG4gICAgY29uc3QgZWRpdGFibGVEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlZGl0YWJsZURpdi5pZCA9ICdyaWJzLXd5c2l3eWctZWRpdGFibGUnO1xuICAgIHd5c2l3eWdEaXYuYXBwZW5kKGVkaXRhYmxlRGl2KTtcbiAgICBlZGl0YWJsZURpdi5zdHlsZS5oZWlnaHQgPSBOdW1iZXIuaXNJbnRlZ2VyKHRoaXMub3B0aW9ucy5oZWlnaHQpID8gYCR7dGhpcy5vcHRpb25zLmhlaWdodH1weGAgOiB0aGlzLm9wdGlvbnMuaGVpZ2h0O1xuICAgIGVkaXRhYmxlRGl2LmNvbnRlbnRFZGl0YWJsZSA9IHRydWU7XG5cbiAgICBjb25zdCBjYXJldExvY2F0aW9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgY2FyZXRMb2NhdGlvbkRpdi5pZCA9ICdyaWJzLXd5c2l3eWctY2FyZXQtbG9jYXRpb24nO1xuICAgIHd5c2l3eWdEaXYuYXBwZW5kKGNhcmV0TG9jYXRpb25EaXYpO1xuXG4gICAgdGhpcy5hZGRFdmVudHNMaXN0ZW5lcnNFZGl0YWJsZURpdih3eXNpd3lnRGl2LCBlZGl0YWJsZURpdik7XG4gICAgZWRpdGFibGVEaXYuaW5uZXJIVE1MID0gdGhpcy5zZWxlY3Rvci52YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdGlhbGlzZSBpbmxpbmUgd3lzaXd5ZyBlZGl0b3JcbiAgICovXG4gIGluaXRXeXNpd3lnSW5saW5lRGl2cygpIHtcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMub3B0aW9ucy5zZWxlY3Rvcik7XG5cbiAgICBzZWxlY3RvcnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgZWxlbWVudC5jb250ZW50RWRpdGFibGUgPSB0cnVlO1xuICAgICAgdGhpcy5hZGRFdmVudHNMaXN0ZW5lcnNFZGl0YWJsZURpdihlbGVtZW50LCBlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGV2ZW50IGxpc3RlbmVyIG9uIGVkaXRhYmxlIGRpdlxuICAgKiBAcGFyYW0gd3lzaXd5Z0RpdlxuICAgKiBAcGFyYW0gZWRpdGFibGVEaXZcbiAgICovXG4gIGFkZEV2ZW50c0xpc3RlbmVyc0VkaXRhYmxlRGl2KHd5c2l3eWdEaXYsIGVkaXRhYmxlRGl2KSB7XG4gICAgZWRpdGFibGVEaXYuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgaWYoZXZlbnQua2V5Q29kZSA9PT0gMTMgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdkZWZhdWx0UGFyYWdyYXBoU2VwYXJhdG9yJywgZmFsc2UsICdwJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMub3B0aW9ucy5tb2RlID09PSAnc3RhbmRhcmQnID8gUmlic1d5c2l3eWdVdGlscy5yZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpIDogbnVsbDtcbiAgICB9KTtcblxuICAgIGVkaXRhYmxlRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgY29uc3QgY2FyZXRQb3NpdGlvbiA9IFJpYnNXeXNpd3lnVXRpbHMuZ2V0Q2FyZXRQb3NpdGlvbigpO1xuICAgICAgY29uc3QgbGFzdFBvc2l0aW9uID0gY2FyZXRQb3NpdGlvbltjYXJldFBvc2l0aW9uLmxlbmd0aCAtIDFdO1xuXG4gICAgICBpZiAobGFzdFBvc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2Zvcm1hdEJsb2NrJywgZmFsc2UsICdwJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMubW9kZSA9PT0gJ2lubGluZScpIHtcbiAgICAgICAgaWYgKGVkaXRhYmxlRGl2LmlkICE9PSAncmlicy13eXNpd3lnLWVkaXRhYmxlRGl2LWN1cnJlbnQnICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyaWJzLXd5c2l3eWctdG9vbGJhcicpKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy10b29sYmFyJykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5tb2RlID09PSAnaW5saW5lJyAmJiAhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy10b29sYmFyJykpIHtcbiAgICAgICAgY29uc3QgY3VycmVudEVkaXRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy1lZGl0YWJsZURpdi1jdXJyZW50Jyk7XG4gICAgICAgIGN1cnJlbnRFZGl0YWJsZSA/IGN1cnJlbnRFZGl0YWJsZS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJykgOiBudWxsO1xuICAgICAgICBlZGl0YWJsZURpdi5pZCA9ICdyaWJzLXd5c2l3eWctZWRpdGFibGVEaXYtY3VycmVudCc7XG4gICAgICAgIHRoaXMuaW5pdFRvb2xiYXIod3lzaXd5Z0RpdiwgZWRpdGFibGVEaXYsICdpbmxpbmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFJpYnNXeXNpd3lnVXRpbHMucmVmcmVzaENhcmV0TG9jYXRpb25EaXYoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMubW9kZSA9PT0gJ2lubGluZScpIHtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pbml0VG9vbGJhcih3eXNpd3lnRGl2LCBlZGl0YWJsZURpdik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBpbml0IHRvb2xiYXJcbiAgICovXG4gIGluaXRUb29sYmFyKHd5c2l3eWdEaXYsIGVkaXRhYmxlRGl2LCBtb2RlID0gbnVsbCkge1xuICAgIGNvbnN0IHRvb2xiYXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0b29sYmFyRGl2LmlkID0gJ3JpYnMtd3lzaXd5Zy10b29sYmFyJztcbiAgICBpZiAobW9kZSA9PT0gbnVsbCkge1xuICAgICAgd3lzaXd5Z0Rpdi5wcmVwZW5kKHRvb2xiYXJEaXYpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRvb2xiYXJEaXYuY2xhc3NMaXN0LmFkZCgnaW5saW5lJyk7XG4gICAgICBjb25zdCBwYXJlbnREaXYgPSB3eXNpd3lnRGl2LnBhcmVudEVsZW1lbnQ7XG4gICAgICBwYXJlbnREaXYuaW5zZXJ0QmVmb3JlKHRvb2xiYXJEaXYsIHd5c2l3eWdEaXYpO1xuICAgIH1cblxuICAgIGZvciAobGV0IHBsdWdpbiBvZiB0aGlzLm9wdGlvbnMudG9vbGJhcikge1xuICAgICAgY29uc29sZS5sb2cocGx1Z2luKTtcbiAgICAgIGlmIChwbHVnaW4gPT09ICd8Jykge1xuICAgICAgICBjb25zdCBib2xkTWVudSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBib2xkTWVudS5jbGFzc0xpc3QuYWRkKCdyaWJzLXd5c2l3eWctdG9vbGJhci1zZXBhcmF0b3InKTtcbiAgICAgICAgdG9vbGJhckRpdi5hcHBlbmQoYm9sZE1lbnUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgKHJlcXVpcmUoYC4vUGx1Z2lucy8ke3BsdWdpbn0uanNgKSkuZGVmYXVsdC5sYXVuY2hDbGFzcyh0b29sYmFyRGl2LCBlZGl0YWJsZURpdiwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmlic1d5c2l3eWc7XG4iLCJjbGFzcyBSaWJzV3lzaXd5Z1V0aWxzIHtcbiAgLyoqXG4gICAqIG1ldGhvZCB0byBnZXQgY3VycmVudCB0YXJnZXQgcG9zaXRpb24gYXMgYXJyYXlcbiAgICogQHJldHVybnMge2FycmF5fVxuICAgKi9cbiAgc3RhdGljIGdldENhcmV0UG9zaXRpb24oKSB7XG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24gJiYgd2luZG93LmdldFNlbGVjdGlvbigpLmdldFJhbmdlQXQgJiYgd2luZG93LmdldFNlbGVjdGlvbigpLmFuY2hvck5vZGUpIHtcbiAgICAgIGNvbnN0IGVkaXRhYmxlRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy1lZGl0YWJsZScpO1xuICAgICAgbGV0IGVsZW1lbnQgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkuYW5jaG9yTm9kZTtcbiAgICAgIGNvbnN0IGJyZWFkY3J1bWJzID0gW107XG5cbiAgICAgIGZvciAoIDsgZWxlbWVudCAmJiBlbGVtZW50ICE9PSBlZGl0YWJsZURpdjsgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAoZWxlbWVudC50YWdOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBicmVhZGNydW1icy5wdXNoKGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGJyZWFkY3J1bWJzLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGdldCBjdXJyZW50IHRhcmdldCBwb3NpdGlvbiBhcyBzdHJpbmdcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHN0YXRpYyBnZXRDYXJldFBvc2l0aW9uQXNTdHJpbmcoKSB7XG4gICAgY29uc3QgYXJyYXlDYXJldCA9IHRoaXMuZ2V0Q2FyZXRQb3NpdGlvbigpO1xuXG4gICAgaWYgKGFycmF5Q2FyZXQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYXJyYXlDYXJldC5qb2luKCcgPiAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHJlZnJlc2ggY2FyZXQgbG9jYXRpb24gZGl2IGNvbnRlbnRcbiAgICovXG4gIHN0YXRpYyByZWZyZXNoQ2FyZXRMb2NhdGlvbkRpdigpIHtcbiAgICBjb25zdCBjYXJldExvY2F0aW9uRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JpYnMtd3lzaXd5Zy1jYXJldC1sb2NhdGlvbicpO1xuICAgIGlmIChjYXJldExvY2F0aW9uRGl2KSB7XG4gICAgICBjYXJldExvY2F0aW9uRGl2LmlubmVySFRNTCA9IFJpYnNXeXNpd3lnVXRpbHMuZ2V0Q2FyZXRQb3NpdGlvbkFzU3RyaW5nKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHNhdmUgY3VycmVudCBzZWxlY3Rpb24gb2YgY29udGVudG4gZWRpdGFibGVcbiAgICogQHJldHVybnMge251bGx8W118UmFuZ2V9XG4gICAqL1xuICBzdGF0aWMgc2F2ZVNlbGVjdGlvbigpIHtcbiAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgaWYgKHNlbGVjdGlvbi5nZXRSYW5nZUF0ICYmIHNlbGVjdGlvbi5yYW5nZUNvdW50KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gc2VsZWN0aW9uLnJhbmdlQ291bnQ7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgIHJhbmdlcy5wdXNoKHNlbGVjdGlvbi5nZXRSYW5nZUF0KGkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmFuZ2VzO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiByZXN0b3JlIGEgZ2l2ZW4gc2VsZWN0aW9uXG4gICAqIEBwYXJhbSBjdXJyZW50U2VsZWN0aW9uXG4gICAqL1xuICBzdGF0aWMgcmVzdG9yZVNlbGVjdGlvbihjdXJyZW50U2VsZWN0aW9uKSB7XG4gICAgaWYgKGN1cnJlbnRTZWxlY3Rpb24pIHtcbiAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gY3VycmVudFNlbGVjdGlvbi5sZW5ndGg7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShjdXJyZW50U2VsZWN0aW9uW2ldKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChkb2N1bWVudC5zZWxlY3Rpb24gJiYgY3VycmVudFNlbGVjdGlvbi5zZWxlY3QpIHtcbiAgICAgICAgY3VycmVudFNlbGVjdGlvbi5zZWxlY3QoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGdldCBjdXJyZW50IHRleHQgc2VsZWN0ZWQgaW4gY29udGVudGVkaXRhYmxlIGRpdlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgc3RhdGljIGdldFNlbGVjdGlvblRleHQoKSB7XG4gICAgbGV0IHRleHQgPSAnJztcbiAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgdGV4dCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKS50b1N0cmluZygpO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uICYmIGRvY3VtZW50LnNlbGVjdGlvbi50eXBlICE9IFwiQ29udHJvbFwiKSB7XG4gICAgICB0ZXh0ID0gZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHRleHQ7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmlic1d5c2l3eWdVdGlscztcbiJdLCJzb3VyY2VSb290IjoiIn0=