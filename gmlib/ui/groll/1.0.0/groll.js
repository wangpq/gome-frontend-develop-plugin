// JavaScript Document 
;(function($) {
	$.fn.gRoll = function(opts) {
	var rpGomeSrc=function(g){
		if($(g).attr('gome-src')){
			$(g).attr('src',$(g).attr('gome-src')).removeAttr('gome-src')
		};
	};
	/**时间间隔对象
	 * @author lixue
	 * @param btnU:上一页按钮的id, btnD:下一页按钮的id, numC:当前页码的id, numT:总页码的id, box:内容的父级id, direction:滚动的方向 可选参数 "up", speed:滚动速度, auto:自动滚动的时间(毫秒) 0为不自动滚动, gsrc:gsrc不等于0时gome-src替换, movenum:默认一次翻一页，若movenum不等于0，则表示一次移动的小块个数   
	 * */
		var def = {
			btnU:".j-gRbtnU", btnD:".j-gRbtnD", numC:".j-gRnumC", numT:".j-gRnumT", box:".j-gRbox", direction:"left", speed:400, auto:0, gsrc:1 , movenum:0};
		var opts = $.extend(def, opts),
		    mnum = opts.movenum, dir = opts.direction, autospeed = opts.auto,
			btnU = this.find(opts.btnU), btnD = this.find(opts.btnD), btnC = this.find(opts.numC), btnT = this.find(opts.numT), box = this.find(opts.box),	
			boxwidth = box.width(),
			boxheight = box.height(),
			cbox = box.children().children(), /*小块级内容 */
			cboxlength = cbox.length, /*小块级内容的个数 */
			cboxwidth = cbox.outerWidth() + parseInt(cbox.css("margin-left")) + parseInt(cbox.css("margin-right")), /* 小块级内容的宽度 */
			cboxheight = cbox.outerHeight() + parseInt(cbox.css("margin-top")) + parseInt(cbox.css("margin-bottom")), /* 小块级内容的高度 */
			hnum = Math.round(boxwidth / cboxwidth), 
			vnum = Math.round(boxheight / cboxheight),
			hp = Math.ceil(cboxlength / hnum),
			vp = Math.ceil(cboxlength / vnum),
			moveleft = cboxwidth * hnum,/* 水平移动的距离 */
			moveup = cboxheight * vnum, /* 垂直移动的距离 */		
			page,snum,timer;
		return this.each(function(i) {
			btnU.removeClass("cur");
			switch(dir) {
				case "left":dmore=cboxwidth*cboxlength-boxwidth,dx=cboxwidth/2; break; 
				case "up":dmore=cboxheight*cboxlength-boxheight,dx=cboxheight/2; break;
			};
			if(dmore>dx){
				btnD.removeClass("cur").addClass("cur");
			}else{btnD.removeClass("cur");}
			
			
			if(mnum != 0){
				switch(dir) {
					case "left":moveleft = cboxwidth * mnum, page= Math.ceil((cboxlength-hnum)/mnum)+1, snum = hnum; break; 
					case "up":moveup = cboxheight * mnum, page= Math.ceil((cboxlength-vnum)/mnum)+1, snum = vnum; break;
				};
			}else{
				switch(dir) {
					case "left":page = hp, snum = hnum; break;
					case "up":page = vp, snum = vnum; break;
				};
			};
			
			btnT.text(page);
			var j = 1, cn=0;
			/*gome-src替换*/
			if(opts.gsrc!=0){
				for(var k=0; k < snum; k++){
					cbox.eq(k).find("img").each(function(){
						 rpGomeSrc(this);
					});	
				};
			};
			btnD.click(function(){
				if(j<page){
				    /*gome-src替换*/
					if(mnum != 0){
						for(var k=snum+cn*mnum; k<snum+(cn+1)*mnum; k++ ){
							cbox.eq(k).find("img").each(function(){
								 rpGomeSrc(this);
							});	
						};
					}else{
						for(var k=j*snum; k<j*snum+snum; k++){
							cbox.eq(k).find("img").each(function(){
								 rpGomeSrc(this);
							});	
						};
					};
					switch(dir) {
						case "left":box.children().animate({"left": -j*moveleft + "px"}, opts.speed);break;
						case "up":box.children().animate({"top": -j*moveup + "px"}, opts.speed);break;
					};	
					j++,cn++;
					btnC.text(j);
					btnU.addClass("cur");
					if(j == page){
						if(autospeed==0){btnD.removeClass("cur");}
						if(autospeed!=0){j=0;}
					};
				};
			});
			btnU.click(function(){
				if(j==0){j=page;};
				if(j>1){
					switch(dir){
						case "left":box.children().animate({"left": -(j-2)*moveleft + "px"}, opts.speed);break;
						case "up":box.children().animate({"top": -(j-2)*moveup + "px"}, opts.speed);break;
					};
					j--;
					btnC.text(j);
					btnD.addClass("cur");
					if(j == 1){
						btnU.removeClass("cur");
					};
				};
				
			});
            /*自动滚*/
			function autoRoll(){
				if(j < page){
				    switch(dir) {
						case "left":box.children().animate({"left": -j*moveleft + "px"}, opts.speed);break;
						case "up":box.children().animate({"top": -j*moveup + "px"}, opts.speed);break;
					};
				    /*gome-src替换*/
					if(mnum != 0){
						for(var k=snum+cn*mnum; k<snum+(cn+1)*mnum; k++ ){
							cbox.eq(k).find("img").each(function(){
								 rpGomeSrc(this);
							});	
						};
					}else{
						for(var k=j*snum; k<j*snum+snum; k++){
							cbox.eq(k).find("img").each(function(){
								 rpGomeSrc(this);
							});	
						};
					};
					j++,cn++;
					btnU.addClass("cur");
					if(j == 1){btnU.removeClass("cur"); btnD.addClass("cur");};
					btnC.text(j);
					if(j == page){j=0;};
                };
            timer = setTimeout(autoRoll, autospeed);
				
			};
			function stopRoll() {
				box.hover(function() {
					clearTimeout(timer);
				}
				, function() {
					timer = setTimeout(autoRoll, autospeed);
				});
				btnD.hover(function() {
					clearTimeout(timer);
				}
				, function() {
					timer = setTimeout(autoRoll, autospeed);
				});
				btnU.hover(function() {
					clearTimeout(timer);
				}
				, function() {
					timer = setTimeout(autoRoll, autospeed);
				});
			};
			if(autospeed!=0){
				timer = setTimeout(autoRoll, autospeed);
			    stopRoll();
			};
		});
		
	};
})(jQuery);