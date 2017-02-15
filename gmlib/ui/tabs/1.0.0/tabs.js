(function () {
    function addEvent(fn, type) {
        if (!!this.addEventListener) {
            this.addEventListener(type, fn, false);

        } else {
            this.attachEvent('on' + type, fn);
        }
    }
    window.Tabs = function (describes) {

        //维护选项卡的状态
        var core = {
            autoRun: (describes.auto ? true : false),//自动运行
            msec: describes.auto, //自动运行的间隔时间
            _cur: 0, //当前位置
            _count: describes.titles.length, //选项卡总个数
            getValue: function ()//当前在什么位置
            {
                return this._cur;
            },
            setValue: function (value)//设置当前位置
            {
                this._cur = value;
                this._cur >= this._count && (this._cur = this._count - 1);
                this._cur < 0 && (this._cur = 0);
                return this._cur;
            },
            next: function ()//选择下一个选项卡
            {
                this._cur = this._cur + 1;
                (this._cur >= this._count) && (this._cur = 0);
                return this._cur;
            },
            pre: function ()//选择上一个
            {
                this._cur--;
                this._cur < 0 && (this._cur = this._count - 1)
                return this._cur;
            }
        };
        this.describes = describes;
        this.core = core;

        //添加事件
        for (var i = 0; i < describes.titles.length; i++) {
            (function (index) {

                addEvent.call(describes.titles[index], function () { core.autoRun = true; }, 'mouseout');
                addEvent.call(describes.contents[index], function () { core.autoRun = true; }, 'mouseout');

                //绑定click
                if (describes.click) {
                    addEvent.call(describes.titles[index], function () {
                        describes.activefn(index);
                    }, 'click');
                    addEvent.call(describes.contents[index], function () {
                        describes.activefn(index);
                    }, 'click');
                }

                //绑定hover
                if (describes.hover) {
                    addEvent.call(describes.titles[index], function () {
                        core.autoRun = false;
                        describes.activefn(index);
                    }, 'mouseover');
                    addEvent.call(describes.contents[index], function () {
                        core.autoRun = false;
                        describes.activefn(index);
                    }, 'mouseover');
                }

                //绑定delayHover
                if (jQuery.fn.delayHover && describes.delayHover) {
                    jQuery(describes.titles[index]).delayHover(function () {
                        core.autoRun = false;
                        describes.activefn(index);
                    }, function () {

                    }, describes.delayHover);

                    jQuery(describes.contents[index]).delayHover(function () {
                        core.autoRun = false;
                        describes.activefn(index);
                    }, function () {

                    }, describes.delayHover)
                }
            })(i);
        }

        //如果设置了 describes.auto就开定时器
        describes.auto && setInterval(function () {
            core.autoRun && describes.activefn(core.next());
        }, core.msec);

        describes.activefn(0)//选中第一个标签
    }
    Tabs.prototype = {
        pre: function () {//上一个
            this.describes.activefn(this.core.pre());
        },
        next: function () {//下一个
            this.describes.activefn(this.core.next());
        },
        active: function (i) {//指定显示第几个
            if (i > this.describes.titles.length - 1 || i < 0) {
                return;
            }
            this.describes.activefn(i);
        },
        getCur: function () {//当前选中的 
            return this.core._cur;
        },
        getCount: function () {//总个数
            return this.core._count;
        },
        getDescribes: function () {
            return this.describes;
        }
    }

})();