;(function($,window,document,undefined) {
    //定义Slider的构造函数
    var floorTab = function(ele, opt) {
        this.$element = ele,
            this.defaults = {
                content: '.ct',
                tab:'.tab',
                item: '.main_warp .main',
                next:'.page_slider',
                nav:'.tab li',
                cur:'cur',
                event: "mouseover",
                delayTime: 150,
                endFun: null,
                tabItemLoadAttr:"tab-data-load"
            },
            this.options = $.extend({}, this.defaults, opt);
    };
    //定义Slider的方法
    floorTab.prototype = {
        init: function() {  
            var _this=this;
            this.content=$(this.options.content);
            this.item=$(this.options.content).find(this.options.item);
            this.next=$(this.options.content).find(this.options.next);
            this.nav=$(this.options.content).find(this.options.nav);
            this.itemsLoadAttr = (this.options.tabItemLoadAttr);
            this.tab=$(this.options.content).find(this.options.tab);
            this.color=$(this.options.content).find('.tab').attr('hcolor');
            this.cur=this.options.cur;
            this.endFun=this.options.endFun;
            this.index=0;
            this.timer=null;
            _this.NexFn();
            _this.tabFn();
        },
        itemFn: function(index){
            this.content.lazyload({
                source: "data-lazy-img"
            });
            this.nav.eq(index).addClass(this.cur).siblings().removeClass(this.cur);
            this.tab.find('li a').css('background','none');
            this.tab.find('li.cur a').css('background',this.color);
            this.item.eq(index).css('display','block').siblings('.main').css('display','none');
            (this.item.eq( index).html()=='') && index!=0 && 0 == this.item.eq( index ).attr(this.itemsLoadAttr) && "function" == typeof this.endFun && this.endFun(this.tab.attr("floor-info"),index,this.item.eq( index ),this.nav.eq(index).attr("key"),this.nav.eq(index).attr('modelId'));
        },
        NexFn: function(){
            var _this=this;
            this.next && this.next.bind('click',function(){
                _this.index++;
                if(_this.index>=_this.item.length){
                    _this.index=0;
                }
                _this.itemFn(_this.index);
            })
        },
        tabFn: function(){
            var _this=this,hoverTimer;
            this.nav.hover(function(){
                _this.index=$(this).index();
                 hoverTimer = setTimeout(function() {
                    _this.itemFn(_this.index);
                },200);
            },function(){
                clearTimeout(hoverTimer);
            })

        }
    }
    //在插件中使用Slider对象
    $.fn.floorTab = function(options) {
        //创建Slider的实体
        var floortab  = new floorTab(this, options);
        //调用其方法
        return floortab.init();
    }
})(jQuery,window,document);


