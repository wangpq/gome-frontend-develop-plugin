;(function(window, $){ 
	// z-index level:
	// normal  dropbox  dialog/dialog
	// 10      100      1000
	var SelectSelectors = ['[gui-widget=select] [gui-widget=select-text]'];
	var selector = SelectSelectors.join(',');
	var selectSkip = {}; 
	var Select = function(){};
	var SELECT_Z_INDEX = 10;
	var initName = "__init_" + (+new Date); 

	Select.id = 0;

	Select.bind = function(eventType, delay){
		delay = delay || 1;
		eventType = eventType || 'click';
		var timerName = '__selectTimer_' + eventType;
		var attrName = 'selectid_' + (+new Date);
		eventType = eventType + '.selectbind';
		$(document).off(eventType).on(eventType, selector, function(){
			var $this = $(this);
			var $select;
			if(!this[attrName]){
				this[attrName] = ++Select.id;
			}
			selectSkip[this[attrName]] = true; 
			var $options = $this.siblings('[gui-widget=select-options-wrap]').eq(0);
			if($options.is(":visible")){
				return;
			}
			$select = $this.parents('[gui-widget=select]:eq(0)');
			$select.data('__select_z_index', $options.css('z-index'));
			$select.removeClass('gui-select-close').addClass('gui-select-open');
			$select.css({
				zIndex: SELECT_Z_INDEX
			});
			$options.css({
				top: $this.height()
			}).show();
			$select.addClass('gui-select-show').trigger('selectshow');
		}).on(eventType, '[gui-widget=select] [gui-widget=select-arrow]', function (e){
            var $this = $(this),
                $select = $this.parent().find('[act-change-warranty]'),
                $wrap = $this.parent().find('[gui-widget=select-options-wrap]');
            $this.toggle(
                function(){
                    $wrap.hide();
                    $select.removeClass('gui-select-show').trigger('selecthide');
                },
                function(){
                    $wrap.show();
                    $select.addClass('gui-select-show').trigger('selectshow');
                }
            );
            $(this).siblings('[gui-widget=select-text]').trigger(eventType);
            e.stopPropagation();
		}).on(eventType, function(){
			$(selector).each(function(){  
				var $this = $(this);
				var $select;
				clearTimeout($this.data(timerName));
				if(!selectSkip[this[attrName]]){
					var timer = setTimeout(function(){
						var $options = $this.siblings('[gui-widget=select-options-wrap]').eq(0);
						if(!$options.is(":visible")){
							return;
						} 
						$select = $this.parents('[gui-widget=select]:eq(0)');
						$select.css({
							zIndex: $select.data('__select_z_index') 
						});
						$options.hide();
						$select.removeClass('gui-select-open').addClass('gui-select-close');
						$select.removeClass('gui-select-show').trigger('selecthide');
					}, delay);
					$this.data(timerName, timer);
				} 
				delete selectSkip[this[attrName]];
			}); 				 
		}).on(eventType, '[gui-widget=select-option]', function(){
			var $this = $(this);
			var index = $this.data('option-index'); 
			var $select = $this.parents('[gui-widget=select]').eq(0);
			var $sel = $select.find('select').eq(0);
			var change = false;
			var value = $sel.val();
			$sel.find('option').each(function(i){
				if(i == index){
					this.selected = true; 
					if(value != this.value){ 
						change = true;
					} 
				}else{
					this.selected = false;
				} 
			});  
			if(change){
				$sel.trigger('change');  
			} 
			Select.render($select);
		});
	} 

	Select.render = function($select){
		$select = $select || $('[gui-widget=select]');
		$select.each(function(){
			var $this = $(this);
			var $sel  = $this.find('select');
			var $selTxt, $selOpt; 
			if(!this[initName]){
				$sel.hide();
				$selTxt = $('<a href="javascript:;" gui-widget="select-text" class="gui-select-text"></a>');
				$selOptWrap = $('<div gui-widget="select-options-wrap" class="gui-select-options-wrap"></div>'); 
				$selOpt = $('<div gui-widget="select-options"  class="gui-select-options"></div>');  
				$selOpt.appendTo($selOptWrap);
				$this.append($selTxt);
				$this.append('<div gui-widget="select-arrow" class="gui-select-arrow"></div>');
				
				$sel.find('option').each(function(index){
					var $this = $(this);
					var $option = $('<a href="javascript:;" title="'+$.trim(this.innerHTML)+'" gui-widget="select-option" class="gui-select-option" data-option-index="' + index + '"></a>');
					if($this.data('icon-class')){ 
						$option.append('<i class="' + $this.data('icon-class') + '"></i>');
					}
					$option.append($.trim(this.innerHTML) || '&nbsp;');
					$selOpt.append($option);
				});
				$this.append($selOptWrap);
				this[initName] = true;
			}else{
				$selTxt = $this.find('[gui-widget=select-text]');
				$selOpt = $this.find('[gui-widget=select-options]');
			}	 


			var selText = '';
			var $selected = $sel.find(':selected');
			if($selected.data('icon-class')){ 
				selText += ('<i class="' + $selected.data('icon-class') + '"></i>');
			}
			selText += $selected.html();
			$selTxt.html(selText);

		});
	} 
	
	$.fn.gSelect = function(options){
		if(typeof(options) === 'string'){
			if(options == 'show'){
				this.each(function(){
					var $this = $(this);
					$this.find('[gui-widget=select-options-wrap]').eq(0).show();
					$this.addClass('gui-select-show').trigger('selectshow');
				});
			}else if(options == 'hide'){
				this.each(function(){
					var $this = $(this);
					$this.find('[gui-widget=select-options-wrap]').eq(0).hide();
					$this.removeClass('gui-select-show').trigger('selecthide');
				});
			}
		}
	}
	$.gSelect = Select;
})(window, $);










