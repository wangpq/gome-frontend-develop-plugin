;(function(window, $){
	// var hasTransition = null;
	// transition: opacity 1s ease-in; 

	// z-index level:
	// normal  dropbox  dialog/dialog
	// 10      100      1000
	var isIE6 = navigator.userAgent.toLowerCase().indexOf('msie 6') > -1;
	var $win = $(window);
	var DIALOG_Z_INDEX = 1000;

	var dialogPool = [];
	dialogPool.get = function(){
		if(dialogPool.length){
			return dialogPool.shift();
		} else {
			return $('<div></div>');
		}
	}

	dialogPool.set = function($dialog){
		dialogPool.push($dialog);
		return null;
	} 

	var Dialog = function(options){
		this.id = Dialog.id++;
		this.options  = options || {}; 
		this._events = {};
	}; 
	Dialog.id = 0;
	Dialog.prototype = {
		constructor: Dialog
		,_render: function(){
			var options = this.options; 
			var $dialog = this.$dialog;
			if(!$dialog){
				$dialog = this.$dialog = dialogPool.get(); 
			} 
			$dialog.css({
				position: 'fixed' 
				,display: 'block'
				,zIndex: DIALOG_Z_INDEX
			}); 
			if(options.className){
				this.$dialog.removeClass().addClass(options.className);
			}  
		}
		,_setPosition: function(){
			var $dialog = this.$dialog;
			if(!$dialog){
				return; 
			}
			if(isIE6){
				$dialog.css({ 
					left: (document.documentElement.scrollLeft || document.body.scrollLeft) + ($win.width() - $dialog.width()) / 2
					,top: (document.documentElement.scrollTop || document.body.scrollTop) + ($win.height() - $dialog.height()) / 2
				});
			}else{
				$dialog.css({ 
					left: ($win.width() - $dialog.width()) / 2
					,top: ($win.height() - $dialog.height()) / 2
				});
			}
			
		}
		,_fixIE6: function(){
			var that = this;
			var $dialog = this.$dialog; 
			if(isIE6){
				$dialog.css({
					position: 'absolute'
				});
				$win.on('scroll.modal_' + this.id, function(){
					that._setPosition();
				});  
			}
		}
		,_bindEvents: function(){ 
			var $dialog = this.$dialog;
			var events = this._events;
			var that = this; 
			for(var event in events){ 
				$dialog.on(event, function(){
					var callbacks = events[event];
					for(var i=0,callback; callback=callbacks[i++]; ){
						callback.apply(that, arguments);
					}
				});
			};
			$win.on('resize.dialog_' + this.id, function(){
				that._setPosition();
			});
		}
		,_unbindEvents:function(){
			$win.off('.dialog_' + this.id);
			this.$dialog && this.$dialog.off();  
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
			this.$dialog.off.apply(this.$dialog, arguments);
			return this;
		}
		,show: function(){ 
			if(this.options.modal){
				this.options.modal.show = true;
				$(this).gModal(this.options.modal);
			}
			this._render();  
			this._fixIE6(); 
			this.$dialog.appendTo(document.body).html(this.options.html);
			this._bindEvents();
			this._setPosition();
			$(this).trigger('dialog.show');
			return this;
		}
		,hide: function(){
			if(this.options.modal){
				$(this).gModal(false);
			}
			var $dialog  = this.$dialog; 
			this._unbindEvents();
			if($dialog){
				this.$dialog = dialogPool.set($dialog.remove());
			}  
			$(this).trigger('dialog.hide');
			return this;
		} 
	}

	$.gDialog = function(options){
		return new Dialog(options);
	}

	$.fn.gDialog = function(options){
		var dialog = this.data('_gdialog_');
		if(typeof(options) == 'object'){
			if(dialog){
				dialog.options = options; 
			}else{
				dialog = new Dialog(options);
				this.data('_gdialog_', dialog);
			} 
			if(options.show === true){
				dialog.show();
			} else if(options.show === false){
				dialog.hide();
			}
		}else if(options === 'show' || options === true){ 
			if(!dialog){
				dialog = new Dialog(options);
				this.data('_gdialog_', dialog);
			}
			dialog.show();
		}else if(options === 'hide' || options === false){ 
			if(dialog){ 
				dialog.hide();
				this.data('_gdialog_', null)
			};
		}else{ 
			if(!dialog){
				dialog = new Dialog(options);
				this.data('_gdialog_', dialog);
			}
			dialog.show();
		}
	}
})(window, jQuery);