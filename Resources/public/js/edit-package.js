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
      if (typeString === '') {
        typeString +=  `${fullType}`;
      } else {
        typeString += `, ${fullType}`;
      }
    }

    return typeString;
  }

  /**
   * method to know if file type is authorized for upload
   * @param uploaderDiv
   * @param fileType
   * @returns {boolean}
   */
  isFileTypeAccepted(uploaderDiv, fileType) {
    const acceptedFileType = this.getAcceptedFileTypes(uploaderDiv);
    const fileTypeCat = fileType.split('/')[0];

    if (acceptedFileType.indexOf(`${fileTypeCat}/*`) !== -1) {
      return true;
    } else if (acceptedFileType.indexOf(fileType) !== -1) {
      return true;
    }
    return false;
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
      if (!this.isFileTypeAccepted(uploaderDiv, file.type)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvcGFja2FnZXMvZWRpdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlicy1maWxlLXVwbG9hZGVyL2Rpc3QvanMvUmlic0ZpbGVVcGxvYWRlci5qcyJdLCJuYW1lcyI6WyJmaWxlVXBsb2FkZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFFQSxJQUFNQSxZQUFZLEdBQUcsK0RBQXFCO0FBQ3hDLFNBRHdDO0FBRXhDLGVBQWE7QUFGMkIsQ0FBckIsQ0FBckIsQzs7Ozs7Ozs7Ozs7O0FDRkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLFNBQVM7QUFDbkMsT0FBTztBQUNQLDJCQUEyQixTQUFTO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsWUFBWTtBQUNoRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsWUFBWTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVGQUF1RixnREFBZ0Q7QUFDdkk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDRFQUE0RSxlQUFlO0FBQzNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5QixPQUFPO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsTUFBTTs7QUFFdkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RSxlQUFlO0FBQ3ZGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsWUFBWTtBQUNoQyxzQ0FBc0MsTUFBTTtBQUM1QztBQUNBLDRFQUE0RSxNQUFNO0FBQ2xGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsTUFBTTtBQUNwQztBQUNBLHdDQUF3QyxNQUFNO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdFQUF3RSxlQUFlO0FBQ3ZGO0FBQ0E7O0FBRUE7QUFDQSwrREFBK0QsWUFBWTtBQUMzRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLCtFQUFnQixFQUFDIiwiZmlsZSI6ImpzL2VkaXQtcGFja2FnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSaWJzRmlsZVVwbG9hZGVyIGZyb20gJ3JpYnMtZmlsZS11cGxvYWRlcic7XG5cbmNvbnN0IGZpbGVVcGxvYWRlciA9IG5ldyBSaWJzRmlsZVVwbG9hZGVyKHtcbiAgJ3VybCc6ICdodHRwczovL3JpYnMtc2Y0LmFudGhvbnktcGlsbG91ZC5mci9yaWJzLWFkbWluL3VwbG9hZCcsXG4gICdkZWxldGVVcmwnOiAnaHR0cHM6Ly9yaWJzLXNmNC5hbnRob255LXBpbGxvdWQuZnIvcmlicy1hZG1pbi9kZWxldGUtdXBsb2FkZWQtZmlsZScsXG59KTsiLCJjbGFzcyBSaWJzRmlsZVVwbG9hZGVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCB1cGxvYWRlcklucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJpYnMtZmlsZXVwbG9hZGVyXScpO1xuXG4gICAgdXBsb2FkZXJJbnB1dHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5pbml0SHRtbEVsZW1lbnRzKGVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgdGhpcy51cGxvYWRQcm9ncmVzcyA9IFtdO1xuICAgIHRoaXMuZGVmaW5lT3B0aW9ucyhvcHRpb25zKTtcbiAgICB0aGlzLmluaXRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBkZWZpbmVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMudXJsKSB7XG4gICAgICBvcHRpb25zLnVybCA9ICcnO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMuZGVsZXRlVXJsKSB7XG4gICAgICBvcHRpb25zLmRlbGV0ZVVybCA9ICcnO1xuICAgIH1cbiAgICBpZiAoIW9wdGlvbnMucmV0cmlldmVGaWxlc1VybCkge1xuICAgICAgb3B0aW9ucy5yZXRyaWV2ZUZpbGVzVXJsID0gJyc7XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gZ2V0IGFuIGFycmF5IG9mIGFjY2VwdGVkIGZpbGUgdHlwZXNcbiAgICogQHBhcmFtIHVwbG9hZGVyRGl2XG4gICAqIEByZXR1cm5zIHtzdHJpbmdbXX1cbiAgICovXG4gIGdldEFjY2VwdGVkRmlsZVR5cGVzKHVwbG9hZGVyRGl2KSB7XG4gICAgY29uc3QgZmlsZUlucHV0ID0gdXBsb2FkZXJEaXYucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1maWxlXScpO1xuICAgIGNvbnN0IGFjY2VwdGVkU3RyaW5nID0gZmlsZUlucHV0LmdldEF0dHJpYnV0ZSgnYWNjZXB0Jyk7XG5cbiAgICByZXR1cm4gYWNjZXB0ZWRTdHJpbmcuc3BsaXQoJywnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gZ2V0IHN0aW5nIHdpdGggYWNjZXB0ZWQgZmlsZSB0eXBlc1xuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGdldEZvcm1hdHRlZEFjY2VwdGVkRmlsZVR5cGVzKHVwbG9hZGVyRGl2KSB7XG4gICAgY29uc3QgZmlsZVR5cGVzID0gdGhpcy5nZXRBY2NlcHRlZEZpbGVUeXBlcyh1cGxvYWRlckRpdik7XG4gICAgbGV0IHR5cGVTdHJpbmcgPSAnJztcblxuICAgIGZvciAoY29uc3QgZnVsbFR5cGUgb2YgZmlsZVR5cGVzKSB7XG4gICAgICBpZiAodHlwZVN0cmluZyA9PT0gJycpIHtcbiAgICAgICAgdHlwZVN0cmluZyArPSAgYCR7ZnVsbFR5cGV9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHR5cGVTdHJpbmcgKz0gYCwgJHtmdWxsVHlwZX1gO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0eXBlU3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBrbm93IGlmIGZpbGUgdHlwZSBpcyBhdXRob3JpemVkIGZvciB1cGxvYWRcbiAgICogQHBhcmFtIHVwbG9hZGVyRGl2XG4gICAqIEBwYXJhbSBmaWxlVHlwZVxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICovXG4gIGlzRmlsZVR5cGVBY2NlcHRlZCh1cGxvYWRlckRpdiwgZmlsZVR5cGUpIHtcbiAgICBjb25zdCBhY2NlcHRlZEZpbGVUeXBlID0gdGhpcy5nZXRBY2NlcHRlZEZpbGVUeXBlcyh1cGxvYWRlckRpdik7XG4gICAgY29uc3QgZmlsZVR5cGVDYXQgPSBmaWxlVHlwZS5zcGxpdCgnLycpWzBdO1xuXG4gICAgaWYgKGFjY2VwdGVkRmlsZVR5cGUuaW5kZXhPZihgJHtmaWxlVHlwZUNhdH0vKmApICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChhY2NlcHRlZEZpbGVUeXBlLmluZGV4T2YoZmlsZVR5cGUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY3JlYXRlIGFsbCBodG1sIGVsZW1lbnRzIG9mIHRoZSBkcmFnIGZpbGUgdXBsb2FkZXJcbiAgICogQHBhcmFtIHVwbG9hZGVyXG4gICAqL1xuICBpbml0SHRtbEVsZW1lbnRzKHVwbG9hZGVyKSB7XG4gICAgY29uc3QgcGFyZW50VXBsb2FkZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwYXJlbnRVcGxvYWRlckRpdi5pZCA9IGBpbm5lci0ke3VwbG9hZGVyLmlkfWA7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuY2xhc3NMaXN0LmFkZCgncmlicy1maWxldXBsb2FkZXInKTtcbiAgICB1cGxvYWRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShwYXJlbnRVcGxvYWRlckRpdiwgdXBsb2FkZXIpO1xuICAgIHBhcmVudFVwbG9hZGVyRGl2LmFwcGVuZENoaWxkKHVwbG9hZGVyKTtcblxuICAgIGNvbnN0IHNlbGVjdEZpbGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHNlbGVjdEZpbGVCdXR0b24udGV4dENvbnRlbnQgPSAnU8OpbGVjdGlvbm5leiBkZXMgZmljaGllcnMnO1xuICAgIHNlbGVjdEZpbGVCdXR0b24uc2V0QXR0cmlidXRlKCdmb3InLCB1cGxvYWRlci5pZCk7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuYXBwZW5kKHNlbGVjdEZpbGVCdXR0b24pO1xuXG4gICAgY29uc3QgdGV4dERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHRleHREaXYuY2xhc3NMaXN0LmFkZCgncmlicy1maWxldXBsb2FkZXItdGV4dCcpO1xuICAgIHRleHREaXYudGV4dENvbnRlbnQgPSAnT3UgZMOpcG9zZXogbGVzIGljaSc7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuYXBwZW5kKHRleHREaXYpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwcm9ncmVzc0Jhci5jbGFzc0xpc3QuYWRkKCdwcm9ncmVzcycpO1xuICAgIHByb2dyZXNzQmFyLm1heCA9IDEwMDtcbiAgICBwcm9ncmVzc0Jhci52YWx1ZSA9IDA7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuYXBwZW5kKHByb2dyZXNzQmFyKTtcblxuICAgIGNvbnN0IGlucHV0RmlsZU51bWJlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRGaWxlTnVtYmVyLnR5cGUgPSAnaGlkZGVuJztcbiAgICBpbnB1dEZpbGVOdW1iZXIuaWQgPSBgJHt1cGxvYWRlci5pZH0tZmlsZS1udW1iZXJgO1xuICAgIGlucHV0RmlsZU51bWJlci52YWx1ZSA9IDA7XG4gICAgcGFyZW50VXBsb2FkZXJEaXYuYXBwZW5kKGlucHV0RmlsZU51bWJlcik7XG5cbiAgICBjb25zdCBwcm9ncmVzc0JhclByb2dyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgcHJvZ3Jlc3NCYXIuYXBwZW5kKHByb2dyZXNzQmFyUHJvZ3Jlc3MpO1xuXG4gICAgY29uc3QgZ2FsbGVyeURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdhbGxlcnlEaXYuY2xhc3NMaXN0LmFkZCgncmlicy1maWxldXBsb2FkZXItZ2FsbGVyeScpO1xuICAgIHBhcmVudFVwbG9hZGVyRGl2LmFwcGVuZChnYWxsZXJ5RGl2KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gaW5pdCBhbGwgZXZlbnRzIGxpc3RlbmVycyBvbiB1cGxvYWRlciBkaXZzXG4gICAqL1xuICBpbml0RXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5pbml0UHJldmVudERlZmF1bHRzRXZlbnRzKCk7XG4gICAgdGhpcy5pbml0RHJhZ0VudGVyRXZlbnRzKCk7XG4gICAgdGhpcy5pbml0RHJhZ091dEV2ZW50cygpO1xuICAgIHRoaXMuaW5pdERyb3BFdmVudHMoKTtcbiAgICB0aGlzLmluaXRJbnB1dEZpbGVPbmNoYW5nZSgpO1xuICAgIHRoaXMuaW5pdFJldHJpZXZlRmlsZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBhZGQgZXZlbnRzIHByZXZlbnQgZGVmYXVsdHMgdG8gZG8gbm90IHNob3cgZmlsZSBvbiBkcm9wIGluIHBhZ2VcbiAgICovXG4gIGluaXRQcmV2ZW50RGVmYXVsdHNFdmVudHMoKSB7XG4gICAgO1snZHJhZ2VudGVyJywgJ2RyYWdvdmVyJywgJ2RyYWdsZWF2ZScsICdkcm9wJ10uZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucmlicy1maWxldXBsb2FkZXInKS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIChldmVudCkgPT4ge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBhZGQgY2xhc3MgaXMtZHJhZ292ZXIgd2hlbiBlbnRlciBvbiB1cGxvYWRlciB6b25lIHdpdGggZmlsZXNcbiAgICovXG4gIGluaXREcmFnRW50ZXJFdmVudHMoKSB7XG4gICAgO1snZHJhZ2VudGVyJywgJ2RyYWdvdmVyJ10uZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtZmlsZXVwbG9hZGVyJykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCAoKSA9PiB7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1kcmFnb3ZlcicpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYWRkIGNsYXNzIGlzLWRyYWdvdmVyIHdoZW4gcXVpIGRyYWcgb2YgdXBsb2FkZXIgb3IgZHJvcCBmaWxlXG4gICAqL1xuICBpbml0RHJhZ091dEV2ZW50cygpIHtcbiAgICA7WydkcmFnbGVhdmUnLCAnZHJvcCddLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yaWJzLWZpbGV1cGxvYWRlcicpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgKCkgPT4ge1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtZHJhZ292ZXInKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGFkZCBkcm9wcyBldmVudHMgdG8gcHJlcGFyZSB1cGxvYWQgYW5kIGZpbGUgcHJldmlld1xuICAgKi9cbiAgaW5pdERyb3BFdmVudHMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtZmlsZXVwbG9hZGVyJykuZm9yRWFjaCgodXBsb2FkZXJEaXYpID0+IHtcbiAgICAgIHVwbG9hZGVyRGl2LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVGaWxlc1VwbG9hZChldmVudCwgdXBsb2FkZXJEaXYpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHVwbG9hZCB3aXRoIGNsaWNrIG9uIGxhYmVsXG4gICAqL1xuICBpbml0SW5wdXRGaWxlT25jaGFuZ2UoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtZmlsZXVwbG9hZGVyJykuZm9yRWFjaCgodXBsb2FkZXJEaXYpID0+IHtcbiAgICAgIHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9ZmlsZV0nKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5oYW5kbGVGaWxlc1VwbG9hZChldmVudCwgdXBsb2FkZXJEaXYsIHRydWUpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBkaXNwbGF5IG1lc3NhZ2Ugd2hlbiB0aGVyZSBpcyBhbiBlcnJvclxuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICovXG4gIHNob3dFcnJvcih1cGxvYWRlckRpdikge1xuICAgIGNvbnN0IHRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0ZXh0RGl2LmNsYXNzTGlzdC5hZGQoJ3JpYnMtZmlsZXVwbG9hZGVyLWVycm9yJyk7XG4gICAgY29uc29sZS5sb2codGhpcy5nZXRGb3JtYXR0ZWRBY2NlcHRlZEZpbGVUeXBlcyh1cGxvYWRlckRpdikpXG4gICAgdGV4dERpdi50ZXh0Q29udGVudCA9IGBMZXMgZXh0ZW5zaW9ucyBkZSBmaWNoaWVyIGF1dG9yaXPDqWVzIHNvbnQgbGVzIHN1aXZhbnRlcyA6ICR7dGhpcy5nZXRGb3JtYXR0ZWRBY2NlcHRlZEZpbGVUeXBlcyh1cGxvYWRlckRpdil9YDtcbiAgICB1cGxvYWRlckRpdi5wcmVwZW5kKHRleHREaXYpO1xuICB9XG5cbiAgaW5pdFJldHJpZXZlRmlsZXMoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnJpYnMtZmlsZXVwbG9hZGVyJykuZm9yRWFjaCgodXBsb2FkZXJEaXYpID0+IHtcbiAgICAgIGNvbnN0IHBhcmFtZXRlcnMgPSB0aGlzLnJldHJpZXZlUGFyYW1ldGVyKHVwbG9hZGVyRGl2LCAncmV0cmlldmVVcmxQYXJhbScpO1xuICAgICAgY29uc3QgdXJsID0gdGhpcy5yZXRyaWV2ZVVybCh0aGlzLm9wdGlvbnMucmV0cmlldmVGaWxlc1VybCwgcGFyYW1ldGVycyk7XG5cbiAgICAgIGlmICghdXJsIHx8IHVybCA9PSAnJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBVcmwgdG8gcmV0cmlldmUgZmlsZSBjYW4ndCBiZSBudWxswqBmb3IgdXBsb2FkZXIgaWQgJHt1cGxvYWRlckRpdi5pZH1gKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsICgpID0+IHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgeGhyLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICBjb25zdCBqc29uUmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XG5cbiAgICAgICAgICBpZiAoanNvblJlc3BvbnNlLmZpbGVzICYmIGpzb25SZXNwb25zZS5maWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB1cGxvYWRlckRpdi5jbGFzc0xpc3QuYWRkKCdoYXMtZmlsZXMnKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBmaWxlIG9mIGpzb25SZXNwb25zZS5maWxlcykge1xuICAgICAgICAgICAgICB0aGlzLmFwcGVuZFByZXZpZXdJbWFnZURpdih1cGxvYWRlckRpdiwgZmlsZS5maWxlX3BhdGgsIGZpbGUuaW5kZXgpO1xuICAgICAgICAgICAgICB0aGlzLmFwcGVuZFVwbG9hZEVsZW1lbnRzKHVwbG9hZGVyRGl2LCBKU09OLnN0cmluZ2lmeShmaWxlKSwgZmlsZS5pbmRleCk7XG5cbiAgICAgICAgICAgICAgY29uc3QgZmlsZU51bWJlcklucHV0ID0gdXBsb2FkZXJEaXYucXVlcnlTZWxlY3RvcignW2lkKj1cImZpbGUtbnVtYmVyXCJdJyk7XG4gICAgICAgICAgICAgIGZpbGVOdW1iZXJJbnB1dC52YWx1ZSA9IHBhcnNlSW50KGZpbGVOdW1iZXJJbnB1dC52YWx1ZSkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB4aHIuc2VuZCh0aGlzLmJ1aWxkRm9ybURhdGEocGFyYW1ldGVycykpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBwcmVwYXJlIHVwbG9hZCBmaWxlIGFuZCBwcmV2aWV3IHdpdGggZHJvcCBvbiBjaGFuZ2UgZXZlbnRcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSB1cGxvYWRlckRpdlxuICAgKiBAcGFyYW0gZnJvbUNoYW5nZUV2ZW50XG4gICAqL1xuICBoYW5kbGVGaWxlc1VwbG9hZChldmVudCwgdXBsb2FkZXJEaXYsIGZyb21DaGFuZ2VFdmVudCA9IGZhbHNlKSB7XG4gICAgbGV0IGZpbGVzO1xuICAgIGNvbnN0IGR0ID0gZXZlbnQuZGF0YVRyYW5zZmVyO1xuXG4gICAgaWYgKGZyb21DaGFuZ2VFdmVudCkge1xuICAgICAgZmlsZXMgPSBbLi4uZXZlbnQuY3VycmVudFRhcmdldC5maWxlc107XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpbGVzID0gWy4uLmR0LmZpbGVzXTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBbaW5kZXgsIGZpbGVdIG9mIGZpbGVzLmVudHJpZXMoKSkge1xuICAgICAgaWYgKCF0aGlzLmlzRmlsZVR5cGVBY2NlcHRlZCh1cGxvYWRlckRpdiwgZmlsZS50eXBlKSkge1xuICAgICAgICBmaWxlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGZpbGVOdW1iZXJJbnB1dCA9IHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoJ1tpZCo9XCJmaWxlLW51bWJlclwiXScpO1xuICAgIGxldCBzdGFydEluZGV4ID0gMDtcblxuICAgIGlmIChwYXJzZUludChmaWxlTnVtYmVySW5wdXQudmFsdWUpID09PSAwKSB7XG4gICAgICBmaWxlTnVtYmVySW5wdXQudmFsdWUgPSBwYXJzZUludChmaWxlTnVtYmVySW5wdXQudmFsdWUpICsgZmlsZXMubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlTnVtYmVySW5wdXQudmFsdWUgID0gcGFyc2VJbnQoZmlsZU51bWJlcklucHV0LnZhbHVlKSArIGZpbGVzLmxlbmd0aDtcbiAgICAgIHN0YXJ0SW5kZXggPSBwYXJzZUludChmaWxlTnVtYmVySW5wdXQudmFsdWUpIC0gZmlsZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIGlmIChmaWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICB1cGxvYWRlckRpdi5jbGFzc0xpc3QuYWRkKCdoYXMtZmlsZXMnKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZVByb2dyZXNzKHVwbG9hZGVyRGl2LCBmaWxlcy5sZW5ndGgpO1xuICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgICAgdGhpcy51cGxvYWRGaWxlKGZpbGUsIHN0YXJ0SW5kZXgraW5kZXgsIGluZGV4LCB1cGxvYWRlckRpdik7XG4gICAgICB9KTtcblxuICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSwgaW5kZXgpID0+IHtcbiAgICAgICAgdGhpcy5wcmV2aWV3RmlsZShmaWxlLCB1cGxvYWRlckRpdiwgc3RhcnRJbmRleCtpbmRleClcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dFcnJvcih1cGxvYWRlckRpdik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB1cGxvYWRlckRpdlxuICAgKiBAcGFyYW0gbnVtRmlsZXNcbiAgICovXG4gIGluaXRpYWxpemVQcm9ncmVzcyh1cGxvYWRlckRpdiwgbnVtRmlsZXMpIHtcbiAgICB0aGlzLnVwbG9hZFByb2dyZXNzW3VwbG9hZGVyRGl2LmlkXSA9IFtdO1xuXG4gICAgZm9yKGxldCBpID0gbnVtRmlsZXM7IGkgPiAwOyBpLS0pIHtcbiAgICAgIHRoaXMudXBsb2FkUHJvZ3Jlc3NbdXBsb2FkZXJEaXYuaWRdLnB1c2goMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB1cGxvYWRlckRpdlxuICAgKiBAcGFyYW0gZmlsZU51bWJlclxuICAgKiBAcGFyYW0gcGVyY2VudFxuICAgKi9cbiAgdXBkYXRlUHJvZ3Jlc3ModXBsb2FkZXJEaXYsIGZpbGVOdW1iZXIsIHBlcmNlbnQpIHtcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcycpLnF1ZXJ5U2VsZWN0b3IoJ2RpdicpO1xuICAgIHRoaXMudXBsb2FkUHJvZ3Jlc3NbdXBsb2FkZXJEaXYuaWRdW2ZpbGVOdW1iZXJdID0gcGVyY2VudDtcbiAgICBsZXQgdG90YWwgPSB0aGlzLnVwbG9hZFByb2dyZXNzW3VwbG9hZGVyRGl2LmlkXS5yZWR1Y2UoKHRvdCwgY3VycikgPT4gdG90ICsgY3VyciwgMCkgLyB0aGlzLnVwbG9hZFByb2dyZXNzW3VwbG9hZGVyRGl2LmlkXS5sZW5ndGg7XG4gICAgcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBgJHt0b3RhbH0lYDtcblxuICAgIGlmICh0b3RhbCA9PT0gMTAwKSB7XG4gICAgICBwcm9ncmVzc0Jhci5jbGFzc0xpc3QuYWRkKCd1cGxvYWRlZCcpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcmV0cmlldmUgYSBzcGVjaWZpYyBwYXJhbWV0ZXIgd3JpdGUgb24gaW5wdXQgZmlsZVxuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICogQHBhcmFtIHBhcmFtZXRlclxuICAgKiBAcmV0dXJucyB7c3RyaW5nIHwgdW5kZWZpbmVkfVxuICAgKi9cbiAgcmV0cmlldmVQYXJhbWV0ZXIodXBsb2FkZXJEaXYsIHBhcmFtZXRlcikge1xuICAgIGNvbnN0IGlucHV0RmlsZSA9IHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9ZmlsZV0nKTtcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gaW5wdXRGaWxlLmRhdGFzZXRbcGFyYW1ldGVyXTtcblxuICAgIGlmIChwYXJhbWV0ZXJzKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShwYXJhbWV0ZXJzKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdFcnJldXIgaW4gdXBsb2FkZXIgSlNPTicpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byByZXRyaWV2ZSB1cmwgd2l0aCBwYXJhbWV0ZXJzIG9yIGNvbmZpZyB1cmxcbiAgICogQHBhcmFtIHVybFxuICAgKiBAcGFyYW0gcGFyYW1ldGVyc1xuICAgKiBAcmV0dXJucyB7bnVsbHwqfVxuICAgKi9cbiAgcmV0cmlldmVVcmwodXJsLCBwYXJhbWV0ZXJzKSB7XG4gICAgaWYgKHBhcmFtZXRlcnMgJiYgcGFyYW1ldGVycy51cmwgJiYgcGFyYW1ldGVycy51cmwgIT09ICcnKSB7XG4gICAgICByZXR1cm4gcGFyYW1ldGVycy51cmw7XG4gICAgfSBlbHNlIGlmICh1cmwgJiYgdXJsICE9PSAnJykge1xuICAgICAgcmV0dXJuIHVybDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIG1ldGhvZCB0byBidWlsZCBmb3JtIGRhdGEgd2l0aCBwYXJhbWV0ZXJzIG9mIGlucHV0XG4gICAqIEBwYXJhbSBwYXJhbWV0ZXJzXG4gICAqIEBwYXJhbSBmaWxlXG4gICAqIEByZXR1cm5zIHtGb3JtRGF0YX1cbiAgICovXG4gIGJ1aWxkRm9ybURhdGEocGFyYW1ldGVycywgZmlsZSA9IG51bGwpIHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgZm9yIChjb25zdCB0ZW1wRGF0YSBpbiBwYXJhbWV0ZXJzKSB7XG4gICAgICBpZiAodGVtcERhdGEgIT09ICd1cmwnKSB7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCh0ZW1wRGF0YSwgcGFyYW1ldGVyc1t0ZW1wRGF0YV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWxlKSB7XG4gICAgICBmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZm9ybURhdGE7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGZpbGVcbiAgICogQHBhcmFtIGluZGV4XG4gICAqIEBwYXJhbSBwcm9ncmVzc0luZGV4XG4gICAqIEBwYXJhbSB1cGxvYWRlckRpdlxuICAgKi9cbiAgdXBsb2FkRmlsZShmaWxlLCBpbmRleCwgcHJvZ3Jlc3NJbmRleCwgdXBsb2FkZXJEaXYpIHtcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gdGhpcy5yZXRyaWV2ZVBhcmFtZXRlcih1cGxvYWRlckRpdiwgJ3VybFBhcmFtJyk7XG4gICAgY29uc3QgdXJsID0gdGhpcy5yZXRyaWV2ZVVybCh0aGlzLm9wdGlvbnMudXJsLCBwYXJhbWV0ZXJzKTtcblxuICAgIGlmICghdXJsIHx8IHVybCA9PSAnJykge1xuICAgICAgY29uc29sZS5lcnJvcihgVXJsIHRvIHVwbG9hZCBmaWxlIGNhbid0IGJlIG51bGzCoGZvciB1cGxvYWRlciBpZCAke3VwbG9hZGVyRGl2LmlkfWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKCdQT1NUJywgdXJsLCB0cnVlKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcblxuICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVQcm9ncmVzcyh1cGxvYWRlckRpdiwgcHJvZ3Jlc3NJbmRleCwgKGV2ZW50LmxvYWRlZCAqIDEwMC4wIC8gZXZlbnQudG90YWwpIHx8IDEwMCk7XG4gICAgfSk7XG5cbiAgICB4aHIuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsICgpID0+IHtcbiAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kVXBsb2FkRWxlbWVudHModXBsb2FkZXJEaXYsIHhoci5yZXNwb25zZSwgaW5kZXgpO1xuICAgICAgfSBlbHNlIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmIHhoci5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgeGhyLnNlbmQodGhpcy5idWlsZEZvcm1EYXRhKHBhcmFtZXRlcnMsIGZpbGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gYXBwZW5kcyB1cGxvYWQgZWxlbWVudHMgdG8gYm9keVxuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICogQHBhcmFtIGlucHV0VmFsdWVcbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBhcHBlbmRVcGxvYWRFbGVtZW50cyh1cGxvYWRlckRpdiwgaW5wdXRWYWx1ZSwgaW5kZXgpIHtcbiAgICBjb25zdCBmaWxlSW5wdXRJZCA9IHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9ZmlsZScpLmlkO1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICBpbnB1dC50eXBlID0gJ2hpZGRlbic7XG4gICAgaW5wdXQudmFsdWUgPSBpbnB1dFZhbHVlO1xuICAgIGlucHV0Lm5hbWUgPSBgJHtmaWxlSW5wdXRJZH1zW11gO1xuICAgIGlucHV0LmlkID0gYGlucHV0LXVwbG9hZGVkLWZpbGUtJHtpbmRleH1gO1xuICAgIHVwbG9hZGVyRGl2LmFwcGVuZChpbnB1dCk7XG4gICAgY29uc3QgdXBsb2FkZWRGaWxlUHJldmlldyA9IHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoYCN1cGxvYWRlZC1maWxlLSR7aW5kZXh9YCk7XG4gICAgdXBsb2FkZWRGaWxlUHJldmlldy5jbGFzc0xpc3QuYWRkKCd1cGxvYWRlZCcpO1xuICAgIHVwbG9hZGVkRmlsZVByZXZpZXcucXVlcnlTZWxlY3RvcignZGl2JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQpID0+IHRoaXMuZGVsZXRlRmlsZShldmVudCwgdXBsb2FkZXJEaXYpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gcHJldmlldyBmaWxlIGR1cm5nIHVwbG9hZFxuICAgKiBAcGFyYW0gZmlsZVxuICAgKiBAcGFyYW0gdXBsb2FkZXJEaXZcbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBwcmV2aWV3RmlsZShmaWxlLCB1cGxvYWRlckRpdiwgaW5kZXgpIHtcbiAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcblxuICAgIHJlYWRlci5vbmxvYWRlbmQgPSAoKSA9PiB7XG4gICAgICB0aGlzLmFwcGVuZFByZXZpZXdJbWFnZURpdih1cGxvYWRlckRpdiwgcmVhZGVyLnJlc3VsdCwgaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBtZXRob2QgdG8gY3JlYXRlIGltYWdlIGVsZW1lbnQgaW4gZ2FsbGVyeSBkaXZcbiAgICogQHBhcmFtIHVwbG9hZGVyRGl2XG4gICAqIEBwYXJhbSBmaWxlUGF0aFxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICovXG4gIGFwcGVuZFByZXZpZXdJbWFnZURpdih1cGxvYWRlckRpdiwgZmlsZVBhdGgsIGluZGV4KSB7XG4gICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaW1nLnNyYyA9IGZpbGVQYXRoO1xuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5pZCA9IGB1cGxvYWRlZC1maWxlLSR7aW5kZXh9YDtcbiAgICBjb25zdCBkZWxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkZWxEaXYuaWQgPSBgdXBsb2FkZWQtZmlsZS1kZWxldGUtJHtpbmRleH1gO1xuICAgIGRlbERpdi50ZXh0Q29udGVudCA9ICdYJztcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZGVsRGl2KTtcbiAgICBkaXYuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICB1cGxvYWRlckRpdi5xdWVyeVNlbGVjdG9yKCcucmlicy1maWxldXBsb2FkZXItZ2FsbGVyeScpLmFwcGVuZENoaWxkKGRpdik7XG4gIH1cblxuICAvKipcbiAgICogbWV0aG9kIHRvIGRlbGV0ZXMgdXBsb2FkZWQgZmlsZXNcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqIEBwYXJhbSB1cGxvYWRlckRpdlxuICAgKi9cbiAgZGVsZXRlRmlsZShldmVudCwgdXBsb2FkZXJEaXYpIHtcbiAgICBjb25zdCBwYXJhbWV0ZXJzID0gdGhpcy5yZXRyaWV2ZVBhcmFtZXRlcih1cGxvYWRlckRpdiwgJ2RlbGV0ZVVybFBhcmFtJyk7XG4gICAgY29uc3QgdXJsID0gdGhpcy5yZXRyaWV2ZVVybCh0aGlzLm9wdGlvbnMuZGVsZXRlVXJsLCBwYXJhbWV0ZXJzKTtcblxuICAgIGlmICghdXJsIHx8IHVybCA9PSAnJykge1xuICAgICAgY29uc29sZS5lcnJvcihgVXJsIHRvIGRlbGV0ZSBmaWxlIGNhbid0IGJlIG51bGzCoGZvciB1cGxvYWRlciBpZCAke3VwbG9hZGVyRGl2LmlkfWApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGltYWdlRGl2ID0gZXZlbnQuY3VycmVudFRhcmdldC5wYXJlbnROb2RlO1xuICAgIGNvbnN0IGlucHV0SW1hZ2VJbmZvID0gdXBsb2FkZXJEaXYucXVlcnlTZWxlY3RvcihgI2lucHV0LSR7aW1hZ2VEaXYuaWR9YCk7XG4gICAgY29uc3QgaW1hZ2VJbmZvID0gSlNPTi5wYXJzZShpbnB1dEltYWdlSW5mby52YWx1ZSk7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwsIHRydWUpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdBY2NlcHQnLCAnYXBwbGljYXRpb24vanNvbicpO1xuXG4gICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMCkge1xuICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgaW1hZ2VEaXYucmVtb3ZlKCk7XG4gICAgICAgICAgaW5wdXRJbWFnZUluZm8ucmVtb3ZlKCk7XG5cbiAgICAgICAgICBpZiAodXBsb2FkZXJEaXYucXVlcnlTZWxlY3RvcignLnJpYnMtZmlsZXVwbG9hZGVyLWdhbGxlcnknKS5jaGlsZE5vZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdXBsb2FkZXJEaXYuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLWZpbGVzJyk7XG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzc0JhciA9IHVwbG9hZGVyRGl2LnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcyA+IGRpdicpO1xuICAgICAgICAgICAgcHJvZ3Jlc3NCYXIuY2xhc3NMaXN0LnJlbW92ZSgndXBsb2FkZWQnKTtcbiAgICAgICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gJzAlJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzICE9IDIwMCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IGZvcm1EYXRhID0gdGhpcy5idWlsZEZvcm1EYXRhKHBhcmFtZXRlcnMpO1xuICAgIGZvcm1EYXRhLmFwcGVuZCgnZmlsZV9wYXRoJywgaW1hZ2VJbmZvLmZpbGVfcGF0aCk7XG4gICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlX25hbWUnLCBpbWFnZUluZm8ubmV3X2ZpbGVuYW1lID8gaW1hZ2VJbmZvLm5ld19maWxlbmFtZSA6IGltYWdlSW5mby5maWxlbmFtZSk7XG4gICAgeGhyLnNlbmQoZm9ybURhdGEpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJpYnNGaWxlVXBsb2FkZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9