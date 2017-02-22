/*
 * @Author   midday
 * @QQ       598535774
 * @Mail     liuzhengwu@yolo24.com
 * @DateTime 2016-09-08
 * @Description 
 *     粘性导航插件，当scrollTop大于触发条件时页面顶部显示"商品分类和搜索框"固定导航
 * @example
 *     $.sticknav({scrollTop:'XXXpx'});//scrollTop为导航显示的触发条件，默认为815px，如有需要请覆盖此参数
 */
;(function($, window, document, undefined) {
    'use strict';

    var $sidecategory = $('.sidecategory'),
        $topsearch = $('.topsearch'),
        $hotkeyword = $('.hotkeyword'),
        $body = $(document.body),
        $stickNav,
        categoryTimer,
        topsearchFixedClass = 'topsearch-fixed',
        sidecategoryFixedClass = 'sidecategory-fixed',
        defaults = {
            scrollTop: '815px'
        };

    function StickNav(options) {
        this.options = $.extend({}, defaults, options);
        this.init();
    }

    //初始化
    StickNav.prototype.init = function() {
        this.create();
        $stickNav = $('.stick-nav');
        this.bind();
    };

    //创建DOM
    StickNav.prototype.create = function() {
        $body.append('<div class="stick-nav"></div>');
    };

    //绑定事件
    StickNav.prototype.bind = function() {
        var self = this;

        $(window).scroll(function() {
            self.bindScroll($(this));
        });
    };

    //为window绑定scroll事件
    StickNav.prototype.bindScroll = function($this) {
        var isVisible = $stickNav.is(':visible');

        if ($this.scrollTop() >= parseInt(this.options.scrollTop)) {
            !isVisible && this.activateStickNav();
        } else {
            isVisible && this.hideStickNav();
        }
    };

    //激活粘性导航
    StickNav.prototype.activateStickNav = function() {
        var self = this;

        if ($body.hasClass('home')) {
            self.hideCategoryList();

            $sidecategory.find('h2 span').length === 0 && $sidecategory.find('h2').prepend('<span></span>');
            $sidecategory.hover(function() {
                categoryTimer && clearTimeout(categoryTimer);
            }, function() {
                categoryTimer = setTimeout(function() {
                    self.hideCategoryList();
                }, 100);
            });
        }

        $stickNav.show();
        $hotkeyword.hide();
        $topsearch.addClass(topsearchFixedClass);
        $sidecategory.addClass(sidecategoryFixedClass);
    };

    //隐藏粘性导航
    StickNav.prototype.hideStickNav = function() {
        $stickNav.hide();
        $hotkeyword.show();
        $topsearch.removeClass(topsearchFixedClass);
        $sidecategory.removeClass(sidecategoryFixedClass);

        if ($body.hasClass('home')) {
            $('.lisbg,.lisnav').show();
            $sidecategory.off('mouseenter').off('mouseleave');
            $sidecategory.find('h2 span').remove();
        }
    };

    //隐藏商品分类列表导航
    StickNav.prototype.hideCategoryList = function() {
        $('#subnav').hide();
        $('#lisnav li').removeClass('bgw');
        $('.lisbg,.lisnav').hide();
        $sidecategory.find('h2').removeClass('hover');
    };

    $.sticknav = function(options) {
        if (!$body.data('sticknav')) {
            $body.data('sticknav', new StickNav(options));
        }
    };
})(jQuery, window, document);
