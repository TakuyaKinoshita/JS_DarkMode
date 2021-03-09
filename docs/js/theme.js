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
class themes {
  /**
   * Name of the variable to be saved to local storage
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */
  static localStorageName = 'theme-mode'

  /**
   * Name of the variable to be default theme mode
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */
  static defaultThemeName = 'light'

  /**
   * The browser theme set by the user.
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */
  #USER_THEME = ''

  /**
   * current thtme mode
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */
  #CURRENT_THEME_MODE = ''

  /**
   * Name of the theme registered in the local storage
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */
  #LOCAL_STORAGE_THEME_MODE = ''

  /**
   * Name of the theme information to be defined in the CSS.
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { String }
   */
  #CSS_ATTRIBUTE_NAME = 'theme'

  /**
   * Name of the theme information to be defined in the CSS attributes.
   * 
   * @since 1.0.0
   * @access private
   * 
   * @type { String } theme name what, defined in the CSS attributes.
   */
  #CSS_ATTRIBUTE_THEME_MODE = ''

  /**
   * Name of the theme information to be defined in the CSS
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { Array<String> }
   */
  #THEME_LIST = [
    'light',
    'dark',
  ]

  /**
   * @since 1.0.0
   * @access public
   * 
   * @type { Object }
   */
  Input = {
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
  }

  /**
   * @since 1.0.0
   * @access public
   * 
   * @type { Object }
   */
  Icon = {
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
    dark:  '<i class="fas fa-moon"></i>',
  }

  /**
   * class definition 
   * 
   * @constructs thems
   * @param { Array<String> } themeList 
   * @param { HTMLElement } toggleElement 
   */
  constructor (themeList = null)
  {
    this.#UpdateThemeList(themeList)
    this.#UpdateMode()
  }

  get CurrentTheme()
  {
    return this.#CURRENT_THEME_MODE
  }

  get CurrentThemeList()
  {
    return this.#THEME_LIST
  }

  get CurrentUserTheme()
  {
    return this.#USER_THEME
  }

  get CurrentStorageTheme()
  {
    return this.#LOCAL_STORAGE_THEME_MODE
  }

  /**
   * Update mode registration information.
   * 
   * @since 1.0.0
   * @access private
   */
  #UpdateMode()
  {
    this.#CURRENT_THEME_MODE = themes.defaultThemeName
    this.#UpdateLocalStorageThemeMode()
    this.#UpdateUserTheme()
    this.#UpdateThemeAttribute()
    if (this.#IsSettingLocalStorage()) 
    {
      this.#CURRENT_THEME_MODE = this.#LOCAL_STORAGE_THEME_MODE
    }
    else if (this.#IsSetUserTheme())
    {
      this.#CURRENT_THEME_MODE = this.#USER_THEME
    }
    else if (this.#IsSetThemeAttribute())
    {
      this.#CURRENT_THEME_MODE = this.#CSS_ATTRIBUTE_THEME_MODE
    }
    else
    {
      this.#CURRENT_THEME_MODE = this.#THEME_LIST[0]
    }

    this.ChangeTheme(this.#CURRENT_THEME_MODE)
  }

  /**
   * 
   * @since  1.0.0
   * @access private
   * 
   * @type { Array } newThemeList added array list
   */
  #UpdateThemeList(newThemeList)
  {
    if (newThemeList === null || typeof(newThemeList) !== 'array' || newThemeList.length <= 0) return
    try {
      this.#THEME_LIST = this.#THEME_LIST.concat(newThemeList.filter( theme => {
        this.#THEME_LIST.some( element => element !== theme )
      }))
    } catch (error) {
      console.log(error)
    } finally {
    }
  }

  /**
   * Update the "LOCAL_STORAGE_THEME_MODE" private variable.
   * 
   * @since  1.0.0
   * @access private
   */
  #UpdateLocalStorageThemeMode()
  {
    this.#LOCAL_STORAGE_THEME_MODE = this.#GetLocalStorageTheme() !== null ? this.#GetLocalStorageTheme() : ''
  }

  /**
   * Get theme information stored in local storage.
   * 
   * @since  1.0.0
   * @access private
   * 
   * @returns { String } Theme information stored in local storage
   */
  #GetLocalStorageTheme()
  {
    return localStorage.getItem(themes.localStorageName)
  }

  /**
   * Update the theme information stored in the local storage with the received values.
   * Checks if the value exists in the theme list array defined for the class.
   * 
   * @since  1.0.0
   * @access private
   * 
   * @param  { String } theme 
   */
  #SetLocalStorageMode(theme)
  {
    try {
      if (this.#THEME_LIST.some(element => element === theme)) 
      {
        localStorage.setItem(themes.localStorageName, theme);
        this.#LOCAL_STORAGE_THEME_MODE = theme
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Determine if a theme is set for local storage.
   * 
   * @returns { Boolean } After checking if the local storage contains the theme characters.
   */
  #IsSettingLocalStorage()
  {
    /**
     * Truth field for data return
     * 
     * @type { Boolean } 
     */
    let isSet = false
    if (this.#LOCAL_STORAGE_THEME_MODE && typeof(this.#LOCAL_STORAGE_THEME_MODE) === 'string' && this.#LOCAL_STORAGE_THEME_MODE !== 'null')
    {
      if (this.#LOCAL_STORAGE_THEME_MODE.length > 0) isSet =  true
    }
    return isSet
  }

  /**
   * Update the "USER_THEME" private variable.
   * 
   * @since 1.0.0
   * @access private
   */
  #UpdateUserTheme()
  {
    this.#USER_THEME = this.#GetUserThemeMode()
  }

  /**
   * Get the theme information defined by the user in the browser .
   * 
   * @since 1.0.0
   * @access private
   * 
   * @returns { String } The name of the theme as defined in the browser .
   */
  #GetUserThemeMode()
  {
    /**
     * The name of the theme as defined in the browser .
     * @since  1.0.0
     * @type { String } The name of the theme as defined in the browser .
     */
    let userThemeName = ''
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
      userThemeName = 'dark'
    }
    else if (window.matchMedia('(prefers-color-scheme: light)').matches)
    {
      userThemeName = 'light'
    }
    return userThemeName
  }

  /**
   * Check to see if the "USER_THEME" variable is defined.
   * 
   * @since 1.0.0
   * @access private
   * 
   * @returns { Boolean } Definition status of the "USER_THEME" variable
   */
  #IsSetUserTheme()
  {
    /**
     * @since 1.0.0
     * @type { Boolean } Definition status of the "USER_THEME" variable
     */
    let isSet = false
    if (this.#USER_THEME && typeof(this.#USER_THEME) === 'string')
    {
      if (this.#USER_THEME.length > 0) isSet = true
    }
    return isSet
  }

  /**
   * update current css attribute propety
   * 
   * @since 1.0.0
   * @access private
   */
  #UpdateThemeAttribute()
  {
    this.#CSS_ATTRIBUTE_THEME_MODE = this.#GetThemeAttribute()
  }

  /**
   * Get Definition name of css attribute propety or empty character
   * 
   * @since 1.0.0
   * @access private
   * 
   * @returns { String } Definition name of css attribute propety or empty character
   */
  #GetThemeAttribute()
  {
    /**
     * @since 1.0.0
     * @type { String } Definition name of the "this.#CSS_ATTRIBUTE_NAME" css attribute propety
     */
    let theme = typeof(document.documentElement.getAttribute(this.#CSS_ATTRIBUTE_NAME)) === 'string' ? document.documentElement.getAttribute(this.#CSS_ATTRIBUTE_NAME) : '';
    return theme
  }

  /**
   * set css attribute to get parameter.
   * 
   * @since 1.0.0
   * @access private
   * 
   * @param { String } theme 
   */
  #SetThemeAttribute(theme)
  {
    try {
      if (this.#THEME_LIST.some(element => element === theme )) 
      {
        document.documentElement.setAttribute(this.#CSS_ATTRIBUTE_NAME, theme);
        this.#CSS_ATTRIBUTE_THEME_MODE = theme
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * check css attribute is set now.
   * 
   * @since 1.0.0
   * @access private
   * 
   * @returns { Boolean } Is set entity of css attribute.
   */
  #IsSetThemeAttribute()
  {
    /**
     * @since 1.0.0
     * @type { Boolean } is set entity.
     */
    let isSet = false
    if (this.#CSS_ATTRIBUTE_THEME_MODE && typeof(this.#CSS_ATTRIBUTE_THEME_MODE) === 'string')
    {
      if (this.#CSS_ATTRIBUTE_THEME_MODE.length > 0) isSet = true
    }
    return isSet
  }

  /**
   * change the current theme mode.
   * 
   * @since 1.0.0
   * @access public 
   * 
   * @param { String } theme must to select mode from themeList.
   */
  ChangeTheme(theme)
  {
    try {
      if (this.#THEME_LIST.some(element => element === theme)) 
      {
        this.#SetLocalStorageMode(theme)
        this.#SetThemeAttribute(theme)
        this.#CURRENT_THEME_MODE = theme
      }
    } catch (error) {
      console.log(error)
    }
  }
}