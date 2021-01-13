(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/edit-package"],{

/***/ "./assets/js/packages/edit.js":
/*!************************************!*\
  !*** ./assets/js/packages/edit.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ribs_file_uploader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ribs-file-uploader */ "./node_modules/ribs-file-uploader/dist/js/RibsFileUploader.js");

var fileUploader = new ribs_file_uploader__WEBPACK_IMPORTED_MODULE_0__["default"]({
  'url': 'https://ribs-sf4.anthony-pilloud.fr/ribs-admin/upload',
  'deleteUrl': 'https://ribs-sf4.anthony-pilloud.fr/ribs-admin/delete-uploaded-file'
});

/***/ }),

/***/ "./node_modules/ribs-file-uploader/dist/js/RibsFileUploader.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ribs-file-uploader/dist/js/RibsFileUploader.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class RibsFileUploader {
  /**
   * @param options
   */
  constructor(options = {}) {
    const uploaderInputs = document.querySelectorAll('[data-ribs-fileuploader]');

    uploaderInputs.forEach((element) => {
      this.initHtmlElements(element);
    });

    this.uploadProgress = [];
    this.defineOptions(options);
    this.initEventListeners();
  }

  /**
   * @param options
   */
  defineOptions(options) {
    if (!options.url) {
      options.url = '';
    }
    if (!options.deleteUrl) {
      options.deleteUrl = '';
    }
    if (!options.retrieveFilesUrl) {
      options.retrieveFilesUrl = '';
    }

    this.options = options;
  }

  /**
   * method to get an array of accepted file types
   * @param uploaderDiv
   * @returns {string[]}
   */
  getAcceptedFileTypes(uploaderDiv) {
    const fileInput = uploaderDiv.querySelector('input[type=file]');
    const acceptedString = fileInput.getAttribute('accept');

    return acceptedString.split(',');
  }

  /**
   * method to get sting with accepted file types
   * @param uploaderDiv
   * @returns {string}
   */
  getFormattedAcceptedFileTypes(uploaderDiv) {
    const fileTypes = this.getAcceptedFileTypes(uploaderDiv);
    let typeString = '';

    for (const fullType of fileTypes) {
      const type = fullType.split('/')[1];
      if (typeString === '') {
        typeString +=  `.${type}`;
      } else {
        typeString += `, .${type}`;
      }
    }

    return typeString;
  }

  /**
   * method to create all html elements of the drag file uploader
   * @param uploader
   */
  initHtmlElements(uploader) {
    const parentUploaderDiv = document.createElement('div');
    parentUploaderDiv.id = `inner-${uploader.id}`;
    parentUploaderDiv.classList.add('ribs-fileuploader');
    uploader.parentNode.insertBefore(parentUploaderDiv, uploader);
    parentUploaderDiv.appendChild(uploader);

    const selectFileButton = document.createElement('label');
    selectFileButton.textContent = 'Sélectionnez des fichiers';
    selectFileButton.setAttribute('for', uploader.id);
    parentUploaderDiv.append(selectFileButton);

    const textDiv = document.createElement('div');
    textDiv.classList.add('ribs-fileuploader-text');
    textDiv.textContent = 'Ou déposez les ici';
    parentUploaderDiv.append(textDiv);

    const progressBar = document.createElement('div');
    progressBar.classList.add('progress');
    progressBar.max = 100;
    progressBar.value = 0;
    parentUploaderDiv.append(progressBar);

    const inputFileNumber = document.createElement('input');
    inputFileNumber.type = 'hidden';
    inputFileNumber.id = `${uploader.id}-file-number`;
    inputFileNumber.value = 0;
    parentUploaderDiv.append(inputFileNumber);

    const progressBarProgress = document.createElement('div');
    progressBar.append(progressBarProgress);

    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('ribs-fileuploader-gallery');
    parentUploaderDiv.append(galleryDiv);
  }

  /**
   * method to init all events listeners on uploader divs
   */
  initEventListeners() {
    this.initPreventDefaultsEvents();
    this.initDragEnterEvents();
    this.initDragOutEvents();
    this.initDropEvents();
    this.initInputFileOnchange();
    this.initRetrieveFiles();
  }

  /**
   * add events prevent defaults to do not show file on drop in page
   */
  initPreventDefaultsEvents() {
    ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      document.body.addEventListener(eventName, (event) => {
        event.preventDefault();
        event.stopPropagation();
      }, false);

      document.querySelectorAll('.ribs-fileuploader').forEach((element) => {
        element.addEventListener(eventName, (event) => {
          event.preventDefault();
          event.stopPropagation();
        }, false);
      });
    });
  }

  /**
   * method to add class is-dragover when enter on uploader zone with files
   */
  initDragEnterEvents() {
    ;['dragenter', 'dragover'].forEach(eventName => {
      document.querySelectorAll('.ribs-fileuploader').forEach((element) => {
        element.addEventListener(eventName, () => {
          element.classList.add('is-dragover');
        }, false);
      });
    });
  }

  /**
   * method to add class is-dragover when qui drag of uploader or drop file
   */
  initDragOutEvents() {
    ;['dragleave', 'drop'].forEach(eventName => {
      document.querySelectorAll('.ribs-fileuploader').forEach((element) => {
        element.addEventListener(eventName, () => {
          element.classList.remove('is-dragover');
        }, false);
      });
    });
  }

  /**
   * method to add drops events to prepare upload and file preview
   */
  initDropEvents() {
    document.querySelectorAll('.ribs-fileuploader').forEach((uploaderDiv) => {
      uploaderDiv.addEventListener('drop', (event) => {
        this.handleFilesUpload(event, uploaderDiv);
      }, false);
    });
  }

  /**
   * upload with click on label
   */
  initInputFileOnchange() {
    document.querySelectorAll('.ribs-fileuploader').forEach((uploaderDiv) => {
      uploaderDiv.querySelector('input[type=file]').addEventListener('change', (event) => {
        this.handleFilesUpload(event, uploaderDiv, true);
      }, false);
    });
  }

  /**
   * method to display message when there is an error
   * @param uploaderDiv
   */
  showError(uploaderDiv) {
    const textDiv = document.createElement('div');
    textDiv.classList.add('ribs-fileuploader-error');
    console.log(this.getFormattedAcceptedFileTypes(uploaderDiv))
    textDiv.textContent = `Les extensions de fichier autorisées sont les suivantes : ${this.getFormattedAcceptedFileTypes(uploaderDiv)}`;
    uploaderDiv.prepend(textDiv);
  }

  initRetrieveFiles() {
    document.querySelectorAll('.ribs-fileuploader').forEach((uploaderDiv) => {
      const parameters = this.retrieveParameter(uploaderDiv, 'retrieveUrlParam');
      const url = this.retrieveUrl(this.options.retrieveFilesUrl, parameters);

      if (!url || url == '') {
        console.error(`Url to retrieve file can't be null for uploader id ${uploaderDiv.id}`);
        return false;
      }

      const xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Accept', 'application/json');

      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const jsonResponse = JSON.parse(xhr.response);

          if (jsonResponse.files && jsonResponse.files.length > 0) {
            uploaderDiv.classList.add('has-files');

            for (const file of jsonResponse.files) {
              this.appendPreviewImageDiv(uploaderDiv, file.file_path, file.index);
              this.appendUploadElements(uploaderDiv, JSON.stringify(file), file.index);

              const fileNumberInput = uploaderDiv.querySelector('[id*="file-number"]');
              fileNumberInput.value = parseInt(fileNumberInput.value) + 1;
            }
          }
        } else if (xhr.readyState == 4 && xhr.status != 200) {
          console.log('error');
        }
      });

      xhr.send(this.buildFormData(parameters));
    });
  }

  /**
   * method to prepare upload file and preview with drop on change event
   * @param event
   * @param uploaderDiv
   * @param fromChangeEvent
   */
  handleFilesUpload(event, uploaderDiv, fromChangeEvent = false) {
    let files;
    const dt = event.dataTransfer;

    if (fromChangeEvent) {
      files = [...event.currentTarget.files];
    } else {
      files = [...dt.files];
    }

    for (let [index, file] of files.entries()) {
      if (this.getAcceptedFileTypes(uploaderDiv).indexOf(file.type) === -1) {
        files.splice(index, 1);
      }
    }

    const fileNumberInput = uploaderDiv.querySelector('[id*="file-number"]');
    let startIndex = 0;

    if (parseInt(fileNumberInput.value) === 0) {
      fileNumberInput.value = parseInt(fileNumberInput.value) + files.length;
    } else {
      fileNumberInput.value  = parseInt(fileNumberInput.value) + files.length;
      startIndex = parseInt(fileNumberInput.value) - files.length;
    }

    if (files.length > 0) {
      uploaderDiv.classList.add('has-files');
      this.initializeProgress(uploaderDiv, files.length);
      files.forEach((file, index) => {
        this.uploadFile(file, startIndex+index, index, uploaderDiv);
      });

      files.forEach((file, index) => {
        this.previewFile(file, uploaderDiv, startIndex+index)
      });
    } else {
      this.showError(uploaderDiv);
    }
  }

  /**
   * @param uploaderDiv
   * @param numFiles
   */
  initializeProgress(uploaderDiv, numFiles) {
    this.uploadProgress[uploaderDiv.id] = [];

    for(let i = numFiles; i > 0; i--) {
      this.uploadProgress[uploaderDiv.id].push(0);
    }
  }

  /**
   * @param uploaderDiv
   * @param fileNumber
   * @param percent
   */
  updateProgress(uploaderDiv, fileNumber, percent) {
    const progressBar = uploaderDiv.querySelector('.progress').querySelector('div');
    this.uploadProgress[uploaderDiv.id][fileNumber] = percent;
    let total = this.uploadProgress[uploaderDiv.id].reduce((tot, curr) => tot + curr, 0) / this.uploadProgress[uploaderDiv.id].length;
    progressBar.style.width = `${total}%`;

    if (total === 100) {
      progressBar.classList.add('uploaded');
    }
  }

  /**
   * method to retrieve a specific parameter write on input file
   * @param uploaderDiv
   * @param parameter
   * @returns {string | undefined}
   */
  retrieveParameter(uploaderDiv, parameter) {
    const inputFile = uploaderDiv.querySelector('input[type=file]');
    const parameters = inputFile.dataset[parameter];

    if (parameters) {
      try {
        return JSON.parse(parameters);
      } catch (e) {
        console.warn('Erreur in uploader JSON');
        return false;
      }
    }

    return false;
  }

  /**
   * method to retrieve url with parameters or config url
   * @param url
   * @param parameters
   * @returns {null|*}
   */
  retrieveUrl(url, parameters) {
    if (parameters && parameters.url && parameters.url !== '') {
      return parameters.url;
    } else if (url && url !== '') {
      return url;
    } else {
      return null;
    }
  }

  /**
   * method to build form data with parameters of input
   * @param parameters
   * @param file
   * @returns {FormData}
   */
  buildFormData(parameters, file = null) {
    const formData = new FormData();

    for (const tempData in parameters) {
      if (tempData !== 'url') {
        formData.append(tempData, parameters[tempData]);
      }
    }

    if (file) {
      formData.append('file', file);
    }

    return formData;
  }

  /**
   * @param file
   * @param index
   * @param progressIndex
   * @param uploaderDiv
   */
  uploadFile(file, index, progressIndex, uploaderDiv) {
    const parameters = this.retrieveParameter(uploaderDiv, 'urlParam');
    const url = this.retrieveUrl(this.options.url, parameters);

    if (!url || url == '') {
      console.error(`Url to upload file can't be null for uploader id ${uploaderDiv.id}`);
      return false;
    }

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.upload.addEventListener("progress", (event) => {
      this.updateProgress(uploaderDiv, progressIndex, (event.loaded * 100.0 / event.total) || 100);
    });

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.appendUploadElements(uploaderDiv, xhr.response, index);
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.log('error');
      }
    });

    xhr.send(this.buildFormData(parameters, file));
  }

  /**
   * method to appends upload elements to body
   * @param uploaderDiv
   * @param inputValue
   * @param index
   */
  appendUploadElements(uploaderDiv, inputValue, index) {
    const fileInputId = uploaderDiv.querySelector('input[type=file').id;
    const input = document.createElement('input');
    input.type = 'hidden';
    input.value = inputValue;
    input.name = `${fileInputId}s[]`;
    input.id = `input-uploaded-file-${index}`;
    uploaderDiv.append(input);
    const uploadedFilePreview = uploaderDiv.querySelector(`#uploaded-file-${index}`);
    uploadedFilePreview.classList.add('uploaded');
    uploadedFilePreview.querySelector('div').addEventListener('click', (event) => this.deleteFile(event, uploaderDiv));
  }

  /**
   * method to preview file durng upload
   * @param file
   * @param uploaderDiv
   * @param index
   */
  previewFile(file, uploaderDiv, index) {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.appendPreviewImageDiv(uploaderDiv, reader.result, index);
    }
  }

  /**
   * method to create image element in gallery div
   * @param uploaderDiv
   * @param filePath
   * @param index
   */
  appendPreviewImageDiv(uploaderDiv, filePath, index) {
    const img = document.createElement('img');
    img.src = filePath;
    const div = document.createElement('div');
    div.id = `uploaded-file-${index}`;
    const delDiv = document.createElement('div');
    delDiv.id = `uploaded-file-delete-${index}`;
    delDiv.textContent = 'X';
    div.appendChild(delDiv);
    div.appendChild(img);
    uploaderDiv.querySelector('.ribs-fileuploader-gallery').appendChild(div);
  }

  /**
   * method to deletes uploaded files
   * @param event
   * @param uploaderDiv
   */
  deleteFile(event, uploaderDiv) {
    const parameters = this.retrieveParameter(uploaderDiv, 'deleteUrlParam');
    const url = this.retrieveUrl(this.options.deleteUrl, parameters);

    if (!url || url == '') {
      console.error(`Url to delete file can't be null for uploader id ${uploaderDiv.id}`);
      return false;
    }

    const imageDiv = event.currentTarget.parentNode;
    const inputImageInfo = uploaderDiv.querySelector(`#input-${imageDiv.id}`);
    const imageInfo = JSON.parse(inputImageInfo.value);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const data = JSON.parse(xhr.response);
        if (data.success) {
          imageDiv.remove();
          inputImageInfo.remove();

          if (uploaderDiv.querySelector('.ribs-fileuploader-gallery').childNodes.length === 0) {
            uploaderDiv.classList.remove('has-files');
            const progressBar = uploaderDiv.querySelector('.progress > div');
            progressBar.classList.remove('uploaded');
            progressBar.style.width = '0%';
          }
        }
      } else if (xhr.readyState == 4 && xhr.status != 200) {
        console.log('error');
      }
    });

    const formData = this.buildFormData(parameters);
    formData.append('file_path', imageInfo.file_path);
    formData.append('file_name', imageInfo.new_filename ? imageInfo.new_filename : imageInfo.filename);
    xhr.send(formData);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (RibsFileUploader);


/***/ }),

/***/ 4:
/*!******************************************!*\
  !*** multi ./assets/js/packages/edit.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./assets/js/packages/edit.js */"./assets/js/packages/edit.js");


/***/ })

},[[4,"runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcGFja2FnZXMvZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy1maWxlLXVwbG9hZGVyL2Rpc3QvanMvUmlic0ZpbGVVcGxvYWRlci5qcyJdLCJuYW1lcyI6WyJmaWxlVXBsb2FkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxJQUFNQSxZQUFZLEdBQUcsK0RBQXFCO0FBQ3hDLFNBRHdDO0FBRXhDLGVBQWE7QUFGMkIsQ0FBckIsQ0FBckIsQzs7Ozs7Ozs7Ozs7O0FDRkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsS0FBSztBQUNoQyxPQUFPO0FBQ1AsNEJBQTRCLEtBQUs7QUFDakM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxZQUFZO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsWUFBWTtBQUN4QztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGLGdEQUFnRDtBQUN2STtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEVBQTRFLGVBQWU7QUFDM0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCLE9BQU87QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxNQUFNOztBQUV2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0VBQXdFLGVBQWU7QUFDdkY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDLHNDQUFzQyxNQUFNO0FBQzVDO0FBQ0EsNEVBQTRFLE1BQU07QUFDbEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixNQUFNO0FBQ3BDO0FBQ0Esd0NBQXdDLE1BQU07QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0VBQXdFLGVBQWU7QUFDdkY7QUFDQTs7QUFFQTtBQUNBLCtEQUErRCxZQUFZO0FBQzNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsK0VBQWdCLEVBQUMiLCJmaWxlIjoianMvZWRpdC1wYWNrYWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJpYnNGaWxlVXBsb2FkZXIgZnJvbSAncmlicy1maWxlLXVwbG9hZGVyJztcblxuY29uc3QgZmlsZVVwbG9hZGVyID0gbmV3IFJpYnNGaWxlVXBsb2FkZXIoe1xuICAndXJsJzogJ2h0dHBzOi8vcmlicy1zZjQuYW50aG9ueS1waWxsb3VkLmZyL3JpYnMtYWRtaW4vdXBsb2FkJyxcbiAgJ2RlbGV0ZVVybCc6ICdodHRwczovL3JpYnMtc2Y0LmFudGhvbnktcGlsbG91ZC5mci9yaWJzLWFkbWluL2RlbGV0ZS11cGxvYWRlZC1maWxlJyxcbn0pOyIsImNsYXNzIFJpYnNGaWxlVXBsb2FkZXIge1xuICAvKipcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHVwbG9hZGVySW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmlicy1maWxldXBsb2FkZXJdJyk7XG5cbiAgICB1cGxvYWRlcklucHV0cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLmluaXRIdG1sRWxlbWVudHMoZWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnVwbG9hZFByb2dyZXNzID0gW107XG4gICAgdGhpcy5kZWZpbmVPcHRpb25zKG9wdGlvbnMpO1xuICAgIHRoaXMuaW5pdEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIGRlZmluZU9wdGlvbnMob3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucy51cmwpIHtcbiAgICAgIG9wdGlvbnMudXJsID0gJyc7XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5kZWxldGVVcmwpIHtcbiAgICAgIG9wdGlvbnMuZGVsZXRlVXJsID0gJyc7XG4gICAgfVxuICAgIGlmICghb3B0aW9ucy5yZXRyaWV2ZUZpbGVzVXJsKSB7XG4gICAgICBvcHRpb25zLnJldHJpZXZlRmlsZXNVcmwgPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBnZXQgYW4gYXJyYXkgb2YgYWNjZXB0ZWQgZmlsZSB0eXBlc1xuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICogQHJldHVybnMge3N0cmluZ1tdfVxuICAgKi9cbiAgZ2V0QWNjZXB0ZWRGaWxlVHlwZXModXBsb2FkZXJEaXYpIHtcbiAgICBjb25zdCBmaWxlSW5wdXQgPSB1cGxvYWRlckRpdi5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWZpbGVdJyk7XG4gICAgY29uc3QgYWNjZXB0ZWRTdHJpbmcgPSBmaWxlSW5wdXQuZ2V0QXR0cmlidXRlKCdhY2NlcHQnKTtcblxuICAgIHJldHVybiBhY2NlcHRlZFN0cmluZy5zcGxpdCgnLCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBnZXQgc3Rpbmcgd2l0aCBhY2NlcHRlZCBmaWxlIHR5cGVzXG4gICAqIEBwYXJhbSB1cGxvYWRlckRpdlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZ2V0Rm9ybWF0dGVkQWNjZXB0ZWRGaWxlVHlwZXModXBsb2FkZXJEaXYpIHtcbiAgICBjb25zdCBmaWxlVHlwZXMgPSB0aGlzLmdldEFjY2VwdGVkRmlsZVR5cGVzKHVwbG9hZGVyRGl2KTtcbiAgICBsZXQgdHlwZVN0cmluZyA9ICcnO1xuXG4gICAgZm9yIChjb25zdCBmdWxsVHlwZSBvZiBmaWxlVHlwZXMpIHtcbiAgICAgIGNvbnN0IHR5cGUgPSBmdWxsVHlwZS5zcGxpdCgnLycpWzFdO1xuICAgICAgaWYgKHR5cGVTdHJpbmcgPT09ICcnKSB7XG4gICAgICAgIHR5cGVTdHJpbmcgKz0gIGAuJHt0eXBlfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0eXBlU3RyaW5nICs9IGAsIC4ke3R5cGV9YDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHlwZVN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY3JlYXRlIGFsbCBodG1sIGVsZW1lbnRzIG9mIHRoZSBkcmFnIGZpbGUgdXBsb2FkZXJcbiAgICogQHBhcmFtIHVwbG9hZGVyXG4gICAqL1xuICBpbml0SHRtbEVsZW1lbnRzKHVwbG9hZGVyKSB7XG4gICAgY29uc3QgcGFyZW50VXBsb2FkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnRVcGxvYWRlckRpdi5pZCA9IGBpbm5lci0ke3VwbG9hZGVyLmlkfWA7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuY2xhc3NMaXN0LmFkZCgncmlicy1maWxldXBsb2FkZXInKTtcbiAgICB1cGxvYWRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwYXJlbnRVcGxvYWRlckRpdiwgdXBsb2FkZXIpO1xuICAgIHBhcmVudFVwbG9hZGVyRGl2LmFwcGVuZENoaWxkKHVwbG9hZGVyKTtcblxuICAgIGNvbnN0IHNlbGVjdEZpbGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHNlbGVjdEZpbGVCdXR0b24udGV4dENvbnRlbnQgPSAnU8OpbGVjdGlvbm5leiBkZXMgZmljaGllcnMnO1xuICAgIHNlbGVjdEZpbGVCdXR0b24uc2V0QXR0cmlidXRlKCdmb3InLCB1cGxvYWRlci5pZCk7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuYXBwZW5kKHNlbGVjdEZpbGVCdXR0b24pO1xuXG4gICAgY29uc3QgdGV4dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRleHREaXYuY2xhc3NMaXN0LmFkZCgncmlicy1maWxldXBsb2FkZXItdGV4dCcpO1xuICAgIHRleHREaXYudGV4dENvbnRlbnQgPSAnT3UgZMOpcG9zZXogbGVzIGljaSc7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuYXBwZW5kKHRleHREaXYpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9ncmVzc0Jhci5jbGFzc0xpc3QuYWRkKCdwcm9ncmVzcycpO1xuICAgIHByb2dyZXNzQmFyLm1heCA9IDEwMDtcbiAgICBwcm9ncmVzc0Jhci52YWx1ZSA9IDA7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuYXBwZW5kKHByb2dyZXNzQmFyKTtcblxuICAgIGNvbnN0IGlucHV0RmlsZU51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRGaWxlTnVtYmVyLnR5cGUgPSAnaGlkZGVuJztcbiAgICBpbnB1dEZpbGVOdW1iZXIuaWQgPSBgJHt1cGxvYWRlci5pZH0tZmlsZS1udW1iZXJgO1xuICAgIGlucHV0RmlsZU51bWJlci52YWx1ZSA9IDA7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuYXBwZW5kKGlucHV0RmlsZU51bWJlcik7XG5cbiAgICBjb25zdCBwcm9ncmVzc0JhclByb2dyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvZ3Jlc3NCYXIuYXBwZW5kKHByb2dyZXNzQmFyUHJvZ3Jlc3MpO1xuXG4gICAgY29uc3QgZ2FsbGVyeURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdhbGxlcnlEaXYuY2xhc3NMaXN0LmFkZCgncmlicy1maWxldXBsb2FkZXItZ2FsbGVyeScpO1xuICAgIHBhcmVudFVwbG9hZGVyRGl2LmFwcGVuZChnYWxsZXJ5RGl2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdCBhbGwgZXZlbnRzIGxpc3RlbmVycyBvbiB1cGxvYWRlciBkaXZzXG4gICAqL1xuICBpbml0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5pbml0UHJldmVudERlZmF1bHRzRXZlbnRzKCk7XG4gICAgdGhpcy5pbml0RHJhZ0VudGVyRXZlbnRzKCk7XG4gICAgdGhpcy5pbml0RHJhZ091dEV2ZW50cygpO1xuICAgIHRoaXMuaW5pdERyb3BFdmVudHMoKTtcbiAgICB0aGlzLmluaXRJbnB1dEZpbGVPbmNoYW5nZSgpO1xuICAgIHRoaXMuaW5pdFJldHJpZXZlRmlsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgZXZlbnRzIHByZXZlbnQgZGVmYXVsdHMgdG8gZG8gbm90IHNob3cgZmlsZSBvbiBkcm9wIGluIHBhZ2VcbiAgICovXG4gIGluaXRQcmV2ZW50RGVmYXVsdHNFdmVudHMoKSB7XG4gICAgO1snZHJhZ2VudGVyJywgJ2RyYWdvdmVyJywgJ2RyYWdsZWF2ZScsICdkcm9wJ10uZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmlicy1maWxldXBsb2FkZXInKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChldmVudCkgPT4ge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgY2xhc3MgaXMtZHJhZ292ZXIgd2hlbiBlbnRlciBvbiB1cGxvYWRlciB6b25lIHdpdGggZmlsZXNcbiAgICovXG4gIGluaXREcmFnRW50ZXJFdmVudHMoKSB7XG4gICAgO1snZHJhZ2VudGVyJywgJ2RyYWdvdmVyJ10uZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtZmlsZXVwbG9hZGVyJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1kcmFnb3ZlcicpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGNsYXNzIGlzLWRyYWdvdmVyIHdoZW4gcXVpIGRyYWcgb2YgdXBsb2FkZXIgb3IgZHJvcCBmaWxlXG4gICAqL1xuICBpbml0RHJhZ091dEV2ZW50cygpIHtcbiAgICA7WydkcmFnbGVhdmUnLCAnZHJvcCddLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLWZpbGV1cGxvYWRlcicpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtZHJhZ292ZXInKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFkZCBkcm9wcyBldmVudHMgdG8gcHJlcGFyZSB1cGxvYWQgYW5kIGZpbGUgcHJldmlld1xuICAgKi9cbiAgaW5pdERyb3BFdmVudHMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtZmlsZXVwbG9hZGVyJykuZm9yRWFjaCgodXBsb2FkZXJEaXYpID0+IHtcbiAgICAgIHVwbG9hZGVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVGaWxlc1VwbG9hZChldmVudCwgdXBsb2FkZXJEaXYpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwbG9hZCB3aXRoIGNsaWNrIG9uIGxhYmVsXG4gICAqL1xuICBpbml0SW5wdXRGaWxlT25jaGFuZ2UoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtZmlsZXVwbG9hZGVyJykuZm9yRWFjaCgodXBsb2FkZXJEaXYpID0+IHtcbiAgICAgIHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9ZmlsZV0nKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVGaWxlc1VwbG9hZChldmVudCwgdXBsb2FkZXJEaXYsIHRydWUpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBkaXNwbGF5IG1lc3NhZ2Ugd2hlbiB0aGVyZSBpcyBhbiBlcnJvclxuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICovXG4gIHNob3dFcnJvcih1cGxvYWRlckRpdikge1xuICAgIGNvbnN0IHRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZXh0RGl2LmNsYXNzTGlzdC5hZGQoJ3JpYnMtZmlsZXVwbG9hZGVyLWVycm9yJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5nZXRGb3JtYXR0ZWRBY2NlcHRlZEZpbGVUeXBlcyh1cGxvYWRlckRpdikpXG4gICAgdGV4dERpdi50ZXh0Q29udGVudCA9IGBMZXMgZXh0ZW5zaW9ucyBkZSBmaWNoaWVyIGF1dG9yaXPDqWVzIHNvbnQgbGVzIHN1aXZhbnRlcyA6ICR7dGhpcy5nZXRGb3JtYXR0ZWRBY2NlcHRlZEZpbGVUeXBlcyh1cGxvYWRlckRpdil9YDtcbiAgICB1cGxvYWRlckRpdi5wcmVwZW5kKHRleHREaXYpO1xuICB9XG5cbiAgaW5pdFJldHJpZXZlRmlsZXMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtZmlsZXVwbG9hZGVyJykuZm9yRWFjaCgodXBsb2FkZXJEaXYpID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSB0aGlzLnJldHJpZXZlUGFyYW1ldGVyKHVwbG9hZGVyRGl2LCAncmV0cmlldmVVcmxQYXJhbScpO1xuICAgICAgY29uc3QgdXJsID0gdGhpcy5yZXRyaWV2ZVVybCh0aGlzLm9wdGlvbnMucmV0cmlldmVGaWxlc1VybCwgcGFyYW1ldGVycyk7XG5cbiAgICAgIGlmICghdXJsIHx8IHVybCA9PSAnJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBVcmwgdG8gcmV0cmlldmUgZmlsZSBjYW4ndCBiZSBudWxswqBmb3IgdXBsb2FkZXIgaWQgJHt1cGxvYWRlckRpdi5pZH1gKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsICgpID0+IHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XG5cbiAgICAgICAgICBpZiAoanNvblJlc3BvbnNlLmZpbGVzICYmIGpzb25SZXNwb25zZS5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB1cGxvYWRlckRpdi5jbGFzc0xpc3QuYWRkKCdoYXMtZmlsZXMnKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGpzb25SZXNwb25zZS5maWxlcykge1xuICAgICAgICAgICAgICB0aGlzLmFwcGVuZFByZXZpZXdJbWFnZURpdih1cGxvYWRlckRpdiwgZmlsZS5maWxlX3BhdGgsIGZpbGUuaW5kZXgpO1xuICAgICAgICAgICAgICB0aGlzLmFwcGVuZFVwbG9hZEVsZW1lbnRzKHVwbG9hZGVyRGl2LCBKU09OLnN0cmluZ2lmeShmaWxlKSwgZmlsZS5pbmRleCk7XG5cbiAgICAgICAgICAgICAgY29uc3QgZmlsZU51bWJlcklucHV0ID0gdXBsb2FkZXJEaXYucXVlcnlTZWxlY3RvcignW2lkKj1cImZpbGUtbnVtYmVyXCJdJyk7XG4gICAgICAgICAgICAgIGZpbGVOdW1iZXJJbnB1dC52YWx1ZSA9IHBhcnNlSW50KGZpbGVOdW1iZXJJbnB1dC52YWx1ZSkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB4aHIuc2VuZCh0aGlzLmJ1aWxkRm9ybURhdGEocGFyYW1ldGVycykpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBwcmVwYXJlIHVwbG9hZCBmaWxlIGFuZCBwcmV2aWV3IHdpdGggZHJvcCBvbiBjaGFuZ2UgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSB1cGxvYWRlckRpdlxuICAgKiBAcGFyYW0gZnJvbUNoYW5nZUV2ZW50XG4gICAqL1xuICBoYW5kbGVGaWxlc1VwbG9hZChldmVudCwgdXBsb2FkZXJEaXYsIGZyb21DaGFuZ2VFdmVudCA9IGZhbHNlKSB7XG4gICAgbGV0IGZpbGVzO1xuICAgIGNvbnN0IGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuXG4gICAgaWYgKGZyb21DaGFuZ2VFdmVudCkge1xuICAgICAgZmlsZXMgPSBbLi4uZXZlbnQuY3VycmVudFRhcmdldC5maWxlc107XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVzID0gWy4uLmR0LmZpbGVzXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIGZpbGVzLmVudHJpZXMoKSkge1xuICAgICAgaWYgKHRoaXMuZ2V0QWNjZXB0ZWRGaWxlVHlwZXModXBsb2FkZXJEaXYpLmluZGV4T2YoZmlsZS50eXBlKSA9PT0gLTEpIHtcbiAgICAgICAgZmlsZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBmaWxlTnVtYmVySW5wdXQgPSB1cGxvYWRlckRpdi5xdWVyeVNlbGVjdG9yKCdbaWQqPVwiZmlsZS1udW1iZXJcIl0nKTtcbiAgICBsZXQgc3RhcnRJbmRleCA9IDA7XG5cbiAgICBpZiAocGFyc2VJbnQoZmlsZU51bWJlcklucHV0LnZhbHVlKSA9PT0gMCkge1xuICAgICAgZmlsZU51bWJlcklucHV0LnZhbHVlID0gcGFyc2VJbnQoZmlsZU51bWJlcklucHV0LnZhbHVlKSArIGZpbGVzLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZU51bWJlcklucHV0LnZhbHVlICA9IHBhcnNlSW50KGZpbGVOdW1iZXJJbnB1dC52YWx1ZSkgKyBmaWxlcy5sZW5ndGg7XG4gICAgICBzdGFydEluZGV4ID0gcGFyc2VJbnQoZmlsZU51bWJlcklucHV0LnZhbHVlKSAtIGZpbGVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICBpZiAoZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgdXBsb2FkZXJEaXYuY2xhc3NMaXN0LmFkZCgnaGFzLWZpbGVzJyk7XG4gICAgICB0aGlzLmluaXRpYWxpemVQcm9ncmVzcyh1cGxvYWRlckRpdiwgZmlsZXMubGVuZ3RoKTtcbiAgICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHRoaXMudXBsb2FkRmlsZShmaWxlLCBzdGFydEluZGV4K2luZGV4LCBpbmRleCwgdXBsb2FkZXJEaXYpO1xuICAgICAgfSk7XG5cbiAgICAgIGZpbGVzLmZvckVhY2goKGZpbGUsIGluZGV4KSA9PiB7XG4gICAgICAgIHRoaXMucHJldmlld0ZpbGUoZmlsZSwgdXBsb2FkZXJEaXYsIHN0YXJ0SW5kZXgraW5kZXgpXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93RXJyb3IodXBsb2FkZXJEaXYpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICogQHBhcmFtIG51bUZpbGVzXG4gICAqL1xuICBpbml0aWFsaXplUHJvZ3Jlc3ModXBsb2FkZXJEaXYsIG51bUZpbGVzKSB7XG4gICAgdGhpcy51cGxvYWRQcm9ncmVzc1t1cGxvYWRlckRpdi5pZF0gPSBbXTtcblxuICAgIGZvcihsZXQgaSA9IG51bUZpbGVzOyBpID4gMDsgaS0tKSB7XG4gICAgICB0aGlzLnVwbG9hZFByb2dyZXNzW3VwbG9hZGVyRGl2LmlkXS5wdXNoKDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICogQHBhcmFtIGZpbGVOdW1iZXJcbiAgICogQHBhcmFtIHBlcmNlbnRcbiAgICovXG4gIHVwZGF0ZVByb2dyZXNzKHVwbG9hZGVyRGl2LCBmaWxlTnVtYmVyLCBwZXJjZW50KSB7XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSB1cGxvYWRlckRpdi5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MnKS5xdWVyeVNlbGVjdG9yKCdkaXYnKTtcbiAgICB0aGlzLnVwbG9hZFByb2dyZXNzW3VwbG9hZGVyRGl2LmlkXVtmaWxlTnVtYmVyXSA9IHBlcmNlbnQ7XG4gICAgbGV0IHRvdGFsID0gdGhpcy51cGxvYWRQcm9ncmVzc1t1cGxvYWRlckRpdi5pZF0ucmVkdWNlKCh0b3QsIGN1cnIpID0+IHRvdCArIGN1cnIsIDApIC8gdGhpcy51cGxvYWRQcm9ncmVzc1t1cGxvYWRlckRpdi5pZF0ubGVuZ3RoO1xuICAgIHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gYCR7dG90YWx9JWA7XG5cbiAgICBpZiAodG90YWwgPT09IDEwMCkge1xuICAgICAgcHJvZ3Jlc3NCYXIuY2xhc3NMaXN0LmFkZCgndXBsb2FkZWQnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHJldHJpZXZlIGEgc3BlY2lmaWMgcGFyYW1ldGVyIHdyaXRlIG9uIGlucHV0IGZpbGVcbiAgICogQHBhcmFtIHVwbG9hZGVyRGl2XG4gICAqIEBwYXJhbSBwYXJhbWV0ZXJcbiAgICogQHJldHVybnMge3N0cmluZyB8IHVuZGVmaW5lZH1cbiAgICovXG4gIHJldHJpZXZlUGFyYW1ldGVyKHVwbG9hZGVyRGl2LCBwYXJhbWV0ZXIpIHtcbiAgICBjb25zdCBpbnB1dEZpbGUgPSB1cGxvYWRlckRpdi5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWZpbGVdJyk7XG4gICAgY29uc3QgcGFyYW1ldGVycyA9IGlucHV0RmlsZS5kYXRhc2V0W3BhcmFtZXRlcl07XG5cbiAgICBpZiAocGFyYW1ldGVycykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UocGFyYW1ldGVycyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignRXJyZXVyIGluIHVwbG9hZGVyIEpTT04nKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcmV0cmlldmUgdXJsIHdpdGggcGFyYW1ldGVycyBvciBjb25maWcgdXJsXG4gICAqIEBwYXJhbSB1cmxcbiAgICogQHBhcmFtIHBhcmFtZXRlcnNcbiAgICogQHJldHVybnMge251bGx8Kn1cbiAgICovXG4gIHJldHJpZXZlVXJsKHVybCwgcGFyYW1ldGVycykge1xuICAgIGlmIChwYXJhbWV0ZXJzICYmIHBhcmFtZXRlcnMudXJsICYmIHBhcmFtZXRlcnMudXJsICE9PSAnJykge1xuICAgICAgcmV0dXJuIHBhcmFtZXRlcnMudXJsO1xuICAgIH0gZWxzZSBpZiAodXJsICYmIHVybCAhPT0gJycpIHtcbiAgICAgIHJldHVybiB1cmw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYnVpbGQgZm9ybSBkYXRhIHdpdGggcGFyYW1ldGVycyBvZiBpbnB1dFxuICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xuICAgKiBAcGFyYW0gZmlsZVxuICAgKiBAcmV0dXJucyB7Rm9ybURhdGF9XG4gICAqL1xuICBidWlsZEZvcm1EYXRhKHBhcmFtZXRlcnMsIGZpbGUgPSBudWxsKSB7XG4gICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICAgIGZvciAoY29uc3QgdGVtcERhdGEgaW4gcGFyYW1ldGVycykge1xuICAgICAgaWYgKHRlbXBEYXRhICE9PSAndXJsJykge1xuICAgICAgICBmb3JtRGF0YS5hcHBlbmQodGVtcERhdGEsIHBhcmFtZXRlcnNbdGVtcERhdGFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmlsZSkge1xuICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm1EYXRhO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBmaWxlXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKiBAcGFyYW0gcHJvZ3Jlc3NJbmRleFxuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICovXG4gIHVwbG9hZEZpbGUoZmlsZSwgaW5kZXgsIHByb2dyZXNzSW5kZXgsIHVwbG9hZGVyRGl2KSB7XG4gICAgY29uc3QgcGFyYW1ldGVycyA9IHRoaXMucmV0cmlldmVQYXJhbWV0ZXIodXBsb2FkZXJEaXYsICd1cmxQYXJhbScpO1xuICAgIGNvbnN0IHVybCA9IHRoaXMucmV0cmlldmVVcmwodGhpcy5vcHRpb25zLnVybCwgcGFyYW1ldGVycyk7XG5cbiAgICBpZiAoIXVybCB8fCB1cmwgPT0gJycpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFVybCB0byB1cGxvYWQgZmlsZSBjYW4ndCBiZSBudWxswqBmb3IgdXBsb2FkZXIgaWQgJHt1cGxvYWRlckRpdi5pZH1gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbignUE9TVCcsIHVybCwgdHJ1ZSk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJyk7XG5cbiAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3ModXBsb2FkZXJEaXYsIHByb2dyZXNzSW5kZXgsIChldmVudC5sb2FkZWQgKiAxMDAuMCAvIGV2ZW50LnRvdGFsKSB8fCAxMDApO1xuICAgIH0pO1xuXG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xuICAgICAgICB0aGlzLmFwcGVuZFVwbG9hZEVsZW1lbnRzKHVwbG9hZGVyRGl2LCB4aHIucmVzcG9uc2UsIGluZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzICE9IDIwMCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHhoci5zZW5kKHRoaXMuYnVpbGRGb3JtRGF0YShwYXJhbWV0ZXJzLCBmaWxlKSk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFwcGVuZHMgdXBsb2FkIGVsZW1lbnRzIHRvIGJvZHlcbiAgICogQHBhcmFtIHVwbG9hZGVyRGl2XG4gICAqIEBwYXJhbSBpbnB1dFZhbHVlXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgYXBwZW5kVXBsb2FkRWxlbWVudHModXBsb2FkZXJEaXYsIGlucHV0VmFsdWUsIGluZGV4KSB7XG4gICAgY29uc3QgZmlsZUlucHV0SWQgPSB1cGxvYWRlckRpdi5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPWZpbGUnKS5pZDtcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXQudHlwZSA9ICdoaWRkZW4nO1xuICAgIGlucHV0LnZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICBpbnB1dC5uYW1lID0gYCR7ZmlsZUlucHV0SWR9c1tdYDtcbiAgICBpbnB1dC5pZCA9IGBpbnB1dC11cGxvYWRlZC1maWxlLSR7aW5kZXh9YDtcbiAgICB1cGxvYWRlckRpdi5hcHBlbmQoaW5wdXQpO1xuICAgIGNvbnN0IHVwbG9hZGVkRmlsZVByZXZpZXcgPSB1cGxvYWRlckRpdi5xdWVyeVNlbGVjdG9yKGAjdXBsb2FkZWQtZmlsZS0ke2luZGV4fWApO1xuICAgIHVwbG9hZGVkRmlsZVByZXZpZXcuY2xhc3NMaXN0LmFkZCgndXBsb2FkZWQnKTtcbiAgICB1cGxvYWRlZEZpbGVQcmV2aWV3LnF1ZXJ5U2VsZWN0b3IoJ2RpdicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB0aGlzLmRlbGV0ZUZpbGUoZXZlbnQsIHVwbG9hZGVyRGl2KSk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIHByZXZpZXcgZmlsZSBkdXJuZyB1cGxvYWRcbiAgICogQHBhcmFtIGZpbGVcbiAgICogQHBhcmFtIHVwbG9hZGVyRGl2XG4gICAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgcHJldmlld0ZpbGUoZmlsZSwgdXBsb2FkZXJEaXYsIGluZGV4KSB7XG4gICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG5cbiAgICByZWFkZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgdGhpcy5hcHBlbmRQcmV2aWV3SW1hZ2VEaXYodXBsb2FkZXJEaXYsIHJlYWRlci5yZXN1bHQsIGluZGV4KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGNyZWF0ZSBpbWFnZSBlbGVtZW50IGluIGdhbGxlcnkgZGl2XG4gICAqIEBwYXJhbSB1cGxvYWRlckRpdlxuICAgKiBAcGFyYW0gZmlsZVBhdGhcbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBhcHBlbmRQcmV2aWV3SW1hZ2VEaXYodXBsb2FkZXJEaXYsIGZpbGVQYXRoLCBpbmRleCkge1xuICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZy5zcmMgPSBmaWxlUGF0aDtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaWQgPSBgdXBsb2FkZWQtZmlsZS0ke2luZGV4fWA7XG4gICAgY29uc3QgZGVsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZGVsRGl2LmlkID0gYHVwbG9hZGVkLWZpbGUtZGVsZXRlLSR7aW5kZXh9YDtcbiAgICBkZWxEaXYudGV4dENvbnRlbnQgPSAnWCc7XG4gICAgZGl2LmFwcGVuZENoaWxkKGRlbERpdik7XG4gICAgZGl2LmFwcGVuZENoaWxkKGltZyk7XG4gICAgdXBsb2FkZXJEaXYucXVlcnlTZWxlY3RvcignLnJpYnMtZmlsZXVwbG9hZGVyLWdhbGxlcnknKS5hcHBlbmRDaGlsZChkaXYpO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBkZWxldGVzIHVwbG9hZGVkIGZpbGVzXG4gICAqIEBwYXJhbSBldmVudFxuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICovXG4gIGRlbGV0ZUZpbGUoZXZlbnQsIHVwbG9hZGVyRGl2KSB7XG4gICAgY29uc3QgcGFyYW1ldGVycyA9IHRoaXMucmV0cmlldmVQYXJhbWV0ZXIodXBsb2FkZXJEaXYsICdkZWxldGVVcmxQYXJhbScpO1xuICAgIGNvbnN0IHVybCA9IHRoaXMucmV0cmlldmVVcmwodGhpcy5vcHRpb25zLmRlbGV0ZVVybCwgcGFyYW1ldGVycyk7XG5cbiAgICBpZiAoIXVybCB8fCB1cmwgPT0gJycpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYFVybCB0byBkZWxldGUgZmlsZSBjYW4ndCBiZSBudWxswqBmb3IgdXBsb2FkZXIgaWQgJHt1cGxvYWRlckRpdi5pZH1gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBpbWFnZURpdiA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZTtcbiAgICBjb25zdCBpbnB1dEltYWdlSW5mbyA9IHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoYCNpbnB1dC0ke2ltYWdlRGl2LmlkfWApO1xuICAgIGNvbnN0IGltYWdlSW5mbyA9IEpTT04ucGFyc2UoaW5wdXRJbWFnZUluZm8udmFsdWUpO1xuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIHhoci5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgKCkgPT4ge1xuICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcbiAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgIGltYWdlRGl2LnJlbW92ZSgpO1xuICAgICAgICAgIGlucHV0SW1hZ2VJbmZvLnJlbW92ZSgpO1xuXG4gICAgICAgICAgaWYgKHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoJy5yaWJzLWZpbGV1cGxvYWRlci1nYWxsZXJ5JykuY2hpbGROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHVwbG9hZGVyRGl2LmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1maWxlcycpO1xuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSB1cGxvYWRlckRpdi5xdWVyeVNlbGVjdG9yKCcucHJvZ3Jlc3MgPiBkaXYnKTtcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ3VwbG9hZGVkJyk7XG4gICAgICAgICAgICBwcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9ICcwJSc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyAhPSAyMDApIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBmb3JtRGF0YSA9IHRoaXMuYnVpbGRGb3JtRGF0YShwYXJhbWV0ZXJzKTtcbiAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGVfcGF0aCcsIGltYWdlSW5mby5maWxlX3BhdGgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZV9uYW1lJywgaW1hZ2VJbmZvLm5ld19maWxlbmFtZSA/IGltYWdlSW5mby5uZXdfZmlsZW5hbWUgOiBpbWFnZUluZm8uZmlsZW5hbWUpO1xuICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSaWJzRmlsZVVwbG9hZGVyO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==