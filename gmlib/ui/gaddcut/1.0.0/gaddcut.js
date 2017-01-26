// JavaScript Document
;(function($) {
	$.fn.gAddCut = function(opts) {
		var def = {
			btnCut:".j-gACbtn",/* 数量控制按钮，默认为减号 */
			numVal:".j-gACval",/* 当前页码的id */
			realId:"#realId",
			numMin:1,
			numMax:10000,
			maxCtl:false,/* 注：自定义最大值 用于异步操作 重置绑定时的numMax */
			btnAdd:0,/*btnAdd不为0时为加号按钮*/
			btnfn:null
		};
		var opts = $.extend(def, opts),
			bC = opts.btnCut,
			nV = opts.numVal,
			rId = opts.realId,
			nMin = opts.numMin,
			nMax = opts.numMax,
			nCtl = opts.maxCtl,
			bfn = opts.btnfn;
		return this.each(function(i){
			var v = $(nV).val();
			if(v<nMin){$(nV).val(nMin);$(rId).val(nMin); v=nMin;}
			else if(v>nMax){$(nV).val(nMax);$(rId).val(nMax); v=nMax;};
			$(nV).change(function(){
				if(nCtl)nMax = window.cartMax;
				v = $(nV).val();
				$(rId).val(v);
				if(/^\+?[1-9][0-9]*$/.test(v)){//not num
					if(v<nMin){$(nV).val(nMin);$(rId).val(nMin); v=nMin;}
					else if(v>nMax){$(nV).val(nMax);$(rId).val(nMax); v=nMax;};
				}else{v=nMin;$(nV).val(v);return;};
				/*
				var reg = new RegExp('^\\d+(\\.\\d+)?$');
				if(!reg.match(v)){}
				*/
			});
			$(bC).click(function(){
				if(nCtl)nMax = window.cartMax;
				v = $(nV).val();
				if(v>=nMin && opts.btnAdd==0){
					v--;
					if(v>=nMin){$(nV).val(v); $(rId).val(v);}else if(bfn){bfn(); v++;}
				}else if(v<=nMax && opts.btnAdd!=0){
					v++;
					if(v<=nMax){$(nV).val(v); $(rId).val(v);}else if(bfn){bfn(); v--;}
				};
			});
		});
	};
})(jQuery);