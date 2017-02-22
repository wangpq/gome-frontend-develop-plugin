;(function(){
	//控制浮层的宽度，宽度固定的可以在css里控制，删除此段js
	$(".nav-subbox").each(function() {
		var width1=$(this).find(".sort-warp").length*($(this).find(".sort-warp").eq(0).width()+45),//分类的宽度
		    width2=$(this).find(".brands-warp").length*210,//品牌、热搜和推荐栏的宽度
		    width3=$(this).find(".advert-warp").length*210;
		$(this).css("width",width1+width2+width3);//广告栏的宽度
	});
	//控制浮层的高度,高度固定的可以在css里直接写死,删除此段js
	$(".nav-menulist").each(function(){
		var oHeight = $(this).outerHeight()-2;// padding and border for main dropdown's arrow
		$(this).next("div.submenu-warp").find(".brands-warp,.sub-warp,.sort-warp,.advert-warp").height(oHeight);//控制浮层的高度
	})
	//调用插件
	$(".nav-menubox").dropdown({
		topspeed: !0,
		onchange: function(a) {
			var index=a.attr("data-index"),
			    eleParets=a.parents(".nav-menubox");
			//浮层展示
			eleParets.find(".submenu-warp").show();
			$(".submenu-warp .nav-subbox").hide();
			eleParets.find(".submenu-warp").find("#category-item-"+index).show();
			//浮层随滚动条滚动
			var catebox=eleParets.find('.submenu-warp');
			var ht = eleParets.offset().top;
			var wt = $(window).scrollTop();
			var ct = wt-ht;
			if(wt>ht){
			catebox.css({top:ct});
			}else{
			catebox.css({top:'0px'});
			}
		},
		onmouseleave: function(a) {
			var timer=null;
			clearTimeout(timer);
			timer=setTimeout(function(){
				$(".nav-menubox").find(".submenu-warp").hide();
				$(".submenu-warp .nav-subbox").hide();
			}, 100)

		}
	});
})();