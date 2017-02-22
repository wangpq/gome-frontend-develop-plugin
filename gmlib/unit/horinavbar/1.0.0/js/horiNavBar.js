//水平楼层横导航
;(function ( $, window, document, undefined ) {
    var pluginName = "horiNavBar",
        defaults = {
            navClassName: "fixed-bar"
        };
    var f, j, c,
        e = true, html = [];

    var browser=navigator.appName
    var b_version=navigator.appVersion
    var version=b_version.split(";");
    var trim_Version=version[1]?version[1].replace(/[ ]/g,""):"";


    function Plugin ( element, options ) {
        this.element = $(element);
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    $.extend(Plugin.prototype, {
        init: function () {
            this.startFixNav();
            this.addFloorName();
            this.changeLink();
        },
        addFloorName: function () {
            $('.floor h2').each(function(i,e){
                var a = $(e).text();
                html.push('<li rel="J-floor-'+(i+1)+'"><a href="javascript:void(0);">'+a+'</a></li>');
            });
            $('.floors-item').append(html.join(""));
            if (this.element.length == 0) {
                return
            }
            this.element.find("li").click(function() {
                e = false;
                var k = "#" + $(this).attr("rel");
                if ($(k).length == 0) {
                    return
                }
                $(this).addClass("on").siblings().removeClass();
                $("html, body").stop(true).animate({
                    scrollTop: $(k).offset().top - 50
                }, 1000, function() {
                    e = true
                })
            });
            this.element.find("li").hover(function() {
                $(this).addClass("hover")
            }, function() {
                $(this).removeClass("hover")
            });
        },
        fixNav:function(){
                j = $(document).scrollTop();
                c = $(document).scrollLeft();
                var topad = $('#gome-topad-sm').length;
            var jj = topad?j-80:((browser=="Microsoft Internet Explorer" && trim_Version=="MSIE7.0")||(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE8.0")?j+18:j );
            if (jj>= f) {
                //ie6
                    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {//ie6
                       var oHtml = document.getElementsByTagName('html')[0];
                       this.element.parent(".fixed-bar-wrap").css({"position": "absolute", "top": j,"left":0,"margin-top":0});
                       //处理抖动
                       oHtml.style.backgroundImage = 'url(about:blank)';
                       oHtml.style.backgroundAttachment = 'fixed';
                    } else {
                        this.element.addClass("fixed-bar-fixed");
                        // $(".mygome-side").addClass("mincart-fix");//mini购物车
                        //$(".fixed-bar-wrap").css("height",0);
                        //$(".fixed-bar-wrap").css("marginBottom",0);
                    };
                    if (c > 0) {
                        this.element.css({
                            left: -c + "px"
                        })
                    } else {
                        this.element.css({
                            left: "auto"
                        })
                    }
                } else {
                    //ie6
                    if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {//ie6
                        this.element.parent(".fixed-bar-wrap").css({"position": "relative", "top": "0","margin-top":"40px"});
                    }
                //$(".fixed-bar-wrap").css("marginBottom",20);
                    //$(".fixed-bar-wrap").css("height",50);
                    this.element.removeClass("fixed-bar-fixed");
                   // $(".mygome-side").removeClass("mincart-fix");//迷你购物车
                    this.element.css({
                        left: "0"
                    })
                }
        },
        startFixNav:function(){
            var _this = this;
            f = this.element.offset().top;
            this.fixNav();
            $(window).scroll(function() {
                _this.fixNav()
            }).resize(function() {
                _this.fixNav()
            })
        },
        scrollNavLinkBoolean:function b(l) {
            var k = $("#J-floor-" + l);
            if (k.length > 0) {
                return k.offset().top - $(document).scrollTop()
            }
        },
        scrollNavLink:function(){
                var k = this.element.find("li").length;
                if (this.scrollNavLinkBoolean(1) <= 0) {;
                    for (var l = 2; l <= k; l++) {
                        if (this.scrollNavLinkBoolean(l) - 200 > 0) {
                            this.element.find("li").eq(l - 2).addClass("on").siblings().removeClass();
                            return
                        }
                    }
                    this.element.find("li").eq(k - 1).addClass("on").siblings().removeClass()
                } else {
                    this.element.find("li").removeClass("on").eq(0).addClass("on")
                }
        },
        changeLink:function(){
            var _this = this;
            this.scrollNavLink();
            $(window).scroll(function() {
                if (e) {
                    _this.scrollNavLink()
                }
            });
        }


    });
    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
        return this;
    };
})( jQuery, window, document );

