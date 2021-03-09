"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _USER_THEME = new WeakMap();

var _CURRENT_THEME_MODE = new WeakMap();

var _LOCAL_STORAGE_THEME_MODE = new WeakMap();

var _CSS_ATTRIBUTE_NAME = new WeakMap();

var _CSS_ATTRIBUTE_THEME_MODE = new WeakMap();

var _THEME_LIST = new WeakMap();

var _UpdateMode = new WeakSet();

var _UpdateThemeList = new WeakSet();

var _UpdateLocalStorageThemeMode = new WeakSet();

var _GetLocalStorageTheme = new WeakSet();

var _SetLocalStorageMode = new WeakSet();

var _IsSettingLocalStorage = new WeakSet();

var _UpdateUserTheme = new WeakSet();

var _GetUserThemeMode = new WeakSet();

var _IsSetUserTheme = new WeakSet();

var _UpdateThemeAttribute = new WeakSet();

var _GetThemeAttribute = new WeakSet();

var _SetThemeAttribute = new WeakSet();

var _IsSetThemeAttribute = new WeakSet();

/**
 * css theme generic class.
 *
 * Automatically detect and reflect css themes from user's setting information.
 *
 * @author  Takuya Kinoshita
 * @since   1.0.0
 * @access  public
 *
 * @link    URL
 */
var themes = /*#__PURE__*/function () {
  /**
   * Name of the variable to be saved to local storage
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */

  /**
   * Name of the variable to be default theme mode
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */

  /**
   * The browser theme set by the user.
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */

  /**
   * current thtme mode
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */

  /**
   * Name of the theme registered in the local storage
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */

  /**
   * Name of the theme information to be defined in the CSS.
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */

  /**
   * Name of the theme information to be defined in the CSS attributes.
   * 
   * @since 1.0.0
   * @access private
   * 
   * @type { String } theme name what, defined in the CSS attributes.
   */

  /**
   * Name of the theme information to be defined in the CSS
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { Array<String> }
   */

  /**
   * @since 1.0.0
   * @access public
   * 
   * @type { Object }
   */

  /**
   * @since 1.0.0
   * @access public
   * 
   * @type { Object }
   */

  /**
   * class definition 
   * 
   * @constructs thems
   * @param { Array<String> } themeList 
   * @param { HTMLElement } toggleElement 
   */
  function themes() {
    var themeList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    _classCallCheck(this, themes);

    _IsSetThemeAttribute.add(this);

    _SetThemeAttribute.add(this);

    _GetThemeAttribute.add(this);

    _UpdateThemeAttribute.add(this);

    _IsSetUserTheme.add(this);

    _GetUserThemeMode.add(this);

    _UpdateUserTheme.add(this);

    _IsSettingLocalStorage.add(this);

    _SetLocalStorageMode.add(this);

    _GetLocalStorageTheme.add(this);

    _UpdateLocalStorageThemeMode.add(this);

    _UpdateThemeList.add(this);

    _UpdateMode.add(this);

    _USER_THEME.set(this, {
      writable: true,
      value: ''
    });

    _CURRENT_THEME_MODE.set(this, {
      writable: true,
      value: ''
    });

    _LOCAL_STORAGE_THEME_MODE.set(this, {
      writable: true,
      value: ''
    });

    _CSS_ATTRIBUTE_NAME.set(this, {
      writable: true,
      value: 'theme'
    });

    _CSS_ATTRIBUTE_THEME_MODE.set(this, {
      writable: true,
      value: ''
    });

    _THEME_LIST.set(this, {
      writable: true,
      value: ['light', 'dark']
    });

    _defineProperty(this, "Input", {
      /**
       * @type { String }
       */
      element: '',

      /**
       * @type { String }
       */
      elementID: 'theme-toggle',

      /**
       * @type { Object }
       */
      toggleStatus: {},

      /**
       * @type { String }
       */
      toggleType: 'checkbox'
    });

    _defineProperty(this, "Icon", {
      /**
       * @type { String }
       */
      element: '',

      /**
       * @type { String }
       */
      parentElementID: 'theme-change',

      /**
       * @type { String }
       */
      elementID: '',

      /**
       * @type { Boolean }
       */
      animation: true,

      /**
       * @type { String }
       */
      animationName: '',

      /**
       * @type { String }
       */
      light: '<i class="fas fa-sun"></i>',

      /**
       * @type { String }
       */
      dark: '<i class="fas fa-moon"></i>'
    });

    _classPrivateMethodGet(this, _UpdateThemeList, _UpdateThemeList2).call(this, themeList);

    _classPrivateMethodGet(this, _UpdateMode, _UpdateMode2).call(this);
  }

  _createClass(themes, [{
    key: "CurrentTheme",
    get: function get() {
      return _classPrivateFieldGet(this, _CURRENT_THEME_MODE);
    }
  }, {
    key: "CurrentThemeList",
    get: function get() {
      return _classPrivateFieldGet(this, _THEME_LIST);
    }
  }, {
    key: "CurrentUserTheme",
    get: function get() {
      return _classPrivateFieldGet(this, _USER_THEME);
    }
  }, {
    key: "CurrentStorageTheme",
    get: function get() {
      return _classPrivateFieldGet(this, _LOCAL_STORAGE_THEME_MODE);
    }
    /**
     * Update mode registration information.
     * 
     * @since 1.0.0
     * @access private
     */

  }, {
    key: "ChangeTheme",
    value:
    /**
     * change the current theme mode.
     * 
     * @since 1.0.0
     * @access public 
     * 
     * @param { String } theme must to select mode from themeList.
     */
    function ChangeTheme(theme) {
      try {
        if (_classPrivateFieldGet(this, _THEME_LIST).some(function (element) {
          return element === theme;
        })) {
          _classPrivateMethodGet(this, _SetLocalStorageMode, _SetLocalStorageMode2).call(this, theme);

          _classPrivateMethodGet(this, _SetThemeAttribute, _SetThemeAttribute2).call(this, theme);

          _classPrivateFieldSet(this, _CURRENT_THEME_MODE, theme);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }]);

  return themes;
}();

_defineProperty(themes, "localStorageName", 'theme-mode');

_defineProperty(themes, "defaultThemeName", 'light');

var _UpdateMode2 = function _UpdateMode2() {
  _classPrivateFieldSet(this, _CURRENT_THEME_MODE, themes.defaultThemeName);

  _classPrivateMethodGet(this, _UpdateLocalStorageThemeMode, _UpdateLocalStorageThemeMode2).call(this);

  _classPrivateMethodGet(this, _UpdateUserTheme, _UpdateUserTheme2).call(this);

  _classPrivateMethodGet(this, _UpdateThemeAttribute, _UpdateThemeAttribute2).call(this);

  if (_classPrivateMethodGet(this, _IsSettingLocalStorage, _IsSettingLocalStorage2).call(this)) {
    _classPrivateFieldSet(this, _CURRENT_THEME_MODE, _classPrivateFieldGet(this, _LOCAL_STORAGE_THEME_MODE));
  } else if (_classPrivateMethodGet(this, _IsSetUserTheme, _IsSetUserTheme2).call(this)) {
    _classPrivateFieldSet(this, _CURRENT_THEME_MODE, _classPrivateFieldGet(this, _USER_THEME));
  } else if (_classPrivateMethodGet(this, _IsSetThemeAttribute, _IsSetThemeAttribute2).call(this)) {
    _classPrivateFieldSet(this, _CURRENT_THEME_MODE, _classPrivateFieldGet(this, _CSS_ATTRIBUTE_THEME_MODE));
  } else {
    _classPrivateFieldSet(this, _CURRENT_THEME_MODE, _classPrivateFieldGet(this, _THEME_LIST)[0]);
  }

  this.ChangeTheme(_classPrivateFieldGet(this, _CURRENT_THEME_MODE));
};

var _UpdateThemeList2 = function _UpdateThemeList2(newThemeList) {
  var _this = this;

  if (newThemeList === null || typeof newThemeList !== 'array' || newThemeList.length <= 0) return;

  try {
    _classPrivateFieldSet(this, _THEME_LIST, _classPrivateFieldGet(this, _THEME_LIST).concat(newThemeList.filter(function (theme) {
      _classPrivateFieldGet(_this, _THEME_LIST).some(function (element) {
        return element !== theme;
      });
    })));
  } catch (error) {
    console.log(error);
  } finally {}
};

var _UpdateLocalStorageThemeMode2 = function _UpdateLocalStorageThemeMode2() {
  _classPrivateFieldSet(this, _LOCAL_STORAGE_THEME_MODE, _classPrivateMethodGet(this, _GetLocalStorageTheme, _GetLocalStorageTheme2).call(this) !== null ? _classPrivateMethodGet(this, _GetLocalStorageTheme, _GetLocalStorageTheme2).call(this) : '');
};

var _GetLocalStorageTheme2 = function _GetLocalStorageTheme2() {
  return localStorage.getItem(themes.localStorageName);
};

var _SetLocalStorageMode2 = function _SetLocalStorageMode2(theme) {
  try {
    if (_classPrivateFieldGet(this, _THEME_LIST).some(function (element) {
      return element === theme;
    })) {
      localStorage.setItem(themes.localStorageName, theme);

      _classPrivateFieldSet(this, _LOCAL_STORAGE_THEME_MODE, theme);
    }
  } catch (error) {
    console.error(error);
  }
};

var _IsSettingLocalStorage2 = function _IsSettingLocalStorage2() {
  /**
   * Truth field for data return
   * 
   * @type { Boolean } 
   */
  var isSet = false;

  if (_classPrivateFieldGet(this, _LOCAL_STORAGE_THEME_MODE) && typeof _classPrivateFieldGet(this, _LOCAL_STORAGE_THEME_MODE) === 'string' && _classPrivateFieldGet(this, _LOCAL_STORAGE_THEME_MODE) !== 'null') {
    if (_classPrivateFieldGet(this, _LOCAL_STORAGE_THEME_MODE).length > 0) isSet = true;
  }

  return isSet;
};

var _UpdateUserTheme2 = function _UpdateUserTheme2() {
  _classPrivateFieldSet(this, _USER_THEME, _classPrivateMethodGet(this, _GetUserThemeMode, _GetUserThemeMode2).call(this));
};

var _GetUserThemeMode2 = function _GetUserThemeMode2() {
  /**
   * The name of the theme as defined in the browser .
   * @since  1.0.0
   * @type { String } The name of the theme as defined in the browser .
   */
  var userThemeName = '';

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    userThemeName = 'dark';
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    userThemeName = 'light';
  }

  return userThemeName;
};

var _IsSetUserTheme2 = function _IsSetUserTheme2() {
  /**
   * @since 1.0.0
   * @type { Boolean } Definition status of the "USER_THEME" variable
   */
  var isSet = false;

  if (_classPrivateFieldGet(this, _USER_THEME) && typeof _classPrivateFieldGet(this, _USER_THEME) === 'string') {
    if (_classPrivateFieldGet(this, _USER_THEME).length > 0) isSet = true;
  }

  return isSet;
};

var _UpdateThemeAttribute2 = function _UpdateThemeAttribute2() {
  _classPrivateFieldSet(this, _CSS_ATTRIBUTE_THEME_MODE, _classPrivateMethodGet(this, _GetThemeAttribute, _GetThemeAttribute2).call(this));
};

var _GetThemeAttribute2 = function _GetThemeAttribute2() {
  /**
   * @since 1.0.0
   * @type { String } Definition name of the "this.#CSS_ATTRIBUTE_NAME" css attribute propety
   */
  var theme = typeof document.documentElement.getAttribute(_classPrivateFieldGet(this, _CSS_ATTRIBUTE_NAME)) === 'string' ? document.documentElement.getAttribute(_classPrivateFieldGet(this, _CSS_ATTRIBUTE_NAME)) : '';
  return theme;
};

var _SetThemeAttribute2 = function _SetThemeAttribute2(theme) {
  try {
    if (_classPrivateFieldGet(this, _THEME_LIST).some(function (element) {
      return element === theme;
    })) {
      document.documentElement.setAttribute(_classPrivateFieldGet(this, _CSS_ATTRIBUTE_NAME), theme);

      _classPrivateFieldSet(this, _CSS_ATTRIBUTE_THEME_MODE, theme);
    }
  } catch (error) {
    console.error(error);
  }
};

var _IsSetThemeAttribute2 = function _IsSetThemeAttribute2() {
  /**
   * @since 1.0.0
   * @type { Boolean } is set entity.
   */
  var isSet = false;

  if (_classPrivateFieldGet(this, _CSS_ATTRIBUTE_THEME_MODE) && typeof _classPrivateFieldGet(this, _CSS_ATTRIBUTE_THEME_MODE) === 'string') {
    if (_classPrivateFieldGet(this, _CSS_ATTRIBUTE_THEME_MODE).length > 0) isSet = true;
  }

  return isSet;
};