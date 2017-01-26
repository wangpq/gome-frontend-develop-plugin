;(function($){
	$.fn.curNav = function(o) {
		var def = { 
			nav:".mainnav",/*容器*/
			css:"cur"/*css目标*/
			};
		var o=$.extend(def,o),
			n = o.nav,
			c = o.css;
		return this.each(function(){
			var myNav = $(n).find("a");
			for(var i = 0; i < myNav.length; i++) {
				var links = myNav.eq(i).attr("href");
				var myURL = document.location.href;
				if(myURL.indexOf(links) != -1) {
					$(n).find("li").removeClass(c);
					myNav.eq(i).parent("li").addClass(c);
				};
			};
		});
	};
})(jQuery);