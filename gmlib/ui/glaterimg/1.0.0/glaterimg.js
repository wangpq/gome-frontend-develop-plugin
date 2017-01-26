;(function($){
	$.fn.glaterimg = function(o){
		var def = {
			rattr:"gome-src"/*自定义的属性名*/
		};
		var o = $.extend(def,o),
			cmAttr = o.rattr;
		return this.each(function(){
			$(this).hover(function(){
				$(this).find("img").each(function(){
					var gmsrc = $(this).attr(cmAttr);
					if(gmsrc != undefined){
					   this.src = $(this).attr(cmAttr); 
					   $(this).removeAttr(cmAttr);
				   };
				});	
			},function(){});
		});
	}
})(jQuery)