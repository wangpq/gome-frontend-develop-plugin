//使用该js必须需要有jQuery和jQuery.cookie
$(window).load(function() {
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
});