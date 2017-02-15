;(function($) {
	var gmSliderAdapters = {};  

	function GmSlider(options){ 
		this._init(options || {});
	}
	GmSlider.prototype = {
		contructor: GmSlider
		,_init: function (options) {   
			this._fixOptions(options);

			var $container = this.$container = options.$container; 
			if(!$container.width() && !$container.height()){
				throw new Error('gmslider: can not get size of container.');
			}

			// 存储原始的item
			this.$images = this.$container.children(); 
			this.$images.remove();

			this.index = 0;
			this.length = this.$images.length;
			this.maxIndex = this.length - 1;  

			this._initContainer();

			this._initSlider();

			if(options.control && options.control.index){ 
				this._initControlIndex()    
			}  

			if(options.control && options.control.side){  
				this._initControlSide() 
			}  

			this._startTimer();
		}  
		,_fixOptions: function(options){
			this.options = options;

			if(this.options && this.options.type){
				this.type = this.options.type;
			} else {
				this.type = 'slideLeft';
			}

			this.adapter = gmSliderAdapters[this.type];

			this.delayTime = parseInt(this.options.delayTime) || 1000;
			this.animateTime = parseInt(this.options.animateTime) || 500;
		}
		,_initContainer: function () {
			if(this.$container.css('position') == 'static'){
				this.$container.css('position', 'relative');
			} 

			this.containerWidth = this.$container.width();
			this.containerHeight = this.$container.height(); 
		}
		,_initSlider: function () {
			var adapter = this.adapter;

			if(typeof adapter.initSlider == 'function'){
				var $slider = this.$slider = adapter.initSlider.call(this);
			}else{
				var $slider = $('<div>');  
				this.$images.appendTo($slider).hide().eq(0).show();  
			}
			
			this.$container.append($slider);

			var width = this.containerWidth; 
			var height = this.containerHeight; 


			$slider.css({
				position: 'relative'
				,width: width
				,height: height
			})

			this.$images.css({
				width: width
				,height: height
				,position: 'absolute'
				,left: 0
				,top: 0
			});
		}
		,_initControlIndex: function(){ 
			var that = this; 

			var controlIndexItemHtml = that.options.control.index.html; 
			var $controlIndex = this.$controlIndex = $('<div>');  
			this.$images.each(function (i) {
				var $item = $('<div>');
				if(controlIndexItemHtml){
					$item.append( 
						controlIndexItemHtml.replace(/\\?\$/g, function(str){ 
							return str.indexOf('\\') > -1? '$': (i+1);
						})
					);
				} 
				$controlIndex.append($item);
			});  

			var controlIndexClassName = this.options.control.index.className;
			if(controlIndexClassName){
				$controlIndex.addClass(controlIndexClassName);
			} 

			var activeClassName = this.options.control.index.activeClassName;
			if(activeClassName){
				this.$controlIndex.children().removeClass(activeClassName).eq(this.index).addClass(activeClassName);
			}  

			var event = this.options.control.index.event; 

			if(event){
				$controlIndex.children().each(function(i){
					$(this).on(event, function(){
						that._animateTo(i);
						that._stopTimer();
						that._startTimer();
					});
				});
			}

			this.$container.append($controlIndex); 

			var autoHideTime = this.options.control.index.autoHideTime;
			if(typeof autoHideTime == 'number'){
				this.$container.on('mouseenter', function(){
					$controlIndex.stop().animate({
						opacity: $controlIndex.data('autoHideOpacity')
					}, autoHideTime);
				});
				this.$container.on('mouseleave', function(){
					$controlIndex.stop().animate({
						opacity: 0
					}, autoHideTime); 
				});

				$controlIndex.data('autoHideOpacity', $controlIndex.css('opacity')).css({opacity: 0});
			} 
			
		}
		,_initControlSide: function(){
			var that = this;
			var controlSide = this.options.control.side;
			var controlSidePrev = controlSide.prev;
			var controlSideNext = controlSide.next;
			var $controlSidePrev = this.$controlSidePrev = $('<div>');
			var $controlSideNext = this.$controlSideNext = $('<div>'); 

			if(controlSide.className){
				$controlSidePrev.addClass( controlSide.className );
				$controlSideNext.addClass( controlSide.className );
			}

			if(controlSidePrev && controlSidePrev.className){
				$controlSidePrev.addClass( controlSidePrev.className);
			} 

			if(controlSideNext && controlSideNext.className){
				$controlSideNext.addClass( controlSideNext.className);
			} 

			if(controlSidePrev && controlSidePrev.html){
				$controlSidePrev.append( controlSidePrev.html);
			}

			if(controlSideNext && controlSideNext.html){
				$controlSideNext.append( controlSideNext.html);
			}

			this.$container.append($controlSidePrev).append($controlSideNext);

			$controlSidePrev.on('click', function(){
				that._animatePrev();
				that._stopTimer();
				that._startTimer();
			});

			$controlSideNext.on('click', function(){
				that._animateNext();
				that._stopTimer();
				that._startTimer();
			}); 

			var autoHideTime = this.options.control.side.autoHideTime; 

			if(typeof autoHideTime == 'number'){
				this.$container.on('mouseenter', function(){
					$controlSidePrev.stop().animate({
						opacity: $controlSidePrev.data('autoHideOpacity')
					}, autoHideTime);
				});
				this.$container.on('mouseleave', function(){
					$controlSidePrev.stop().animate({
						opacity: 0
					}, autoHideTime);
				});

				this.$container.on('mouseenter', function(){
					$controlSideNext.stop().animate({
						opacity: $controlSideNext.data('autoHideOpacity')
					}, autoHideTime);
				});
				this.$container.on('mouseleave', function(){
					$controlSideNext.stop().animate({
						opacity: 0
					}, autoHideTime);
				});

				$controlSidePrev.data('autoHideOpacity', $controlSidePrev.css('opacity')).css({opacity: 0});
				$controlSideNext.data('autoHideOpacity', $controlSideNext.css('opacity')).css({opacity: 0});
			}  
			
		} 
		,_startTimer: function () {
			var that = this; 
			this.$container.trigger('gmslider.start');
			this._timer = setInterval(function () {
				that._animateNext();
			}, this.delayTime + this.animateTime);
		}
		,_stopTimer: function(){
			var that = this; 
			this.$container.trigger('gmslider.stop');
			clearInterval(this._timer);
			this._timer = null;
		}
		,_animateTo: function(index){ 
			if(index == this.index){
				return;
			}

			this.adapter.animateTo.call(this, index); 

			this.index = index; 

			this.$container.trigger('gmslider.change'); 

			if(this.$controlIndex){ 
				var activeClassName = this.options.control.index.activeClassName;
				if(activeClassName){
					this.$controlIndex.children().removeClass(activeClassName)
						.eq(index).addClass(activeClassName);
				} 
			}
		}
		,_animatePrev: function () {
			var index = this.index - 1;
			if(index < 0){
				index = this.maxIndex;
			}
			this._animateTo(index);
		}
		,_animateNext: function () { 
			var index = this.index + 1;
			if(index > this.maxIndex){
				index = 0;
			}
			this._animateTo(index);
		}
		,destory: function(){
			this._stopTimer();
			this.$container.off().find('*').off();
			this.$container.html('').append(this.$images); 
		}
	} 


	$.gmSlider = {};
	// 注册新的轮播图类型
	$.gmSlider.register = function(adapter){
		gmSliderAdapters[adapter.type] = adapter;
	} 


	// 默认两种插件
	// 左滑动
	$.gmSlider.register({
		type: 'slideLeft' 
		,initSlider: function () {  
			var $slider = $('<div>');  
			this.$images.appendTo($slider).hide().eq(0).show();  
			return $slider;
		}  
		,animateTo: function (index) { 
			var $images = this.$images;
			var containerWidth = this.containerWidth;
			$images.hide();  

			$images.eq(this.index).css({
				left: 0
			}).stop().show().animate({
				left: -containerWidth
			}, this.animateTime, function(){
				$(this).hide();
			});	

			$images.eq(index).css({
				left: containerWidth
			}).stop().show().animate({
				left: 0
			}, this.animateTime); 
		} 
	});

	// 淡入
	$.gmSlider.register({
		type: 'fadeIn'   
		,animateTo: function (index) { 
			var $images = this.$images;
			var containerWidth = this.containerWidth;
			$images.hide();  

			$images.eq(this.index).css({
				opacity: 1
			}).stop().show().animate({
				opacity: 0
			}, this.animateTime, function(){
				$(this).hide();
			});	

			$images.eq(index).css({
				opacity: 0
			}).stop().show().animate({
				opacity: 1
			}, this.animateTime); 
		} 
	});  

	$.fn.gmSlider = function (options) {
		options = options || {}; 
		this.each(function(){
			var $this = $(this);
			options.$container = $this;
			if( $this.data('_gmSlider') ){
				try{
					$this.data('_gmSlider').destory();
				}catch(e){} 
			}
			$this.data('_gmSlider', new GmSlider(options));
		}); 
		return this;
	}
})(jQuery);




