;(function($){
	var Progress=function(option){
	   var defaultOption={
		  Jump:false,    	//    跳转页面为true    ajax请求为false
		  openJump:false,	//    new 窗口跳转
	  	  url:"",	    	//     如果是跳转页面就传跳转页面的url，如果是请求的就传请求的url
	   	  data:"",     		//      请求需要的参数
	   	  callback:""		//      	callback
	   }
	   var option=$.extend({},defaultOption,option); 	  
	   	//跳转页面
	   if(option.Jump &&  option.url){
		   	if(option.openJump){
	   			var win=window.open(option.url, '_blank');
	   		        if(win==null){
	   		            alert('您的浏览器拦截了弹出窗口，请您在浏览器上方点击拦截信息允许弹出此窗口！');
	   		        }
		   	}else{
		   		window.location.href=option.url;
		   	}
	   }else{
	   	// 请求购物车
	   	$.ajax({
	   			url:option.url,
	   			type:"get",
	   			dataType: "jsonp",
	   			jsonpName: 'cartData',
	   			data:option.data,
	   			success:function(data){
					//MTK_V 虚拟卡状态
					//MTK_E 实体卡状态
					if(!data.success && data.status && (data.status==='MTK_E' || data.status==='MTK_V')){
						if(data.status==='MTK_E'){
							var $url="//card"+cookieDomain+"?skuType=ZSTK&productId="+option.data.pid+"&skuId="+option.data.sid+"&count="+option.data.pcount;
							window.location.href=$url;
						}else{
							var $url="//card"+cookieDomain+"?skuType=ZDZK&productId="+option.data.pid+"&skuId="+option.data.sid+"&count="+option.data.pcount;
							window.location.href=$url;
						}

					}else {
						option.callback(data);
					}
				}
	   	}); 
	   } 
	}
	$.createProgress=function(option){
       return new Progress(option);
	}
})(jQuery);