(function($){
    var defaults = {
        auto  : true,
        order : true,
        orderItems : null,
        loop  : true,
        navigation : false,
        box   : ".slide-items",
        item  : ".slide-item",
        interval : 5000,
        earsing : "swing",
        duration : "slow",
        viewport : ".viewport",
        effect : 'vertical' // vertical, horizontal, hidein
    };
    
    var slide = function(element, options){
        // 赋值
        var o = {},                                 // api
            ops = options,
            curIndex = 0,                           // 当前元素index
            prevIndex = 0,                          // 前一个元素index   
            box = element.find(ops.box),            // 容器
            items = box.find(ops.item),
            last = items.length - 1,                // 最后一个元素
            width = items.outerWidth(true),         // 元素宽度
            height = items.outerHeight(true),       // 元素高度
            viewport = element.find(ops.viewport),  // 视口元素
            animating = false,                      // 是否正在动画
            tmpString = "",
            timer, navItem = null,
            orderItems = ops.orderItems;
          
        // api
        o = {
            animating : false,  // 是否正在动画
            getNavItem : function(){
                return navItem;
            },
            setNavItem : function(value){
                navItem = value;
            },
            next : function(loop){
                element.trigger("slide.next", this);
            },
            prev : function(loop){
                element.trigger("slide.prev", this);
            },
            stop : function(){
                clearInterval(timer);
            },
            play : function(){
                var _this = this;
                timer = setInterval(function(){
                    _this.next();
                }, ops.interval);
            },
            go : function(n){
                if(n !== "underfined" && !this.animating && n >= 0 && n <= this.getLastIndex()){
                    prevIndex = curIndex;
                    curIndex = n;
                    element.trigger("slide.change", this);
                }
            },
            getCurIndex  : function(){
                return curIndex;
            },
            getPrevIndex : function(){
                return prevIndex;
            },
            getConfig : function(){
                return ops;
            },
            getLastIndex : function(){
                return last;
            }
        };
        
        element.trigger("slide.init", o);

        return o;
    };
    
    $.fn.slide = function(options){
        options = options || {};
        
        if(typeof options === "object"){
            options.auto && (options.loop = true);
            
            options = $.extend(false, defaults, options);
            $(this).each(function(){
            
                var _this = $(this),
                    box = $(this).find(options.box),            // 容器
                    items = box.find(options.item);           // 所有元素
                    
                if(items.length > 1 && !_this.data("slide")){
                    var width = items.outerWidth(true),         // 元素宽度
                        height = items.outerHeight(true),       // 元素高度
                        viewport = _this.find(options.viewport),  // 视口元素
                        orderItems = options.orderItems,
                        timer;
                        
                    _this.bind("slide.init", function(event, o){
                        var ops = o.getConfig(), 
                            curIndex = o.getCurIndex(),
                            tmpString, delay,
                            element = $(this),
                            last = o.getLastIndex();
                        
                        // 导航
                        if(ops.order){
                            tmpString = '<div class="slide-txt-bg"></div><ol class="slide-menu">';
                            if(orderItems instanceof Array){
                                for(var i = 0; i <= last; i++){
                                    tmpString += '<li index="' + i + '">' + (orderItems[i] || '') + '</li>';
                                }
                            } else if(typeof orderItems == "string"){
                                for(var i = 0; i <= last; i++){
                                    tmpString += '<li index="' + i + '">' + orderItems + '</li>';
                                }
                            } else {
                                for(var i = 0; i <= last; i++){
                                    tmpString += '<li index="' + i + '">' + (i + 1) + '</li>';
                                }
                            }
                            tmpString += '</ol>';

                            var navItem = $(tmpString).appendTo(element).find("li").hover(function() {
                                var index = parseInt($(this).attr("index"), 10);
                                if(!delay){
                                    delay = setTimeout(function() {
                                        o.animating = false;
                                        o.go(index);
                                    }, 100);
                                }
                            }, function(){
                                clearTimeout(delay);
                                delay = null;
                            });
                            
                            o.setNavItem(navItem);
                        }

                        // 左右按钮
                        if(ops.navigation){
                            tmpString = '<a href="javascript:void(0);" hidefocus="true" class="btn-prev"><s class="prev"></s></a><a href="javascript:void(0);" hidefocus="true" class="btn-next"><s class="next"></s></a>';
                            $(tmpString).appendTo(element);
                            var btnPrev = element.find(".btn-prev"), btnNext = element.find(".btn-next");
                            

                            btnPrev.bind("click", function(){
                                o.prev();
                            });
                            btnNext.bind("click", function(){
                                o.next();
                            });
                        }
                        
                        if(ops.effect == "horizontal"){
                            box.css({
                                "width" : "10000px"
                            });
                            items.css({
                                "float" : "left"
                            });
                        }
                        
                        // 自动滚动
                        if(ops.auto){
                            o.play();
                            
                            element.hover(function(){
                                o.stop();
                            }, function(){
                                o.play();
                            });
                        }
                        
                        o.go(curIndex);
                    });

                    _this.bind("slide.next", function(event, o){
                        var curIndex = o.getCurIndex(), 
                            ops = o.getConfig(),
                            last = o.getLastIndex();
                        if(ops.loop){
                            curIndex = (curIndex + 1) > last ? 0 : (curIndex + 1);
                        } else {
                            if(curIndex < last){
                                curIndex = curIndex + 1;
                            } else {
                                return ;
                            }
                        }
                        o.go(curIndex);
                    });
                    
                    _this.bind("slide.prev", function(event, o){
                        var curIndex = o.getCurIndex(), 
                            ops = o.getConfig(),
                            last = o.getLastIndex();
                        if(ops.loop){
                            curIndex = (curIndex - 1) < 0 ? last : (curIndex - 1);
                        } else {
                            if(curIndex > 0){
                                curIndex = curIndex - 1;
                            } else {
                                return ;
                            }
                        }
                        o.go(curIndex);
                    });
                    
                    _this.bind("slide.change", function(event, o){
                        if(!o.animating){
                            var ops = o.getConfig(),
                                n = o.getCurIndex(),
                                p = o.getPrevIndex(),
                                last = o.getLastIndex(),
                                box = $(this).find(options.box),
                                items = box.find(options.item);
                            o.animating = true;

                            if(ops.navigation && !ops.loop){
                                $(this).find(".btn-prev").removeClass("disable");
                                $(this).find(".btn-next").removeClass("disable");
                                
                                if(n === 0){
                                    $(this).find(".btn-prev").addClass("disable");
                                } else if(n === last){
                                    $(this).find(".btn-next").addClass("disable");
                                }
                            }

                            if(ops.effect == "vertical"){
                                box.animate({"top": -n * height}, ops.duration, ops.earsing, function(){
                                    o.animating = false;
                                });
                            } else if(ops.effect == "horizontal"){
                                box.animate({"left": -n * width}, ops.duration, ops.earsing, function(){
                                    o.animating = false;
                                });
                            } else {
                                items.hide();
                                items.eq(n).fadeIn(ops.duration, function(){
                                    o.animating = false;
                                });
                            }

                            if(ops.order){
                                o.getNavItem().removeClass("cur");
                                o.getNavItem().eq(n).addClass("cur");
                            }
                        }
                    });
                    
                    var _slide =  new slide(_this, options);
                    _this.data("slide", _slide);
                    
                }    
            });
        } else {
            $(this).each(function(){
                var _slide = $(this).data("slide");
                if(_slide) {
                    if(typeof options === "number"){
                        _slide.go(options);
                    } else {
                        try{
                            _slide[options]();
                        } catch (error){}
                    }
                }
            });
        }
    };
})(jQuery);