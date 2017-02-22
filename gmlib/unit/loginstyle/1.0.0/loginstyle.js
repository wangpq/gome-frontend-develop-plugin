window.cartMax=100;
/*
 http://ss.atguat.com.cn/item/v1/d/login/style/869473036/9100042677/1000061545/flag/item/
 {
 success: true,
 result: {
 max: "20",
 type: "3"
 }
 }
 */
$.ajax({
	type: 'get',
	url: '//ss'+cookieDomain+'/item/v1/d/login/style/'+$.cookie('SSO_USER_ID')+'/'+prdInfo.prdId+'/'+ prdInfo.sku +'/flag/item/newLoginStyle',
	dataType: 'jsonp',
	jsonpName :"newLoginStyle"
}).done(function(data){
	if(data.success && !$.isEmptyObject(data.result) ){
		window.cartMax=data.result.max;
	}
});
