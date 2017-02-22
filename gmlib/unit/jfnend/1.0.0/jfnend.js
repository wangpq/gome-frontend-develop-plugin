/*对ie单独判断*/

 var isIE6 = navigator.userAgent.toLowerCase().indexOf("msie 6")>-1;
 if(isIE6){
	 var url = stageCssServer+'/css/n/firstPage/h_b_c_IE.min.css';
	 var link = document.createElement("link");
		 link.rel = "stylesheet";
		 link.href = url;
		document.getElementsByTagName("head")[0].appendChild(link);
 };
/*语音搜索*/
if (navigator.userAgent.toLowerCase().indexOf('webkit') >= 0) {
	if($(".voice-search").length>0){
		//暂时保留
	}else{
		$("#topSearchHover").append('<a href="//js.gomein.net.cn/search/voice/search.html" target="_blank"><div class="voice-search"></div></a>');
	}

}



/*头部图片替换*/

		/*$("[data-visitor='hover']").ghover({
			addcss : "tophover"
		});*/
		$("#topNavHover,#topSearchHover").ghover({
			addcss : "tophover"
		});
		gomeLib.srcChange = function(old){
			old.each(function(){
					$(this).attr('src',$(this).attr('gome-src')).removeAttr('gome-src');
			});
		};
		gomeLib.srcChange($("#j-imgload-logo").find('img[gome-src]'));
		gomeLib.topAdsNoAnimate = function(){
			$("#topad-flag-os,#topad-flag-other").remove();
			$(".js-slideS").show();
			gomeLib.srcChange($(".js-parbox").find('img[gome-src]'));
			$(".close-topad").show().click(function(){
				$(".js-parbox").remove();
			});
		}
		if($("body").hasClass("home")){
			if($(".topad").attr("id")=="topad-flag"){
				$("#topad-flag").adslide({
					simg : ".js-slideS",
					bimg : ".js-slideB",
					closebtn : ".close-topad",
					clbox : ".js-parbox"
				});
			}else{
				gomeLib.topAdsNoAnimate();
			};
		}else{
			gomeLib.topAdsNoAnimate();
		}
		$(".js-tophover").ghover( {
			addcss : "hover"
		});
		/*mini 购物车*/
		$(".cartlink").ghover({
			e:function(){
				cartUnit.minloadCart();
			}
		});
		/*分类菜单*/
		$(".categorylist > li").ghover( {
			//alert(111);
			addcss:false,
			latertime:50,
			e:function(){
				var _this = $(this),hbox =_this.find(".fullcategory"),_url=window.location.href,_typ=".html";
				if(_url.indexOf("jsp") > -1){
					_typ=".jsp";
				}
				if(!$(".categorylist").data("load")){
					$.ajax({
						type:"get",
						url:"//ss" + cookieDomain+contextPath+"/n/indexJson/exactNav"+_typ,
						cache:false,
						dataType:"jsonp",
						jsonpName:"navData",
						success:function(data){
							//console.info(data);
							if(data){
								for(var i=0,l=data.navDat.length; i<l;i++){
									var _dat = data.navDat[i];
									var _ren = template.compile(tempnav);
									var _htm = _ren(_dat);
									$("#catid"+(i+1)).html(_htm);
								}
								$(".categorylist").data("load","true");
							}
						}
					});
				}
				$(".categorylist > li").removeClass("categhover");
				_this.addClass("categhover");
				hbox.removeAttr("style");
				var ht = hbox.offset().top;
				var wt = $(window).scrollTop();
				var ct = wt-ht;
				if(wt>ht){
					hbox.css({top:ct});
				};
			}
		});
		$(".sidecategory").mouseover(function(){
			$(this).addClass("catewrap");
		});
		function cateleave (){
			$(".fullcategory").hide();
			$(".sidecategory").removeClass("catewrap");
			$(".categorylist > li").removeClass("categhover");
		};
		var catetime;
		function timerun(){
			catetime=setTimeout(cateleave,100);
		};
		$(".sidecategory").hover(function(){
			clearTimeout(catetime);
		},function(){
			timerun();
		});
		$(".fullcategory").bind('click', function(ev){
			var target = ev.target || ev.scrElement;
			if(target.className == 'closegsidenav'){
				cateleave();
			}
		});
		/*非首页分类菜单隐藏 
		if(!$("body").hasClass("home")){
			$(".sidecategory").gshowhide( {
				box : ".js-categoryshow",
				Class : "sidecatecur",
				bind : "hover"
			}); 
		};*/
		$("#searchInput").ginputfocus();
		$("#searchInput").focus(function(){
			$(".searchbox").addClass("focuscur");
		});
		$("#searchInput").blur(function(){
			$(".searchbox").removeClass("focuscur");
		});
		/*导航高亮 */
		$(".mainnav").curNav({css:"navcur"});
		$(".select-segments").gclickshow( {
			hbox : ".segmentslist"
		});
		$(".categorylist li").glaterimg();
		/*头部右侧小轮播广告 */
		$('[data-roll="hdrSideUp"]').gSlider({
				isAuto: true,
				isImgLoad: true,
				showNum: 1,
	            stepLen: 1,
	            speed: 6000,
	            type: 'vertical',
	            dataOriginal: 'gome-src',
	            btnGo: {left:'[data-btn="goDown"]',right:'[data-btn="goUp"]'}
	        });
		//页脚底部的图片lazy load
		$('#creditsrc,.ftr-fx-code').gLoad({
			df : 100,
			e : function() {
				$(this).find('img[gome-src]').each(
					function(){
						$(this).attr('src',$(this).attr('gome-src')).removeAttr('gome-src');
					});
			}
		});
		$("#qcodelink").ghover({
			e:function(){
				$(this).find('img[gome-src]').each(
				function(){
					$(this).attr('src',$(this).attr('gome-src')).removeAttr('gome-src');
				});
			}
		})
		
		/*触发点对点移动zoom */
		$(".close-fx-code").click(function(){
			$.fn.p2pZoom({
				startID:$(this).parents(".ftr-fx-codebox").find(".ftr-fx-codelink"),
				targetID:"#qcodelink",
				selfHide:true,
				selfZoom:true
			});
			$(this).parents(".ftr-fx-code").remove();
			$(this).remove();
			
		});
		/*随页面宽度变化验证码浮动层位置变化*/
		function windowResize (){
			var _this = $("#ftr-qrcode-item"),
				_obj = _this.find(".ftr-fx-codebox"),
				windowWidth = $(window).width(),
				boxWidth = _this.find(".wbox").width(),
				_objWidth = _obj.width()+10,
				rightWidth = (windowWidth-boxWidth)/2,
				closeBtn = _this.find(".close-fx-code"),
				offLeft = boxWidth+10;
			var overflowWidth = $('body').hasClass('w990') ? 990 : 1200; 
			if(windowWidth>overflowWidth){
				$("html").css("overflow-x","hidden");
			}else{
				$("html").removeAttr('style');
			};
			if(rightWidth  > _objWidth){
				_obj.css("left",offLeft+"px");
				_this.show();
				_obj.unbind("hover");
			}else{
				if(rightWidth < 15){
					_obj.css("left",(offLeft-10)+"px");
					offLeft = boxWidth;
				}else{
					_obj.css("left",(offLeft)+"px");
					offLeft = boxWidth+10;
				}
				//_this.hide();
				//$("html").css("overflow-x","hidden");
				_obj.bind("hover");
				_obj.hover(function(){
					_obj.stop().animate({
						left:(boxWidth-_objWidth+20),
						"padding-right":_objWidth
					});
					closeBtn.css("right",_objWidth);
				},function(){
					_obj.stop().animate({
						left:offLeft,
						"padding-right":0
					});
					closeBtn.css("right",0);
				});
			}
		};
		windowResize ();
		$(window).resize(function(){
			windowResize ();
		});
		/*浮动我的收藏*/
		$.fxCollect = {};
		$.fxCollect.ajax = function(url,jspN,callback){
				$.ajax({
					type:"get",
					url:url,
					cache:false,
					dataType:"jsonp",
					jsonpName:jspN,
					success:function(data){
						if(data){
							callback(data);
						}
					}
				});
			};
		
		var tplFxMycollect = '\
			<% var i = 0;for (;i<item.length;i++){%>\
				<li>\
		    		<a class="fxp-prd"  rel="nofollow"  title="<%= item[i].t %>" href="<%= item[i].href %>" target="_blank"><img alt="<%= item[i].t %>" src="<%= item[i].img %>" width="100" height="100">\
			    		<span class="fxp-prdname"><%= item[i].t %></span>\
			    		<span class="fxp-price">¥ <%= item[i].p %></span>\
		    		</a>\
	    		</li>\
			<%}%>\
			';
		var tplFxNoList='<li class="c-disable-link">暂无相关内容</li>';
		$("#fx-collect .fx-mycollect").click(function(){
			var _this = $("#fx-collect");
				$.fxCollect.tpl = function(data){
					var tpl='';
		            for(var i=0; i < data.length; i++){
		            	tpl +='<li><a class="fxp-prd"  rel="nofollow"  target="_blank" href="'+data[i].href+'" title="'+data[i].t+'"><img width="100" height="100" src="'+data[i].img+'" alt="'+data[i].t+'"/><span class="fxp-prdname">'+data[i].t+'</span><span class="fxp-price">¥ '+data[i].p+'</span></a></li>';
		            };
		            return tpl;
				};
				$.fxCollect.login = function(){
					gomeLib.fxCollect.getCollect("",function(data){
						var hNum = 4,
							hg = $(window).height();
						if(hg<768){
							hNum = 3;
						};
						$("#fx-collect").find(".backbox").show();
						$("#fx-collect").addClass("fx-current");
						if(data.length <= 0 ){
							$("#fx-collectprod").html(tplFxNoList);
						}else{
							$("#fx-collectprod").html($.fxCollect.tpl(data));
							if(data.length>=4){
								$('#mycollect-pop .fxp-btn').removeClass("btn-none");
								$("#mycollect-pop .fxp-slider").removeAttr("style");
							/*底部右侧浮动我的收藏轮播 */
								$('#mycollect-pop .fxp-slider').gSlider({
									isAuto: false,
									isImgLoad: false,
									showNum: hNum,
						            stepLen: 1,
						            speed: 6000,
						            type: 'vertical',
						            btnGo: {left:'#mycollect-pop .fxp-down',right:'#mycollect-pop .fxp-up'},
						            beforeCallback:function(){
						            	$("#mycollect-pop .fxp-slider").height(($("#fx-collectprod li").height()+5)*hNum);
						            }
						        });
							}else{
								$('#mycollect-pop .fxp-btn').addClass("btn-none");
								$("#mycollect-pop .fxp-slider").css("height","auto");
							};
						};
					});
				};
				/** 公共头NPOP弹出层调用方法
				//判断登录*/
				if(!loginData.isTransient && loginData.isTransient!="true"){
					$.fxCollect.login();
					//you function() or functionName
				}else{
					//未登录调用NPOP弹层
					signData.loginPop("$.fxCollect.login()");	
					
				}
		});
		/*fx-history*/
		$("#fx-history").click(function(){
			$(this).find(".backbox").show();
			$(this).addClass("fx-current");
			/*var _prs=$.cookie("proid120517atg").id,_p_=[];
				try{eval('var _p_='+_prs);}catch(e){};
				if(!_p_)_p_=[];
				if(_p_.length<=0){
					if($("#fx-browsedprod").html().length<0){
						//$('#history-pop').hide();
						var tpl='<li>暂无浏览记录</li>'
						$("#fx-browsedprod").html(tpl);
						$('#history-pop .fxp-btn').addClass("btn-none");
					}
				}else{*/
				var _cookie_id="",user_id="";
				if($.cookie("__c_visitor") && $.cookie("__c_visitor").length>0){
					_cookie_id=$.cookie("__c_visitor");
				};
				if(loginData.loginId){
					user_id=loginData.loginId;
				};
				/*大数据浏览接口*/
				var _url= "//bigd.gome.com.cn/gome/custscandata?cookie_id="+_cookie_id+"&user_id="+user_id;
				gomeLib.ajax({url:_url,jsonpName:"fnwishlist"},function(data){
					/*判断数据是否异常*/
					if(data.eRRMSG || data.length ===0){
						//var tpl='<li class="c-disable-link">暂无浏览记录</li>'
							$("#fx-browsedprod").html(tplFxNoList);
							$('#history-pop .fxp-btn').addClass("btn-none");
					}else{
						//$("#fx-browsedprod").html((template.compile(tplFxMycollect))(data));
						 var tpl='';
				            for(var i=0; i < data.length; i++){
				                tpl +='<li><a class="fxp-prd"  rel="nofollow"  target="_blank" href="'+data[i].url+'" title="'+data[i].name+'"><img width="100" height="100" src="'+data[i].pic+'" alt="'+data[i].name+'"/><span class="fxp-prdname">'+data[i].name+'</span><span class="fxp-price">¥ '+data[i].price+'</span></a></li>';
				            }
				            $("#fx-browsedprod").html(tpl);
				            var hNum = 4,
							hg = $(window).height();
							if(hg<768){
								hNum = 3;
							};
						if(data.length>=4){
							$('#history-pop .fxp-btn').removeClass("btn-none");
							$("#history-pop .fxp-slider").removeAttr("style");
						/*底部右侧浮动我的收藏轮播 */
							$('#history-pop .fxp-slider').gSlider({
								isAuto: false,
								isImgLoad: false,
								showNum: hNum,
					            stepLen: 1,
					            speed: 6000,
					            type: 'vertical',
					            dataOriginal: 'gome-src',
					            btnGo: {left:'#history-pop .fxp-down',right:'#history-pop .fxp-up'},
								beforeCallback:function(){
					            	$("#history-pop .fxp-slider").height(($("#fx-browsedprod li").height()+5)*hNum);
					            }
					        });
						}else{
							$('#history-pop .fxp-btn').addClass("btn-none");
							$("#history-pop .fxp-slider").css("height","auto");
						}
					}
				});
			/*};*/
		});
		var timerFx = [];
		$("#fx-history,#fx-collect,#qcodelink").hover(function(){
				clearTimeout(timerFx[$(this).index()]);
		},function(){
			var _this = $(this);
			function laterFx (){
				_this.find(".backbox").hide();
				_this.removeClass("fx-current");
			}
			timerFx[_this.index()] = setTimeout(laterFx,200);
			
			
		});
		$("#qcodelink .qrcode").click(function(){
			$(this).parent().find(".backbox").show();
			$(this).parent().addClass("fx-current");
			return false;
		});
		
		var _cook=$.cookie('bttip'),
			fixad_flag = true,
		    ad_timer = null,
		    hover_timer = null,
			changeBig_L = $("body").hasClass("w990")?205:205,
			changeSmall_L = $("body").hasClass("w990")?889:1204;
		/* 读取用户是否关闭了首页底部浮动层 */
		/**底部图片gload**/
		$('#index-fixed-ad').gLoad({
			df : 60,
			e : function() {
				$(this).find('img[gome-src]').each(
					function(){
						$(this).attr('src',$(this).attr('gome-src')).removeAttr('gome-src');
					});
			}
		});
		
		/*图片改变尺寸动画*/
		function changeSize(obj,left,width,time,fn){
			obj.stop().animate({
				left:left,
				width:width
			},time,fn);
		};
		if(!_cook){
			/*图片第一次出现*/
			$("#index-fixed-codebox").css({"bottom":"-150px","left":"0px"}).show();
			setTimeout(function(){
				$("#index-fixed-ad-codebox").css("display","block");
				$("#index-fixed-codebox").animate({
					bottom:0
				},1000);
			},5000);
			/*$("#index-fixed-codebox").css({"left":changeBig_L,"width":"205px"}).show();
			setTimeout(function(){
				$("#index-fixed-ad-codebox").css("display","block");
				changeSize($("#index-fixed-codebox"),changeBig_L-205,205,1000,function(){
				})//大图变大
			},5000);*/
			
			/*无操作大图消失，小图出现*/
			ad_timer = setTimeout(function(){
				changeSize($("#index-fixed-codebox"),changeBig_L,205,1000,function(){
					$("#index-mini-codebox").css({"left":changeSmall_L-30,"width":"26px"}).show();
					$("#index-fixed-ad-codebox").css("display","none");
					//changeSize($("#index-mini-codebox"),changeSmall_L-30,26,500);//小图变大
				});//大图变小
			},30000);
		
			/*鼠标划过大图*/
			$("#index-fixed-codebox").bind("mouseover",function(){
				if(fixad_flag){
					clearTimeout(ad_timer);
				}
				$("#index-fixed-ad-codebox").css("display","block");
				changeSize($("#index-fixed-codebox"),changeBig_L-205,205,1000,function(){
				})//大图变大	
			});
			$("#index-fixed-codebox").bind("mouseout",function(){
				if(fixad_flag){
					changeSize($("#index-fixed-codebox"),changeBig_L,205,1000,function(){
						$("#index-fixed-ad-codebox").css("display","none");
						$("#index-mini-codebox").css({"left":changeSmall_L-30,"width":"26px"}).show(0);
						//changeSize($("#index-mini-codebox"),changeSmall_L-30,26,500);//小图变大
						fixad_flag = false;
					});//大图变小
				}else{
					changeSize($("#index-fixed-codebox"),changeBig_L,205,1000,function(){
						$("#index-fixed-ad-codebox").css("display","none");
						$("#index-mini-codebox").css({"left":changeSmall_L-30,"width":"26px"}).show(0);
					});//大图变小	
				}		
			});
			
			/*鼠标划过小图*/
			$("#index-mini-codebox").bind("mouseover",function(){
				if(ad_timer) {
					clearTimeout(ad_timer);
				}
				ad_timer = setTimeout(function(){
					$("#index-mini-codebox").hide(0);
					$("#index-fixed-ad-codebox").css("display","block");
					changeSize($("#index-fixed-codebox"),changeBig_L-205,205,1000,function(){
					})//大图变大	
				},200)
			});
			$("#index-mini-codebox").bind("mouseout",function(){
				if(ad_timer) {
					clearTimeout(ad_timer);
				}
				var left = $("#index-fixed-codebox").css('left');
				if(left === (changeBig_L-205)+'px') {
					changeSize($("#index-fixed-codebox"),changeBig_L,205,1000,function() {
						$("#index-fixed-ad-codebox").css("display","none");
					});//大图变小
				} else {
					$("#index-fixed-ad-codebox").css("display","block");
					changeSize($("#index-fixed-codebox"),changeBig_L-205,205,1000,function(){
						changeSize($("#index-fixed-codebox"),changeBig_L,0,1000,function(){
							$("#index-fixed-ad-codebox").css("display","none");
							$("#index-mini-codebox").css({"left":changeSmall_L-30,"width":"26px"}).show(0);
						});//大图变小
					})//大图变大	
				}
			});
			
			/*点击关闭，图小图消失*/
			$('#close-index-fixed-ad').bind('click',function(){
				_typ=true;	
				$("#index-fixed-codebox").unbind();
				$("#index-mini-codebox").unbind();
				$("#close-index-fixed-ad").hide();
				changeSize($("#index-fixed-codebox"),changeBig_L,200,1000,function(){
					$("#index-fixed-ad-codebox").css("display","none");
				});//大图变小
				$("#index-mini-codebox").hide(0);
				/*changeSize($("#index-mini-codebox"),changeSmall_L-30,0,1000,function(){
					$("#index-mini-codebox").hide();
				});//小图变小
				*/
				$.cookie('bttip', '1', {expires:1, path:'/'});
			});	
		}else{
			_typ=true;
			$('#index-fixed-ad').remove();
		};


//不同系统之间的同步登陆   详情咨询会员组
if(!cookieDomain){
    var cookieDomain='.gome.com.cn'
}
if(jQuery.cookie("helloService")){
    var helloUrls = jQuery.cookie("helloService").split('|');
    $.cookie('helloService','', {expires: -1,path:'/', domain: cookieDomain});
    for (i in helloUrls)
    {
        $.ajax({
            type : "get",
            dataType : "jsonp",
            jsonp:'jsonpcallback',
            url : helloUrls[i]+"?refreshkey=" + Math.random(),
            success : function() {
            },
            error: function(){
            }
        });
    }
}
$('.mainheader').addClass('mainheader_img');


//临时调整右侧app下载 浮层
function codeboxNew(){
	//临时调整右侧app下载 浮层
	var codebox_bodyWidth = $("#topnav").find(".wbox").width();
	var winWidths = window.screen.width;
	if(codebox_bodyWidth <= winWidths-290){
		$(".ftr-fx-codebox").unbind();
	    $(".ftr-fx-code").css({"left":"50%","margin-left":codebox_bodyWidth/2+15});
	    $(".ftr-fx-codebox").css({"left":0});
	}else{
		$(".ftr-fx-code").attr("style","right:-155px;margin-left:0;overflow:visible");
	    $(".ftr-fx-codebox").bind({
	        "mouseenter":function(){$(this).stop(true,false).animate({"left":"-130px"},500)},
	        "mouseleave":function(){$(this).stop(true,false).animate({"left":"-75"},500)}
	    })
        $(".ftr-fx-codebox").css({"left":"-75px"});
	}
}
codeboxNew()
$(window).resize(function(){
	codeboxNew();
});