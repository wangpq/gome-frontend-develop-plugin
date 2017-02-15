;(function($){
	$.fn.greplaceimg = function(o){
		var def = {
			narrow:1024,/*窄屏宽度*/
			rpimg:"grey.gif",/*延迟替代用的图片名称*/
			cusattr:"gome-src"/*自定义的属性*/
		};
		
		var o= $.extend(def,o),
		 	winWidth = (screen.width),
		 	narroWidth = o.narrow,
		 	rpimgName = o.rpimg
		 	nAttr = o.cusattr;
		return this.each(function(){
			var Vimg = $(this).find("img");
			Vimg.each(function(){
				var newAttr = "src"; 
		       	var adsimgUrl =$(this).attr("src");
		       	if(adsimgUrl.indexOf(rpimgName)!=-1){
		           newAttr = nAttr;
		           adsimgUrl =$(this).attr(nAttr);
		       	};
		       	if(winWidth <= narroWidth){
		           var n=adsimgUrl.lastIndexOf(".");
		           var newStr=adsimgUrl.substring(0,n)+"_s"+adsimgUrl.substring(n);
		           $(this).attr(newAttr,newStr);
		        };
			});
		});
	}
})(jQuery)