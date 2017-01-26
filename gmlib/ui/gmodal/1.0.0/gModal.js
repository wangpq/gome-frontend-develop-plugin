;(function(window, $){
	// var hasTransition = null;
	// transition: opacity 1s ease-in; 

	// z-index level:
	// normal  dropbox  modal/dialog
	// 10      100      1000
	var isIE6 = navigator.userAgent.toLowerCase().indexOf('msie 6') > -1;
	var $win = $(window);
	var MODAL_Z_INDEX = 1000;

	var modalPool = [];
	modalPool.get = function(){
		if(modalPool.length){
			return modalPool.shift();
		} else {
			return $('<div class="gui-modal"></div>');
		}
	}
	modalPool.set = function($modal){ 
		modalPool.push($modal);
		return null;
	}

	var iframePool = [];
	iframePool.get = function(){
		if(iframePool.length){
			return iframePool.shift();
		} else {
			return $('<iframe src="about:blank"></iframe>');  
		}
	}
	iframePool.set = function($iframe){ 
		iframePool.push($iframe);
		return null;
	}

	var Modal = function(options){
		this.id = Modal.id++;
		this.options  = options || {}; 
		this._events = {};
	}; 
	Modal.id = 0;
	Modal.prototype = {
		constructor: Modal
		,_render: function(){
			var options = this.options; 
			var $modal = this.$modal;
			if(!$modal){
				$modal = this.$modal = modalPool.get(); 
			} 
			$modal.css({
				width: $win.width()
				,height: $win.height()
				,position: 'fixed'
				,left: 0
				,top: 0
				,backgroundColor: (options.backgroundColor || '#000')
				,opacity: (options.opacity || .2) 
				,display: 'block'
				,zIndex: (options.zIndex || MODAL_Z_INDEX)
			}); 
			if(options.className){
				this.$modal.removeClass().addClass(options.className);
			}  
		}
		,_fixIE6: function(){
			var $modal = this.$modal;
			var $iframe = this.$iframe;
			if(isIE6){
				$modal.css({
					position: 'absolute'
				});
				$win.on('scroll.modal_' + this.id, function(){
					$modal.css({
						top: (document.documentElement.scrollTop || document.body.scrollTop)
						,left: (document.documentElement.scrollLeft || document.body.scrollLeft)
					});
				}); 

				if(!$iframe){
					$iframe = this.$iframe = iframePool.get();
					$iframe.css({
						width: $win.width()
						,height: $win.height()
						,position: 'absolute'
						,left: 0
						,top: 0 
						,opacity: 0 
						,display: 'block'
						,zIndex: MODAL_Z_INDEX
					}); 

					$win.on('resize.modal_' + this.id, function(){
						$iframe.css({
							width: $win.width()
							,height: $win.height()
						})
					});
					$win.on('scroll.modal_' + this.id, function(){
						$iframe.css({
							top: (document.documentElement.scrollTop || document.body.scrollTop)
						});
					}); 
				} 
				$iframe.appendTo(document.body);
			}
		}
		,_bindEvents: function(){ 
			var $modal = this.$modal;
			var events = this._events;
			var that = this; 
			for(var event in events){ 
				$modal.on(event, function(){
					var callbacks = events[event];
					for(var i=0,callback; callback=callbacks[i++]; ){
						callback.apply(that, arguments);

					}
				});
			};
			$win.on('resize.modal_' + this.id, function(){
				$modal.css({
					width: $win.width()
					,height: $win.height()
				})
			});
			
		}
		,_unbindEvents:function(){
			$win.off('.modal_' + this.id);
			this.$modal && this.$modal.off();
			this.$iframe && this.$iframe.off();
		}
		,on: function(event, callback){  
			var eventArr = this._events[event];
			if(!eventArr){
				eventArr = this._events[event] = [];
			} 
			eventArr.push(callback); 
			return this;
		}
		,off: function(event){
			delete this._events[event];
			this.$modal.off.apply(this.$modal, arguments);
			return this;
		}
		,show: function(){ 
			this._render(); 
			this._fixIE6(); 
			this.$modal.appendTo(document.body);
			this._bindEvents();
			$(this).trigger('modal.show');
			return this;
		}
		,hide: function(){
			var $modal  = this.$modal;
			var $iframe = this.$iframe; 
			this._unbindEvents();
			if($modal){
				this.$modal = modalPool.set($modal.remove());
			} 
			if($iframe){
				this.$iframe = iframePool.set($iframe.remove());
			}
			$(this).trigger('modal.hide');
			return this;
		} 
	}

	$.gModal = function(options){
		return new Modal(options);
	}

	$.fn.gModal = function(options){
		var modal = this.data('__gModal');
		if(typeof(options) == 'object'){
			if(modal){
				modal.options = options; 
			}else{
				modal = new Modal(options);
				this.data('__gModal', modal);
			} 
			if(options.show === true){
				modal.show();
			} else if(options.show === false){
				modal.hide();
			}
		}else if(options === 'show' || options === true){ 
			if(!modal){
				modal = new Modal(options);
				this.data('__gModal', modal);
			}
			modal.show();
		}else if(options === 'hide' || options === false){ 
			if(modal){ 
				modal.hide();
				this.data('__gModal', null)
			};
		}else{ 
			if(!modal){
				modal = new Modal(options);
				this.data('__gModal', modal);
			}
			modal.show();
		}
		return this;
	}
})(window, jQuery);











