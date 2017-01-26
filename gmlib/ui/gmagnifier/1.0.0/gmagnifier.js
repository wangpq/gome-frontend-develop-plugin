/*
 * Plugin name - gMagnifier|图片放大镜效果
 * Version - v1.0
 * Updated - 2012-11-20
 */
;(function($){
$.fn.gMagnifier=function(options){
		var obj=$(this),ts=obj.parent(),noalt='';
		var settings={xzoom:420,yzoom:420,offset:0,position:"right",lens:1,preload:1};
		if(options)$.extend(settings,options);
		/* 放大镜事件 */
		var _this = {
				noalt:function(){return obj.children("img");},
				img:function(){return obj.children("img").get(0);},
				bigimg:function(){return ts.find(".bigimg").get(0);},
				zoom:function(){return ts.find("div.zoomdiv");},
				zpup:function(){return ts.find("div.jqZoomPup");},
				picb:function(){return $(".pic-l-b");}
			};
		var gMagn = function(){
			/* 检测图片是否存在 */
			this.chck = function(){
				if(!_this.img())return false;
			}
			/* 鼠标移上 */
			this.mson = function(){
				if(!_this.img())return false;
				var imgL=obj.offset().left, imgT=obj.offset().top, imgW=_this.img().offsetWidth, imgH=_this.img().offsetHeight;
				noalt = _this.noalt().attr("alt");
						_this.picb().hide();
						_this.noalt().attr("alt",'');
				if(_this.zoom().size()==0){
					obj.after("<div class='zoomdiv'><img class='bigimg' src='"+_this.noalt().attr("jqimg")+"'/></div>");
					obj.append("<div class='jqZoomPup'><span class='jqCross'><b></b><s></s></span><div class='jqBlock'></div></div>");
				}
				if(settings.position=="right"){
					if(imgL+imgW+settings.offset+settings.xzoom>screen.width){
						leftpos=imgL-settings.offset-settings.xzoom;
					}else{
						leftpos=imgL+imgW+settings.offset;
					}
				}else{
					leftpos=imgL-settings.xzoom-settings.offset;
					if(leftpos<0)leftpos=imgL+imgW+settings.offset;
				}
				_this.zoom().css({top:imgT,left:leftpos}).width(settings.xzoom).height(settings.yzoom).show();
				if(!settings.lens)obj.css('cursor','crosshair');
				var _t = this;
				$(document.body).mousemove(function(e){
					_t.move(e,imgW,imgH,imgL,imgT);
				});
			}
			/* 鼠标移除 */
			this.msot = function(){
				if(!_this.img())return false;
					_this.noalt().attr("alt",noalt);
				if(settings.lens)_this.zpup().remove();
					_this.zoom().remove();
				$(document.body).unbind("mousemove");
					_this.picb().show();
			}
			/* 鼠标移动 */
			this.move = function(e,imgW,imgH,imgL,imgT){
				mouse=new MouseEvent(e);
				var bwth=_this.bigimg().offsetWidth, bhth=_this.bigimg().offsetHeight, scaley='x', scalex='y';
				if(isNaN(scalex)|isNaN(scaley)){
					scalex=(bwth/imgW),scaley=(bhth/imgH);
					/*
					_this.zpup().width((settings.xzoom)/(scalex*1));
					_this.zpup().height((settings.yzoom)/(scaley*1));
					*/
					_this.zpup().width(200);
					_this.zpup().height(200);
					if(settings.lens)_this.zpup().css('visibility','visible');
				}
				xpos=mouse.x-_this.zpup().width()/2-imgL;
				ypos=mouse.y-_this.zpup().height()/2-imgT;
				if(settings.lens){
					xpos=(mouse.x-_this.zpup().width()/2 < imgL ) ? 0 : (mouse.x + _this.zpup().width()/2>imgW+imgL)?(imgW-_this.zpup().width()-2):xpos;
					ypos=(mouse.y-_this.zpup().height()/2 < imgT ) ? 0 : (mouse.y + _this.zpup().height()/2>imgH+imgT)?(imgH-_this.zpup().height()-2):ypos;
				}
				if(settings.lens)_this.zpup().css({top:ypos,left:xpos});
				scrolly=ypos;
					_this.zoom().get(0).scrollTop=scrolly*scaley;
				scrollx=xpos;
					_this.zoom().get(0).scrollLeft=(scrollx)*scalex;
			}
		}
		/* 放大镜事件结束 */
		
		var _m = new gMagn();
		obj.hover(function(){_m.mson();},function(){_m.msot();});
		if(_this.img() && $(_this.img()).attr("gome-src"))$(_this.img()).attr("src",$(_this.img()).attr("gome-src")).removeAttr("gome-src");
		
		count=0;
		if(settings.preload){
			$('body').append("");
			obj.each(function(){
				var imgSrc=obj.children("img").attr("jqimg");
				var cntObj = $('div.jqPreload'+count),content=cntObj.html();
					cntObj.html(content+'<img src=\"'+imgSrc+'\">');
			});
		}
		function MouseEvent(e){
			this.x=e.pageX;
			this.y=e.pageY;
		}
		/* 图片列表小图hover效果 */
		(function pic_hover(){
			var jimg = $(".j-pichover img");
				jimg.hover(function(){
					var b_url =$(this).attr("bpic"), r_url =$(this).attr("rpic");
					$(".j-bpic-b").attr({"src":b_url,"jqimg":r_url});
					jimg.removeClass("cur");
					$(this).addClass("cur");
				},function(){});
		})();
	}
})(jQuery);