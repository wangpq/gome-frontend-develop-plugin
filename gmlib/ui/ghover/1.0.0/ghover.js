;(function($) {
	$.fn.ghover =  function(o) {
		var def = {
			targetId:"self",/*目标*/
			addcss:"cur",/*为目标addClass*/
			latertime:150,/*延迟时间*/
			prat:0,/*是否在父级上添加class，默认0不添加，1为添加*/
			e:null,/*自定义js方法执行*/
			pratclass:"pcur"/*为父级添加的class*/
		};
		var o = $.extend(def,o),
			target = o.targetId,
			c = o.addcss,
			later = o.latertime,
			tPrat = o.prat,
			pclass = o.pratclass,
			time;
		return this.each(function(){
			if(target == "self"){
				var t = $(this);
			}else{
				var t = o.targetId;
			};
			$(this).hover(function(){
				function laterh(){
					$(t).addClass(c);
					if(o.e){o.e.apply(t);}
				};
				time = setTimeout(laterh,later)
			},function(){
				$(t).removeClass(c);
				clearTimeout(time);
			});
			if(tPrat == 1){
				$(t).parent().hover(function(){
					$(this).addClass(pclass);
				},function(){
					$(this).removeClass(pclass);
				})
			};
		});
	};
})(jQuery)