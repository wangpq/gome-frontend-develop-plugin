;(function($){
	$.fn.gclickshow = function(o){
		var def = {
			hbox:".jhbox",/*隐藏内容的名称*/
			Class:"hover"/*自身添加的class名称*/
		};
		var o = $.extend(def,o),
			showbox = o.hbox,
			adcss = o.Class,
			tbtn = $(this);
		return this.each(function(){
			$(showbox).hide();
			$(this).click(function(){
				if($(showbox).is(":hidden")){
					$(showbox).show();
					$(tbtn).addClass(adcss);
				}else{
					$(showbox).hide();
					$(tbtn).removeClass(adcss);
				};
			});
			$(showbox).hover(function(){
			},function(){
				$(showbox).hide();
				$(tbtn).removeClass(adcss);
			});
		});
	};
})(jQuery);