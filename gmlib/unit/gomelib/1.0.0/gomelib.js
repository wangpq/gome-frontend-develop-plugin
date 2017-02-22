;
var gomeLib = gomeLib|| {}/*gome类库*/
/**
 * gomeLib
 * version:1
 * author:全体前端同事(始创:zhaoyang-ds@yolo24.com liuhehu@yolo24.com)
 * 国美js通用控件封装
 **/
/*gome ajax 封装*/
gomeLib.ajax = function(data,callback){
var type = data.type || "get",/*get 或psot*/
	url = data.url,/*请求的URL地址，必须*/
	cache = data.cache || false,/*cache,默认无*/
	dataType =data.dataType || "jsonp",/*数据类型*/
	jsonpName = data.jsonpName || '',/*jsonpNameh或jsonpCallback*/
	stringify = data.stringify || false,/*需要系列化对象:把原来是对象的类型转换成字符串类型（或者更确切的说是json类型的）*/
	d = data.d || '';/*发送到服务器的数据。*/
	if(stringify){
		var d2 = {};
    	d2.method=d.method;
    	d2.id="12";
    	d2.params=JSON.parse(d.params);
    	d2={json:JSON.stringify(d2)};
    	d = d2;
	}
	$.ajax({
		type:type,
		url:url,
		cache:cache,
		dataType:dataType,
		jsonpName:jsonpName,
		jsonpCallback:jsonpName,
		data:d,
		success:function(data){
			if(data){
				callback(data);
			}
		}
	});
};