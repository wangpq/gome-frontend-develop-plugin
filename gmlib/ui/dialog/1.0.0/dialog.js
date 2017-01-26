(function () {
    //#region 工具函数
    function getViewportSize(w) {
        var w = w || window;

        var result = { width: -1, height: -1 };

        //不支持ie8及以下版本  其余可以
        if (w.innerWidth != null) {
            result.width = w.innerWidth;
            result.height = w.innerHeight;
        } else if (document.compatMode == "CSS1Compat") {//标准模式
            result.width = document.documentElement.clientWidth;
            result.height = document.documentElement.clientHeight;
        } else { // ie 怪异模式
            result.width = document.body.clientWidth;
            result.height = document.body.clientHeight;
        }

        return result;
    }

    function getWidth(ele) {
        if (window.getComputedStyle) {
            return parseInt(getComputedStyle(ele, null)['width']);
        } else {
            return parseInt(ele.offsetWidth - parseInt(ele.currentStyle.paddingLeft) - parseInt(ele.currentStyle.paddingRight));
        }
    }

    function getHeight(ele) {
        if (window.getComputedStyle) {
            return parseInt(getComputedStyle(ele, null).height);
        } else {
            return parseInt(ele.offsetHeight - parseInt(ele.currentStyle.paddingTop) - parseInt(ele.currentStyle.paddingBottom));
        }
    }
    //#endregion

    window.Dialog = function (options) {

        if (options.dom == null) {
            throw '必须传入dom 对象';
        }

        this.options = options;
        options.dom.style.display = 'none';

        this.dialog_wrap = document.createElement("div");
        this.dialog_wrap.className = "dialog_wrap";
        this.dialog_wrap.style.zIndex = options.zIndex;

        this.dialog_wrap.style.position = 'absolute';

        document.body.appendChild(this.dialog_wrap);

        close_dialog = document.createElement('a');
        close_dialog.style.cssText = 'display: block;position: absolute;right: 4px;top: 4px;cursor: pointer;color: #999;font-family: simsun;text-decoration:none;';
        close_dialog.innerHTML = '╳';
        this.dialog_wrap.appendChild(close_dialog);
        var _this = this;
        close_dialog.onclick = function () {
            _this.close();
        }

        this.dialog_wrap.appendChild(options.dom);

        this.dialog_bg = document.createElement('div');
        this.dialog_bg.className = "dialog_bg";
        this.dialog_bg.style.zIndex = options.zIndex - 1;
        document.body.appendChild(this.dialog_bg);
        options.init && this.init()
    }
    window.Dialog.prototype = {
        init: function () {
            this.options.init && this.options.init();
        },
        open: function (fn) {
            var r;
            if (fn) {
                r = fn();
            }

            if (r == false) {
                return;
            }

            this.dialog_bg.style.display = 'block';
            this.dialog_wrap.style.display = 'block';
            this.options.dom.style.display = 'block';

            //取视口的尺寸
            //去对话框的尺寸
            //居中

            this.dialog_wrap.style.left = (getViewportSize().width - parseInt(getWidth(this.dialog_wrap))) / 2 + 'px';
            this.dialog_wrap.style.top = (getViewportSize().height - parseInt(getHeight(this.dialog_wrap))) / 2 + 'px';
            this.dialog_wrap.style.position = 'fixed';

            if (window.navigator.userAgent.indexOf('IE 6') > 0) {
                this.dialog_wrap.style.position = 'absolute';
                this.dialog_wrap.style.left = document.documentElement.scrollLeft + (getViewportSize().width - parseInt(getWidth(this.dialog_wrap))) / 2 + 'px';
                this.dialog_wrap.style.top = document.documentElement.scrollTop + (getViewportSize().height - parseInt(getHeight(this.dialog_wrap))) / 2 + 'px';
            }
        },
        close: function (fn) {
            var r;
            if (fn) {
                r = fn();
            }

            if (r == false) {
                return;
            }

            this.dialog_bg.style.display = 'none';
            this.dialog_wrap.style.display = 'none';
        },
        destroy: function () {//销毁对象
            this.dialog_wrap.parentNode.removeChild(this.dialog_wrap);
            this.dialog_bg.parentNode.removeChild(this.dialog_bg);
        }
    }
})();
