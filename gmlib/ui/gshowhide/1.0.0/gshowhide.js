;(function($){
	$.fn.gshowhide = function(o){
		var def = {
			box:".jhbox",/*隐藏内容的名称*/
			Class:"current",/*自身添加的class名称*/
			latertime:150,/*延迟时间*/
			bind:"click"/*鼠标动作*/
		};
		var o = $.extend(def,o),
			showbox = o.box,
			adcss = o.Class,
			tbtn = $(this),
			obind = o.bind,
			ltime = o.latertime,
			stimes;
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
			if(obind = "hover"){
				$(tbtn).hover(function(){
					function laterh(){
						$(showbox).show();
						$(tbtn).addClass(adcss);
					};
					stimes = setTimeout(laterh,ltime)
				},function(){
					$(showbox).hide();
					$(tbtn).removeClass(adcss);
					clearTimeout(stimes);
				});
			};
		});
	};
})(jQuery)