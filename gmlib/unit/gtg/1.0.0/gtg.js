/**
 * 套购插件
 * @author zhangjianwei
 * */
;(function($){
	/**
	 * p={mCls:主商品class名称(默认是gMprd)，oCls：附属商品的class名称(默认是gOprd)，e:套购商品选中状态改变触发的事件}
	 * */
	$.fn.gTg=function(p){
		var opt={mCls:'gMprd',oCls:'gOprd',fmt:2,e:null};$.extend(opt,p);
		var toFlt=function(s,l){if(s=='NaN')return 0;return s.toFixed(l);};
		var sJs=function(ts){
			/**
			 * c:件数,tP:套装价,yP:原价,jP:节省
			 * */
			var p={c:0,tP:0,yP:0,jP:0};
			var o=ts.find('.'+opt.mCls);
			var mtp = parseFloat(o.attr('tgprice'));//主商品套购价
			var myp = parseFloat(o.attr('price'));//主商品价格
			var tp=0,yp=0;
			ts.find('.'+opt.oCls).each(function(){
				o=$(this);
				if(o.is(':checkbox')){
					if(o.is(':checked')){
						tp+=parseFloat(o.attr('tgprice'));
						yp+=parseFloat(o.attr('price'));
						p.c=p.c+1;
					};
				}else{
					tp+=parseFloat(o.attr('tgprice'));
					yp+=parseFloat(o.attr('price'));
					p.c=p.c+1;
				};
			});
			p.tP=toFlt(mtp+tp,2);p.yP=toFlt(myp+yp,2);p.jP=toFlt(myp+yp-mtp-tp,2);$.extend(p,{ele:ts});
			if(opt.e){opt.e.apply(p);};
		}
		this.each(function(){
			var ts=$(this);
			ts.find("input[type='checkbox']").click(function(){sJs(ts);});
			sJs(ts);
		});
		return this;
	} 
})(jQuery);