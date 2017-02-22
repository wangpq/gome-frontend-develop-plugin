;(function(exports,$){

	function live800(){
		//find在线客服
		var ServerID_arr = [];
		
		$('[data-customer_service_id]').each(function () {
			ServerID_arr.push($(this).data('customer_service_id'));
		});

		if (ServerID_arr.length > 0) {
			//调用live800接口
			$.ajax({
				type:'get',
				url:'//ss'+cookieDomain+'/item/v1/online/'+ServerID_arr.join(',')+'/'+loginData.loginId+'/flag/public/live800',
				dataType:'jsonp',
				jsonpName:"live800",
				success: function(data){
					//改变客服状态
					$('[data-customer_service_id]').each(function () {
						var customers = data.result || [];
						for (var i = 0 ; i < customers.length; i++) {
							if (customers[i].customer_flag == $(this).data('customer_service_id')) {
								$(this).data('customer_service', customers[i]);
								//判断是否是详情页
								if(location.href.indexOf("item.")>0){
									if (customers[i].status == 0) {
										$(this).addClass($(this).data('hidestyle'));
									} else if (customers[i].status == 1) {
										$(this).addClass($(this).data('showstyle'));
									}
								}else{
									if (customers[i].status == 0) {
										$(this).addClass('offline');
									} else if (customers[i].status == 1) {
										$(this).addClass('online');
									}
								}
								if (typeof $(this).data('customer_service_cb') == 'function') {
									$(this).data('customer_service_cb').call(this);
								};
							}
						}
					});
					//弹出客服窗口
					$('[data-customer_service_id]').click(function () {
						var customer_service = $(this).data('customer_service');
						if (customer_service){
							if (customer_service.status<0) {
								return false;
							}else{
								$.ajax({
									type: 'get',
									url: '//member'+cookieDomain+'/gome/index/loginStyle',
									dataType: 'jsonp',
									jsonpName :"loginStyle"
								}).done(function(data){
									if (data.loginStatus >= 3) {
										window.open(customer_service.host + //host
											'/chatClient/chatbox.jsp?' +
											'companyID=' + customer_service.customerID +
											'&customerID=' + customer_service.customerID +
											'&info=' + customer_service.customerInfo +
											'&page=0' +
											'&enterurl=' + location.href+
											'&areaCode='+encodeURI(encodeURI($.cookie("atgregion")))+
											'&shopname=' + encodeURI(encodeURI( $('.shops-name a.name').attr("title")  ) ),
											'customerService' + $(this).data(customer_service).customerID,// 窗口id
											'toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width=1120,height=700'
										);
									} else {
										location.href = "https://login"+cookieDomain+"/login?tableName=login&orginURI="+location.href;
										return false;
									}
								});
							}
						}else{
							return false;
						}
						if (loginData.loginName == '') {
							location.href = g.url.login + '/login?tableName=login&orginURI=' + location.href;
							return;
						}
					});
				}
			});
		}
	}
	
	exports.live800Fn=live800;
})(window,$);