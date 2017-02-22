/**
 * 我的收藏
 * parameter:
 * totality-当前用户全部收藏信息缓存池
 * getTotal-请求用户全部收藏状态 F未获取 T已获取
 */
;gomeLib.fxCollect = {
	totality:null,
	getTotal:false,
	ajaxType:false,
	getCollect:function(add,callback,type){
		var _this = this,
			_user_id=loginData.loginId;
			_this.addUrl = dynSite+contextPath+"/global/login/verifyAddToWishlist.jsp";
			_this.getUrl = dynSite+contextPath+"/n/indexJson/getUserCollectProduct.jsp";
			/* 单个商品添加到收藏 */
			_this.addWish = function(){
				gomeLib.ajax({url:_this.addUrl,jsonpName:"wishlist",d:add},function(data){
					if(callback)callback(data);
				});
			};
			/* 获取用户收藏商品列表 */
			_this.getWish = function(){
				if((!_this.getTotal && !_this.ajaxType)){
					_this.ajaxType=true;
					gomeLib.ajax({url:_this.getUrl,jsonpName:"fnwishlist"},function(data){
						if(data){
							_this.getTotal = true;
							_this.totality = data;
							if(callback)callback(_this.totality);
						}
					});
				}else{
					if(callback)callback(_this.totality);
				}
			};
			/* 校验收藏事件 */
			_this.chkWish = function(){
				if(add){
					if(type && type=="click"){
						_this.addWish();
					}else{
						_this.getWish();
					}
				}else{
					_this.getWish();
				}
			};
			_this.chkWish();
	}
};