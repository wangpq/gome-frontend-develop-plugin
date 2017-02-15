/**
 * 支持单图无线滚动
 * 
 * @module gOpSlider
 * @version v1.0
 * @time 2013-6-17
 * @author liuqing
 * @example
	$(xx).gOpSlider({
		isAuto: true, //是否自动滚动
        isAnimate: false, //是否执行滚动动画
        dataOriginal: 'data-original',//图片真实地址存放位置
        currClass: 'navOn', //当前选中样式
        eventNav: 'click',  //点击事件
        navId: '#mar3Nav',  // 数字导航存放容器
        speed: 3000,        // 执行时间
        isImgload: false,   // 是否图片后加载
        beforeCallback: function(){}, //执行前回调函数
        afterCallback: function(){}   //执行后回调函数
	});
 */
;(function($){
	/**
	 * 私有Slider类
	 * 
	 * @class Slider
	 * @param {Object} target dom对象
	 * @param {Object} opts 实例化对象传入参数
	 * @private 
	 * 
	 * @constructor
	 */
    var Slider = function(target, opts){
        this.target = target;
        this.settings = opts;
        /**
         * ui元素
         * 
         * @property ulNode
         * @private 
         */
        this.ulNode = target.find(opts.mover);
        /**
         * li元素
         * 
         * @property cel
         * @private 
         */
        this.cel = this.ulNode.children();
        /**
         * target宽度
         * 
         * @property w
         * @private 
         */
        this.w = target.width();
        /**
         * li数量
         * 
         * @property len
         * @private 
         */
        this.len = this.cel.length;
        /**
         * 定时器预留控制器
         * 
         * @property timer
         * @private 
         */
        this.timer = null;
        /**
         * 当前滚动屏数
         * 
         * @property index
         * @private 
         */
        this.index = 0;
        /**
         * 前一个滚动屏数
         * 
         * @property preIndex
         * @private 
         */
        this.preIndex = -1;
        /**
         * 状态条自定义标签结构
         */
        this.navBx = opts.navBox.split(">");
        
        this.init();
    };
    Slider.prototype = {
		/**
		 * 初始化方法
		 * 
		 * @method init
		 * @return
		 */
        init: function(){
            var self = this;
            self.settings.beforeCallback.call(self);
            self.styleChange();
            
            var tpl = self.navBulid(), 
              navId = self.target.find(self.settings.navId);
            navId.css('z-index',9);
            if(self.len<2){
            	navId.hide();
            };
            navId.append(tpl);
            self.navBtn = navId.find(self.navBx[1]);
            self.bindEvnet();
            self.moving();
            self.imgLoad();
            self.settings.afterCallback.call(self);
        },
        /**
         * 样式更改
         * 
         * @method styleChange
         * @return
         */
        styleChange: function(){
            var self = this;
            self.target.css({'position': 'relative'});
            if(self.settings.isAnimate){
                self.ulNode.css({
                    'position': 'absolute',
                    'width': 20000
                });
                self.cel.css({'float': 'left'});
                return;
            }
            self.cel.css({'position': 'absolute'}).css('z-index',0).eq(0).css('z-index',1);       
        },
        /**
         * 图片后加载函数
         * 
         * @method imgLoad
         * @return
         */
        imgLoad: function(){
            var self = this,
                el = self.cel.eq(self.index).find('img');
            if(!self.settings.isImgload || el.attr('data-name') === "imglazyload_offset" 
                || !el.attr(self.settings.dataOriginal)){return;}
            el.attr('src',el.attr(self.settings.dataOriginal)).attr('data-name','imglazyload_offset');
        },
        /**
         * 事件绑定
         * 
         * @method bindEvnet
         * @return
         */
        bindEvnet: function(){
            var self = this;
            self.target.hover(function(){
                clearInterval(self.timer);
            },function(){
                self.moving();
            });
            var timer = null;
            self.navBtn.bind(self.settings.eventNav, function(){
                var that = $(this);
                timer = setTimeout(function(){
                    var index = self.navBtn.index(that);

                    self.index = index;
                    self.change(index);
                    eventFlag = false;
                },150);                
            });
            self.navBtn.bind('mouseout', function(){
                clearTimeout(timer);                
            });
        },
        /**
         * 自动滚动
         * 
         * @method moving
         * @return
         */
        moving: function(){
            var self = this;
            if(!self.settings.isAuto){return;};
            self.timer = setInterval(function(){
                self.index++;
                self.index = self.index >= self.len ? 0 : self.index;
                self.change(self.index);
            },self.settings.speed);
        },
        /**
         * 动画函数
         * 
         * @method change
         * @param {Number} index 滚动屏数
         * @return
         */
        change: function(index){
            var self = this;
            self.preIndex = self.index - 1;
            if(self.settings.isAnimate){
                self.ulNode.animate({'left': -(self.w * index)});
            }else{
            	self.cel.fadeOut(500).eq(self.index).fadeIn(1000);
            }
            self.navBtn.removeClass(self.settings.currClass).eq(self.index).addClass(self.settings.currClass);
            self.imgLoad();
        },
        /**
         * 构建数字导航
         * 
         * @method navBulid
         * @return {String} 模板字符串
         */
        navBulid: function(){
        	//alert(this.settings.addTag);
        	
        	
        	
            var self = this,
            //获取滚动元素的尺寸
            navHtml = '<'+self.navBx[0]+' data-type="gOpSlider">';
            
            if(this.settings.addTag){//多加一个i标签
                for(var i = 0; i<self.len; i++){
                	var navNum = self.settings.showNum ? (i+1) : '';
                    if(i === 0){
                        navHtml += '<'+self.navBx[1]+' class="'+self.settings.currClass+'">'+"<i>"+ navNum +"</i>" + '</'+self.navBx[1]+'>';
                    }else{
                        navHtml += '<'+self.navBx[1]+'>'+"<i>"+ navNum +"</i>" +'</'+self.navBx[1]+'>';
                    }
                }
                navHtml += '</'+self.navBx[0]+'>';
                return navHtml;              	
            }
            else{
                for(var i = 0; i<self.len; i++){
                	var navNum = self.settings.showNum ? (i+1) : '';
                    if(i === 0){
                        navHtml += '<'+self.navBx[1]+' class="'+self.settings.currClass+'">'+navNum+'</'+self.navBx[1]+'>';
                    }else{
                        navHtml += '<'+self.navBx[1]+'>'+navNum+'</'+self.navBx[1]+'>';
                    }
                }
                navHtml += '</'+self.navBx[0]+'>';
                return navHtml;            	
            }
        }
    };
    /**
     * @property 默认配置
     * @type {Object} 
     * navHtml 状态条的标签定义
     * 
     */
    var defaultsConfig = {
        isAuto: true,
        isAnimate: false,
        showNum: true,
        mover: 'ul:eq(0)',
        dataOriginal: 'data-original',
        currClass: 'navOn',
        eventNav: 'click',
        navId: '#mar3Nav',
        navBox:'ul>li',
        speed: 3000,
        isImgload: false,
        beforeCallback: function(){},
        afterCallback: function(){}
    };
	/**
	 * 实例化对象
	 * 
	 * @class gOpSlider
	 * @param {Object} opts 参数
	 * @extends Slider
	 * @constructor
	 */
    $.fn.gOpSlider = function(opts) {
        opts = $.extend({}, defaultsConfig, opts);
        this.each(function(){
        	new Slider($(this), opts); 
        });        
    };
})(jQuery);