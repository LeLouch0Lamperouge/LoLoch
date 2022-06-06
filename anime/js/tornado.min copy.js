var getElement = document.querySelector.bind(document);
var getElements = document.querySelectorAll.bind(document);
var pageDirection = getComputedStyle(document.body).direction;
var addLiveListener = function addLiveListener(selector, event, func) {
  "use strict";
  setInterval(function () {
    var elements = getElements(selector);
    Array.from(elements).forEach(function (element) {
      element.addEventListener(event, func);
    });
  }, 1000);
};
var getSiblings = function getSiblings(element) {
  "use strict";
  return Array.prototype.filter.call(
    element.parentNode.children,
    function (sibling) {
      return sibling !== element;
    }
  );
};
var getNextSibling = function getNextSibling(element, selector) {
  "use strict";
  var sibling = element.nextElementSibling;
  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }
  }
};
var getPrevSibling = function getPrevSibling(element, selector) {
  "use strict";
  var sibling = element.previousElementSibling;
  while (sibling) {
    if (sibling.matches(selector)) {
      return sibling;
    }
  }
};
var setAttributes = function setAttributes(element, options) {
  "use strict";
  Object.keys(options).forEach(function (attr) {
    element.setAttribute(attr, options[attr]);
  });
};
function insertAfter(element, reference) {
  "use strict";
  reference.parentNode.insertBefore(element, reference.nextSibling);
}
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var backgroundElement = getElements("[data-src]");
  Array.from(backgroundElement).forEach(function (element) {
    var bgData = element.getAttribute("data-src");
    element.style.backgroundImage = 'url("' + bgData + '")';
  });
  var backgroundColor = getElements("[data-bg]");
  Array.from(backgroundColor).forEach(function (element) {
    var bgData = element.getAttribute("data-bg");
    element.style.backgroundColor = "#" + bgData;
  });
  var stickyElement = getElements("[data-sticky]");
  Array.from(stickyElement).forEach(function (element) {
    var elementTop = element.offsetTop;
    function stickyElementFire() {
      if (window.scrollY >= elementTop) {
        element.classList.add("is-sticky");
      } else {
        element.classList.remove("is-sticky");
      }
    }
    window.addEventListener("scroll", function () {
      stickyElementFire();
    });
  });
  addLiveListener(".remove-item", "click", function (e) {
    e.preventDefault();
    var thisButton = this;
    if (thisButton.hasAttribute("data-target")) {
      var target = thisButton.getAttribute("data-target");
      getElement("#" + target).remove();
    } else if (thisButton.hasAttribute("data-tag")) {
      var parentTag = thisButton.getAttribute("data-tag");
      thisButton.closest(parentTag).remove();
    } else {
      thisButton.parentNode.remove();
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var navMenus = getElements(".navigation-menu");
  Array.from(navMenus).forEach(function (navMenus) {
    var MenuID = navMenus.getAttribute("data-id"),
      MenuList = navMenus.querySelectorAll("ul"),
      MenuElements =
        '<div class="menu-content"></div> <a href="javascript:void(0)" class="overlay-close" title="Close Menu"></a>';
    document.body.insertAdjacentHTML(
      "beforeend",
      '<div class="mobile-menu" id="' + MenuID + '">' + MenuElements + "</div>"
    );
    var SubMenu = navMenus.querySelectorAll("li ul,li .megamenu");
    Array.from(SubMenu).forEach(function (SubMenu) {
      SubMenu.parentNode.classList.add("dropdown-item");
      var dropDownBtn = document.createElement("a");
      dropDownBtn.classList.add("dropdown-toggle");
      dropDownBtn.classList.add("ti-arrow-down-chevron");
      dropDownBtn.setAttribute("href", "javascript:void(0);");
      SubMenu.insertAdjacentElement("beforebegin", dropDownBtn);
    });
    if (navMenus.hasAttribute("data-logo")) {
      var logo = navMenus.getAttribute("data-logo");
      getElement("#" + MenuID + " .menu-content").innerHTML =
        '<div class="logo"> <img src="' + logo + '" alt="logo"> </div>';
    }
    var MenuCopy = MenuList[0].cloneNode(true);
    getElement("#" + MenuID + " .menu-content").appendChild(MenuCopy);
    var Megamenu = navMenus.querySelectorAll(".megamenu");
    Array.from(Megamenu).forEach(function (Megamenu) {
      Megamenu.parentNode.style.postion = "static";
    });
  });
  var MobMenuToggle = getElements(".menu-btn[data-id]");
  Array.from(MobMenuToggle).forEach(function (MobMenuToggle) {
    MobMenuToggle.addEventListener("click", function (event) {
      event.preventDefault();
      var TargetID = MobMenuToggle.getAttribute("data-id");
      getElement("#" + TargetID).classList.toggle("active");
      getElement("body").classList.add("menu-ope");
    });
  });
  var OverlayButton = getElements(".mobile-menu .overlay-close");
  Array.from(OverlayButton).forEach(function (OverlayButton) {
    OverlayButton.addEventListener("click", function (event) {
      event.preventDefault();
      OverlayButton.parentNode.classList.remove("active");
      getElement("body").classList.remove("menu-ope");
    });
  });
  var dropdownMob = getElements(
    ".mobile-menu .dropdown-toggle,.navigation-menu .dropdown-toggle"
  );
  Array.from(dropdownMob).forEach(function (dropdownMob) {
    dropdownMob.addEventListener("click", function (event) {
      event.preventDefault();
      dropdownMob.parentNode.classList.toggle("opened");
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var SubMenuList = getElements(".nested-menu ul > li > ul");
  Array.from(SubMenuList).forEach(function (SubMenuList) {
    var SubMenuBtn = getPrevSibling(SubMenuList, "a");
    SubMenuBtn.classList.add("submenu");
    SubMenuBtn.classList.add("ti-arrow-down-chevron");
    SubMenuBtn.addEventListener("click", function (event) {
      event.preventDefault();
      var thisParent = SubMenuBtn.parentNode,
        parentSiblings = getSiblings(thisParent);
      thisParent.classList.toggle("active");
      Array.from(parentSiblings).forEach(function (parentSiblings) {
        parentSiblings.classList.remove("active");
      });
      if (SubMenuList.style.maxHeight) {
        SubMenuList.style.maxHeight = null;
      } else {
        var thisHight = SubMenuList.scrollHeight;
        SubMenuList.style.maxHeight = thisHight + "px";
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var dropdownButton = getElements(".dropdown-btn");
  Array.from(dropdownButton).forEach(function (dropdownButton) {
    dropdownButton.addEventListener("click", function (event) {
      event.preventDefault();
      var thisParent = dropdownButton.closest(".dropdown"),
        otherDropdown = getElements(".dropdown.active");
      Array.from(otherDropdown).forEach(function (otherDropdown) {
        if (otherDropdown !== thisParent) {
          otherDropdown.classList.remove("active");
        }
      });
      thisParent.classList.toggle("active");
    });
  });
  window.onclick = function (blank) {
    if (
      !blank.target.matches(".dropdown") &&
      !blank.target.matches(".dropdown *")
    ) {
      var activatedDrops = getElements(".dropdown.active");
      Array.from(activatedDrops).forEach(function (activatedDrops) {
        activatedDrops.classList.remove("active");
      });
    }
  };
});
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var placeholders = getElements("[placeholder]");
  Array.from(placeholders).forEach(function (placeholder) {
    var placeholderCurrent = placeholder.getAttribute("placeholder");
    placeholder.addEventListener("focus", function () {
      placeholder.setAttribute("placeholder", "");
    });
    placeholder.addEventListener("blur", function () {
      placeholder.setAttribute("placeholder", placeholderCurrent);
    });
  });
  var linedControls = getElements(
    ".form-ui.lined input:not(.btn),.form-ui.lined textarea"
  );
  Array.from(linedControls).forEach(function (linedControl) {
    linedControl.addEventListener("change", function () {
      var control_val = linedControl.getAttribute("value");
      if (control_val !== "") {
        linedControl.classList.add("has-value");
      }
    });
  });
  var fileUploaders = getElements('.file-input input[type="file"]');
  Array.from(fileUploaders).forEach(function (fileUploader) {
    fileUploader.addEventListener("change", function () {
      var filePath = [];
      for (var i = 0; i < fileUploader.files.length; ++i) {
        filePath.push(fileUploader.files[i].name);
      }
      fileUploader.parentNode.setAttribute("data-text", filePath);
    });
  });
  var progressBars = getElements(".progress-bar");
  Array.from(progressBars).forEach(function (progressBar) {
    var progressValue = progressBar.getAttribute("data-value");
    if (pageDirection === "ltr") {
      progressBar.style.backgroundSize = progressValue;
      progressBar.innerHTML =
        '<span class="progress-num" style="left:' +
        progressValue +
        '">' +
        progressValue +
        "</span>";
    } else if (pageDirection === "rtl") {
      progressBar.style.backgroundSize = progressValue;
      progressBar.innerHTML =
        '<span class="progress-num" style="right:' +
        progressValue +
        '">' +
        progressValue +
        "</span>";
    }
  });
  var FormElement = getElements("form");
  Array.from(FormElement).forEach(function (formElement) {
    formElement.addEventListener("submit", function (e) {
      var childs = this.children;
      Array.from(childs).forEach(function (child) {
        var formControls = child.querySelectorAll(
          '[aria-required="true"],.required,[required],.wpcf7-validates-as-required'
        );
        Array.from(formControls).forEach(function (formControl) {
          var controlValue = formControl.value;
          if (
            controlValue === "" ||
            controlValue === null ||
            controlValue === undefined
          ) {
            formControl.classList.add("error");
            var errorMsg = document.createElement("span");
            errorMsg.classList.add(
              "badge",
              "danger",
              "outline",
              "dismiss",
              "pointing-top"
            );
            errorMsg.innerHTML =
              "Error : This Field is Required Please Fulfill this Field.";
            insertAfter(errorMsg, formControl);
            e.preventDefault();
          } else {
            formControl.classList.remove("error");
            formControl.classList.add("success");
          }
        });
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var modalBoxs = getElements(".modal-box");
  Array.from(modalBoxs).forEach(function (modalBox) {
    modalBox.insertAdjacentHTML(
      "afterbegin",
      '<a href="javascript:void(0);" class="modal-overlay"></a>'
    );
    if (modalBox.hasAttribute("data-active-url")) {
      var urlHash = window.location.hash.substr(1),
        modalID = modalBox.getAttribute("id");
      if (urlHash === modalID) {
        modalBox.classList.add("active");
      }
    }
  });
  var modalButton = getElements("*[data-modal]");
  Array.from(modalButton).forEach(function (modalButton) {
    modalButton.addEventListener("click", function (event) {
      event.preventDefault();
      if (modalButton.hasAttribute("data-call-before")) {
        var callBackBefore = modalButton.getAttribute("data-call-before");
        window[callBackBefore]();
      }
      var modalID = modalButton.getAttribute("data-modal");
      getElement("#" + modalID).classList.add("active");
      if (modalButton.hasAttribute("data-call-after")) {
        var callBackAfter = modalButton.getAttribute("data-call-after");
        window[callBackAfter]();
      }
    });
  });
  var modalOverlay = getElements(".modal-overlay");
  Array.from(modalOverlay).forEach(function (modalOverlay) {
    modalOverlay.addEventListener("click", function (event) {
      event.preventDefault();
      if (modalOverlay.hasAttribute("data-call-before")) {
        var callBackBefore = modalOverlay.parentNode.getAttribute(
          "data-call-before"
        );
        window[callBackBefore]();
      }
      modalOverlay.parentNode.classList.remove("active");
      if (modalOverlay.hasAttribute("data-call-after")) {
        var callBackAfter = modalOverlay.parentNode.getAttribute(
          "data-call-after"
        );
        window[callBackAfter]();
      }
    });
  });
  var closeModal = getElements(".close-modal");
  Array.from(closeModal).forEach(function (closeModal) {
    closeModal.addEventListener("click", function (event) {
      event.preventDefault();
      if (closeModal.hasAttribute("data-call-before")) {
        var callBackBefore = closeModal
          .closest(".modal-box")
          .getAttribute("data-call-before");
        window[callBackBefore]();
      }
      closeModal.closest(".modal-box").classList.remove("active");
      if (closeModal.hasAttribute("data-call-after")) {
        var callBackAfter = closeModal
          .closest(".modal-box")
          .getAttribute("data-call-after");
        window[callBackAfter]();
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var accordionButton = getElements(".accordion-title");
  Array.from(accordionButton).forEach(function (element) {
    element.addEventListener("click", function () {
      var thisElement = element,
        nextPanel = getNextSibling(thisElement, ".accordion-content"),
        thisParent = thisElement.parentNode,
        parentSiblings = getSiblings(thisParent);
      function closeOther() {
        Array.from(parentSiblings).forEach(function (siblings) {
          siblings.classList.remove("active");
          var siblingsChilds = siblings.children;
          Array.from(siblingsChilds).forEach(function (childs) {
            if (childs.classList.contains("accordion-content")) {
              childs.style.maxHeight = null;
            }
          });
        });
      }
      if (thisParent.classList.contains("active")) {
        if (thisElement.hasAttribute("data-call-before-close")) {
          var callBackBeforeClose = thisElement.getAttribute(
            "data-call-before-close"
          );
          window[callBackBeforeClose]();
        }
        thisParent.classList.remove("active");
        nextPanel.style.maxHeight = null;
        if (thisElement.hasAttribute("data-call-after-close")) {
          var callBackAfterClose = thisElement.getAttribute(
            "data-call-after-close"
          );
          window[callBackAfterClose]();
        }
      } else {
        if (thisElement.hasAttribute("data-call-before")) {
          var callBackBefore = thisElement.getAttribute("data-call-before");
          window[callBackBefore]();
        }
        var thisHight = nextPanel.scrollHeight,
          padding = getComputedStyle(nextPanel).padding;
        nextPanel.style.maxHeight = thisHight + padding + "px";
        thisParent.classList.add("active");
        closeOther();
        if (thisElement.hasAttribute("data-call-after")) {
          var callBackAfter = thisElement.getAttribute("data-call-after");
          window[callBackAfter]();
        }
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  getElements(
    ".tabs-menu [data-tab]:first-of-type,.tab-content:first-of-type"
  ).forEach(function (elements) {
    if (elements.hasAttribute("data-active-url")) {
      var urlHash = window.location.hash.substr(1),
        tabID = elements.getAttribute("data-tab");
      if (urlHash === "#" + tabID) {
        tabID.classList.add("active");
        getElement("#" + tabID).add("active");
      }
    } else {
      elements.classList.add("active");
    }
  });
  var tabsBtns = getElements(".tabs-menu [data-tab]");
  Array.from(tabsBtns).forEach(function (thisElement) {
    thisElement.addEventListener("click", function () {
      var getPanelId = thisElement.getAttribute("data-tab"),
        targtedPanel = getElement("#" + getPanelId);
      if (thisElement.hasAttribute("data-call-before")) {
        var callBackBefore = thisElement.getAttribute("data-call-before");
        window[callBackBefore]();
      }
      thisElement.classList.add("active");
      getSiblings(thisElement).forEach(function (siblings) {
        siblings.classList.remove("active");
      });
      targtedPanel.classList.add("active");
      getSiblings(targtedPanel).forEach(function (siblings) {
        siblings.classList.remove("active");
      });
      if (thisElement.hasAttribute("data-call-after")) {
        var callBackAfter = thisElement.getAttribute("data-call-after");
        window[callBackAfter]();
      }
    });
  });
});
function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof2(obj);
}
(function (global, factory) {
  "use strict";
  (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) ===
    "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : (global.Glide = factory());
})(this, function () {
  "use strict";
  var defaults = {
    type: "slider",
    startAt: 0,
    perView: 1,
    focusAt: 0,
    gap: 10,
    autoplay: false,
    hoverpause: true,
    keyboard: true,
    bound: false,
    swipeThreshold: 80,
    dragThreshold: 120,
    perTouch: false,
    touchRatio: 0.5,
    touchAngle: 45,
    animationDuration: 400,
    rewind: true,
    rewindDuration: 800,
    animationTimingFunc: "cubic-bezier(.165, .840, .440, 1)",
    throttle: 10,
    direction: "ltr",
    peek: 0,
    breakpoints: {},
    classes: {
      direction: { ltr: "glide-ltr", rtl: "glide-rtl" },
      slider: "glide-slider",
      carousel: "glide-carousel",
      swipeable: "glide-swipeable",
      dragging: "glide-dragging",
      cloneSlide: "glide-slide-clone",
      activeNav: "glide-bullet-active",
      activeSlide: "glide-slide-active",
      disabledArrow: "glide-arrow-disabled"
    }
  };
  function warn(msg) {
    console.error("[Glide warn]: " + msg);
  }
  var _typeof =
    typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol"
      ? function (obj) {
          return _typeof2(obj);
        }
      : function (obj) {
          return obj &&
            typeof Symbol === "function" &&
            obj.constructor === Symbol &&
            obj !== Symbol.prototype
            ? "symbol"
            : _typeof2(obj);
        };
  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  var createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();
  var _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);
    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);
      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;
      if (getter === undefined) {
        return undefined;
      }
      return getter.call(receiver);
    }
  };
  var inherits = function inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError(
        "Super expression must either be null or a function, not " +
          _typeof2(superClass)
      );
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass)
      Object.setPrototypeOf
        ? Object.setPrototypeOf(subClass, superClass)
        : (subClass.__proto__ = superClass);
  };
  var possibleConstructorReturn = function possibleConstructorReturn(
    self,
    call
  ) {
    if (!self) {
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    }
    return call && (_typeof2(call) === "object" || typeof call === "function")
      ? call
      : self;
  };
  function toInt(value) {
    return parseInt(value);
  }
  function toFloat(value) {
    return parseFloat(value);
  }
  function isString(value) {
    return typeof value === "string";
  }
  function isObject(value) {
    var type = typeof value === "undefined" ? "undefined" : _typeof(value);
    return type === "function" || (type === "object" && !!value);
  }
  function isNumber(value) {
    return typeof value === "number";
  }
  function isFunction(value) {
    return typeof value === "function";
  }
  function isUndefined(value) {
    return typeof value === "undefined";
  }
  function isArray(value) {
    return value.constructor === Array;
  }
  function mount(glide, extensions, events) {
    var components = {};
    for (var name in extensions) {
      if (isFunction(extensions[name])) {
        components[name] = extensions[name](glide, components, events);
      } else {
        warn("Extension must be a function");
      }
    }
    for (var _name in components) {
      if (isFunction(components[_name].mount)) {
        components[_name].mount();
      }
    }
    return components;
  }
  function define(obj, prop, definition) {
    Object.defineProperty(obj, prop, definition);
  }
  function sortKeys(obj) {
    return Object.keys(obj)
      .sort()
      .reduce(function (r, k) {
        r[k] = obj[k];
        return r[k], r;
      }, {});
  }
  function mergeOptions(defaults, settings) {
    var options = _extends({}, defaults, settings);
    if (settings.hasOwnProperty("classes")) {
      options.classes = _extends({}, defaults.classes, settings.classes);
      if (settings.classes.hasOwnProperty("direction")) {
        options.classes.direction = _extends(
          {},
          defaults.classes.direction,
          settings.classes.direction
        );
      }
    }
    if (settings.hasOwnProperty("breakpoints")) {
      options.breakpoints = _extends(
        {},
        defaults.breakpoints,
        settings.breakpoints
      );
    }
    return options;
  }
  var EventsBus = (function () {
    function EventsBus() {
      var events =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBus);
      this.events = events;
      this.hop = events.hasOwnProperty;
    }
    createClass(EventsBus, [
      {
        key: "on",
        value: function on(event, handler) {
          if (isArray(event)) {
            for (var i = 0; i < event.length; i++) {
              this.on(event[i], handler);
            }
          }
          if (!this.hop.call(this.events, event)) {
            this.events[event] = [];
          }
          var index = this.events[event].push(handler) - 1;
          return {
            remove: function remove() {
              delete this.events[event][index];
            }
          };
        }
      },
      {
        key: "emit",
        value: function emit(event, context) {
          if (isArray(event)) {
            for (var i = 0; i < event.length; i++) {
              this.emit(event[i], context);
            }
          }
          if (!this.hop.call(this.events, event)) {
            return;
          }
          this.events[event].forEach(function (item) {
            item(context || {});
          });
        }
      }
    ]);
    return EventsBus;
  })();
  var Glide = (function () {
    function Glide(selector) {
      var options =
        arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Glide);
      this._c = {};
      this._t = [];
      this._e = new EventsBus();
      this.disabled = false;
      this.selector = selector;
      this.settings = mergeOptions(defaults, options);
      this.index = this.settings.startAt;
    }
    createClass(Glide, [
      {
        key: "mount",
        value: function mount$$1() {
          var extensions =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : {};
          this._e.emit("mount.before");
          if (isObject(extensions)) {
            this._c = mount(this, extensions, this._e);
          } else {
            warn("You need to provide a object on `mount()`");
          }
          this._e.emit("mount.after");
          return this;
        }
      },
      {
        key: "mutate",
        value: function mutate() {
          var transformers =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : [];
          if (isArray(transformers)) {
            this._t = transformers;
          } else {
            warn("You need to provide a array on `mutate()`");
          }
          return this;
        }
      },
      {
        key: "update",
        value: function update() {
          var settings =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : {};
          this.settings = mergeOptions(this.settings, settings);
          if (settings.hasOwnProperty("startAt")) {
            this.index = settings.startAt;
          }
          this._e.emit("update");
          return this;
        }
      },
      {
        key: "go",
        value: function go(pattern) {
          this._c.Run.make(pattern);
          return this;
        }
      },
      {
        key: "move",
        value: function move(distance) {
          this._c.Transition.disable();
          this._c.Move.make(distance);
          return this;
        }
      },
      {
        key: "destroy",
        value: function destroy() {
          this._e.emit("destroy");
          return this;
        }
      },
      {
        key: "play",
        value: function play() {
          var interval =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : false;
          if (interval) {
            this.settings.autoplay = interval;
          }
          this._e.emit("play");
          return this;
        }
      },
      {
        key: "pause",
        value: function pause() {
          this._e.emit("pause");
          return this;
        }
      },
      {
        key: "disable",
        value: function disable() {
          this.disabled = true;
          return this;
        }
      },
      {
        key: "enable",
        value: function enable() {
          this.disabled = false;
          return this;
        }
      },
      {
        key: "on",
        value: function on(event, handler) {
          this._e.on(event, handler);
          return this;
        }
      },
      {
        key: "isType",
        value: function isType(name) {
          return this.settings.type === name;
        }
      },
      {
        key: "settings",
        get: function get$$1() {
          return this._o;
        },
        set: function set$$1(o) {
          if (isObject(o)) {
            this._o = o;
          } else {
            warn("Options must be an `object` instance.");
          }
        }
      },
      {
        key: "index",
        get: function get$$1() {
          return this._i;
        },
        set: function set$$1(i) {
          this._i = toInt(i);
        }
      },
      {
        key: "type",
        get: function get$$1() {
          return this.settings.type;
        }
      },
      {
        key: "disabled",
        get: function get$$1() {
          return this._d;
        },
        set: function set$$1(status) {
          this._d = !!status;
        }
      }
    ]);
    return Glide;
  })();
  function Run(Glide, Components, Events) {
    var Run = {
      mount: function mount() {
        this._o = false;
      },
      make: function make(move) {
        var _this = this;
        if (!Glide.disabled) {
          Glide.disable();
          this.move = move;
          Events.emit("run.before", this.move);
          this.calculate();
          Events.emit("run", this.move);
          Components.Transition.after(function () {
            if (_this.isOffset("<") || _this.isOffset(">")) {
              _this._o = false;
              Events.emit("run.offset", _this.move);
            }
            Events.emit("run.after", _this.move);
            Glide.enable();
          });
        }
      },
      calculate: function calculate() {
        var move = this.move,
          length = this.length;
        var steps = move.steps,
          direction = move.direction;
        var countableSteps = isNumber(toInt(steps)) && toInt(steps) !== 0;
        switch (direction) {
          case ">":
            if (steps === ">") {
              Glide.index = length;
            } else if (this.isEnd()) {
              if (!(Glide.isType("slider") && !Glide.settings.rewind)) {
                this._o = true;
                Glide.index = 0;
              }
              Events.emit("run.end", move);
            } else if (countableSteps) {
              Glide.index += Math.min(length - Glide.index, -toInt(steps));
            } else {
              Glide.index++;
            }
            break;
          case "<":
            if (steps === "<") {
              Glide.index = 0;
            } else if (this.isStart()) {
              if (!(Glide.isType("slider") && !Glide.settings.rewind)) {
                this._o = true;
                Glide.index = length;
              }
              Events.emit("run.start", move);
            } else if (countableSteps) {
              Glide.index -= Math.min(Glide.index, toInt(steps));
            } else {
              Glide.index--;
            }
            break;
          case "=":
            Glide.index = steps;
            break;
        }
      },
      isStart: function isStart() {
        return Glide.index === 0;
      },
      isEnd: function isEnd() {
        return Glide.index === this.length;
      },
      isOffset: function isOffset(direction) {
        return this._o && this.move.direction === direction;
      }
    };
    define(Run, "move", {
      get: function get() {
        return this._m;
      },
      set: function set(value) {
        this._m = {
          direction: value.substr(0, 1),
          steps: value.substr(1) ? value.substr(1) : 0
        };
      }
    });
    define(Run, "length", {
      get: function get() {
        var settings = Glide.settings;
        var length = Components.Html.slides.length;
        if (
          Glide.isType("slider") &&
          settings.focusAt !== "center" &&
          settings.bound
        ) {
          return (
            length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt)
          );
        }
        return length - 1;
      }
    });
    define(Run, "offset", {
      get: function get() {
        return this._o;
      }
    });
    return Run;
  }
  function now() {
    return new Date().getTime();
  }
  function throttle(func, wait, options) {
    var timeout = void 0,
      context = void 0,
      args = void 0,
      result = void 0;
    var previous = 0;
    if (!options) options = {};
    var later = function later() {
      previous = options.leading === false ? 0 : now();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    };
    var throttled = function throttled() {
      var at = now();
      if (!previous && options.leading === false) previous = at;
      var remaining = wait - (at - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        previous = at;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
    throttled.cancel = function () {
      clearTimeout(timeout);
      previous = 0;
      timeout = context = args = null;
    };
    return throttled;
  }
  var MARGIN_TYPE = {
    ltr: ["marginLeft", "marginRight"],
    rtl: ["marginRight", "marginLeft"]
  };
  function Gaps(Glide, Components, Events) {
    var Gaps = {
      apply: function apply(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          var direction = Components.Direction.value;
          if (i !== 0) {
            style[MARGIN_TYPE[direction][0]] = this.value / 2 + "px";
          } else {
            style[MARGIN_TYPE[direction][0]] = "";
          }
          if (i !== slides.length - 1) {
            style[MARGIN_TYPE[direction][1]] = this.value / 2 + "px";
          } else {
            style[MARGIN_TYPE[direction][1]] = "";
          }
        }
      },
      remove: function remove(slides) {
        for (var i = 0, len = slides.length; i < len; i++) {
          var style = slides[i].style;
          style.marginLeft = "";
          style.marginRight = "";
        }
      }
    };
    define(Gaps, "value", {
      get: function get() {
        return toInt(Glide.settings.gap);
      }
    });
    define(Gaps, "grow", {
      get: function get() {
        return Gaps.value * (Components.Sizes.length - 1);
      }
    });
    define(Gaps, "reductor", {
      get: function get() {
        var perView = Glide.settings.perView;
        return (Gaps.value * (perView - 1)) / perView;
      }
    });
    Events.on(
      ["build.after", "update"],
      throttle(function () {
        Gaps.apply(Components.Html.wrapper.children);
      }, 30)
    );
    Events.on("destroy", function () {
      Gaps.remove(Components.Html.wrapper.children);
    });
    return Gaps;
  }
  function siblings(node) {
    if (node && node.parentNode) {
      var n = node.parentNode.firstChild;
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== node) {
          matched.push(n);
        }
      }
      return matched;
    }
    return [];
  }
  function exist(node) {
    if (node && node instanceof window.HTMLElement) {
      return true;
    }
    return false;
  }
  var TRACK_SELECTOR = '[data-glide-el="track"]';
  function Html(Glide, Components) {
    var Html = {
      mount: function mount() {
        this.root = Glide.selector;
        this.track = this.root.querySelector(TRACK_SELECTOR);
        this.slides = Array.prototype.slice
          .call(this.wrapper.children)
          .filter(function (slide) {
            return !slide.classList.contains(Glide.settings.classes.cloneSlide);
          });
      }
    };
    define(Html, "root", {
      get: function get() {
        return Html._r;
      },
      set: function set(r) {
        if (isString(r)) {
          r = document.querySelector(r);
        }
        if (exist(r)) {
          Html._r = r;
        } else {
          warn("Root element must be a existing Html node");
        }
      }
    });
    define(Html, "track", {
      get: function get() {
        return Html._t;
      },
      set: function set(t) {
        if (exist(t)) {
          Html._t = t;
        } else {
          warn(
            "Could not find track element. Please use " +
              TRACK_SELECTOR +
              " attribute."
          );
        }
      }
    });
    define(Html, "wrapper", {
      get: function get() {
        return Html.track.children[0];
      }
    });
    return Html;
  }
  function Peek(Glide, Components, Events) {
    var Peek = {
      mount: function mount() {
        this.value = Glide.settings.peek;
      }
    };
    define(Peek, "value", {
      get: function get() {
        return Peek._v;
      },
      set: function set(value) {
        if (isObject(value)) {
          value.before = toInt(value.before);
          value.after = toInt(value.after);
        } else {
          value = toInt(value);
        }
        Peek._v = value;
      }
    });
    define(Peek, "reductor", {
      get: function get() {
        var value = Peek.value;
        var perView = Glide.settings.perView;
        if (isObject(value)) {
          return value.before / perView + value.after / perView;
        }
        return (value * 2) / perView;
      }
    });
    Events.on(["resize", "update"], function () {
      Peek.mount();
    });
    return Peek;
  }
  function Move(Glide, Components, Events) {
    var Move = {
      mount: function mount() {
        this._o = 0;
      },
      make: function make() {
        var _this = this;
        var offset =
          arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        this.offset = offset;
        Events.emit("move", { movement: this.value });
        Components.Transition.after(function () {
          Events.emit("move.after", { movement: _this.value });
        });
      }
    };
    define(Move, "offset", {
      get: function get() {
        return Move._o;
      },
      set: function set(value) {
        Move._o = !isUndefined(value) ? toInt(value) : 0;
      }
    });
    define(Move, "translate", {
      get: function get() {
        return Components.Sizes.slideWidth * Glide.index;
      }
    });
    define(Move, "value", {
      get: function get() {
        var offset = this.offset;
        var translate = this.translate;
        if (Components.Direction.is("rtl")) {
          return translate + offset;
        }
        return translate - offset;
      }
    });
    Events.on(["build.before", "run"], function () {
      Move.make();
    });
    return Move;
  }
  function Sizes(Glide, Components, Events) {
    var Sizes = {
      setupSlides: function setupSlides() {
        var width = this.slideWidth + "px";
        var slides = Components.Html.slides;
        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = width;
        }
      },
      setupWrapper: function setupWrapper(dimention) {
        Components.Html.wrapper.style.width = this.wrapperSize + "px";
      },
      remove: function remove() {
        var slides = Components.Html.slides;
        for (var i = 0; i < slides.length; i++) {
          slides[i].style.width = "";
        }
        Components.Html.wrapper.style.width = "";
      }
    };
    define(Sizes, "length", {
      get: function get() {
        return Components.Html.slides.length;
      }
    });
    define(Sizes, "width", {
      get: function get() {
        return Components.Html.root.offsetWidth;
      }
    });
    define(Sizes, "wrapperSize", {
      get: function get() {
        return (
          Sizes.slideWidth * Sizes.length +
          Components.Gaps.grow +
          Components.Clones.grow
        );
      }
    });
    define(Sizes, "slideWidth", {
      get: function get() {
        return (
          Sizes.width / Glide.settings.perView -
          Components.Peek.reductor -
          Components.Gaps.reductor
        );
      }
    });
    Events.on(["build.before", "resize", "update"], function () {
      Sizes.setupSlides();
      Sizes.setupWrapper();
    });
    Events.on("destroy", function () {
      Sizes.remove();
    });
    return Sizes;
  }
  function Build(Glide, Components, Events) {
    var Build = {
      mount: function mount() {
        Events.emit("build.before");
        this.typeClass();
        this.activeClass();
        Events.emit("build.after");
      },
      typeClass: function typeClass() {
        Components.Html.root.classList.add(
          Glide.settings.classes[Glide.settings.type]
        );
      },
      activeClass: function activeClass() {
        var classes = Glide.settings.classes;
        var slide = Components.Html.slides[Glide.index];
        if (slide) {
          slide.classList.add(classes.activeSlide);
          siblings(slide).forEach(function (sibling) {
            sibling.classList.remove(classes.activeSlide);
          });
        }
      },
      removeClasses: function removeClasses() {
        var classes = Glide.settings.classes;
        Components.Html.root.classList.remove(classes[Glide.settings.type]);
        Components.Html.slides.forEach(function (sibling) {
          sibling.classList.remove(classes.activeSlide);
        });
      }
    };
    Events.on(["destroy", "update"], function () {
      Build.removeClasses();
    });
    Events.on(["resize", "update"], function () {
      Build.mount();
    });
    Events.on("move.after", function () {
      Build.activeClass();
    });
    return Build;
  }
  function Clones(Glide, Components, Events) {
    var Clones = {
      mount: function mount() {
        this.items = [];
        if (Glide.isType("carousel")) {
          this.items = this.collect();
        }
      },
      collect: function collect() {
        var items =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : [];
        var slides = Components.Html.slides;
        var _Glide$settings = Glide.settings,
          perView = _Glide$settings.perView,
          classes = _Glide$settings.classes;
        var peekIncrementer = +!!Glide.settings.peek;
        var part = perView + peekIncrementer;
        var start = slides.slice(0, part);
        var end = slides.slice(-part);
        for (
          var r = 0;
          r < Math.max(1, Math.floor(perView / slides.length));
          r++
        ) {
          for (var i = 0; i < start.length; i++) {
            var clone = start[i].cloneNode(true);
            clone.classList.add(classes.cloneSlide);
            items.push(clone);
          }
          for (var _i = 0; _i < end.length; _i++) {
            var _clone = end[_i].cloneNode(true);
            _clone.classList.add(classes.cloneSlide);
            items.unshift(_clone);
          }
        }
        return items;
      },
      append: function append() {
        var items = this.items;
        var _Components$Html = Components.Html,
          wrapper = _Components$Html.wrapper,
          slides = _Components$Html.slides;
        var half = Math.floor(items.length / 2);
        var prepend = items.slice(0, half).reverse();
        var append = items.slice(half, items.length);
        var width = Components.Sizes.slideWidth + "px";
        for (var i = 0; i < append.length; i++) {
          wrapper.appendChild(append[i]);
        }
        for (var _i2 = 0; _i2 < prepend.length; _i2++) {
          wrapper.insertBefore(prepend[_i2], slides[0]);
        }
        for (var _i3 = 0; _i3 < items.length; _i3++) {
          items[_i3].style.width = width;
        }
      },
      remove: function remove() {
        var items = this.items;
        for (var i = 0; i < items.length; i++) {
          Components.Html.wrapper.removeChild(items[i]);
        }
      }
    };
    define(Clones, "grow", {
      get: function get() {
        return (
          (Components.Sizes.slideWidth + Components.Gaps.value) *
          Clones.items.length
        );
      }
    });
    Events.on("update", function () {
      Clones.remove();
      Clones.mount();
      Clones.append();
    });
    Events.on("build.before", function () {
      if (Glide.isType("carousel")) {
        Clones.append();
      }
    });
    Events.on("destroy", function () {
      Clones.remove();
    });
    return Clones;
  }
  var EventsBinder = (function () {
    function EventsBinder() {
      var listeners =
        arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      classCallCheck(this, EventsBinder);
      this.listeners = listeners;
    }
    createClass(EventsBinder, [
      {
        key: "on",
        value: function on(events, el, closure) {
          var capture =
            arguments.length > 3 && arguments[3] !== undefined
              ? arguments[3]
              : false;
          if (isString(events)) {
            events = [events];
          }
          for (var i = 0; i < events.length; i++) {
            this.listeners[events[i]] = closure;
            el.addEventListener(events[i], this.listeners[events[i]], capture);
          }
        }
      },
      {
        key: "off",
        value: function off(events, el) {
          if (isString(events)) {
            events = [events];
          }
          for (var i = 0; i < events.length; i++) {
            el.removeEventListener(events[i], this.listeners[events[i]], false);
          }
        }
      },
      {
        key: "destroy",
        value: function destroy() {
          delete this.listeners;
        }
      }
    ]);
    return EventsBinder;
  })();
  function Resize(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var Resize = {
      mount: function mount() {
        this.bind();
      },
      bind: function bind() {
        Binder.on(
          "resize",
          window,
          throttle(function () {
            Events.emit("resize");
          }, Glide.settings.throttle)
        );
      },
      unbind: function unbind() {
        Binder.off("resize", window);
      }
    };
    Events.on("destroy", function () {
      Resize.unbind();
      Binder.destroy();
    });
    return Resize;
  }
  var VALID_DIRECTIONS = ["ltr", "rtl"];
  var FLIPED_MOVEMENTS = { ">": "<", "<": ">", "=": "=" };
  function Direction(Glide, Components, Events) {
    var Direction = {
      mount: function mount() {
        this.value = Glide.settings.direction;
      },
      resolve: function resolve(pattern) {
        var token = pattern.slice(0, 1);
        if (this.is("rtl")) {
          return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
        }
        return pattern;
      },
      is: function is(direction) {
        return this.value === direction;
      },
      addClass: function addClass() {
        Components.Html.root.classList.add(
          Glide.settings.classes.direction[this.value]
        );
      },
      removeClass: function removeClass() {
        Components.Html.root.classList.remove(
          Glide.settings.classes.direction[this.value]
        );
      }
    };
    define(Direction, "value", {
      get: function get() {
        return Direction._v;
      },
      set: function set(value) {
        if (VALID_DIRECTIONS.indexOf(value) > -1) {
          Direction._v = value;
        } else {
          warn("Direction value must be `ltr` or `rtl`");
        }
      }
    });
    Events.on(["destroy", "update"], function () {
      Direction.removeClass();
    });
    Events.on("update", function () {
      Direction.mount();
    });
    Events.on(["build.before", "update"], function () {
      Direction.addClass();
    });
    return Direction;
  }
  function Rtl(Glide, Components) {
    return {
      modify: function modify(translate) {
        if (Components.Direction.is("rtl")) {
          return -translate;
        }
        return translate;
      }
    };
  }
  function Gap(Glide, Components) {
    return {
      modify: function modify(translate) {
        return translate + Components.Gaps.value * Glide.index;
      }
    };
  }
  function Grow(Glide, Components) {
    return {
      modify: function modify(translate) {
        return translate + Components.Clones.grow / 2;
      }
    };
  }
  function Peeking(Glide, Components) {
    return {
      modify: function modify(translate) {
        if (Glide.settings.focusAt >= 0) {
          var peek = Components.Peek.value;
          if (isObject(peek)) {
            return translate - peek.before;
          }
          return translate - peek;
        }
        return translate;
      }
    };
  }
  function Focusing(Glide, Components) {
    return {
      modify: function modify(translate) {
        var gap = Components.Gaps.value;
        var width = Components.Sizes.width;
        var focusAt = Glide.settings.focusAt;
        var slideWidth = Components.Sizes.slideWidth;
        if (focusAt === "center") {
          return translate - (width / 2 - slideWidth / 2);
        }
        return translate - slideWidth * focusAt - gap * focusAt;
      }
    };
  }
  function mutator(Glide, Components, Events) {
    var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide._t, [Rtl]);
    return {
      mutate: function mutate(translate) {
        for (var i = 0; i < TRANSFORMERS.length; i++) {
          var transformer = TRANSFORMERS[i];
          if (isFunction(transformer) && isFunction(transformer().modify)) {
            translate = transformer(Glide, Components, Events).modify(
              translate
            );
          } else {
            warn(
              "Transformer should be a function that returns an object with `modify()` method"
            );
          }
        }
        return translate;
      }
    };
  }
  function Translate(Glide, Components, Events) {
    var Translate = {
      set: function set(value) {
        var transform = mutator(Glide, Components).mutate(value);
        Components.Html.wrapper.style.transform =
          "translate3d(" + -1 * transform + "px, 0px, 0px)";
      },
      remove: function remove() {
        Components.Html.wrapper.style.transform = "";
      }
    };
    Events.on("move", function (context) {
      var gap = Components.Gaps.value;
      var length = Components.Sizes.length;
      var width = Components.Sizes.slideWidth;
      if (Glide.isType("carousel") && Components.Run.isOffset("<")) {
        Components.Transition.after(function () {
          Events.emit("translate.jump");
          Translate.set(width * (length - 1));
        });
        return Translate.set(-width - gap * length);
      }
      if (Glide.isType("carousel") && Components.Run.isOffset(">")) {
        Components.Transition.after(function () {
          Events.emit("translate.jump");
          Translate.set(0);
        });
        return Translate.set(width * length + gap * length);
      }
      return Translate.set(context.movement);
    });
    Events.on("destroy", function () {
      Translate.remove();
    });
    return Translate;
  }
  function Transition(Glide, Components, Events) {
    var disabled = false;
    var Transition = {
      compose: function compose(property) {
        var settings = Glide.settings;
        if (!disabled) {
          return (
            property +
            " " +
            this.duration +
            "ms " +
            settings.animationTimingFunc
          );
        }
        return property + " 0ms " + settings.animationTimingFunc;
      },
      set: function set() {
        var property =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : "transform";
        Components.Html.wrapper.style.transition = this.compose(property);
      },
      remove: function remove() {
        Components.Html.wrapper.style.transition = "";
      },
      after: function after(callback) {
        setTimeout(function () {
          callback();
        }, this.duration);
      },
      enable: function enable() {
        disabled = false;
        this.set();
      },
      disable: function disable() {
        disabled = true;
        this.set();
      }
    };
    define(Transition, "duration", {
      get: function get() {
        var settings = Glide.settings;
        if (Glide.isType("slider") && Components.Run.offset) {
          return settings.rewindDuration;
        }
        return settings.animationDuration;
      }
    });
    Events.on("move", function () {
      Transition.set();
    });
    Events.on(["build.before", "resize", "translate.jump"], function () {
      Transition.disable();
    });
    Events.on("run", function () {
      Transition.enable();
    });
    Events.on("destroy", function () {
      Transition.remove();
    });
    return Transition;
  }
  var supportsPassive = false;
  try {
    var opts = Object.defineProperty({}, "passive", {
      get: function get() {
        supportsPassive = true;
      }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
  } catch (e) {}
  var supportsPassive$1 = supportsPassive;
  var START_EVENTS = ["touchstart", "mousedown"];
  var MOVE_EVENTS = ["touchmove", "mousemove"];
  var END_EVENTS = ["touchend", "touchcancel", "mouseup", "mouseleave"];
  var MOUSE_EVENTS = ["mousedown", "mousemove", "mouseup", "mouseleave"];
  function Swipe(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var swipeSin = 0;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var disabled = false;
    var moveable = true;
    var capture = supportsPassive$1 ? { passive: true } : false;
    var Swipe = {
      mount: function mount() {
        this.bindSwipeStart();
      },
      start: function start(event) {
        if (!disabled && !Glide.disabled) {
          this.disable();
          var swipe = this.touches(event);
          moveable = true;
          swipeSin = null;
          swipeStartX = toInt(swipe.pageX);
          swipeStartY = toInt(swipe.pageY);
          this.bindSwipeMove();
          this.bindSwipeEnd();
          Events.emit("swipe.start");
        }
      },
      move: function move(event) {
        if (!Glide.disabled) {
          var _Glide$settings = Glide.settings,
            touchAngle = _Glide$settings.touchAngle,
            touchRatio = _Glide$settings.touchRatio,
            classes = _Glide$settings.classes;
          var swipe = this.touches(event);
          var subExSx = toInt(swipe.pageX) - swipeStartX;
          var subEySy = toInt(swipe.pageY) - swipeStartY;
          var powEX = Math.abs(subExSx << 2);
          var powEY = Math.abs(subEySy << 2);
          var swipeHypotenuse = Math.sqrt(powEX + powEY);
          var swipeCathetus = Math.sqrt(powEY);
          swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);
          if (moveable && (swipeSin * 180) / Math.PI < touchAngle) {
            event.stopPropagation();
            Components.Move.make(subExSx * toFloat(touchRatio));
            Components.Html.root.classList.add(classes.dragging);
            Events.emit("swipe.move");
          } else {
            moveable = false;
            return false;
          }
        }
      },
      end: function end(event) {
        if (!Glide.disabled) {
          var settings = Glide.settings;
          var swipe = this.touches(event);
          var threshold = this.threshold(event);
          var swipeDistance = swipe.pageX - swipeStartX;
          var swipeDeg = (swipeSin * 180) / Math.PI;
          var steps = Math.round(swipeDistance / Components.Sizes.slideWidth);
          this.enable();
          if (moveable) {
            if (swipeDistance > threshold && swipeDeg < settings.touchAngle) {
              if (settings.perTouch) {
                steps = Math.min(steps, toInt(settings.perTouch));
              }
              if (Components.Direction.is("rtl")) {
                steps = -steps;
              }
              Components.Run.make(Components.Direction.resolve("<" + steps));
            } else if (
              swipeDistance < -threshold &&
              swipeDeg < settings.touchAngle
            ) {
              if (settings.perTouch) {
                steps = Math.max(steps, -toInt(settings.perTouch));
              }
              if (Components.Direction.is("rtl")) {
                steps = -steps;
              }
              Components.Run.make(Components.Direction.resolve(">" + steps));
            } else {
              Components.Move.make();
            }
          }
          Components.Html.root.classList.remove(settings.classes.dragging);
          this.unbindSwipeMove();
          this.unbindSwipeEnd();
          Events.emit("swipe.end");
        }
      },
      bindSwipeStart: function bindSwipeStart() {
        var _this = this;
        var settings = Glide.settings;
        if (settings.swipeThreshold) {
          Binder.on(
            START_EVENTS[0],
            Components.Html.wrapper,
            function (event) {
              _this.start(event);
            },
            capture
          );
        }
        if (settings.dragThreshold) {
          Binder.on(
            START_EVENTS[1],
            Components.Html.wrapper,
            function (event) {
              _this.start(event);
            },
            capture
          );
        }
      },
      unbindSwipeStart: function unbindSwipeStart() {
        Binder.off(START_EVENTS[0], Components.Html.wrapper);
        Binder.off(START_EVENTS[1], Components.Html.wrapper);
      },
      bindSwipeMove: function bindSwipeMove() {
        var _this2 = this;
        Binder.on(
          MOVE_EVENTS,
          Components.Html.wrapper,
          throttle(function (event) {
            _this2.move(event);
          }, Glide.settings.throttle),
          capture
        );
      },
      unbindSwipeMove: function unbindSwipeMove() {
        Binder.off(MOVE_EVENTS, Components.Html.wrapper);
      },
      bindSwipeEnd: function bindSwipeEnd() {
        var _this3 = this;
        Binder.on(END_EVENTS, Components.Html.wrapper, function (event) {
          _this3.end(event);
        });
      },
      unbindSwipeEnd: function unbindSwipeEnd() {
        Binder.off(END_EVENTS, Components.Html.wrapper);
      },
      touches: function touches(event) {
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return event;
        }
        return event.touches[0] || event.changedTouches[0];
      },
      threshold: function threshold(event) {
        var settings = Glide.settings;
        if (MOUSE_EVENTS.indexOf(event.type) > -1) {
          return settings.dragThreshold;
        }
        return settings.swipeThreshold;
      },
      enable: function enable() {
        disabled = false;
        Components.Transition.enable();
        return this;
      },
      disable: function disable() {
        disabled = true;
        Components.Transition.disable();
        return this;
      }
    };
    Events.on("build.after", function () {
      Components.Html.root.classList.add(Glide.settings.classes.swipeable);
    });
    Events.on("destroy", function () {
      Swipe.unbindSwipeStart();
      Swipe.unbindSwipeMove();
      Swipe.unbindSwipeEnd();
      Binder.destroy();
    });
    return Swipe;
  }
  function Images(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var Images = {
      mount: function mount() {
        this.bind();
      },
      bind: function bind() {
        Binder.on("dragstart", Components.Html.wrapper, this.dragstart);
      },
      unbind: function unbind() {
        Binder.off("dragstart", Components.Html.wrapper);
      },
      dragstart: function dragstart(event) {
        event.preventDefault();
      }
    };
    Events.on("destroy", function () {
      Images.unbind();
      Binder.destroy();
    });
    return Images;
  }
  function Anchors(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var detached = false;
    var prevented = false;
    var Anchors = {
      mount: function mount() {
        this._a = Components.Html.wrapper.querySelectorAll("a");
        this.bind();
      },
      bind: function bind() {
        Binder.on("click", Components.Html.wrapper, this.click);
      },
      unbind: function unbind() {
        Binder.off("click", Components.Html.wrapper);
      },
      click: function click(event) {
        event.stopPropagation();
        if (prevented) {
          event.preventDefault();
        }
      },
      detach: function detach() {
        prevented = true;
        if (!detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = false;
            this.items[i].setAttribute(
              "data-href",
              this.items[i].getAttribute("href")
            );
            this.items[i].removeAttribute("href");
          }
          detached = true;
        }
        return this;
      },
      attach: function attach() {
        prevented = false;
        if (detached) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].draggable = true;
            this.items[i].setAttribute(
              "href",
              this.items[i].getAttribute("data-href")
            );
          }
          detached = false;
        }
        return this;
      }
    };
    define(Anchors, "items", {
      get: function get() {
        return Anchors._a;
      }
    });
    Events.on("swipe.move", function () {
      Anchors.detach();
    });
    Events.on("swipe.end", function () {
      Components.Transition.after(function () {
        Anchors.attach();
      });
    });
    Events.on("destroy", function () {
      Anchors.attach();
      Anchors.unbind();
      Binder.destroy();
    });
    return Anchors;
  }
  var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
  var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
  function Controls(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var Controls = {
      mount: function mount() {
        this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
        this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
        this.addBindings();
      },
      setActive: function setActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.addClass(this._n[i].children);
        }
      },
      removeActive: function removeActive() {
        for (var i = 0; i < this._n.length; i++) {
          this.removeClass(this._n[i].children);
        }
      },
      addClass: function addClass(controls) {
        var settings = Glide.settings;
        var item = controls[Glide.index];
        item.classList.add(settings.classes.activeNav);
        siblings(item).forEach(function (sibling) {
          sibling.classList.remove(settings.classes.activeNav);
        });
      },
      removeClass: function removeClass(controls) {
        controls[Glide.index].classList.remove(
          Glide.settings.classes.activeNav
        );
      },
      addBindings: function addBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.bind(this._c[i].children);
        }
      },
      removeBindings: function removeBindings() {
        for (var i = 0; i < this._c.length; i++) {
          this.unbind(this._c[i].children);
        }
      },
      bind: function bind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.on(["click", "touchstart"], elements[i], this.click);
        }
      },
      unbind: function unbind(elements) {
        for (var i = 0; i < elements.length; i++) {
          Binder.off(["click", "touchstart"], elements[i]);
        }
      },
      click: function click(event) {
        event.preventDefault();
        Components.Run.make(
          Components.Direction.resolve(
            event.currentTarget.getAttribute("data-glide-dir")
          )
        );
      }
    };
    define(Controls, "items", {
      get: function get() {
        return Controls._c;
      }
    });
    Events.on(["mount.after", "move.after"], function () {
      Controls.setActive();
    });
    Events.on("destroy", function () {
      Controls.removeBindings();
      Controls.removeActive();
      Binder.destroy();
    });
    return Controls;
  }
  function Keyboard(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var Keyboard = {
      mount: function mount() {
        if (Glide.settings.keyboard) {
          this.bind();
        }
      },
      bind: function bind() {
        Binder.on("keyup", document, this.press);
      },
      unbind: function unbind() {
        Binder.off("keyup", document);
      },
      press: function press(event) {
        if (event.keyCode === 39) {
          Components.Run.make(Components.Direction.resolve(">"));
        }
        if (event.keyCode === 37) {
          Components.Run.make(Components.Direction.resolve("<"));
        }
      }
    };
    Events.on(["destroy", "update"], function () {
      Keyboard.unbind();
    });
    Events.on("update", function () {
      Keyboard.mount();
    });
    Events.on("destroy", function () {
      Binder.destroy();
    });
    return Keyboard;
  }
  function Autoplay(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var Autoplay = {
      mount: function mount() {
        this.start();
        if (Glide.settings.hoverpause) {
          this.bind();
        }
      },
      start: function start() {
        var _this = this;
        if (Glide.settings.autoplay) {
          if (isUndefined(this._i)) {
            this._i = setInterval(function () {
              _this.stop();
              Components.Run.make(">");
              _this.start();
            }, this.time);
          }
        }
      },
      stop: function stop() {
        this._i = clearInterval(this._i);
      },
      bind: function bind() {
        var _this2 = this;
        Binder.on("mouseover", Components.Html.root, function () {
          _this2.stop();
        });
        Binder.on("mouseout", Components.Html.root, function () {
          _this2.start();
        });
      },
      unbind: function unbind() {
        Binder.off(["mouseover", "mouseout"], Components.Html.root);
      }
    };
    define(Autoplay, "time", {
      get: function get() {
        var autoplay = Components.Html.slides[Glide.index].getAttribute(
          "data-glide-autoplay"
        );
        if (autoplay) {
          return toInt(autoplay);
        }
        return toInt(Glide.settings.autoplay);
      }
    });
    Events.on(["destroy", "update"], function () {
      Autoplay.unbind();
    });
    Events.on(
      ["run.before", "pause", "destroy", "swipe.start", "update"],
      function () {
        Autoplay.stop();
      }
    );
    Events.on(["run.after", "play", "swipe.end"], function () {
      Autoplay.start();
    });
    Events.on("update", function () {
      Autoplay.mount();
    });
    Events.on("destroy", function () {
      Binder.destroy();
    });
    return Autoplay;
  }
  function sortBreakpoints(points) {
    if (isObject(points)) {
      return sortKeys(points);
    } else {
      warn("Breakpoints option must be an object");
    }
    return {};
  }
  function Breakpoints(Glide, Components, Events) {
    var Binder = new EventsBinder();
    var settings = Glide.settings;
    var points = sortBreakpoints(settings.breakpoints);
    var defaults = _extends({}, settings);
    var Breakpoints = {
      match: function match(points) {
        if (typeof window.matchMedia !== "undefined") {
          for (var point in points) {
            if (points.hasOwnProperty(point)) {
              if (window.matchMedia("(max-width: " + point + "px)").matches) {
                return points[point];
              }
            }
          }
        }
        return defaults;
      }
    };
    _extends(settings, Breakpoints.match(points));
    Binder.on(
      "resize",
      window,
      throttle(function () {
        Glide.settings = mergeOptions(settings, Breakpoints.match(points));
      }, Glide.settings.throttle)
    );
    Events.on("update", function () {
      points = sortBreakpoints(points);
      defaults = _extends({}, settings);
    });
    Events.on("destroy", function () {
      Binder.off("resize", window);
    });
    return Breakpoints;
  }
  var COMPONENTS = {
    Html: Html,
    Translate: Translate,
    Transition: Transition,
    Direction: Direction,
    Peek: Peek,
    Sizes: Sizes,
    Gaps: Gaps,
    Move: Move,
    Clones: Clones,
    Resize: Resize,
    Build: Build,
    Run: Run,
    Swipe: Swipe,
    Images: Images,
    Anchors: Anchors,
    Controls: Controls,
    Keyboard: Keyboard,
    Autoplay: Autoplay,
    Breakpoints: Breakpoints
  };
  var Glide$1 = (function (_Core) {
    inherits(Glide$$1, _Core);
    function Glide$$1() {
      classCallCheck(this, Glide$$1);
      return possibleConstructorReturn(
        this,
        (Glide$$1.__proto__ || Object.getPrototypeOf(Glide$$1)).apply(
          this,
          arguments
        )
      );
    }
    createClass(Glide$$1, [
      {
        key: "mount",
        value: function mount() {
          var extensions =
            arguments.length > 0 && arguments[0] !== undefined
              ? arguments[0]
              : {};
          return get(
            Glide$$1.prototype.__proto__ ||
              Object.getPrototypeOf(Glide$$1.prototype),
            "mount",
            this
          ).call(this, _extends({}, COMPONENTS, extensions));
        }
      }
    ]);
    return Glide$$1;
  })(Glide);
  return Glide$1;
});
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  var carouselSlider = getElements(".carousel-slider");
  Array.from(carouselSlider).forEach(function (carouselSlider) {
    var carouselSliderRun = new Glide(carouselSlider, {
      type: "carousel",
      autoplay: 7000,
      animationDuration: 1000,
      hoverpause: true,
      perView: 5,
      gap: 0,
      direction: "rtl",
      breakpoints: {
        990: { perView: 3 },
        650: { perView: 2, peek: { before: 0, after: 0 } },
        370: { perView: 1, peek: { before: 50, after: 50 } }
      }
    });
    carouselSliderRun.mount();
  });
  addLiveListener(".night-mode", "click", function (e) {
    e.preventDefault();
    var nightOver = getElement(".night-overlay");
    nightOver.classList.toggle("active");
  });
  addLiveListener(".night-overlay", "click", function (e) {
    e.preventDefault();
    this.classList.toggle("active");
  });
});
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ===
    "object" && typeof module !== "undefined"
    ? (module.exports = factory())
    : typeof define === "function" && define.amd
    ? define(factory)
    : ((global = global || self), (global.SimpleBar = factory()));
})(this, function () {
  "use strict";
  var _isObject = function _isObject(it) {
    return _typeof(it) === "object" ? it !== null : typeof it === "function";
  };
  var _anObject = function _anObject(it) {
    if (!_isObject(it)) throw TypeError(it + " is not an object!");
    return it;
  };
  var _defined = function _defined(it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };
  var _toObject = function _toObject(it) {
    return Object(_defined(it));
  };
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function _toInteger(it) {
    return isNaN((it = +it)) ? 0 : (it > 0 ? floor : ceil)(it);
  };
  var min = Math.min;
  var _toLength = function _toLength(it) {
    return it > 0 ? min(_toInteger(it), 9007199254740991) : 0;
  };
  var _stringAt = function _stringAt(TO_STRING) {
    return function (that, pos) {
      var s = String(_defined(that));
      var i = _toInteger(pos);
      var l = s.length;
      var a, b;
      if (i < 0 || i >= l) return TO_STRING ? "" : undefined;
      a = s.charCodeAt(i);
      return a < 55296 ||
        a > 56319 ||
        i + 1 === l ||
        (b = s.charCodeAt(i + 1)) < 56320 ||
        b > 57343
        ? TO_STRING
          ? s.charAt(i)
          : a
        : TO_STRING
        ? s.slice(i, i + 2)
        : ((a - 55296) << 10) + (b - 56320) + 65536;
    };
  };
  var at = _stringAt(true);
  var _advanceStringIndex = function _advanceStringIndex(S, index, unicode) {
    return index + (unicode ? at(S, index).length : 1);
  };
  var toString = {}.toString;
  var _cof = function _cof(it) {
    return toString.call(it).slice(8, -1);
  };
  var commonjsGlobal =
    typeof window !== "undefined"
      ? window
      : typeof global !== "undefined"
      ? global
      : typeof self !== "undefined"
      ? self
      : {};
  function createCommonjsModule(fn, module) {
    return (
      (module = { exports: {} }), fn(module, module.exports), module.exports
    );
  }
  var _core = createCommonjsModule(function (module) {
    var core = (module.exports = { version: "2.6.2" });
    if (typeof __e == "number") __e = core;
  });
  var _core_1 = _core.version;
  var _global = createCommonjsModule(function (module) {
    var global = (module.exports =
      typeof window != "undefined" && window.Math == Math
        ? window
        : typeof self != "undefined" && self.Math == Math
        ? self
        : Function("return this")());
    if (typeof __g == "number") __g = global;
  });
  var _library = false;
  var _shared = createCommonjsModule(function (module) {
    var SHARED = "__core-js_shared__";
    var store = _global[SHARED] || (_global[SHARED] = {});
    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })("versions", []).push({
      version: _core.version,
      mode: _library ? "pure" : "global",
      copyright: "\xA9 2019 Denis Pushkarev (zloirock.ru)"
    });
  });
  var id = 0;
  var px = Math.random();
  var _uid = function _uid(key) {
    return "Symbol(".concat(
      key === undefined ? "" : key,
      ")_",
      (++id + px).toString(36)
    );
  };
  var _wks = createCommonjsModule(function (module) {
    var store = _shared("wks");
    var _Symbol = _global.Symbol;
    var USE_SYMBOL = typeof _Symbol == "function";
    var $exports = (module.exports = function (name) {
      return (
        store[name] ||
        (store[name] =
          (USE_SYMBOL && _Symbol[name]) ||
          (USE_SYMBOL ? _Symbol : _uid)("Symbol." + name))
      );
    });
    $exports.store = store;
  });
  var TAG = _wks("toStringTag");
  var ARG =
    _cof(
      (function () {
        return arguments;
      })()
    ) == "Arguments";
  var tryGet = function tryGet(it, key) {
    try {
      return it[key];
    } catch (e) {}
  };
  var _classof = function _classof(it) {
    var O, T, B;
    return it === undefined
      ? "Undefined"
      : it === null
      ? "Null"
      : typeof (T = tryGet((O = Object(it)), TAG)) == "string"
      ? T
      : ARG
      ? _cof(O)
      : (B = _cof(O)) == "Object" && typeof O.callee == "function"
      ? "Arguments"
      : B;
  };
  var builtinExec = RegExp.prototype.exec;
  var _regexpExecAbstract = function _regexpExecAbstract(R, S) {
    var exec = R.exec;
    if (typeof exec === "function") {
      var result = exec.call(R, S);
      if (_typeof(result) !== "object") {
        throw new TypeError(
          "RegExp exec method returned something other than an Object or null"
        );
      }
      return result;
    }
    if (_classof(R) !== "RegExp") {
      throw new TypeError("RegExp#exec called on incompatible receiver");
    }
    return builtinExec.call(R, S);
  };
  var _flags = function _flags() {
    var that = _anObject(this);
    var result = "";
    if (that.global) result += "g";
    if (that.ignoreCase) result += "i";
    if (that.multiline) result += "m";
    if (that.unicode) result += "u";
    if (that.sticky) result += "y";
    return result;
  };
  var nativeExec = RegExp.prototype.exec;
  var nativeReplace = String.prototype.replace;
  var patchedExec = nativeExec;
  var LAST_INDEX = "lastIndex";
  var UPDATES_LAST_INDEX_WRONG = (function () {
    var re1 = /a/,
      re2 = /b*/g;
    nativeExec.call(re1, "a");
    nativeExec.call(re2, "a");
    return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
  })();
  var NPCG_INCLUDED = /()??/.exec("")[1] !== undefined;
  var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;
  if (PATCH) {
    patchedExec = function exec(str) {
      var re = this;
      var lastIndex, reCopy, match, i;
      if (NPCG_INCLUDED) {
        reCopy = new RegExp("^" + re.source + "$(?!\\s)", _flags.call(re));
      }
      if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
      match = nativeExec.call(re, str);
      if (UPDATES_LAST_INDEX_WRONG && match) {
        re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
      }
      if (NPCG_INCLUDED && match && match.length > 1) {
        nativeReplace.call(match[0], reCopy, function () {
          for (i = 1; i < arguments.length - 2; i++) {
            if (arguments[i] === undefined) match[i] = undefined;
          }
        });
      }
      return match;
    };
  }
  var _regexpExec = patchedExec;
  var _fails = function _fails(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  var _descriptors = !_fails(function () {
    return (
      Object.defineProperty({}, "a", {
        get: function get() {
          return 7;
        }
      }).a != 7
    );
  });
  var document$1 = _global.document;
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function _domCreate(it) {
    return is ? document$1.createElement(it) : {};
  };
  var _ie8DomDefine =
    !_descriptors &&
    !_fails(function () {
      return (
        Object.defineProperty(_domCreate("div"), "a", {
          get: function get() {
            return 7;
          }
        }).a != 7
      );
    });
  var _toPrimitive = function _toPrimitive(it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (
      S &&
      typeof (fn = it.toString) == "function" &&
      !_isObject((val = fn.call(it)))
    )
      return val;
    if (
      typeof (fn = it.valueOf) == "function" &&
      !_isObject((val = fn.call(it)))
    )
      return val;
    if (
      !S &&
      typeof (fn = it.toString) == "function" &&
      !_isObject((val = fn.call(it)))
    )
      return val;
    throw TypeError("Can't convert object to primitive value");
  };
  var dP = Object.defineProperty;
  var f = _descriptors
    ? Object.defineProperty
    : function defineProperty(O, P, Attributes) {
        _anObject(O);
        P = _toPrimitive(P, true);
        _anObject(Attributes);
        if (_ie8DomDefine)
          try {
            return dP(O, P, Attributes);
          } catch (e) {}
        if ("get" in Attributes || "set" in Attributes)
          throw TypeError("Accessors not supported!");
        if ("value" in Attributes) O[P] = Attributes.value;
        return O;
      };
  var _objectDp = { f: f };
  var _propertyDesc = function _propertyDesc(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  var _hide = _descriptors
    ? function (object, key, value) {
        return _objectDp.f(object, key, _propertyDesc(1, value));
      }
    : function (object, key, value) {
        object[key] = value;
        return object;
      };
  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function _has(it, key) {
    return hasOwnProperty.call(it, key);
  };
  var _redefine = createCommonjsModule(function (module) {
    var SRC = _uid("src");
    var TO_STRING = "toString";
    var $toString = Function[TO_STRING];
    var TPL = ("" + $toString).split(TO_STRING);
    _core.inspectSource = function (it) {
      return $toString.call(it);
    };
    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == "function";
      if (isFunction) _has(val, "name") || _hide(val, "name", key);
      if (O[key] === val) return;
      if (isFunction)
        _has(val, SRC) ||
          _hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key)));
      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      }
    })(Function.prototype, TO_STRING, function toString() {
      return (typeof this == "function" && this[SRC]) || $toString.call(this);
    });
  });
  var _aFunction = function _aFunction(it) {
    if (typeof it != "function") throw TypeError(it + " is not a function!");
    return it;
  };
  var _ctx = function _ctx(fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1:
        return function (a) {
          return fn.call(that, a);
        };
      case 2:
        return function (a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function () {
      return fn.apply(that, arguments);
    };
  };
  var PROTOTYPE = "prototype";
  var $export = function $export(type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var target = IS_GLOBAL
      ? _global
      : IS_STATIC
      ? _global[name] || (_global[name] = {})
      : (_global[name] || {})[PROTOTYPE];
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      own = !IS_FORCED && target && target[key] !== undefined;
      out = (own ? target : source)[key];
      exp =
        IS_BIND && own
          ? _ctx(out, _global)
          : IS_PROTO && typeof out == "function"
          ? _ctx(Function.call, out)
          : out;
      if (target) _redefine(target, key, out, type & $export.U);
      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global.core = _core;
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  $export.U = 64;
  $export.R = 128;
  var _export = $export;
  _export(
    { target: "RegExp", proto: true, forced: _regexpExec !== /./.exec },
    { exec: _regexpExec }
  );
  var SPECIES = _wks("species");
  var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
    var re = /./;
    re.exec = function () {
      var result = [];
      result.groups = { a: "7" };
      return result;
    };
    return "".replace(re, "$<a>") !== "7";
  });
  var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
    var re = /(?:)/;
    var originalExec = re.exec;
    re.exec = function () {
      return originalExec.apply(this, arguments);
    };
    var result = "ab".split(re);
    return result.length === 2 && result[0] === "a" && result[1] === "b";
  })();
  var _fixReWks = function _fixReWks(KEY, length, exec) {
    var SYMBOL = _wks(KEY);
    var DELEGATES_TO_SYMBOL = !_fails(function () {
      var O = {};
      O[SYMBOL] = function () {
        return 7;
      };
      return ""[KEY](O) != 7;
    });
    var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL
      ? !_fails(function () {
          var execCalled = false;
          var re = /a/;
          re.exec = function () {
            execCalled = true;
            return null;
          };
          if (KEY === "split") {
            re.constructor = {};
            re.constructor[SPECIES] = function () {
              return re;
            };
          }
          re[SYMBOL]("");
          return !execCalled;
        })
      : undefined;
    if (
      !DELEGATES_TO_SYMBOL ||
      !DELEGATES_TO_EXEC ||
      (KEY === "replace" && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
      (KEY === "split" && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
    ) {
      var nativeRegExpMethod = /./[SYMBOL];
      var fns = exec(
        _defined,
        SYMBOL,
        ""[KEY],
        function maybeCallNative(
          nativeMethod,
          regexp,
          str,
          arg2,
          forceStringMethod
        ) {
          if (regexp.exec === _regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              return {
                done: true,
                value: nativeRegExpMethod.call(regexp, str, arg2)
              };
            }
            return { done: true, value: nativeMethod.call(str, regexp, arg2) };
          }
          return { done: false };
        }
      );
      var strfn = fns[0];
      var rxfn = fns[1];
      _redefine(String.prototype, KEY, strfn);
      _hide(
        RegExp.prototype,
        SYMBOL,
        length == 2
          ? function (string, arg) {
              return rxfn.call(string, this, arg);
            }
          : function (string) {
              return rxfn.call(string, this);
            }
      );
    }
  };
  var max = Math.max;
  var min$1 = Math.min;
  var floor$1 = Math.floor;
  var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
  var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;
  var maybeToString = function maybeToString(it) {
    return it === undefined ? it : String(it);
  };
  _fixReWks(
    "replace",
    2,
    function (defined, REPLACE, $replace, maybeCallNative) {
      return [
        function replace(searchValue, replaceValue) {
          var O = defined(this);
          var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
          return fn !== undefined
            ? fn.call(searchValue, O, replaceValue)
            : $replace.call(String(O), searchValue, replaceValue);
        },
        function (regexp, replaceValue) {
          var res = maybeCallNative($replace, regexp, this, replaceValue);
          if (res.done) return res.value;
          var rx = _anObject(regexp);
          var S = String(this);
          var functionalReplace = typeof replaceValue === "function";
          if (!functionalReplace) replaceValue = String(replaceValue);
          var global = rx.global;
          if (global) {
            var fullUnicode = rx.unicode;
            rx.lastIndex = 0;
          }
          var results = [];
          while (true) {
            var result = _regexpExecAbstract(rx, S);
            if (result === null) break;
            results.push(result);
            if (!global) break;
            var matchStr = String(result[0]);
            if (matchStr === "")
              rx.lastIndex = _advanceStringIndex(
                S,
                _toLength(rx.lastIndex),
                fullUnicode
              );
          }
          var accumulatedResult = "";
          var nextSourcePosition = 0;
          for (var i = 0; i < results.length; i++) {
            result = results[i];
            var matched = String(result[0]);
            var position = max(min$1(_toInteger(result.index), S.length), 0);
            var captures = [];
            for (var j = 1; j < result.length; j++) {
              captures.push(maybeToString(result[j]));
            }
            var namedCaptures = result.groups;
            if (functionalReplace) {
              var replacerArgs = [matched].concat(captures, position, S);
              if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
              var replacement = String(
                replaceValue.apply(undefined, replacerArgs)
              );
            } else {
              replacement = getSubstitution(
                matched,
                S,
                position,
                captures,
                namedCaptures,
                replaceValue
              );
            }
            if (position >= nextSourcePosition) {
              accumulatedResult +=
                S.slice(nextSourcePosition, position) + replacement;
              nextSourcePosition = position + matched.length;
            }
          }
          return accumulatedResult + S.slice(nextSourcePosition);
        }
      ];
      function getSubstitution(
        matched,
        str,
        position,
        captures,
        namedCaptures,
        replacement
      ) {
        var tailPos = position + matched.length;
        var m = captures.length;
        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
        if (namedCaptures !== undefined) {
          namedCaptures = _toObject(namedCaptures);
          symbols = SUBSTITUTION_SYMBOLS;
        }
        return $replace.call(replacement, symbols, function (match, ch) {
          var capture;
          switch (ch.charAt(0)) {
            case "$":
              return "$";
            case "&":
              return matched;
            case "`":
              return str.slice(0, position);
            case "'":
              return str.slice(tailPos);
            case "<":
              capture = namedCaptures[ch.slice(1, -1)];
              break;
            default:
              var n = +ch;
              if (n === 0) return match;
              if (n > m) {
                var f = floor$1(n / 10);
                if (f === 0) return match;
                if (f <= m)
                  return captures[f - 1] === undefined
                    ? ch.charAt(1)
                    : captures[f - 1] + ch.charAt(1);
                return match;
              }
              capture = captures[n - 1];
          }
          return capture === undefined ? "" : capture;
        });
      }
    }
  );
  var dP$1 = _objectDp.f;
  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME = "name";
  NAME in FProto ||
    (_descriptors &&
      dP$1(FProto, NAME, {
        configurable: true,
        get: function get() {
          try {
            return ("" + this).match(nameRE)[1];
          } catch (e) {
            return "";
          }
        }
      }));
  _fixReWks("match", 1, function (defined, MATCH, $match, maybeCallNative) {
    return [
      function match(regexp) {
        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined
          ? fn.call(regexp, O)
          : new RegExp(regexp)[MATCH](String(O));
      },
      function (regexp) {
        var res = maybeCallNative($match, regexp, this);
        if (res.done) return res.value;
        var rx = _anObject(regexp);
        var S = String(this);
        if (!rx.global) return _regexpExecAbstract(rx, S);
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;
        while ((result = _regexpExecAbstract(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === "")
            rx.lastIndex = _advanceStringIndex(
              S,
              _toLength(rx.lastIndex),
              fullUnicode
            );
          n++;
        }
        return n === 0 ? null : A;
      }
    ];
  });
  var UNSCOPABLES = _wks("unscopables");
  var ArrayProto = Array.prototype;
  if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
  var _addToUnscopables = function _addToUnscopables(key) {
    ArrayProto[UNSCOPABLES][key] = true;
  };
  var _iterStep = function _iterStep(done, value) {
    return { value: value, done: !!done };
  };
  var _iterators = {};
  var _iobject = Object("z").propertyIsEnumerable(0)
    ? Object
    : function (it) {
        return _cof(it) == "String" ? it.split("") : Object(it);
      };
  var _toIobject = function _toIobject(it) {
    return _iobject(_defined(it));
  };
  var max$1 = Math.max;
  var min$2 = Math.min;
  var _toAbsoluteIndex = function _toAbsoluteIndex(index, length) {
    index = _toInteger(index);
    return index < 0 ? max$1(index + length, 0) : min$2(index, length);
  };
  var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value;
      if (IS_INCLUDES && el != el)
        while (length > index) {
          value = O[index++];
          if (value != value) return true;
        }
      else
        for (; length > index; index++) {
          if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
        }
      return !IS_INCLUDES && -1;
    };
  };
  var shared = _shared("keys");
  var _sharedKey = function _sharedKey(key) {
    return shared[key] || (shared[key] = _uid(key));
  };
  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey("IE_PROTO");
  var _objectKeysInternal = function _objectKeysInternal(object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) {
      if (key != IE_PROTO) _has(O, key) && result.push(key);
    }
    while (names.length > i) {
      if (_has(O, (key = names[i++]))) {
        ~arrayIndexOf(result, key) || result.push(key);
      }
    }
    return result;
  };
  var _enumBugKeys = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
    ","
  );
  var _objectKeys =
    Object.keys ||
    function keys(O) {
      return _objectKeysInternal(O, _enumBugKeys);
    };
  var _objectDps = _descriptors
    ? Object.defineProperties
    : function defineProperties(O, Properties) {
        _anObject(O);
        var keys = _objectKeys(Properties);
        var length = keys.length;
        var i = 0;
        var P;
        while (length > i) {
          _objectDp.f(O, (P = keys[i++]), Properties[P]);
        }
        return O;
      };
  var document$2 = _global.document;
  var _html = document$2 && document$2.documentElement;
  var IE_PROTO$1 = _sharedKey("IE_PROTO");
  var Empty = function Empty() {};
  var PROTOTYPE$1 = "prototype";
  var _createDict = function createDict() {
    var iframe = _domCreate("iframe");
    var i = _enumBugKeys.length;
    var lt = "<";
    var gt = ">";
    var iframeDocument;
    iframe.style.display = "none";
    _html.appendChild(iframe);
    iframe.src = "javascript:";
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(
      lt + "script" + gt + "document.F=Object" + lt + "/script" + gt
    );
    iframeDocument.close();
    _createDict = iframeDocument.F;
    while (i--) {
      delete _createDict[PROTOTYPE$1][_enumBugKeys[i]];
    }
    return _createDict();
  };
  var _objectCreate =
    Object.create ||
    function create(O, Properties) {
      var result;
      if (O !== null) {
        Empty[PROTOTYPE$1] = _anObject(O);
        result = new Empty();
        Empty[PROTOTYPE$1] = null;
        result[IE_PROTO$1] = O;
      } else result = _createDict();
      return Properties === undefined ? result : _objectDps(result, Properties);
    };
  var def = _objectDp.f;
  var TAG$1 = _wks("toStringTag");
  var _setToStringTag = function _setToStringTag(it, tag, stat) {
    if (it && !_has((it = stat ? it : it.prototype), TAG$1))
      def(it, TAG$1, { configurable: true, value: tag });
  };
  var IteratorPrototype = {};
  _hide(IteratorPrototype, _wks("iterator"), function () {
    return this;
  });
  var _iterCreate = function _iterCreate(Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, {
      next: _propertyDesc(1, next)
    });
    _setToStringTag(Constructor, NAME + " Iterator");
  };
  var IE_PROTO$2 = _sharedKey("IE_PROTO");
  var ObjectProto = Object.prototype;
  var _objectGpo =
    Object.getPrototypeOf ||
    function (O) {
      O = _toObject(O);
      if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
      if (typeof O.constructor == "function" && O instanceof O.constructor) {
        return O.constructor.prototype;
      }
      return O instanceof Object ? ObjectProto : null;
    };
  var ITERATOR = _wks("iterator");
  var BUGGY = !([].keys && "next" in [].keys());
  var FF_ITERATOR = "@@iterator";
  var KEYS = "keys";
  var VALUES = "values";
  var returnThis = function returnThis() {
    return this;
  };
  var _iterDefine = function _iterDefine(
    Base,
    NAME,
    Constructor,
    next,
    DEFAULT,
    IS_SET,
    FORCED
  ) {
    _iterCreate(Constructor, NAME, next);
    var getMethod = function getMethod(kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + " Iterator";
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native =
      proto[ITERATOR] || proto[FF_ITERATOR] || (DEFAULT && proto[DEFAULT]);
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT
      ? !DEF_VALUES
        ? $default
        : getMethod("entries")
      : undefined;
    var $anyNative = NAME == "Array" ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        _setToStringTag(IteratorPrototype, TAG, true);
        if (!_library && typeof IteratorPrototype[ITERATOR] != "function")
          _hide(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() {
        return $native.call(this);
      };
    }
    if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      _hide(proto, ITERATOR, $default);
    }
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED)
        for (key in methods) {
          if (!(key in proto)) _redefine(proto, key, methods[key]);
        }
      else
        _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };
  var es6_array_iterator = _iterDefine(
    Array,
    "Array",
    function (iterated, kind) {
      this._t = _toIobject(iterated);
      this._i = 0;
      this._k = kind;
    },
    function () {
      var O = this._t;
      var kind = this._k;
      var index = this._i++;
      if (!O || index >= O.length) {
        this._t = undefined;
        return _iterStep(1);
      }
      if (kind == "keys") return _iterStep(0, index);
      if (kind == "values") return _iterStep(0, O[index]);
      return _iterStep(0, [index, O[index]]);
    },
    "values"
  );
  _iterators.Arguments = _iterators.Array;
  _addToUnscopables("keys");
  _addToUnscopables("values");
  _addToUnscopables("entries");
  var ITERATOR$1 = _wks("iterator");
  var TO_STRING_TAG = _wks("toStringTag");
  var ArrayValues = _iterators.Array;
  var DOMIterables = {
    CSSRuleList: true,
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true,
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true,
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };
  for (
    var collections = _objectKeys(DOMIterables), i = 0;
    i < collections.length;
    i++
  ) {
    var NAME$1 = collections[i];
    var explicit = DOMIterables[NAME$1];
    var Collection = _global[NAME$1];
    var proto = Collection && Collection.prototype;
    var key;
    if (proto) {
      if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
      if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME$1);
      _iterators[NAME$1] = ArrayValues;
      if (explicit)
        for (key in es6_array_iterator) {
          if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
        }
    }
  }
  var $at = _stringAt(true);
  _iterDefine(
    String,
    "String",
    function (iterated) {
      this._t = String(iterated);
      this._i = 0;
    },
    function () {
      var O = this._t;
      var index = this._i;
      var point;
      if (index >= O.length) return { value: undefined, done: true };
      point = $at(O, index);
      this._i += point.length;
      return { value: point, done: false };
    }
  );
  var _iterCall = function _iterCall(iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator["return"];
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };
  var ITERATOR$2 = _wks("iterator");
  var ArrayProto$1 = Array.prototype;
  var _isArrayIter = function _isArrayIter(it) {
    return (
      it !== undefined &&
      (_iterators.Array === it || ArrayProto$1[ITERATOR$2] === it)
    );
  };
  var _createProperty = function _createProperty(object, index, value) {
    if (index in object) _objectDp.f(object, index, _propertyDesc(0, value));
    else object[index] = value;
  };
  var ITERATOR$3 = _wks("iterator");
  var core_getIteratorMethod = (_core.getIteratorMethod = function (it) {
    if (it != undefined)
      return it[ITERATOR$3] || it["@@iterator"] || _iterators[_classof(it)];
  });
  var ITERATOR$4 = _wks("iterator");
  var SAFE_CLOSING = false;
  try {
    var riter = [7][ITERATOR$4]();
    riter["return"] = function () {
      SAFE_CLOSING = true;
    };
  } catch (e) {}
  var _iterDetect = function _iterDetect(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR$4]();
      iter.next = function () {
        return { done: (safe = true) };
      };
      arr[ITERATOR$4] = function () {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  _export(_export.S + _export.F * !_iterDetect(function (iter) {}), "Array", {
    from: function from(arrayLike) {
      var O = _toObject(arrayLike);
      var C = typeof this == "function" ? this : Array;
      var aLen = arguments.length;
      var mapfn = aLen > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iterFn = core_getIteratorMethod(O);
      var length, result, step, iterator;
      if (mapping) mapfn = _ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
      if (iterFn != undefined && !(C == Array && _isArrayIter(iterFn))) {
        for (
          iterator = iterFn.call(O), result = new C();
          !(step = iterator.next()).done;
          index++
        ) {
          _createProperty(
            result,
            index,
            mapping
              ? _iterCall(iterator, mapfn, [step.value, index], true)
              : step.value
          );
        }
      } else {
        length = _toLength(O.length);
        for (result = new C(length); length > index; index++) {
          _createProperty(
            result,
            index,
            mapping ? mapfn(O[index], index) : O[index]
          );
        }
      }
      result.length = index;
      return result;
    }
  });
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);
      if (typeof Object.getOwnPropertySymbols === "function") {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(function (sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          })
        );
      }
      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }
    return target;
  }
  var scrollbarWidth = createCommonjsModule(function (module, exports) {
    (function (root, factory) {
      {
        module.exports = factory();
      }
    })(commonjsGlobal, function () {
      function scrollbarWidth() {
        if (typeof document === "undefined") {
          return 0;
        }
        var body = document.body,
          box = document.createElement("div"),
          boxStyle = box.style,
          width;
        boxStyle.position = "absolute";
        boxStyle.top = boxStyle.left = "-9999px";
        boxStyle.width = boxStyle.height = "100px";
        boxStyle.overflow = "scroll";
        body.appendChild(box);
        width = box.offsetWidth - box.clientWidth;
        body.removeChild(box);
        return width;
      }
      return scrollbarWidth;
    });
  });
  var FUNC_ERROR_TEXT = "Expected a function";
  var NAN = 0 / 0;
  var symbolTag = "[object Symbol]";
  var reTrim = /^\s+|\s+$/g;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  var freeGlobal =
    _typeof(commonjsGlobal) == "object" &&
    commonjsGlobal &&
    commonjsGlobal.Object === Object &&
    commonjsGlobal;
  var freeSelf =
    (typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" &&
    self &&
    self.Object === Object &&
    self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  var nativeMax = Math.max,
    nativeMin = Math.min;
  var now = function now() {
    return root.Date.now();
  };
  function debounce(func, wait, options) {
    var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing
        ? nativeMax(toNumber(options.maxWait) || 0, wait)
        : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs,
        thisArg = lastThis;
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;
      return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;
      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      );
    }
    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = undefined;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }
    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
      return timerId === undefined ? result : trailingEdge(now());
    }
    function debounced() {
      var time = now(),
        isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  function throttle(func, wait, options) {
    var leading = true,
      trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    if (isObject(options)) {
      leading = "leading" in options ? !!options.leading : leading;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
      leading: leading,
      maxWait: wait,
      trailing: trailing
    });
  }
  function isObject(value) {
    var type = _typeof(value);
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && _typeof(value) == "object";
  }
  function isSymbol(value) {
    return (
      _typeof(value) == "symbol" ||
      (isObjectLike(value) && objectToString.call(value) == symbolTag)
    );
  }
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, "");
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value)
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : reIsBadHex.test(value)
      ? NAN
      : +value;
  }
  var lodash_throttle = throttle;
  var FUNC_ERROR_TEXT$1 = "Expected a function";
  var NAN$1 = 0 / 0;
  var symbolTag$1 = "[object Symbol]";
  var reTrim$1 = /^\s+|\s+$/g;
  var reIsBadHex$1 = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary$1 = /^0b[01]+$/i;
  var reIsOctal$1 = /^0o[0-7]+$/i;
  var freeParseInt$1 = parseInt;
  var freeGlobal$1 =
    _typeof(commonjsGlobal) == "object" &&
    commonjsGlobal &&
    commonjsGlobal.Object === Object &&
    commonjsGlobal;
  var freeSelf$1 =
    (typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" &&
    self &&
    self.Object === Object &&
    self;
  var root$1 = freeGlobal$1 || freeSelf$1 || Function("return this")();
  var objectProto$1 = Object.prototype;
  var objectToString$1 = objectProto$1.toString;
  var nativeMax$1 = Math.max,
    nativeMin$1 = Math.min;
  var now$1 = function now$1() {
    return root$1.Date.now();
  };
  function debounce$1(func, wait, options) {
    var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    wait = toNumber$1(wait) || 0;
    if (isObject$1(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing
        ? nativeMax$1(toNumber$1(options.maxWait) || 0, wait)
        : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs,
        thisArg = lastThis;
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;
      return maxing
        ? nativeMin$1(result, maxWait - timeSinceLastInvoke)
        : result;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;
      return (
        lastCallTime === undefined ||
        timeSinceLastCall >= wait ||
        timeSinceLastCall < 0 ||
        (maxing && timeSinceLastInvoke >= maxWait)
      );
    }
    function timerExpired() {
      var time = now$1();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = undefined;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }
    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
      return timerId === undefined ? result : trailingEdge(now$1());
    }
    function debounced() {
      var time = now$1(),
        isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  function isObject$1(value) {
    var type = _typeof(value);
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike$1(value) {
    return !!value && _typeof(value) == "object";
  }
  function isSymbol$1(value) {
    return (
      _typeof(value) == "symbol" ||
      (isObjectLike$1(value) && objectToString$1.call(value) == symbolTag$1)
    );
  }
  function toNumber$1(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol$1(value)) {
      return NAN$1;
    }
    if (isObject$1(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject$1(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim$1, "");
    var isBinary = reIsBinary$1.test(value);
    return isBinary || reIsOctal$1.test(value)
      ? freeParseInt$1(value.slice(2), isBinary ? 2 : 8)
      : reIsBadHex$1.test(value)
      ? NAN$1
      : +value;
  }
  var lodash_debounce = debounce$1;
  var FUNC_ERROR_TEXT$2 = "Expected a function";
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var funcTag = "[object Function]",
    genTag = "[object GeneratorFunction]";
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var freeGlobal$2 =
    _typeof(commonjsGlobal) == "object" &&
    commonjsGlobal &&
    commonjsGlobal.Object === Object &&
    commonjsGlobal;
  var freeSelf$2 =
    (typeof self === "undefined" ? "undefined" : _typeof(self)) == "object" &&
    self &&
    self.Object === Object &&
    self;
  var root$2 = freeGlobal$2 || freeSelf$2 || Function("return this")();
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }
  function isHostObject(value) {
    var result = false;
    if (value != null && typeof value.toString != "function") {
      try {
        result = !!(value + "");
      } catch (e) {}
    }
    return result;
  }
  var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto$2 = Object.prototype;
  var coreJsData = root$2["__core-js_shared__"];
  var maskSrcKey = (function () {
    var uid = /[^.]+$/.exec(
      (coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO) || ""
    );
    return uid ? "Symbol(src)_1." + uid : "";
  })();
  var funcToString = funcProto.toString;
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
  var objectToString$2 = objectProto$2.toString;
  var reIsNative = RegExp(
    "^" +
      funcToString
        .call(hasOwnProperty$1)
        .replace(reRegExpChar, "\\$&")
        .replace(
          /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
          "$1.*?"
        ) +
      "$"
  );
  var splice = arrayProto.splice;
  var Map$1 = getNative(root$2, "Map"),
    nativeCreate = getNative(Object, "create");
  function Hash(entries) {
    var index = -1,
      length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$1.call(data, key) ? data[key] : undefined;
  }
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate
      ? data[key] !== undefined
      : hasOwnProperty$1.call(data, key);
  }
  function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    var index = -1,
      length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
  }
  function listCacheDelete(key) {
    var data = this.__data__,
      index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }
  function listCacheGet(key) {
    var data = this.__data__,
      index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    var data = this.__data__,
      index = assocIndexOf(data, key);
    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    var index = -1,
      length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.__data__ = {
      hash: new Hash(),
      map: new (Map$1 || ListCache)(),
      string: new Hash()
    };
  }
  function mapCacheDelete(key) {
    return getMapData(this, key)["delete"](key);
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseIsNative(value) {
    if (!isObject$2(value) || isMasked(value)) {
      return false;
    }
    var pattern =
      isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key)
      ? data[typeof key == "string" ? "string" : "hash"]
      : data.map;
  }
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }
  function isKeyable(value) {
    var type = _typeof(value);
    return type == "string" ||
      type == "number" ||
      type == "symbol" ||
      type == "boolean"
      ? value !== "__proto__"
      : value === null;
  }
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return func + "";
      } catch (e) {}
    }
    return "";
  }
  function memoize(func, resolver) {
    if (
      typeof func != "function" ||
      (resolver && typeof resolver != "function")
    ) {
      throw new TypeError(FUNC_ERROR_TEXT$2);
    }
    var memoized = function memoized() {
      var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result);
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }
  function isFunction(value) {
    var tag = isObject$2(value) ? objectToString$2.call(value) : "";
    return tag == funcTag || tag == genTag;
  }
  function isObject$2(value) {
    var type = _typeof(value);
    return !!value && (type == "object" || type == "function");
  }
  var lodash_memoize = memoize;
  var MapShim = (function () {
    if (typeof Map !== "undefined") {
      return Map;
    }
    function getIndex(arr, key) {
      var result = -1;
      arr.some(function (entry, index) {
        if (entry[0] === key) {
          result = index;
          return true;
        }
        return false;
      });
      return result;
    }
    return (function () {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        get: function get() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function (key) {
        var index = getIndex(this.__entries__, key);
        var entry = this.__entries__[index];
        return entry && entry[1];
      };
      class_1.prototype.set = function (key, value) {
        var index = getIndex(this.__entries__, key);
        if (~index) {
          this.__entries__[index][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function (key) {
        var entries = this.__entries__;
        var index = getIndex(entries, key);
        if (~index) {
          entries.splice(index, 1);
        }
      };
      class_1.prototype.has = function (key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function () {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function (callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    })();
  })();
  var isBrowser =
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    window.document === document;
  var global$1 = (function () {
    if (typeof global !== "undefined" && global.Math === Math) {
      return global;
    }
    if (typeof self !== "undefined" && self.Math === Math) {
      return self;
    }
    if (typeof window !== "undefined" && window.Math === Math) {
      return window;
    }
    return Function("return this")();
  })();
  var requestAnimationFrame$1 = (function () {
    if (typeof requestAnimationFrame === "function") {
      return requestAnimationFrame.bind(global$1);
    }
    return function (callback) {
      return setTimeout(function () {
        return callback(Date.now());
      }, 1000 / 60);
    };
  })();
  var trailingTimeout = 2;
  function throttle$1(callback, delay) {
    var leadingCall = false,
      trailingCall = false,
      lastCallTime = 0;
    function resolvePending() {
      if (leadingCall) {
        leadingCall = false;
        callback();
      }
      if (trailingCall) {
        proxy();
      }
    }
    function timeoutCallback() {
      requestAnimationFrame$1(resolvePending);
    }
    function proxy() {
      var timeStamp = Date.now();
      if (leadingCall) {
        if (timeStamp - lastCallTime < trailingTimeout) {
          return;
        }
        trailingCall = true;
      } else {
        leadingCall = true;
        trailingCall = false;
        setTimeout(timeoutCallback, delay);
      }
      lastCallTime = timeStamp;
    }
    return proxy;
  }
  var REFRESH_DELAY = 20;
  var transitionKeys = [
    "top",
    "right",
    "bottom",
    "left",
    "width",
    "height",
    "size",
    "weight"
  ];
  var mutationObserverSupported = typeof MutationObserver !== "undefined";
  var ResizeObserverController = (function () {
    function ResizeObserverController() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle$1(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController.prototype.addObserver = function (observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController.prototype.removeObserver = function (observer) {
      var observers = this.observers_;
      var index = observers.indexOf(observer);
      if (~index) {
        observers.splice(index, 1);
      }
      if (!observers.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController.prototype.refresh = function () {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController.prototype.updateObservers_ = function () {
      var activeObservers = this.observers_.filter(function (observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function (observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController.prototype.connect_ = function () {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController.prototype.disconnect_ = function () {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController.prototype.onTransitionEnd_ = function (_a) {
      var _b = _a.propertyName,
        propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function (key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController.getInstance = function () {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController();
      }
      return this.instance_;
    };
    ResizeObserverController.instance_ = null;
    return ResizeObserverController;
  })();
  var defineConfigurable = function defineConfigurable(target, props) {
    for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
      var key = _a[_i];
      Object.defineProperty(target, key, {
        value: props[key],
        enumerable: false,
        writable: false,
        configurable: true
      });
    }
    return target;
  };
  var getWindowOf = function getWindowOf(target) {
    var ownerGlobal =
      target && target.ownerDocument && target.ownerDocument.defaultView;
    return ownerGlobal || global$1;
  };
  var emptyRect = createRectInit(0, 0, 0, 0);
  function toFloat(value) {
    return parseFloat(value) || 0;
  }
  function getBordersSize(styles) {
    var positions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
      positions[_i - 1] = arguments[_i];
    }
    return positions.reduce(function (size, position) {
      var value = styles["border-" + position + "-width"];
      return size + toFloat(value);
    }, 0);
  }
  function getPaddings(styles) {
    var positions = ["top", "right", "bottom", "left"];
    var paddings = {};
    for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
      var position = positions_1[_i];
      var value = styles["padding-" + position];
      paddings[position] = toFloat(value);
    }
    return paddings;
  }
  function getSVGContentRect(target) {
    var bbox = target.getBBox();
    return createRectInit(0, 0, bbox.width, bbox.height);
  }
  function getHTMLElementContentRect(target) {
    var clientWidth = target.clientWidth,
      clientHeight = target.clientHeight;
    if (!clientWidth && !clientHeight) {
      return emptyRect;
    }
    var styles = getWindowOf(target).getComputedStyle(target);
    var paddings = getPaddings(styles);
    var horizPad = paddings.left + paddings.right;
    var vertPad = paddings.top + paddings.bottom;
    var width = toFloat(styles.width),
      height = toFloat(styles.height);
    if (styles.boxSizing === "border-box") {
      if (Math.round(width + horizPad) !== clientWidth) {
        width -= getBordersSize(styles, "left", "right") + horizPad;
      }
      if (Math.round(height + vertPad) !== clientHeight) {
        height -= getBordersSize(styles, "top", "bottom") + vertPad;
      }
    }
    if (!isDocumentElement(target)) {
      var vertScrollbar = Math.round(width + horizPad) - clientWidth;
      var horizScrollbar = Math.round(height + vertPad) - clientHeight;
      if (Math.abs(vertScrollbar) !== 1) {
        width -= vertScrollbar;
      }
      if (Math.abs(horizScrollbar) !== 1) {
        height -= horizScrollbar;
      }
    }
    return createRectInit(paddings.left, paddings.top, width, height);
  }
  var isSVGGraphicsElement = (function () {
    if (typeof SVGGraphicsElement !== "undefined") {
      return function (target) {
        return target instanceof getWindowOf(target).SVGGraphicsElement;
      };
    }
    return function (target) {
      return (
        target instanceof getWindowOf(target).SVGElement &&
        typeof target.getBBox === "function"
      );
    };
  })();
  function isDocumentElement(target) {
    return target === getWindowOf(target).document.documentElement;
  }
  function getContentRect(target) {
    if (!isBrowser) {
      return emptyRect;
    }
    if (isSVGGraphicsElement(target)) {
      return getSVGContentRect(target);
    }
    return getHTMLElementContentRect(target);
  }
  function createReadOnlyRect(_a) {
    var x = _a.x,
      y = _a.y,
      width = _a.width,
      height = _a.height;
    var Constr =
      typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
    var rect = Object.create(Constr.prototype);
    defineConfigurable(rect, {
      x: x,
      y: y,
      width: width,
      height: height,
      top: y,
      right: x + width,
      bottom: height + y,
      left: x
    });
    return rect;
  }
  function createRectInit(x, y, width, height) {
    return { x: x, y: y, width: width, height: height };
  }
  var ResizeObservation = (function () {
    function ResizeObservation(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation.prototype.isActive = function () {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return (
        rect.width !== this.broadcastWidth ||
        rect.height !== this.broadcastHeight
      );
    };
    ResizeObservation.prototype.broadcastRect = function () {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation;
  })();
  var ResizeObserverEntry = (function () {
    function ResizeObserverEntry(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target: target, contentRect: contentRect });
    }
    return ResizeObserverEntry;
  })();
  var ResizeObserverSPI = (function () {
    function ResizeObserverSPI(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError(
          "The callback provided as parameter 1 is not a function."
        );
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI.prototype.observe = function (target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI.prototype.unobserve = function (target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI.prototype.disconnect = function () {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI.prototype.gatherActive = function () {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function (observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI.prototype.broadcastActive = function () {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function (observation) {
        return new ResizeObserverEntry(
          observation.target,
          observation.broadcastRect()
        );
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI.prototype.clearActive = function () {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI.prototype.hasActive = function () {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI;
  })();
  var observers =
    typeof WeakMap !== "undefined" ? new WeakMap() : new MapShim();
  var ResizeObserver = (function () {
    function ResizeObserver(callback) {
      if (!(this instanceof ResizeObserver)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver;
  })();
  ["observe", "unobserve", "disconnect"].forEach(function (method) {
    ResizeObserver.prototype[method] = function () {
      var _a;
      return (_a = observers.get(this))[method].apply(_a, arguments);
    };
  });
  var index = (function () {
    if (typeof global$1.ResizeObserver !== "undefined") {
      return global$1.ResizeObserver;
    }
    return ResizeObserver;
  })();
  var canUseDOM = !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
  var canUseDom = canUseDOM;
  var SimpleBar = (function () {
    function SimpleBar(element, options) {
      var _this = this;
      _classCallCheck(this, SimpleBar);
      this.onScroll = function () {
        if (!_this.scrollXTicking) {
          window.requestAnimationFrame(_this.scrollX);
          _this.scrollXTicking = true;
        }
        if (!_this.scrollYTicking) {
          window.requestAnimationFrame(_this.scrollY);
          _this.scrollYTicking = true;
        }
      };
      this.scrollX = function () {
        if (_this.axis.x.isOverflowing) {
          _this.showScrollbar("x");
          _this.positionScrollbar("x");
        }
        _this.scrollXTicking = false;
      };
      this.scrollY = function () {
        if (_this.axis.y.isOverflowing) {
          _this.showScrollbar("y");
          _this.positionScrollbar("y");
        }
        _this.scrollYTicking = false;
      };
      this.onMouseEnter = function () {
        _this.showScrollbar("x");
        _this.showScrollbar("y");
      };
      this.onMouseMove = function (e) {
        _this.mouseX = e.clientX;
        _this.mouseY = e.clientY;
        if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
          _this.onMouseMoveForAxis("x");
        }
        if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
          _this.onMouseMoveForAxis("y");
        }
      };
      this.onMouseLeave = function () {
        _this.onMouseMove.cancel();
        if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
          _this.onMouseLeaveForAxis("x");
        }
        if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
          _this.onMouseLeaveForAxis("y");
        }
        _this.mouseX = -1;
        _this.mouseY = -1;
      };
      this.onWindowResize = function () {
        _this.scrollbarWidth = scrollbarWidth();
        _this.hideNativeScrollbar();
      };
      this.hideScrollbars = function () {
        _this.axis.x.track.rect = _this.axis.x.track.el.getBoundingClientRect();
        _this.axis.y.track.rect = _this.axis.y.track.el.getBoundingClientRect();
        if (!_this.isWithinBounds(_this.axis.y.track.rect)) {
          _this.axis.y.scrollbar.el.classList.remove(_this.classNames.visible);
          _this.axis.y.isVisible = false;
        }
        if (!_this.isWithinBounds(_this.axis.x.track.rect)) {
          _this.axis.x.scrollbar.el.classList.remove(_this.classNames.visible);
          _this.axis.x.isVisible = false;
        }
      };
      this.onPointerEvent = function (e) {
        var isWithinBoundsY, isWithinBoundsX;
        _this.axis.x.scrollbar.rect = _this.axis.x.scrollbar.el.getBoundingClientRect();
        _this.axis.y.scrollbar.rect = _this.axis.y.scrollbar.el.getBoundingClientRect();
        if (_this.axis.x.isOverflowing || _this.axis.x.forceVisible) {
          isWithinBoundsX = _this.isWithinBounds(_this.axis.x.scrollbar.rect);
        }
        if (_this.axis.y.isOverflowing || _this.axis.y.forceVisible) {
          isWithinBoundsY = _this.isWithinBounds(_this.axis.y.scrollbar.rect);
        }
        if (isWithinBoundsY || isWithinBoundsX) {
          e.preventDefault();
          e.stopPropagation();
          if (e.type === "mousedown") {
            if (isWithinBoundsY) {
              _this.onDragStart(e, "y");
            }
            if (isWithinBoundsX) {
              _this.onDragStart(e, "x");
            }
          }
        }
      };
      this.drag = function (e) {
        var eventOffset;
        var track = _this.axis[_this.draggedAxis].track;
        var trackSize = track.rect[_this.axis[_this.draggedAxis].sizeAttr];
        var scrollbar = _this.axis[_this.draggedAxis].scrollbar;
        e.preventDefault();
        e.stopPropagation();
        if (_this.draggedAxis === "y") {
          eventOffset = e.pageY;
        } else {
          eventOffset = e.pageX;
        }
        var dragPos =
          eventOffset -
          track.rect[_this.axis[_this.draggedAxis].offsetAttr] -
          _this.axis[_this.draggedAxis].dragOffset;
        var dragPerc =
          dragPos / track.rect[_this.axis[_this.draggedAxis].sizeAttr];
        var scrollPos =
          dragPerc *
          _this.contentEl[_this.axis[_this.draggedAxis].scrollSizeAttr];
        if (_this.draggedAxis === "x") {
          scrollPos =
            _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollbarInverted
              ? scrollPos - (trackSize + scrollbar.size)
              : scrollPos;
          scrollPos =
            _this.isRtl && SimpleBar.getRtlHelpers().isRtlScrollingInverted
              ? -scrollPos
              : scrollPos;
        }
        _this.contentEl[
          _this.axis[_this.draggedAxis].scrollOffsetAttr
        ] = scrollPos;
      };
      this.onEndDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        document.removeEventListener("mousemove", _this.drag);
        document.removeEventListener("mouseup", _this.onEndDrag);
      };
      this.el = element;
      this.flashTimeout;
      this.contentEl;
      this.offsetEl;
      this.maskEl;
      this.globalObserver;
      this.mutationObserver;
      this.resizeObserver;
      this.scrollbarWidth;
      this.minScrollbarWidth = 20;
      this.options = _objectSpread({}, SimpleBar.defaultOptions, options);
      this.classNames = _objectSpread(
        {},
        SimpleBar.defaultOptions.classNames,
        this.options.classNames
      );
      this.isRtl;
      this.axis = {
        x: {
          scrollOffsetAttr: "scrollLeft",
          sizeAttr: "width",
          scrollSizeAttr: "scrollWidth",
          offsetAttr: "left",
          overflowAttr: "overflowX",
          dragOffset: 0,
          isOverflowing: true,
          isVisible: false,
          forceVisible: false,
          track: {},
          scrollbar: {}
        },
        y: {
          scrollOffsetAttr: "scrollTop",
          sizeAttr: "height",
          scrollSizeAttr: "scrollHeight",
          offsetAttr: "top",
          overflowAttr: "overflowY",
          dragOffset: 0,
          isOverflowing: true,
          isVisible: false,
          forceVisible: false,
          track: {},
          scrollbar: {}
        }
      };
      this.recalculate = lodash_throttle(this.recalculate.bind(this), 64);
      this.onMouseMove = lodash_throttle(this.onMouseMove.bind(this), 64);
      this.hideScrollbars = lodash_debounce(
        this.hideScrollbars.bind(this),
        this.options.timeout
      );
      this.onWindowResize = lodash_debounce(
        this.onWindowResize.bind(this),
        64,
        { leading: true }
      );
      SimpleBar.getRtlHelpers = lodash_memoize(SimpleBar.getRtlHelpers);
      this.getContentElement = this.getScrollElement;
      this.init();
    }
    _createClass(
      SimpleBar,
      [
        {
          key: "init",
          value: function init() {
            this.el.SimpleBar = this;
            if (canUseDom) {
              this.initDOM();
              this.scrollbarWidth = scrollbarWidth();
              this.recalculate();
              this.initListeners();
            }
          }
        },
        {
          key: "initDOM",
          value: function initDOM() {
            var _this2 = this;
            if (
              Array.from(this.el.children).filter(function (child) {
                return child.classList.contains(_this2.classNames.wrapper);
              }).length
            ) {
              this.wrapperEl = this.el.querySelector(
                ".".concat(this.classNames.wrapper)
              );
              this.contentEl = this.el.querySelector(
                ".".concat(this.classNames.content)
              );
              this.offsetEl = this.el.querySelector(
                ".".concat(this.classNames.offset)
              );
              this.maskEl = this.el.querySelector(
                ".".concat(this.classNames.mask)
              );
              this.placeholderEl = this.el.querySelector(
                ".".concat(this.classNames.placeholder)
              );
              this.heightAutoObserverWrapperEl = this.el.querySelector(
                ".".concat(this.classNames.heightAutoObserverWrapperEl)
              );
              this.heightAutoObserverEl = this.el.querySelector(
                ".".concat(this.classNames.heightAutoObserverEl)
              );
              this.axis.x.track.el = this.el.querySelector(
                "."
                  .concat(this.classNames.track, ".")
                  .concat(this.classNames.horizontal)
              );
              this.axis.y.track.el = this.el.querySelector(
                "."
                  .concat(this.classNames.track, ".")
                  .concat(this.classNames.vertical)
              );
            } else {
              this.wrapperEl = document.createElement("div");
              this.contentEl = document.createElement("div");
              this.offsetEl = document.createElement("div");
              this.maskEl = document.createElement("div");
              this.placeholderEl = document.createElement("div");
              this.heightAutoObserverWrapperEl = document.createElement("div");
              this.heightAutoObserverEl = document.createElement("div");
              this.wrapperEl.classList.add(this.classNames.wrapper);
              this.contentEl.classList.add(this.classNames.content);
              this.offsetEl.classList.add(this.classNames.offset);
              this.maskEl.classList.add(this.classNames.mask);
              this.placeholderEl.classList.add(this.classNames.placeholder);
              this.heightAutoObserverWrapperEl.classList.add(
                this.classNames.heightAutoObserverWrapperEl
              );
              this.heightAutoObserverEl.classList.add(
                this.classNames.heightAutoObserverEl
              );
              while (this.el.firstChild) {
                this.contentEl.appendChild(this.el.firstChild);
              }
              this.offsetEl.appendChild(this.contentEl);
              this.maskEl.appendChild(this.offsetEl);
              this.heightAutoObserverWrapperEl.appendChild(
                this.heightAutoObserverEl
              );
              this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl);
              this.wrapperEl.appendChild(this.maskEl);
              this.wrapperEl.appendChild(this.placeholderEl);
              this.el.appendChild(this.wrapperEl);
            }
            if (!this.axis.x.track.el || !this.axis.y.track.el) {
              var track = document.createElement("div");
              var scrollbar = document.createElement("div");
              track.classList.add(this.classNames.track);
              scrollbar.classList.add(this.classNames.scrollbar);
              if (!this.options.autoHide) {
                scrollbar.classList.add(this.classNames.visible);
              }
              track.appendChild(scrollbar);
              this.axis.x.track.el = track.cloneNode(true);
              this.axis.x.track.el.classList.add(this.classNames.horizontal);
              this.axis.y.track.el = track.cloneNode(true);
              this.axis.y.track.el.classList.add(this.classNames.vertical);
              this.el.appendChild(this.axis.x.track.el);
              this.el.appendChild(this.axis.y.track.el);
            }
            this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector(
              ".".concat(this.classNames.scrollbar)
            );
            this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector(
              ".".concat(this.classNames.scrollbar)
            );
            this.el.setAttribute("data-simplebar", "init");
          }
        },
        {
          key: "initListeners",
          value: function initListeners() {
            var _this3 = this;
            if (this.options.autoHide) {
              this.el.addEventListener("mouseenter", this.onMouseEnter);
            }
            [
              "mousedown",
              "click",
              "dblclick",
              "touchstart",
              "touchend",
              "touchmove"
            ].forEach(function (e) {
              _this3.el.addEventListener(e, _this3.onPointerEvent, true);
            });
            this.el.addEventListener("mousemove", this.onMouseMove);
            this.el.addEventListener("mouseleave", this.onMouseLeave);
            this.contentEl.addEventListener("scroll", this.onScroll);
            window.addEventListener("resize", this.onWindowResize);
            if (typeof MutationObserver !== "undefined") {
              this.mutationObserver = new MutationObserver(function (
                mutations
              ) {
                mutations.forEach(function (mutation) {
                  if (
                    mutation.target === _this3.el ||
                    !_this3.isChildNode(mutation.target) ||
                    mutation.addedNodes.length ||
                    mutation.removedNodes.length
                  ) {
                    _this3.recalculate();
                  }
                });
              });
              this.mutationObserver.observe(this.el, {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true
              });
            }
            this.resizeObserver = new index(this.recalculate);
            this.resizeObserver.observe(this.el);
          }
        },
        {
          key: "recalculate",
          value: function recalculate() {
            var isHeightAuto = this.heightAutoObserverEl.offsetHeight <= 1;
            this.elStyles = window.getComputedStyle(this.el);
            this.isRtl = this.elStyles.direction === "rtl";
            this.contentEl.style.padding = ""
              .concat(this.elStyles.paddingTop, " ")
              .concat(this.elStyles.paddingRight, " ")
              .concat(this.elStyles.paddingBottom, " ")
              .concat(this.elStyles.paddingLeft);
            this.contentEl.style.height = isHeightAuto ? "auto" : "100%";
            this.placeholderEl.style.width = "".concat(
              this.contentEl.scrollWidth,
              "px"
            );
            this.placeholderEl.style.height = "".concat(
              this.contentEl.scrollHeight,
              "px"
            );
            this.wrapperEl.style.margin = "-"
              .concat(this.elStyles.paddingTop, " -")
              .concat(this.elStyles.paddingRight, " -")
              .concat(this.elStyles.paddingBottom, " -")
              .concat(this.elStyles.paddingLeft);
            this.axis.x.track.rect = this.axis.x.track.el.getBoundingClientRect();
            this.axis.y.track.rect = this.axis.y.track.el.getBoundingClientRect();
            this.axis.x.isOverflowing =
              (this.scrollbarWidth
                ? this.contentEl.scrollWidth
                : this.contentEl.scrollWidth - this.minScrollbarWidth) >
              Math.ceil(this.axis.x.track.rect.width);
            this.axis.y.isOverflowing =
              (this.scrollbarWidth
                ? this.contentEl.scrollHeight
                : this.contentEl.scrollHeight - this.minScrollbarWidth) >
              Math.ceil(this.axis.y.track.rect.height);
            this.axis.x.isOverflowing =
              this.elStyles.overflowX === "hidden"
                ? false
                : this.axis.x.isOverflowing;
            this.axis.y.isOverflowing =
              this.elStyles.overflowY === "hidden"
                ? false
                : this.axis.y.isOverflowing;
            this.axis.x.forceVisible =
              this.options.forceVisible === "x" ||
              this.options.forceVisible === true;
            this.axis.y.forceVisible =
              this.options.forceVisible === "y" ||
              this.options.forceVisible === true;
            this.axis.x.scrollbar.size = this.getScrollbarSize("x");
            this.axis.y.scrollbar.size = this.getScrollbarSize("y");
            this.axis.x.scrollbar.el.style.width = "".concat(
              this.axis.x.scrollbar.size,
              "px"
            );
            this.axis.y.scrollbar.el.style.height = "".concat(
              this.axis.y.scrollbar.size,
              "px"
            );
            this.positionScrollbar("x");
            this.positionScrollbar("y");
            this.toggleTrackVisibility("x");
            this.toggleTrackVisibility("y");
            this.hideNativeScrollbar();
          }
        },
        {
          key: "getScrollbarSize",
          value: function getScrollbarSize() {
            var axis =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "y";
            var contentSize = this.scrollbarWidth
              ? this.contentEl[this.axis[axis].scrollSizeAttr]
              : this.contentEl[this.axis[axis].scrollSizeAttr] -
                this.minScrollbarWidth;
            var trackSize = this.axis[axis].track.rect[
              this.axis[axis].sizeAttr
            ];
            var scrollbarSize;
            if (!this.axis[axis].isOverflowing) {
              return;
            }
            var scrollbarRatio = trackSize / contentSize;
            scrollbarSize = Math.max(
              ~~(scrollbarRatio * trackSize),
              this.options.scrollbarMinSize
            );
            if (this.options.scrollbarMaxSize) {
              scrollbarSize = Math.min(
                scrollbarSize,
                this.options.scrollbarMaxSize
              );
            }
            return scrollbarSize;
          }
        },
        {
          key: "positionScrollbar",
          value: function positionScrollbar() {
            var axis =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "y";
            var contentSize = this.contentEl[this.axis[axis].scrollSizeAttr];
            var trackSize = this.axis[axis].track.rect[
              this.axis[axis].sizeAttr
            ];
            var hostSize = parseInt(
              this.elStyles[this.axis[axis].sizeAttr],
              10
            );
            var scrollbar = this.axis[axis].scrollbar;
            var scrollOffset = this.contentEl[this.axis[axis].scrollOffsetAttr];
            scrollOffset =
              axis === "x" &&
              this.isRtl &&
              SimpleBar.getRtlHelpers().isRtlScrollingInverted
                ? -scrollOffset
                : scrollOffset;
            var scrollPourcent = scrollOffset / (contentSize - hostSize);
            var handleOffset = ~~(
              (trackSize - scrollbar.size) *
              scrollPourcent
            );
            handleOffset =
              axis === "x" &&
              this.isRtl &&
              SimpleBar.getRtlHelpers().isRtlScrollbarInverted
                ? handleOffset + (trackSize - scrollbar.size)
                : handleOffset;
            scrollbar.el.style.transform =
              axis === "x"
                ? "translate3d(".concat(handleOffset, "px, 0, 0)")
                : "translate3d(0, ".concat(handleOffset, "px, 0)");
          }
        },
        {
          key: "toggleTrackVisibility",
          value: function toggleTrackVisibility() {
            var axis =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "y";
            var track = this.axis[axis].track.el;
            var scrollbar = this.axis[axis].scrollbar.el;
            if (this.axis[axis].isOverflowing || this.axis[axis].forceVisible) {
              track.style.visibility = "visible";
              this.contentEl.style[this.axis[axis].overflowAttr] = "scroll";
            } else {
              track.style.visibility = "hidden";
              this.contentEl.style[this.axis[axis].overflowAttr] = "hidden";
            }
            if (this.axis[axis].isOverflowing) {
              scrollbar.style.visibility = "visible";
            } else {
              scrollbar.style.visibility = "hidden";
            }
          }
        },
        {
          key: "hideNativeScrollbar",
          value: function hideNativeScrollbar() {
            this.offsetEl.style[this.isRtl ? "left" : "right"] =
              this.axis.y.isOverflowing || this.axis.y.forceVisible
                ? "-".concat(
                    this.scrollbarWidth || this.minScrollbarWidth,
                    "px"
                  )
                : 0;
            this.offsetEl.style.bottom =
              this.axis.x.isOverflowing || this.axis.x.forceVisible
                ? "-".concat(
                    this.scrollbarWidth || this.minScrollbarWidth,
                    "px"
                  )
                : 0;
            if (!this.scrollbarWidth) {
              var paddingDirection = [
                this.isRtl ? "paddingLeft" : "paddingRight"
              ];
              this.contentEl.style[paddingDirection] =
                this.axis.y.isOverflowing || this.axis.y.forceVisible
                  ? "calc("
                      .concat(this.elStyles[paddingDirection], " + ")
                      .concat(this.minScrollbarWidth, "px)")
                  : this.elStyles[paddingDirection];
              this.contentEl.style.paddingBottom =
                this.axis.x.isOverflowing || this.axis.x.forceVisible
                  ? "calc("
                      .concat(this.elStyles.paddingBottom, " + ")
                      .concat(this.minScrollbarWidth, "px)")
                  : this.elStyles.paddingBottom;
            }
          }
        },
        {
          key: "onMouseMoveForAxis",
          value: function onMouseMoveForAxis() {
            var axis =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "y";
            this.axis[axis].track.rect = this.axis[
              axis
            ].track.el.getBoundingClientRect();
            this.axis[axis].scrollbar.rect = this.axis[
              axis
            ].scrollbar.el.getBoundingClientRect();
            var isWithinScrollbarBoundsX = this.isWithinBounds(
              this.axis[axis].scrollbar.rect
            );
            if (isWithinScrollbarBoundsX) {
              this.axis[axis].scrollbar.el.classList.add(this.classNames.hover);
            } else {
              this.axis[axis].scrollbar.el.classList.remove(
                this.classNames.hover
              );
            }
            if (this.isWithinBounds(this.axis[axis].track.rect)) {
              this.showScrollbar(axis);
              this.axis[axis].track.el.classList.add(this.classNames.hover);
            } else {
              this.axis[axis].track.el.classList.remove(this.classNames.hover);
            }
          }
        },
        {
          key: "onMouseLeaveForAxis",
          value: function onMouseLeaveForAxis() {
            var axis =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "y";
            this.axis[axis].track.el.classList.remove(this.classNames.hover);
            this.axis[axis].scrollbar.el.classList.remove(
              this.classNames.hover
            );
          }
        },
        {
          key: "showScrollbar",
          value: function showScrollbar() {
            var axis =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : "y";
            var scrollbar = this.axis[axis].scrollbar.el;
            if (!this.axis[axis].isVisible) {
              scrollbar.classList.add(this.classNames.visible);
              this.axis[axis].isVisible = true;
            }
            if (this.options.autoHide) {
              this.hideScrollbars();
            }
          }
        },
        {
          key: "onDragStart",
          value: function onDragStart(e) {
            var axis =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : "y";
            var scrollbar = this.axis[axis].scrollbar.el;
            var eventOffset = axis === "y" ? e.pageY : e.pageX;
            this.axis[axis].dragOffset =
              eventOffset -
              scrollbar.getBoundingClientRect()[this.axis[axis].offsetAttr];
            this.draggedAxis = axis;
            document.addEventListener("mousemove", this.drag);
            document.addEventListener("mouseup", this.onEndDrag);
          }
        },
        {
          key: "getScrollElement",
          value: function getScrollElement() {
            return this.contentEl;
          }
        },
        {
          key: "removeListeners",
          value: function removeListeners() {
            var _this4 = this;
            if (this.options.autoHide) {
              this.el.removeEventListener("mouseenter", this.onMouseEnter);
            }
            [
              "mousedown",
              "click",
              "dblclick",
              "touchstart",
              "touchend",
              "touchmove"
            ].forEach(function (e) {
              _this4.el.removeEventListener(e, _this4.onPointerEvent);
            });
            this.el.removeEventListener("mousemove", this.onMouseMove);
            this.el.removeEventListener("mouseleave", this.onMouseLeave);
            this.contentEl.removeEventListener("scroll", this.onScroll);
            window.removeEventListener("resize", this.onWindowResize);
            this.mutationObserver && this.mutationObserver.disconnect();
            this.resizeObserver.disconnect();
            this.recalculate.cancel();
            this.onMouseMove.cancel();
            this.hideScrollbars.cancel();
            this.onWindowResize.cancel();
          }
        },
        {
          key: "unMount",
          value: function unMount() {
            this.removeListeners();
            this.el.SimpleBar = null;
          }
        },
        {
          key: "isChildNode",
          value: function isChildNode(el) {
            if (el === null) return false;
            if (el === this.el) return true;
            return this.isChildNode(el.parentNode);
          }
        },
        {
          key: "isWithinBounds",
          value: function isWithinBounds(bbox) {
            return (
              this.mouseX >= bbox.left &&
              this.mouseX <= bbox.left + bbox.width &&
              this.mouseY >= bbox.top &&
              this.mouseY <= bbox.top + bbox.height
            );
          }
        }
      ],
      [
        {
          key: "getRtlHelpers",
          value: function getRtlHelpers() {
            var dummyDiv = document.createElement("div");
            dummyDiv.innerHTML =
              '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
            var scrollbarDummyEl = dummyDiv.firstElementChild;
            document.body.appendChild(scrollbarDummyEl);
            var dummyContainerChild = scrollbarDummyEl.firstElementChild;
            scrollbarDummyEl.scrollLeft = 0;
            var dummyContainerOffset = SimpleBar.getOffset(scrollbarDummyEl);
            var dummyContainerChildOffset = SimpleBar.getOffset(
              dummyContainerChild
            );
            scrollbarDummyEl.scrollLeft = 999;
            var dummyContainerScrollOffsetAfterScroll = SimpleBar.getOffset(
              dummyContainerChild
            );
            return {
              isRtlScrollingInverted:
                dummyContainerOffset.left !== dummyContainerChildOffset.left &&
                dummyContainerChildOffset.left -
                  dummyContainerScrollOffsetAfterScroll.left !==
                  0,
              isRtlScrollbarInverted:
                dummyContainerOffset.left !== dummyContainerChildOffset.left
            };
          }
        },
        {
          key: "initHtmlApi",
          value: function initHtmlApi() {
            this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this);
            if (typeof MutationObserver !== "undefined") {
              this.globalObserver = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                  Array.from(mutation.addedNodes).forEach(function (addedNode) {
                    if (addedNode.nodeType === 1) {
                      if (addedNode.hasAttribute("data-simplebar")) {
                        !addedNode.SimpleBar &&
                          new SimpleBar(
                            addedNode,
                            SimpleBar.getElOptions(addedNode)
                          );
                      } else {
                        Array.from(
                          addedNode.querySelectorAll("[data-simplebar]")
                        ).forEach(function (el) {
                          !el.SimpleBar &&
                            new SimpleBar(el, SimpleBar.getElOptions(el));
                        });
                      }
                    }
                  });
                  Array.from(mutation.removedNodes).forEach(function (
                    removedNode
                  ) {
                    if (removedNode.nodeType === 1) {
                      if (removedNode.hasAttribute("data-simplebar")) {
                        removedNode.SimpleBar &&
                          removedNode.SimpleBar.unMount();
                      } else {
                        Array.from(
                          removedNode.querySelectorAll("[data-simplebar]")
                        ).forEach(function (el) {
                          el.SimpleBar && el.SimpleBar.unMount();
                        });
                      }
                    }
                  });
                });
              });
              this.globalObserver.observe(document, {
                childList: true,
                subtree: true
              });
            }
            if (
              document.readyState === "complete" ||
              (document.readyState !== "loading" &&
                !document.documentElement.doScroll)
            ) {
              window.setTimeout(this.initDOMLoadedElements);
            } else {
              document.addEventListener(
                "DOMContentLoaded",
                this.initDOMLoadedElements
              );
              window.addEventListener("load", this.initDOMLoadedElements);
            }
          }
        },
        {
          key: "getElOptions",
          value: function getElOptions(el) {
            var options = Array.from(el.attributes).reduce(function (
              acc,
              attribute
            ) {
              var option = attribute.name.match(/data-simplebar-(.+)/);
              if (option) {
                var key = option[1].replace(/\W+(.)/g, function (x, chr) {
                  return chr.toUpperCase();
                });
                switch (attribute.value) {
                  case "true":
                    acc[key] = true;
                    break;
                  case "false":
                    acc[key] = false;
                    break;
                  case undefined:
                    acc[key] = true;
                    break;
                  default:
                    acc[key] = attribute.value;
                }
              }
              return acc;
            },
            {});
            return options;
          }
        },
        {
          key: "removeObserver",
          value: function removeObserver() {
            this.globalObserver.disconnect();
          }
        },
        {
          key: "initDOMLoadedElements",
          value: function initDOMLoadedElements() {
            document.removeEventListener(
              "DOMContentLoaded",
              this.initDOMLoadedElements
            );
            window.removeEventListener("load", this.initDOMLoadedElements);
            Array.from(document.querySelectorAll("[data-simplebar]")).forEach(
              function (el) {
                if (!el.SimpleBar)
                  new SimpleBar(el, SimpleBar.getElOptions(el));
              }
            );
          }
        },
        {
          key: "getOffset",
          value: function getOffset(el) {
            var rect = el.getBoundingClientRect();
            return {
              top:
                rect.top +
                (window.pageYOffset || document.documentElement.scrollTop),
              left:
                rect.left +
                (window.pageXOffset || document.documentElement.scrollLeft)
            };
          }
        }
      ]
    );
    return SimpleBar;
  })();
  SimpleBar.defaultOptions = {
    autoHide: false,
    forceVisible: false,
    classNames: {
      content: "simplebar-content",
      offset: "simplebar-offset",
      mask: "simplebar-mask",
      wrapper: "simplebar-wrapper",
      placeholder: "simplebar-placeholder",
      scrollbar: "simplebar-scrollbar",
      track: "simplebar-track",
      heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
      heightAutoObserverEl: "simplebar-height-auto-observer",
      visible: "simplebar-visible",
      horizontal: "simplebar-horizontal",
      vertical: "simplebar-vertical",
      hover: "simplebar-hover"
    },
    scrollbarMinSize: 25,
    scrollbarMaxSize: 0,
    timeout: 1000
  };
  if (canUseDom) {
    SimpleBar.initHtmlApi();
  }
  return SimpleBar;
});

//# sourceMappingURL=tornado.min.js.map
