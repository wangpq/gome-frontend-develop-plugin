 ;(function ( $, window, document, undefined ) {
            var a = $;
            var pluginName = "dropdown",
                    defaults = {
                        hasCssLink: !1,
                        item: "nav-item",
                        trigger: !1,
                        current: "active",
                        bodyClass: "dropdown-bd",
                        subBodyClass: "dropdown-sub",
                        topspeed: !1,
                        boundary: 10,
                        enterDelay: 0,
                        leaveDelay: 0,
                        zIndex: 1e3,
                        align: "bottom",
                        left: null,
                        top: null,
                        submenuLeft: 0,
                        submenuTop: 0,
                        onchange: null,
                        onmouseleave: null
                    };
            // 构造函数
            function Plugin ( element, options ) {
                    this.el = $(element);
                    this.options = $.extend( {}, defaults, options );
                    this._defaults = defaults;
                    this._name = pluginName;
                    this.init();
            }
            $.extend(Plugin.prototype, {
                    init: function() {
                        this.mouseLocs = [],
                        this.lastDelayLoc = null,
                        this.create(),
                        this.bind()
                    },
                    create: function() {
                        var a = this.options;
                        this.item = a.trigger ? this.el: this.el.find("." + a.item),
                        this.body = this.el.find("." + a.bodyClass);
                        var b = a.top;
                        var c = a.left;
                        "bottom" == a.align && null == a.top && (a.top = this.item.outerHeight()),
                        "right" == a.align && (a.top = 0, null == a.left && (a.left = this.item.outerWidth())),
                        (null != b || null != c) && this.body.css({
                            position: "absolute",
                            top: a.top,
                            left: a.left,
                            zIndex: a.zIndex
                        }),
                        this.el.find("." + a.subBodyClass).css({
                            zIndex: a.zIndex + 1
                        }),
                        this.bodyOuterWidth = this.body.outerWidth(),
                        this.bodyBorderWidth = 2 * this.getStyle(this.body[0], "borderWidth")
                    },
                    bind: function() {
                        var b = this;
                        var c = this.options;
                        var d = !1;
                        var e,
                        f;
                        var g = 3;
                        var h = null;
                        var i = null;
                        var j = !1;
                        this.el.bind("mouseenter", 
                        function() {
                            clearTimeout(e)
                        }),
                        this.el.bind("mouseleave", 
                        function() {
                            d && (e = setTimeout(function() {
                                b.removeClass()
                            },
                            c.leaveDelay)),
                            c.onmouseleave && c.onmouseleave(a(this)),
                            h = null
                        }),
                        this.item.bind("mouseenter", 
                        function() {
                            if (j) return ! 1;
                            var e = a(this);
                            var g = function() {
                                j = !0,
                                h = e.index(),
                                b.removeClass(),
                                e.addClass(c.current),
                                d = !0,
                                c.onchange && c.onchange(e)
                            };
                            f = setTimeout(function() {
                                0 == b.topspeed(e) && (g(), clearTimeout(i))
                            },
                            c.enterDelay),
                            c.topspeed && (i = setTimeout(function() {
                                h != e.index() && g()
                            },
                            700))
                        }),
                        this.item.bind("mouseleave", 
                        function() {
                            clearTimeout(f),
                            clearTimeout(i),
                            j = !1
                        }),
                        this.el.find("." + c.subBodyClass).bind("mouseenter", 
                        function() {
                            var d = b.bodyOuterWidth - b.bodyBorderWidth + c.submenuLeft;
                            var e = b.getStyle(a(this)[0], "paddingLeft");
                            d = a.browser.isIE6() ? d - e: d;
                            var f = 0 + c.submenuTop;
                            a(this).find("." + c.bodyClass).show().css({
                                left: d,
                                top: f
                            })
                        }).bind("mouseleave", 
                        function() {
                            a(this).find("." + c.bodyClass).hide()
                        }),
                        c.topspeed && a(document).mousemove(function(a) {
                            b.mouseLocs.push({
                                x: a.pageX,
                                y: a.pageY
                            }),
                            b.mouseLocs.length > g && b.mouseLocs.shift()
                        })
                    },
                    removeClass: function() {
                        this.item.removeClass(this.options.current)
                    },
                    getStyle: function(a, b) {
                        if (a) {
                            var c = window.getComputedStyle ? window.getComputedStyle(a, null)[b] : a.currentStyle[b];
                            return c = parseInt(c),
                            c || (c = 0),
                            c
                        }
                    },
                    topspeed: function() {
                        var a = this.options;
                        if (!a.topspeed) return 0;
                        var b = this.el;
                        var c = b.offset(),
                        d = {
                            x: c.left,
                            y: c.top
                        },
                        e = {
                            x: c.left + b.outerWidth(),
                            y: d.y
                        },
                        f = {
                            x: c.left,
                            y: c.top + b.outerHeight()
                        },
                        g = {
                            x: c.left + b.outerWidth(),
                            y: f.y
                        };
                        if (loc = this.mouseLocs[this.mouseLocs.length - 1], prevLoc = this.mouseLocs[0], !loc) return 0;
                        if (prevLoc || (prevLoc = loc), prevLoc.x < c.left || prevLoc.x > g.x || prevLoc.y < c.top || prevLoc.y > g.y) return 0;
                        if (this.lastDelayLoc && loc.x == this.lastDelayLoc.x && loc.y == this.lastDelayLoc.y) return 0;
                        function h(a, b) {
                            return (b.y - a.y) / (b.x - a.x)
                        }
                        var i = e,
                        j = g;
                        var k = h(loc, i),
                        l = h(prevLoc, i),
                        m = h(loc, j),
                        n = h(prevLoc, j);
                        return l > k && m > n ? prevLoc.x - d.x < a.boundary ? 0: (this.lastDelayLoc = loc, 300) : (this.lastDelayLoc = null, 0)
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