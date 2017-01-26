;(function($){
	$.fn.gbackTop = function(opts) {
		var def = { 
			st:100,/*滚动距离*/
			box:"fixed",/*容器*/
			callback: function(){}
		},
		timer = null;
		opts = $.extend({}, def, opts);
		
		$(window).bind('scroll',function () {
			if (timer) {
				clearTimeout(timer);
			}
			var that = $(this);
			timer = setTimeout(function(){
				elDisplay(that);
				opts.callback();				
			},100);
		});
		function elDisplay(el){
			el = el || $(window);
			if (el.scrollTop() > opts.st) {
				$(opts.box).css("visibility","visible");
				return;
			};
			$(opts.box).css("visibility","hidden");
		}
	};
	
})(jQuery);