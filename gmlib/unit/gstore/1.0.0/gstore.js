!function (exports,$,req,tpl) {
	var cache={};//缓存请求过的promise
	var _t=null;

	function getReq(url){
		if(!cache[url])cache[url]=req.cachePromise(req.reqp,url);
		return cache[url];
	}
	function getLabel(list,code){
		return get(function(item){
			return item.code==code;
		},list).label;
	}
	function get(fn,list){
		for(var i=0;i<list.length;i++)if(fn(list[i]))return list[i];
		return {};
	}
	function selected(item){
		return item.select;
	}
	function propEq(propNmae,value){
		return function(item){
			return item[propNmae]==value;
		}
	}
	function clickContent(data,site){
		_t.find('[cidx]').click(function(){
			var idx=$(this).attr('cidx');
			var item=data.content[idx];
			var title=get(selected,data.titles);
			var req=null;
			if(title.name == "store"){
				title.label=item.label;
				title.code=item.code;
				//获取三级区域
				var areas=[get(propEq('name','1area'),data.titles).code,
				get(propEq('name','2area'),data.titles).code,
				get(propEq('name','3area'),data.titles).code]
				_t.trigger("gstore.change",[item,areas]);
			}
			if(title.name=="1area"){//一级区域
				var area2 =get(propEq('name','2area'),data.titles);
				title.select=false;
				title.label=item.label;
				title.code=item.code;
				area2.select=true;
				area2.label="请选择";
				get(propEq('name','3area'),data.titles).label="请选择";
				get(propEq('name','store'),data.titles).label="请选择";
				req=getReq('/api/test/area2?siteId='+site+'&code='+title.code);
			}
			if(title.name=="2area"){//二级区域
				var area3 =get(propEq('name','3area'),data.titles);
				title.label=item.label;
				title.code=item.code;
				title.select=false;
				area3.select=true;
				get(propEq('name','3area'),data.titles).label="请选择";
				get(propEq('name','store'),data.titles).label="请选择";
				req=getReq('/api/test/area3?siteId='+site+'&code='+title.code);
			}
			if(title.name=="3area"){//三级区域
				var mendian =get(propEq('name','store'),data.titles);
				title.label=item.label;
				title.code=item.code;
				title.select=false;
				mendian.select=true;
				get(propEq('name','store'),data.titles).label="请选择";
				req=getReq('/api/test/mendian?siteId='+site+'&code='+title.code);
			}
			if(req){
				req().then(function(r){
					data.content=r.result?r.result.division:r;
					init(data,site);
				});
			}else{
				init(data,site);
			}

		});
	}
	function clickTitle(data,site){
		_t.find('[idx]').click(function(){
			var idx = $(this).attr('idx');
			var item = data.titles[idx];
			get(selected,data.titles).select=false;
			item.select=true;
			var req;
			if(item.name=="store")req=getReq('/api/test/mendian?siteId='+site+'&code='+item.code);
			if(item.name=="3area")req=getReq('/api/test/area3?siteId='+site+'&code='+item.code);
			if(item.name=="2area")req=getReq('/api/test/area2?siteId='+site+'&code='+item.code);
			if(item.name=="1area")req=getReq('/api/test/area1?siteId='+site);
			req().then(function(r){
				data.content=r.result?r.result.division:r;
				init(data,site);
			});
		});
	}
	function init(data,site){
		_t.html(tpl.comp_gstore_content(data));
		clickContent(data,site);
		clickTitle(data,site);
	}
	//业务规则
	function reqContent(leave3,site){
 		var req1=getReq('/api/test/area1?siteId='+site);//一级区域
		var req2=getReq('/api/test/area2?code='+leave3[0]+'&siteId='+site);//二级区域
		var req3=getReq('/api/test/area3?code='+leave3[1]+'&siteId='+site);//三级区域
		var reqstore=getReq('/api/test/mendian?code='+leave3[2]+'&siteId='+site);//门店列表
		req.parall(req1(),req2(),req3(),reqstore()).then(req.res(function(a0,a1,a2,store){
			var data={
				titles:[{
						name:"1area",
						label:getLabel(a0.result.division,leave3[0]),
						code:leave3[0],
						select:false,
						list:a0.result.division
					},{
						name:"2area",
						label:getLabel(a2.result.division,leave3[1]),
						code:leave3[1],
						select:false,
						list:a1.result.division
					},{
						name:"3area",
						label:getLabel(a2.result.division,leave3[2]),
						code:leave3[2],
						select:false,
						list:a2.result.division
					},{
						name:"store",
						label:"门店",
						code:null,
						select:true,
						list:store
					}],
				content:store
			};
			init(data,site);
		}));
	}

	$.fn.extend({
 		gstore:function(leave3,site){//传入三级区域作为默认展示
			$(this).html(tpl.comp_gstore());
			_t=$(this);
			reqContent(leave3,site);
		}
	});
}(this,$,request,GTPL);