function b(d,e,f){
        this.a.constructor.apply(this,arguments);

        this._setSkinObj(this._y);
        this._setInputType();
        this._setIconPrefix();

        /**
         * Internal widget state [normal, disabled, ...]
         * @type String
         * @protected
         * @override
         */
        this._z = this._setState(d);

        /**
         * Instance of the Icon widget used by this widget.
         * @type aria.widgets.Icon
         * @protected
         */
        this._icon = new ariaWidgetsIcon({
            icon : this._getIconName(this._z)
        }, e, f);

        if (ariaUtilsType.isString(d.w)){
            /**
             * Activate ellipsis ot not
             * @type Boolean
             * @protected
             */
            this._activateEllipsis = !0;

            /**
             * Flag for widget that get initialized right after being displayed.
             * @type Boolean
             * @protected
             */
            this._directInit = !0;
        }

        var g = this._cfg.width;

        /**
         * Styling information for the containing span
         * @protected
         * @type String
         */
        this._spanStyle = [(g > 0) ? "width:" + g + "px;" : "", "white-space:nowrap;"].join("");

        /**
         * Moment in which the widget gets initialized
         * @type Date
         */
        this.loadTime = null;
    }