/*!
 * a simple jquery plugin for  photo viewer
 * it is rely on jquery.rotate.js
 * released under the MIT license
 * http://www.gome.com.cn/license
 * version:1.1
 * author:WangPingqi
 * QQ:451863231
 * email :wpq163yx@163.com
 * date: 2016-09-27T15:00Z
 * update : 2016-10-2712T16:00Z
 */
;(function ($, undefined) {
    function GPhotoViewer(element, options) {
        this._init.apply(this, arguments);
    }

    GPhotoViewer.prototype = {
        defaults: {
            bigImg: ".p-photos-wrap img",  //要展示或者旋转的大图对象
            bigImgLeft: ".J-photo-left",
            bigImgRight: ".J-photo-right",
            bigImgPrev: ".J-photo-prev",
            bigImgNext: ".J-photo-next",
            thumbPrev: ".J-thumb-prev",
            thumbNext: ".J-thumb-next",
            thumbList: ".thumb-list",
            thumbListUl: ".thumb-list ul",
            hideView: ".J-hide-big-show",
            prevDisable: "i-prev-disable",
            nextDisable: "i-next-disable",
            thumbSelected: "selected",
            jumpHomeSelector : ".jump-to-home" ,
            number : 5, //每页展示图片个数
            currentIndex: 1, //默认选中的第几个图片
            itemMargin: 8,//元素中间的间距
            onBeforeInit: $.noop,  //初始化前触发函数
            onAfterHide: $.noop,  //控件隐藏后触发函数
            onImgPrevShowEnd : $.noop,
            onImgNextShowEnd : $.noop
        },
        _init: function (element, options) {
            //控件jquery对象
            this.element = $(element);
            //控件参数对象
            this.options = $.extend({}, this.defaults, options);
            //控件上方图片列表父元素
            this.thumbList = this.element.find(this.options.thumbList);
            //控件上方图片列表父元素Ul
            this.targetListEle = this.element.find(this.options.thumbListUl);
            //要展示或者旋转的大图对象
            this.bigImg = this.element.find(this.options.bigImg);
            this.thumbPrev = this.element.find(this.options.thumbPrev);
            this.thumbNext = this.element.find(this.options.thumbNext);
            this.bigImgLeft = this.element.find(this.options.bigImgLeft);
            this.bigImgRight = this.element.find(this.options.bigImgRight)
            this.bigImgPrev = this.element.find(this.options.bigImgPrev);
            this.bigImgNext = this.element.find(this.options.bigImgNext);
            this.jumpToHome = this.element.find(this.options.jumpHomeSelector);
            this.listItemWidth=this.targetListEle.children().eq(0).outerWidth()+this.options.itemMargin;
            //图片总个数
            this.size = this.targetListEle.children().length;
            //每页展示图片个数
            this.number=this.options.number;
            //当前展示的图片索引值
            this.currentIndex = this.thumbList.find("." + this.options.thumbSelected).index() || 0;
            //控件上方点击左右箭头图片列表可跳转次数
            this.jumpIndex = 0;
            this.init();
        },
        init: function () {
            this.options.onBeforeInit({obj : self });
            this.initPlugin();
            this.initEvents();
        },
        support : function(style){
            var prefix = ['webkit', 'Moz', 'ms', 'o'],
                i,
                humpString = [],
                htmlStyle = document.documentElement.style,
                _toHumb = function (string) {
                    return string.replace(/-(\w)/g, function ($0, $1) {
                        return $1.toUpperCase();
                    });
                };

            for (i in prefix)
                humpString.push(_toHumb(prefix[i] + '-' + style));
            humpString.push(_toHumb(style));
            for (i in humpString)
                if (humpString[i] in htmlStyle) return true;

            return false;
        },
        autoPrefix : function(style){
            var prefix = ['webkit', 'Moz', 'ms', 'o'],
                i,
                humpString = [],
                htmlStyle = document.documentElement.style,
                _toHumb = function (string) {
                    return string.replace(/-(\w)/g, function ($0, $1) {
                        return $1.toUpperCase();
                    });
                };

            for (i in prefix)
                humpString.push(_toHumb(prefix[i] + '-' + style));
            humpString.push(_toHumb(style));
            for (i in humpString)
                if (humpString[i] in htmlStyle) return humpString[i];

            return style;
        },
        initPlugin: function () {
            if(!this.support("transform")) {
                this.bigImgLeft.hide();
                this.bigImgRight.hide();
            }
            this.initComments(this.currentIndex);
            this.autoAnimateToIndex(this.currentIndex);
        },
        initComments: function (index) {
            var self = this
                , curItem = self.targetListEle.children().eq(index);
            curItem.addClass(self.options.thumbSelected).siblings().removeClass(self.options.thumbSelected);
            self.targetListEle.width(self.listItemWidth*self.size);
            self.bigImg.attr("src", curItem.find("img").attr("data-big-src"));
            self.currentIndex = index;
        },
        initEvents: function () {
            var self = this;

            // 控件上方图片列表项点击事件
            self.element.find("li").off("click").on("click", function () {
                var _self = $(this);
                self.currentIndex = _self.index();
                window.setTimeout(function(){
                    self.autoAnimateToIndex(self.currentIndex);
                },100)
            })

            //向左旋转
            self.bigImgLeft.off("click").on("click", function () {
                self.gmRotate('left');
            })

            //向右旋转
            self.bigImgRight.off("click").on("click", function () {
                self.gmRotate('right');
            })

            //控件上方图片列表左侧向前箭头点击事件
            self.thumbPrev.off("click").on("click", function () {
                var $this = $(this);
                self.autoCalAction(function () {
                    var allJumpCount = Math.ceil(self.size / self.number);
                    if (self.jumpIndex > 0) {
                        self.jumpIndex--;
                        $this.removeClass(self.options.prevDisable);
                        self.initComments(Math.ceil(self.number * self.jumpIndex));
                        self.targetListEle.animate({"margin-left": "-" + self.listItemWidth*self.number* self.jumpIndex}, "fast", function () {
                            if (self.jumpIndex < 1) {
                                $this.addClass(self.options.prevDisable);
                            }
                        });
                    } else {
                        $this.addClass(self.options.prevDisable);
                    }
                })
            })

            //控件上方图片列表左侧向后箭头点击事件
            self.thumbNext.off("click").on("click", function () {
                var $this = $(this);
                self.autoCalAction(function () {
                    var allJumpCount = Math.ceil(self.size / self.number);
                    if (self.jumpIndex < allJumpCount - 1) {
                        self.jumpIndex++;
                        $this.removeClass(self.options.nextDisable);
                        self.targetListEle.animate({"margin-left": "-" + self.listItemWidth * self.number * self.jumpIndex}, "fast", function () {
                            if (self.jumpIndex >= allJumpCount - 1) {
                                $this.addClass(self.options.nextDisable);
                            }
                        });
                    } else {
                        $this.addClass(self.options.nextDisable);
                    }
                })
            })

            //收起图片展示框
            self.element.find(self.options.hideView).off("click").on("click", function () {
                self.element.hide();
                self.options.onAfterHide({obj : self });
            })

            //控件下方图片向后展示箭头点击事件
            self.bigImgNext.off("click").on("click", function () {
                if (self.currentIndex < self.size - 1) {
                    self.currentIndex++;
                    self.autoAnimateToIndex(self.currentIndex);
                    if (self.currentIndex === self.size - 1) {
                        self.options.onImgNextShowEnd({obj : self })
                    }
                } else {
                    self.options.onImgNextShowEnd({obj : self })
                }
            })

            //控件下方图片向前展示箭头点击事件
            self.bigImgPrev.off("click").on("click", function () {
                if (self.currentIndex > 0) {
                    self.currentIndex--;
                    self.autoAnimateToIndex(self.currentIndex);
                    if (self.currentIndex === 0) {
                        self.options.onImgPrevShowEnd({obj : self });
                    }
                } else {
                    self.options.onImgPrevShowEnd({obj : self });
                }
            })
        },
        /**
         * 展示指定位置图片的动作函数
         * @method autoAnimateToIndex
         * @param {Number} index 要展示的图片索引值
         * @return {Null} 无返回值
         */
        autoAnimateToIndex: function (index) {
            var self = this
                ,curItem = self.element.find("ul li").eq(index)
                ,sourceSrc=curItem.find("img").attr("data-big-src")
                ,jumpNum = Math.ceil(self.currentIndex / self.number);
            curItem.addClass(self.options.thumbSelected).siblings().removeClass(self.options.thumbSelected);
            self.bigImg.attr("src", sourceSrc);
            self.support("transform") ? self.gmRotate('none') : null;
            self.jumpToHome.attr("href",sourceSrc);
            self.targetListEle.animate({"margin-left": "-" + self.listItemWidth * self.number * (jumpNum - 1)}, "fast");
            self.jumpIndex = jumpNum - 1;
            if (curItem.hasClass(self.options.thumbSelected)) self.initComments(index);
            self.autoCalAction();
        },
        /**
         * 控件上方左右箭头根据里面图片个数计算是否自动置灰,若不置灰返回函数
         * @method autoCalAction
         * @param {Function} fn 响应函数
         * @return {Null} 无返回值
         */
        autoCalAction: function (fn) {
            var self = this;
            if (self.size <= self.number) {
                self.thumbPrev.addClass(self.options.prevDisable);
                self.thumbNext.addClass(self.options.nextDisable);
                return false;
            } else {
                self.thumbPrev.removeClass(self.options.prevDisable);
                self.thumbNext.removeClass(self.options.nextDisable);
                self.targetListEle.width( self.listItemWidth * self.size);
                fn && fn();
            }
        },
        /**
         * 旋转图片
         * @method rotate
         * @param {Function} p 旋转方向
         * @return {Null} 无返回值
         */
        gmRotate: function (p) {
            var n = this.bigImg.attr('step'); //n:记录最终要到达的位置
            if (n == null) n = 0;
            switch (p) {
                case 'right':
                    n++;
                    break;
                case 'left':
                    n--;
                    break;
                case 'none':
                    n = 0;
                    break;
                default :
                    n = 0;
            }
            this.bigImg.attr('step', n);
            var cssObj={}
                , _transform=this.autoPrefix("transform")
                , _transition=this.autoPrefix("transition");
            cssObj.transform=cssObj[_transform]="rotate("+n * 90+"deg)";
            cssObj.transition=cssObj[_transition]="all 0.2s" ;
            this.bigImg.css(cssObj);
        }
    }

    $.fn.gphotoViewer = function (option) {
        this.each(function () {
            var $this = $(this)
                , data = $this.data('gphotoViewer')
                , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('gphotoViewer', (data = new GPhotoViewer(this, options)))
            }
        })
    };

})(jQuery);