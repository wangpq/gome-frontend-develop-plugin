var gmPrdApp={
    gTabsFn : function(){
		if($('#fixtabox').hasClass("fixedtop")){
			$("html,body").animate({scrollTop:$("#gfixed").offset().top},100);
		}
	},
	dzTabsFn : function(){
	} 
}


$(".sidecategory").hover(function(){
	$(".sidecategory .dropDownMenu").toggle();
})


/** 图片查看放大镜 **/
$(".j-listroll").gRoll({ movenum: 4 });
$(".jqzoom").gMagnifier();
$(".j-listroll").each(function() { //滚动
	$(this).gRoll({
		movenum: 4
	});
});
$(".j-pichover  img").eq(0).mouseenter();


/** 搭配购+最佳组合 **/
$(".pdtl-tab").gLoad(function () { 
	$('.pdtl-tab').gTabs({
		btnID:"#prd_tab_hd",
		boxID:"#prd_tab_bd",
		bind:'click',
		hEven: gmPrdApp.dzTabsFn,
		hide:1
	});	
});	

/** 商品详情描述 **/
$('#prdDesc').gLoad(function () { 
	$('#prdDesc').gTabs({
		btnID:"#prd_tbox",
		boxID:"#prd_data",
		bind:'click',
		hEven: gmPrdApp.gTabsFn,
		hide:1
	});
	$("#fixtabox").gfixed({
		star:"#gfixed",
		target:"#fixtabox",
		fixed:"fixed-top"
	});
});

/** 排行榜 **/
$('#paiHangBang').gLoad(function () { 
	new Tabs({
		titles: $('#panel-tab-hd a'),
		contents: $('.panel-tab-bd .tonglei_ul'),
		//click: true,
		hover: true,
		activefn: function (index) {
			if(index==0){
				$('#panel-tab-hd i').removeClass('dn').eq(0).addClass('dn');
			}else if(index==1){
				$('#panel-tab-hd i').addClass('dn');
			}else if(index==2){
				$('#panel-tab-hd i').removeClass('dn').eq(1).addClass('dn');
			}
			this.titles.removeClass('cur');
			this.titles.eq(index).addClass('cur');
			this.contents.hide();
			this.contents.eq(index).show();
		}
	});
});		

