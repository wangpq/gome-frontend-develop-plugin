;(function(window, $){
	var popupSelectors = ['[gui-popup]'];
	var selector = popupSelectors.join(',');
	var popupSkip = {}; 
	var Popup = function(){};
	var POPUP_Z_INDEX = 10;

	Popup.id = 0;
	Popup.bind = function(eventType, delay){
		delay = delay || 1;
		eventType = eventType || 'click';
		var timerName = '_popupTimer_' + eventType;
		var attrName = 'popupid_' + (+new Date);
		eventType = eventType + '.popupbind';
		$(document).off(eventType).on(eventType, '[gui-popupclose]', function(e){
			if(e.type !== 'click'){
				return;
			};
			var $this = $(this);  
			setTimeout(function(){
				if($this.parents(selector).length){
					$this
						.parents(selector).eq(0)
						.gPopup('hide');
				}else{
					$this
						.parents('[gui-popup-sibling]')
						.siblings(selector).eq(0)
						.gPopup('hide');
				}
				
			},1)  
		}).on(eventType, selector, function(e){
			var $this = $(this);
			var eventType = $this.attr('gui-popup-event') || 'click';
			if(eventType!==e.type){
				return;
			};
			if(!this[attrName]){
				this[attrName] = ++Popup.id;
			}

			if($this.attr('gui-popup-toggle')){
				if($(e.target).parents('[gui-popupbox]').length){
					popupSkip[this[attrName]] = true;
				}
				if($this.data('popupstatus') !=  'show'){
					popupSkip[this[attrName]] = true;
				} 
			}else{
				 popupSkip[this[attrName]] = true;
			}			
			
			var $popupbox = $this.find('[gui-popupbox]').eq(0);
			var $popupsibling = $this.siblings('[gui-popup-sibling]');
			if($popupbox.is(":visible")){
				return; 
			}

			$this.data('__pop_z_index', $this.css('z-index'));
			$this.css('z-index', POPUP_Z_INDEX);
			$this.data('popupstatus', 'show');
			$popupbox.show(); 
			$popupsibling.show();
			fixPosition($popupbox);
			fixPosition($popupsibling);

			if($this.attr('gui-popup-animate')){
				if($popupsibling.length){ 
					var $inner = $popupsibling;
				}else{
					var $inner = $this.find('[gui-popupbox-animate]');
				}
				
				$inner.css({
					height: 'auto'
				});
				var height = $inner.height();
				$inner.css({
					height: 0
				});
				$inner.animate({
					height: height
				}, 150);
			}
			
			$this.addClass('gui-pop-show').trigger('popshow');
		}).on(eventType, '[gui-popup-sibling]', function(e){
			// 如果是兄弟元素作为联动的
			if(e.type !== 'click'){
				return;
			} 

			var $this = $(this);
			var $popup = $this.siblings('[gui-popup]');

			popupSkip[$popup.get(0)[attrName]] = true;

		}).on(eventType, function(e){
			$(selector).each(function(){  
				var $this = $(this);
				var eventType = $this.attr('gui-popup-event') || 'click';
				if(eventType!==e.type){
					return;
				};
				clearTimeout($this.data(timerName)); 
				if($this.attr('gui-auto-close')!=='false' && !popupSkip[this[attrName]]){
					var timer = setTimeout(function(){
						var $popupbox = $this.find('[gui-popupbox]').eq(0);
						var $popupsibling = $this.siblings('[gui-popup-sibling]');
						if(!$popupbox.is(":visible")){
							return;
						}
						if($this.attr('gui-popup-animate')){ 
							if($popupsibling.length){
								var $inner = $popupsibling;
							}else{
								var $inner = $this.find('[gui-popupbox-animate]');
							}
							$inner.css({
								height: 'auto'
							});
							var height = $inner.height();
							$inner.animate({
								height: 0
							}, 150, function () {
								$popupsibling.hide(); 
								$popupbox.hide(); 
								removeFixePosition($popupsibling);
								removeFixePosition($popupbox);
								$this.data('popupstatus', 'hide');
								$this.css('z-index', $this.data('__pop_z_index'));
								$this.removeClass('gui-pop-show').trigger('pophide'); 
							});
						}else{
							$popupsibling.hide(); 
							$popupbox.hide();
							removeFixePosition($popupsibling);
							removeFixePosition($popupbox);
							$this.data('popupstatus', 'hide');
							$this.css('z-index', $this.data('__pop_z_index'));
							$this.removeClass('gui-pop-show').trigger('pophide'); 
						} 
						
					}, delay);
					$this.data(timerName, timer);
				} 
				delete popupSkip[this[attrName]];
			}); 				 
		});
	} 

	Popup.register = function(_selector){
		popupSelectors.push(_selector);
		selector = popupSelectors.join(',');
	};
	
	$.fn.gPopup = function(options){
		if(typeof(options) === 'string'){
			if(options == 'show'){
				this.each(function(){
					var $this = $(this);
					$this.find('[gui-popupbox]').eq(0).show();
					$this.siblings('[gui-popup-sibling]').show();
					$this.css('z-index', POPUP_Z_INDEX);
					$this.addClass('gui-pop-show').trigger('popshow');
					$this.data('popupstatus', 'show');

					fixPosition($this.find('[gui-popupbox]').eq(0));
					fixPosition($this.siblings('[gui-popup-sibling]'));
				});
			}else if(options == 'hide'){
				this.each(function(){
					var $this = $(this);
					$this.find('[gui-popupbox]').eq(0).hide();
					$this.siblings('[gui-popup-sibling]').hide();
					$this.css('z-index', $this.data('__pop_z_index'));
					$this.removeClass('gui-pop-show').trigger('pophide'); 
					$this.data('popupstatus', 'hide');
 

					removeFixePosition($this.find('[gui-popupbox]').eq(0));
					removeFixePosition($this.siblings('[gui-popup-sibling]'));
				});
			}
		}
	}

	function fixPosition($gpopupbox){
		if($gpopupbox && $gpopupbox.length){
			var popupboxBottom = $gpopupbox.offset().top + $gpopupbox.height() ;
			var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			var screenBottom = scrollTop + $(window).height();
			if(popupboxBottom > screenBottom){
				$gpopupbox.addClass('gui-popupbox-up');
			} 
		} 
	}

	function removeFixePosition($gpopupbox){
		$gpopupbox.removeClass('gui-popupbox-up');
	}

	$.gPopup = Popup;
})(window, $)