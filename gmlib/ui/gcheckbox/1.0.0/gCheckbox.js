;(function(window, $){
	var $doc = $(document);
	var gCheckbox = function(){}
	gCheckbox.render = function($checkbox){
		$checkbox = $checkbox || $('[gui-checkbox]');
		$checkbox.each(function(){
			var $this = $(this); 
			var checkbox = $this.find('[type=checkbox]').hide().get(0);
			$this
				.removeClass($this.attr('gui-class-unchecked'))
				.removeClass($this.attr('gui-class-checked'))
				.removeClass($this.attr('gui-class-disabled'));

			if(checkbox.disabled){
				$this.addClass($this.attr('gui-class-disabled'));
			}
			if(checkbox.checked){
				$this.addClass($this.attr('gui-class-checked'));
			}else{
				$this.addClass($this.attr('gui-class-unchecked'));
			}
		});
	}
	gCheckbox.bind = function(){
		$doc.off('click.__checkbox').on('click.__checkbox', '[gui-checkbox]', function(){
			var $this = $(this);
			var checkbox = $this.find('[type=checkbox]').get(0); 
			if(checkbox.disabled){ 
				return;
			}
		 
			checkbox.checked = !checkbox.checked; 
			$this.trigger('gcheckbox.change', checkbox.checked); 
			gCheckbox.render($this); 
		});
	}

	gCheckbox.unbind = function(){
		$doc.off('click.__checkbox');
	}

	$.gCheckbox = gCheckbox;
})(window, jQuery);
