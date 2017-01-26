;(function($){
	/**
	 * @author liuhehu
	 * @param opt {ap:总页数,cp:当前页数,np:每页条数,e:点击页数时触发的事件,sp:是否启用简易方式,0为否，1为启用,tg:跳转锚点}
	 * */
	function drawLinks(o,ts) {
				var ncp = Number(o.cp),
				Ma=Number(o.ap);
				ts.empty();
				/*基本页码输出fn*/
				var appendItem = function(i,appendopts){
					appendopts = $.extend({text:i,classes:""},appendopts||{});
					if(i == ncp){
						var lnk = $('<a href="'+o.tg+'" class="cur">'+appendopts.text+'</a>');
					}else{
						var lnk = $('<a href="'+o.tg+'">'+appendopts.text+'</a>');
					};
					if(appendopts.classes){lnk.addClass(appendopts.classes);}
					ts.append(lnk);
				};
				
				/*页数小于7*/
				if(Ma<=7&&Ma>1){
					/*基本页码输出*/
					appendItem(i-1,{text:"上一页",classes:"gpprev"});
					for(var i=1;i<=Ma;i++){
						appendItem(i,{classes:"num"});
					};
					appendItem(i+1,{text:"下一页",classes:"gpnext"});
					
					/*上下翻页初始*/
					var prev = ts.find(".gpprev");
					var next = ts.find(".gpnext");
					if(ncp==1){
						prev.addClass("gno");
					}else if(ncp==Ma){
						next.addClass("gno");
					};
					/*高亮控制*/
					var getPnlink =ts.find("a.num");
					$(getPnlink).click(function(e){
						e.preventDefault();
						if($(this).hasClass("cur")){
							return false;
						}else{
							getPnlink.removeClass("cur");
							$(this).addClass("cur");
							$(this).addClass("cur");
							var mcp = $(this).text();
							o.cp=Number(mcp);
							var ncp = o.cp;
							/*点击时翻页控制*/
							if(ncp==1){
								prev.addClass("gno");
								next.removeClass("gno");
							}else if(ncp==Ma){
								prev.removeClass("gno");
								next.addClass("gno");
							}else{
								prev.removeClass("gno");
								next.removeClass("gno");
							};
							/*传递参数*/
							o.obj=this;
							if(o.e){o.e.apply(o);}
						};
					});
					/*上翻页*/
					prev.click(function(e){
						e.preventDefault();
						var curp = ts.find("a.num.cur");
						var mcp = curp.text();
							o.cp=Number(mcp) -1;
							var ncp = o.cp;
							next.removeClass("gno");
							if($(this).hasClass("gno")){
								return false;
							}else{
								
								getPnlink.removeClass("cur");
								curp.prev().addClass("cur");
								o.obj=this;
								if(o.e){o.e.apply(o);}
								if(ncp ==1){
									$(this).addClass("gno");
								};
							};
					});
					/*下翻页*/
					next.click(function(e){
						e.preventDefault();
						var curp = ts.find("a.num.cur");
						var mcp = curp.text();
							o.cp=Number(mcp) +1;
							var ncp = o.cp;
							prev.removeClass("gno");
							if($(this).hasClass("gno")){
								return false;
							}else{
								
								getPnlink.removeClass("cur");
								curp.next().addClass("cur");
								o.obj=this;
								if(o.e){o.e.apply(o);}
								if(ncp ==Ma){
									$(this).addClass("gno");
								};
							};
					});
				};
				
				/*页数大于7*/
				if(Ma>7){
					/*基本页码输出*/
					appendItem(i-1,{text:"上一页",classes:"gpprev"});
					appendItem(1,{classes:"num"});
					/*当前页数不同状态*/
					if(ncp<=3){
						for(var i=2;i<5;i++){
							appendItem(i,{classes:"num"});
						};
						ts.append('<span class="ndot">…</span>');
					}else if(ncp>3&&ncp<Ma-2){
						ts.append('<span class="ndot">…</span>');
						for(var i=ncp-1;i<ncp+2;i++){
							appendItem(i,{classes:"num"});
						};
						ts.append('<span class="ndot">…</span>');
					}else if(ncp>Ma-2){
						ts.append('<span class="ndot">…</span>');
						appendItem(Ma-2,{classes:"num"});
						appendItem(Ma-1,{classes:"num"});
						if(o.sp == 1) {
							appendItem(Ma,{classes:"num"});
						}
					}else if(ncp==Ma-2){
						ts.append('<span class="ndot">…</span>');
						if(o.sp == 0 || o.sp == null) {
							appendItem(Ma-3,{classes:"num"});
						}
						appendItem(Ma-2,{classes:"num"});
						appendItem(Ma-1,{classes:"num"});
						if(o.sp == 1) {
							appendItem(Ma,{classes:"num"});
						}
					};
					/*输出额外跳转等*/
					if(o.sp == 0 || o.sp == null) {
						appendItem(Ma,{classes:"num"});
						appendItem(i+1,{text:"下一页",classes:"gpnext"});
						ts.append('<span>到第</span>');
						var ip=$('<input type="text" class="gpinput fl" />');
						ip.keyup(function(){ var t= $(this).val();t=t.replace(/[^\d]/g,'');if(t==''){ $(this).val('');return;}t=parseInt(t);if(t>=Ma)t=Ma;if(t<1)t=1;$(this).val(t);});
						ts.append(ip);
						ts.append('<span>页</span>');
						ts.append('<button class="gpsub" type="button" >确定</button>');
					}else {
						appendItem(i+1,{text:"下一页",classes:"gpnext"});
					}
					/*上下翻页初始*/
					var prev = ts.find(".gpprev");
					var next = ts.find(".gpnext");
					if(ncp==1){
						prev.addClass("gno");
					}else if(ncp==Ma){
						next.addClass("gno");
					};
					/*传递当前页*/
					var getPnlink =ts.find("a.num");
					$(getPnlink).click(function(e){
						e.preventDefault();
						if($(this).hasClass("cur")){
							return false;
						}else{
							getPnlink.removeClass("cur");
							$(this).addClass("cur");
							var mcp = $(this).text();
							o.cp=Number(mcp);
							drawLinks(o,ts);
							o.obj=this;
							if(o.e){o.e.apply(o);}
						};
					});
					/*上翻页*/
					prev.click(function(e){
						e.preventDefault();
						var curp = ts.find("a.num.cur");
						var mcp = curp.text();
							o.cp=Number(mcp) -1;
							var ncp = o.cp;
							if($(this).hasClass("gno")){
								return false;
							}else{
								drawLinks(o,ts);
								o.obj=this;
								if(o.e){o.e.apply(o);}
							};
					});
					/*下翻页*/
					next.click(function(e){
						e.preventDefault();
						var curp = ts.find("a.num.cur");
						var mcp = curp.text();
							o.cp=Number(mcp) +1;
							var ncp = o.cp;
							if($(this).hasClass("gno")){
								return false;
							}else{
								drawLinks(o,ts);
								o.obj=this;
								if(o.e){o.e.apply(o);}
							};
					});
					/*输入跳转*/
					ts.find(".gpsub").click(function(e){
						e.preventDefault();
						var pinputva = ts.find(".gpinput").val();
						var mcp = pinputva;						
							o.cp= mcp;
							var ncp = o.cp;
								if(pinputva !=""){
								window.location.href=o.tg;
								drawLinks(o,ts);
								o.obj=this;
								if(o.e){o.e.apply(o);}
							}else{
								ts.find(".gpinput").focus();
							};
					});
				};
				var prev = ts.find(".gpprev");
				var next = ts.find(".gpnext");
				$(prev).append('<b class="pgbdrs"></b>');
				$(next).append('<b class="pgbdrsr"></b>');
			};
	$.fn.gPage=function(o){
		var def={ap:null,cp:1,np:5,e:null,sp:0,tg:""};
		
		var o=$.extend(def,o),
			Ma=o.ap//要改掉;
		return this.each(function() {
			var ts = $(this);
			
			drawLinks(o,ts);
		});
	};
})(jQuery);