/**cps**/
function getQueryString(str) {
	var url = window.location.search;
	var rs = new RegExp("(^|)" + str + "=([^\&]*)(\&|$)", "gi").exec(url),
		tmp;
	if (tmp = rs) {
		return tmp[2];
	}
	return "";
}

/*  后来加的*/
function compareGotoShopcart(productId,skuid,shopFlag){ 
	//商品添加购物车
				if(productId=="" || skuid==""){
					alert("商品暂时不能加入购物车!");
					return ;
				}

				var addCartData = {
				    pid: productId,
				    sid: skuid,
				    pcount: "1",
				    type:"0",
				    _r:new Date().getTime()
				},
				url='//cart'+cookieDomain+'/home/api/cart/addToCart';

			/*美通卡*/

			if(cardType=="ZSTK" || cardType=='ZDZK'){

			    g.login(function(){
	                var _url='//card'+cookieDomain+'?skuType='+cardType+'&productId='+addCartData.pid+'&skuId='+addCartData.sid+'&count='+addCartData.pcount;
	                $.createProgress({
	                     Jump:true,
	                     openJump:false,
	                     url:_url
	                    
	                 })
	             });

			    return false;
			 };

			
			if(shopFlag>1){

				addCartData.type=16;
				
			};

		        function addcart() {
		          	$.createProgress({
		          	    Jump:false,
		          	    url:url,
		          	    data:addCartData ,
		          	    callback:function(data){
		          	        if (data.success) {//添加成功
		          	                window.location.href = '//cart'+cookieDomain;
		          	            //window.location.href = u.g + "/ec/homeus/checkout/shipping.jsp";
		          	        }  else {
		          	           alert(data.errMsg)
		          	        }
		          	    }
		          	});
		        }


        if (window.navigator.userAgent.indexOf('IE 6') > 0) {
            g$('json3', '/js/g/unit/json3.js', function () { addcart()});
        } else {
            addcart();
        }
		
}


var sid = getQueryString("sid");
var wid = getQueryString("wid");
var feedback = getQueryString("feedback");
var category = getQueryString("category");
var cpsid = getQueryString("cpsid");
var wduid = getQueryString("wduid");

var s_uuid = $.cookie('s_uuid');
var basedomain = cookieDomain;

if(parseInt(wduid)){
	if(s_uuid != null && s_uuid.split("|")[1] == wduid){
		$.cookie('s_uuid', s_uuid,{expires: 1,path:'/',domain:basedomain});
	}else{
		$.ajax({
			type: "GET",
			url: "//ss"+cookieDomain+"/item/v1/UUID/getUUID/flag/publicv1/getUUID?sid=&wid=&feedback=&cpsid=&wduid="+wduid,
			cache: false,
			dataType: "jsonp",
			jsonpName: 'getUUID',
			success: function(data) {
				$.cookie('s_uuid', data.uuid+"|"+wduid,{expires: 1,path:'/',domain:basedomain});
			}
		});
	}
}else{
	if (parseInt(sid) && sid!="4665" && sid.length <= 7) {
		var s_id = $.cookie('sid');
		var w_id = $.cookie('wid');
		var feed_back = $.cookie('feedback');
		var category_id = $.cookie('category');
		var cps_id = $.cookie('cpsid');
		if(s_uuid != null){
			if(s_uuid.indexOf('|')<0){
				if(w_id == wid && feed_back == feedback && s_id == sid){
					$.cookie('s_uuid', s_uuid,{expires: 1,path:'/',domain:basedomain});
					$.cookie('sid', s_id,{expires: 1,path:'/',domain:basedomain});
					$.cookie('wid', w_id,{expires: 1,path:'/',domain:basedomain});
					$.cookie('feedback', feed_back,{expires: 1,path:'/',domain:basedomain});
					$.cookie('category', category_id,{expires: 1,path:'/',domain:basedomain});
					$.cookie('cpsid', cps_id,{expires: 1,path:'/',domain:basedomain});
				}else{
					$.ajax({
						type: "GET",
						url: "//ss"+cookieDomain+"/item/v1/UUID/getUUID/flag/publicv1/getUUID?sid="+sid+"&wid="+wid+"&feedback="+feedback+"&cpsid="+cpsid,
						cache: false,
						dataType: "jsonp",
						jsonpName: 'getUUID',
						success: function(data) {
							$.cookie('s_uuid', data.uuid,{expires: 1,path:'/',domain:basedomain});
							$.cookie('sid', sid,{expires: 1,path:'/',domain:basedomain});
							$.cookie('wid', wid,{expires: 1,path:'/',domain:basedomain});
							$.cookie('feedback', feedback,{expires: 1,path:'/',domain:basedomain});
							$.cookie('category', category,{expires: 1,path:'/',domain:basedomain});
							$.cookie('cpsid', cpsid,{expires: 1,path:'/',domain:basedomain});
						}
					});
				}
			}
		}else{
			$.ajax({
				type: "GET",
				url: "//ss"+cookieDomain+"/item/v1/UUID/getUUID/flag/publicv1/getUUID?sid="+sid+"&wid="+wid+"&feedback="+feedback+"&cpsid="+cpsid,
				cache: false,
				dataType: "jsonp",
				jsonpName: 'getUUID',
				success: function(data) {
					$.cookie('s_uuid', data.uuid,{expires: 1,path:'/',domain:basedomain});
					$.cookie('sid', sid,{expires: 1,path:'/',domain:basedomain});
					$.cookie('wid', wid,{expires: 1,path:'/',domain:basedomain});
					$.cookie('feedback', feedback,{expires: 1,path:'/',domain:basedomain});
					$.cookie('category', category,{expires: 1,path:'/',domain:basedomain});
					$.cookie('cpsid', cpsid,{expires: 1,path:'/',domain:basedomain});
				}
			});
		}
	}
}



$('#j-ctTab').on('click','input',function(){
    var plcontent=$(this).next().text().replace(/\(\d+\)/,"");

    var s=s_gi(s_account);
  
    s.linkTrackVars="prop17";
    s.prop17="商品详情页:"+plcontent;
    s.tl(this,'o','item');
})