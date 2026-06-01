/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) // removed by dead control flow
{} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./src/blocks/embed-office-viewer/Components/Common/Style.js":
/*!*******************************************************************!*\
  !*** ./src/blocks/embed-office-viewer/Components/Common/Style.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const Style = ({
  attributes,
  id
}) => {
  const {
    officeViewer
  } = attributes;
  const {
    officeFile,
    disableFullScreen,
    disableRightClick
  } = officeViewer || {};

  // const isPPTX = file && file.split('.').pop().toLowerCase() === 'pptx';

  const blockWrapper = `#${id}`;

  // Determine if the file is a PPTX
  const isPPTX = officeFile && officeFile?.url?.split('.').pop().toLowerCase() === 'pptx';

  // Base styles
  let css = `
        ${blockWrapper} {
            position: relative;
            container-type: inline-size;
        }
    `;

  // Conditionally add #block overlay styles only when protect content is enabled
  if (disableRightClick) {
    css += `
        ${blockWrapper} #block {
            position: absolute;
            top: 0;
            right: 20px;
            width: 100%;
            height: ${isPPTX ? 'calc(100% - 30px)' : 'calc(100% - 55px)'};
        }
        ${blockWrapper} {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
    `;
  }

  // Conditionally add fullscreen disabling styles (works with either toggle for backward compat)
  if (disableFullScreen || disableRightClick) {
    css += `
        ${blockWrapper} #disableFullscreen {
            position: absolute;
            bottom: 0;
            right: 0px;
            width: 100px;
            height: 50px;
        }
    `;
  }

  // Conditionally add #block height depending on file type
  css += `
        ${blockWrapper} .disablePopout {
            position: absolute;
            opacity: 0;
            right: 0px;
            top: 0px;
            width: 80px;
            height: 50px;
            z-index: 9;
        }

        @container (max-width: 600px) {
            ${blockWrapper} .disablePopout {
                width: 60px;
                height: 50px;
            }
        }

        @container (max-width: 480px) {
            ${blockWrapper} .disablePopout {
                display: none;
            }
        }
    `;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("style", {
    dangerouslySetInnerHTML: {
      __html: css.replace(/\s+/g, " ")
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Style);

/***/ }),

/***/ "./src/blocks/embed-office-viewer/Components/Frontend/DropboxFrontend.js":
/*!*******************************************************************************!*\
  !*** ./src/blocks/embed-office-viewer/Components/Frontend/DropboxFrontend.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const DropboxFrontend = ({
  attributes,
  onLoad
}) => {
  const {
    officeViewer
  } = attributes;
  const {
    dropboxURL,
    width,
    height
  } = officeViewer;
  const directLink = dropboxURL.replace("www.dropbox.com", "dl.dropboxusercontent.com").replace("?dl=0", "");
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, dropboxURL && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    src: `https://docs.google.com/gview?url=${encodeURIComponent(directLink)}&embedded=true`,
    className: "eov-border-none",
    width: width,
    height: height,
    frameBorder: "0",
    title: "Dropbox Document Viewer",
    onLoad: onLoad
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropboxFrontend);

/***/ }),

/***/ "./src/blocks/embed-office-viewer/Components/Frontend/GDriveFrontend.js":
/*!******************************************************************************!*\
  !*** ./src/blocks/embed-office-viewer/Components/Frontend/GDriveFrontend.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const GDriveFrontend = ({
  attributes,
  onLoad
}) => {
  const {
    officeViewer
  } = attributes;
  const {
    googleDriveURL,
    height,
    width
  } = officeViewer;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, googleDriveURL && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    id: "s_pdf_frame",
    src: googleDriveURL,
    className: "eov-center-iframe",
    height: height,
    width: width,
    frameBorder: "0",
    onLoad: onLoad
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GDriveFrontend);

/***/ }),

/***/ "./src/blocks/embed-office-viewer/Components/Frontend/GoogleFrontend.js":
/*!******************************************************************************!*\
  !*** ./src/blocks/embed-office-viewer/Components/Frontend/GoogleFrontend.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const GoogleFrontend = ({
  attributes,
  onLoad
}) => {
  const {
    officeViewer
  } = attributes;
  const {
    officeFile,
    height,
    width
  } = officeViewer;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, officeFile?.url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    id: "s_pdf_frame",
    src: `//docs.google.com/gview?embedded=true&url=${officeFile.url}`,
    className: "eov-center-iframe",
    height: height,
    width: width,
    frameBorder: "0",
    onLoad: onLoad
  }) : null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GoogleFrontend);

/***/ }),

/***/ "./src/blocks/embed-office-viewer/Components/Frontend/JsViewFrontend.js":
/*!******************************************************************************!*\
  !*** ./src/blocks/embed-office-viewer/Components/Frontend/JsViewFrontend.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const JsViewFrontend = ({
  attributes,
  onLoad
}) => {
  const {
    officeViewer
  } = attributes;
  const {
    officeFile,
    height,
    width
  } = officeViewer;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, officeFile?.url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    id: "s_pdf_frame",
    src: `${window?.eovData?.pdfJsFilePath}?file=${officeFile.url}`,
    height: height,
    width: width,
    onLoad: onLoad
  }) : null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JsViewFrontend);

/***/ }),

/***/ "./src/blocks/embed-office-viewer/Components/Frontend/MicrosoftFrontend.js":
/*!*********************************************************************************!*\
  !*** ./src/blocks/embed-office-viewer/Components/Frontend/MicrosoftFrontend.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const MicrosoftFrontend = ({
  attributes,
  onLoad
}) => {
  const {
    officeViewer
  } = attributes;
  const {
    officeFile,
    height,
    width,
    isRemoveDownloadBtn,
    isRemoveFullScreen
  } = officeViewer;
  const fileExtension = officeFile?.url?.split('.').pop().toLowerCase();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, officeFile?.url ? (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "eov-ms-container",
    style: {
      width,
      height
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("iframe", {
    id: "s_pdf_frame",
    src: `https://view.officeapps.live.com/op/embed.aspx?src=${officeFile.url}`,
    height: height,
    width: width,
    frameBorder: "0",
    className: "eov-ms-iframe",
    onLoad: onLoad
  }), isRemoveDownloadBtn && fileExtension === 'pptx' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "eov-ms-remove-download"
  }), isRemoveFullScreen && fileExtension === 'pptx' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "eov-ms-remove-fullscreen"
  })) : null);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MicrosoftFrontend);

/***/ }),

/***/ "./src/blocks/embed-office-viewer/Components/Frontend/OfficeViewer.js":
/*!****************************************************************************!*\
  !*** ./src/blocks/embed-office-viewer/Components/Frontend/OfficeViewer.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DropboxFrontend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DropboxFrontend */ "./src/blocks/embed-office-viewer/Components/Frontend/DropboxFrontend.js");
/* harmony import */ var _GDriveFrontend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GDriveFrontend */ "./src/blocks/embed-office-viewer/Components/Frontend/GDriveFrontend.js");
/* harmony import */ var _GoogleFrontend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GoogleFrontend */ "./src/blocks/embed-office-viewer/Components/Frontend/GoogleFrontend.js");
/* harmony import */ var _MicrosoftFrontend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MicrosoftFrontend */ "./src/blocks/embed-office-viewer/Components/Frontend/MicrosoftFrontend.js");
/* harmony import */ var _JsViewFrontend__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./JsViewFrontend */ "./src/blocks/embed-office-viewer/Components/Frontend/JsViewFrontend.js");







const OfficeViewer = ({
  attributes,
  id
}) => {
  const {
    officeViewer
  } = attributes;
  const {
    officeFile,
    showDownloadBtnOnTop,
    showFileNameOnTop,
    viewer,
    docSource,
    disablePopout,
    disableRightClick,
    disableFullScreen,
    googleDriveURL,
    dropboxURL,
    height,
    width
  } = officeViewer || {};
  const [isLoading, setIsLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const currentUrl = docSource === 'library' ? officeFile?.url : docSource === 'googleDrive' ? googleDriveURL : dropboxURL;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setIsLoading(true);
  }, [currentUrl]);
  const handleOnLoad = () => {
    setIsLoading(false);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (!disableRightClick) return;
    const disablePageContext = e => e.preventDefault();
    document.addEventListener('contextmenu', disablePageContext);

    // Block common keyboard shortcuts for copying/saving/printing
    const disableKeyboardShortcuts = e => {
      if ((e.ctrlKey || e.metaKey) && ['c', 'a', 's', 'p'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', disableKeyboardShortcuts);
    const timeoutId = setTimeout(() => {
      try {
        const iframe = document.getElementById('s_pdf_frame');
        if (iframe?.contentWindow?.document) {
          iframe.contentWindow.document.oncontextmenu = e => {
            e.preventDefault();
          };
        }
      } catch (err) {
        // Mute cross-origin console errors safely
      }
    }, 1000);
    return () => {
      document.removeEventListener('contextmenu', disablePageContext);
      document.removeEventListener('keydown', disableKeyboardShortcuts);
      clearTimeout(timeoutId);
    };
  }, [disableRightClick]);
  const hasFile = docSource === 'library' && officeFile?.url || docSource === 'googleDrive' && googleDriveURL || docSource === 'dropbox' && dropboxURL;
  if (!hasFile) {
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "eovOfficeViewer",
    id: id
  }, docSource === "library" && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, showFileNameOnTop && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "File Name: ", officeFile?.title), showDownloadBtnOnTop && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("button", {
    onClick: () => {
      const link = document.createElement("a");
      link.href = officeFile.url;
      link.download = officeFile.title || "downloaded-file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    className: "eov-download-btn"
  }, "Download File")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "wrapper",
    className: "eov_wrapper",
    style: {
      width: width || '100%',
      margin: '0 auto'
    }
  }, isLoading && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "eov-loading-overlay",
    style: {
      height: height || '500px',
      width: width || '100%'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "eov-spinner"
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, "Loading document...")), disableRightClick && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "block"
  }), (disableRightClick || disableFullScreen) && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    id: "disableFullscreen"
  }), docSource === 'library' && viewer === 'google' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GoogleFrontend__WEBPACK_IMPORTED_MODULE_3__["default"], {
    attributes: attributes,
    onLoad: handleOnLoad
  }), docSource === 'library' && viewer === 'microsoft' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_MicrosoftFrontend__WEBPACK_IMPORTED_MODULE_4__["default"], {
    attributes: attributes,
    onLoad: handleOnLoad
  }), docSource === 'library' && viewer === 'js' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_JsViewFrontend__WEBPACK_IMPORTED_MODULE_5__["default"], {
    attributes: attributes,
    onLoad: handleOnLoad
  }), docSource === 'googleDrive' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_GDriveFrontend__WEBPACK_IMPORTED_MODULE_2__["default"], {
    attributes: attributes,
    onLoad: handleOnLoad
  }), docSource === 'dropbox' && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_DropboxFrontend__WEBPACK_IMPORTED_MODULE_1__["default"], {
    attributes: attributes,
    onLoad: handleOnLoad
  }), disablePopout && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "disablePopout"
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OfficeViewer);

/***/ }),

/***/ "./src/blocks/embed-office-viewer/style.scss":
/*!***************************************************!*\
  !*** ./src/blocks/embed-office-viewer/style.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

module.exports = window["ReactDOM"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************************!*\
  !*** ./src/blocks/embed-office-viewer/view.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.scss */ "./src/blocks/embed-office-viewer/style.scss");
/* harmony import */ var _Components_Common_Style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Components/Common/Style */ "./src/blocks/embed-office-viewer/Components/Common/Style.js");
/* harmony import */ var _Components_Frontend_OfficeViewer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Components/Frontend/OfficeViewer */ "./src/blocks/embed-office-viewer/Components/Frontend/OfficeViewer.js");





document.addEventListener('DOMContentLoaded', () => {
  const officeViewerBlockEls = document.querySelectorAll('.wp-block-eov-embed-office-viewer');
  officeViewerBlockEls.forEach(officeViewerBlockEl => {
    const attributes = JSON.parse(officeViewerBlockEl.dataset.attributes);
    (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(officeViewerBlockEl).render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Common_Style__WEBPACK_IMPORTED_MODULE_3__["default"], {
      attributes: attributes,
      id: officeViewerBlockEl.id
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Components_Frontend_OfficeViewer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      attributes: attributes,
      id: officeViewerBlockEl.id
    })));
    officeViewerBlockEl?.removeAttribute('data-attributes');
  });
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map