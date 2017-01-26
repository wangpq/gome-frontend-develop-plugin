;(function($){
	$.fn.ginputfocus = function(o){
		var def = {
			curClass:"cur"/*当前class*/
		};
		var o = $.extend(def,o),
			cur = o.curClass;
		return this.each(function(){
			var tip = $(this).siblings("label");
			$(tip).click(function(){
				$(this).hide();
				$(this).siblings("input").focus();
			});
			$(this).focus(function(){
				$(this).parent().addClass(cur);
				$(this).siblings("label").hide();
			});
			$(this).blur(function(){
				$(this).parent().removeClass(cur);
				if(this.value==""){
					$(this).siblings("label").show();
				};
			});
		});
	};
})(jQuery)
