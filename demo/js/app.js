var gmPrdApp={
    gTabsFn : function(){
		if($('#fixtabox').hasClass("fixedtop")){
			$("html,body").animate({scrollTop:$("#gfixed").offset().top},100);
		}
	},
	dzTabsFn : function(){
	},
	appraisalPage : function(num){
		var tpl='';
		for(var i=0;i<10;i++){
			tpl=tpl+'<li style="height:100px;border-bottom:1px solid #ccc;">第'+num+'页第'+(i+1)+'条评论类容</li>';
		}
        $("#appraisalContent").html('<ul data-index="'+num+'">'+tpl+'</ul>');  
	},
	jumpToAppTop : function(){
        $("body,html").animate({
            scrollTop: $("#appraisalContent").offset().top-36
        },80);
	},
	/* 根据浏览猜你喜欢 */
	guessLickFn: function(data){
		if (!(data.isSuccess=="Y" && data.size>0)){
			$('#guessLike').hide();
			return false;
		}
		var htm = '\
			<div class="hd">\
				<h3 class="title">根据浏览猜你喜欢</h3>\
				<div id="btn-change" class="r opt"><span class="text">换一组</span><i class="i-refresh"></i></div>\
			</div>\
			<div class="bd">\
				<div class="bd-cont">\
					<ul class="pushul clearfix" style="width: 4654px; position: relative;">\
						<% for(var i=0,j=lst.length; i<j; i++){ \
							var prd = lst[i];\
							var point = i<j-1?",":"";\
							bigData(prd.productId+point);\
						%>\
						<li>\
							<a track="2:<%= prd.pid %>" href="http:<%=prd.purl %>"  target="_blank" title="<%= prd.pn %>" maima_param="<%=prd.maima_param%>"><img width="130" height="130" src="http:<%= prd.iurl %>" alt="<%= prd.pn %>"/></a>\
							<a track="2:<%= prd.pid %>" href="http:<%=prd.purl %>"  target="_blank" title="<%= prd.pn %>" maima_param="<%=prd.maima_param%>"><h2><%= prd.pn %></h2></a>\
							<p class="yuan colprice fb">¥<span><%= prd.price %></span></p>\
						</li>\
						<% } %>\
					</ul>\
				</div>\
			</div>\
			\
			';

		var products = ""
		  , tlscroll = $('body').hasClass('w990') ? 5 : 6;
		template.helper('bigData', function (pid) { products += pid; });
		$('#guessLike').addClass("gslider").attr('maima_param',data.maima_param).html(template.compile(htm)(data));

		if (typeof trackEvent != "undefined") { trackEvent(2, products); }

		if (data.size > tlscroll) {
			$('#guessLike .bd-cont').gSlider({
				isAuto: false,
				isImgLoad: false,
				showNum: tlscroll,
				stepLen: tlscroll,
				time: 3000,
				btnGo: { left: '#btn-change'}
			});
		}else{
			$("#btn-change").hide();
		}
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

/* 一个简易的分页示例 */
$('.comment-box').gLoad(function () { 
	gmPrdApp.appraisalPage(1);
	$('#appraisalPage').gPage({
		ap: 9,
		cp: 1,
		tg: "javascript:;",
		e: function () {
			gmPrdApp.appraisalPage(this.cp);
			gmPrdApp.jumpToAppTop();
		}
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


//根据浏览猜你喜欢
$('#guessLike').gLoad(function () { 
    var ajaxUrl='http://bigd.gome.com.cn/gome/rec?callback=guessLick_45316876843571&boxid=box37&pid=9134032698&area=11010200&cid=148731113814702064&uid=73179590366&imagesize=130&brid=10000010&shopid=&c1id=cat10000004&c3id=cat10000049&sid=1123030306&_=1487757103321';
	$.ajax({
		type : "get",
		url : ajaxUrl,
		dataType : "jsonp",
		//data : {},
		jsonpName : "guessLick_45316876843571"
	}).done(function(data){
        gmPrdApp.guessLickFn(data);
    });
});
