/*
 * 对比功能插件，主要应用于搜索相关页面及详情页，接口请求商品组-许立亢;
 * 对比元素需要属性cid="pid-skuid"
 * html：<span class="add-contrast" cid="9134291580/1123342405">sid="1123342405" pid="9134291580"</span>
 * js：$("body").accordion({
 *      boxStyle:{"left":"50%","marginLeft":"-390px"}
        obj:".add-contrast",
        objstyle:{"background":"#c00"},
        domain:"" 
    })

 * @Author wx
 */
;(function($) {
  $.fn.accordion = function(options) {
    Array.prototype.removeValve = function(val) {
      for(var i=0; i<this.length; i++) {
        if(this[i] == val) {
          this.splice(i, 1);
          break;
        }
      }
    };
    var _default = {
        boxStyle:{"left":"50%","marginLeft":"-390px"},//对比栏样式
        obj:".compare", //需要对比功能的元素
        objStyle:"",       //对比元素选中状态样式
        domain:""       //用于cookie域名存储和跳转地址拼接
    };
    var _opt = $.extend({},_default,options);
    var _item = this;
    var _max = 4;//可对比的商品数量
    var _dataCompared = [];//用于存放当前页面对比的商品
    var _areaCode = "";//用于存放当前页面的二级区域id
    /**
     * [description] 获取商品信息方法，如果一个商品请求成功过则存放于cache里，防止下次继续求情
     * @return {[type]} [description] 返回一个deferred对象
     */
    var getSingleProductInfo = (function(){
        var cache = {};
        return function(info){
            if(!info){
                return false;
            }
            return $.Deferred(function(defer){
                var functionPargam = info.replace("\/","");
                if(cache[functionPargam]){
                    defer.resolve(cache[functionPargam]);
                }else{
                    $.ajax({
                        type:"get",
                        dataType:"jsonp",
                        url:"//ss"+_opt.domain+"/item/v1/extra/detail/"+info+"/"+_areaCode+"/flag/item/fn"+ functionPargam,
                        jsonpCallback:"fn"+functionPargam
                    }).done(function(data){
                        cache[functionPargam] = data
                        defer.resolve(cache[functionPargam]);
                    }).fail(function(data){
                        defer.reject();
                    })
                }
            }).promise()
        }
    }())
    /**
     * [getProductInfo description] 全部商品信息都获取之后进行组装，执行对比商品结构拼合
     * @param  {[type]} compareData [description] array 页面对比商品数组
     * @return {[type]}             [description]
     */
    function getProductInfo(compareData){
        $.when(
            getSingleProductInfo(compareData[0]),
            getSingleProductInfo(compareData[1]),
            getSingleProductInfo(compareData[2]),
            getSingleProductInfo(compareData[3])
        ).done(function(data1,data2,data3,data4){
            var dataArray = [];
            dataArray.push(data1,data2,data3,data4)
            makeHTML(dataArray);
        })
    }
    /**
     * [description] 初始化页面对比栏结构，找到页面上对比的商品设置高亮状态，并且获取商品信息，添加到对比栏
     * @return {[function]} [description] 返回设置高亮、获取信息、添加对比栏操作
     */
    var  init = (function(){
        var compareBoxHTML = '<div class="gm-compareBox" id="gm-compareBox"><div id="errorTips" class="errorTips">对比栏已满,您可以删除不需要的栏内商品再继续添加哦！</div><ul class="gm-compareBox-hd"><li class="tabs-hide" id="gm-compareBox-hide">隐藏</li><li class="tabs cur">对比栏(<em id="compareNum"></em>)</li></ul><div class="gm-compareBox-bd"><div class="gm-compareBox-opt"><p><a href="javascript:void(0)" class="go-commpare disable" id="go-commpare" target="_blank">对比</a></p><p><a href="javascript:void(0)" class="clear-commpare" id="gm-compareBox-clear">清空对比栏</a></p></div><ul class="gm-compareBox-list" id="gm-compareBox-list"><li class="item-compare"><div class="default"><span>1</span>您还可以继续添加</div><div class="product"></div></li><li class="item-compare"><div class="default"><span>2</span>您还可以继续添加</div><div class="product"></div></li><li class="item-compare"><div class="default"><span>3</span>您还可以继续添加</div><div class="product"></div></li><li class="item-compare"><div class="default"><span>4</span>您还可以继续添加</div><div class="product"></div></li></ul></div></div>';
        var compareBoxStyle='<style type="text/css">.gm-compareBox{display:none;position:fixed;bottom:0;z-index:10;width:990px;height:142px;background:#fff;box-shadow:0 0 20px rgba(0,0,0,.19)}.gm-compareBox-hd{height:32px;border-bottom:1px solid #e6e6e6;background:#f3f3f3;line-height:32px}.gm-compareBox-hd .tabs-hide{float:right;margin-right:10px;color:#06c;cursor:pointer}.gm-compareBox-hd .tabs{float:left;width:140px;height:32px;text-align:center}.gm-compareBox-hd .cur{position:relative;border-right:1px solid #e6e6e6;border-bottom:1px solid #fff;background-color:#fff;color:#c00;font-weight:700}.gm-compareBox-bd{overflow:hidden;padding-top:25px;padding-right:110px;height:85px}.gm-compareBox-list .item-compare{position:relative;float:left;margin-right:3px;width:215px;height:84px}.gm-compareBox-list .default{padding:0 12px;width:191px;height:80px;border-bottom:4px solid #e6e6e6;color:#ccc}.gm-compareBox-list .default span{float:left;overflow:hidden;margin-right:12px;width:50px;height:50px;border:1px solid #e7e7e7;background:#f6f6f6;text-align:center;font:46px/50px "Microsoft YaHei"}.gm-compareBox-list .product{padding:0 12px;width:191px;height:80px;border-bottom:4px solid #c00}.gm-compareBox-list .product .pic{float:left;overflow:hidden;margin-right:12px;width:50px;height:50px;border:1px solid #e7e7e7;background:#f6f6f6;text-align:center}.gm-compareBox-list .product .pic img{width:50px;height:50px}.gm-compareBox-list .product .name{overflow:hidden;height:36px;word-wrap:break-word;word-brak:break-all}.gm-compareBox-list .product .price{color:#e3101e}.gm-compareBox-list .product .delete{float:right;visibility:hidden;color:#06c}.gm-compareBox-list .product:hover .delete{visibility:visible}.gm-compareBox-opt{float:right;margin-right:-110px;width:110px;text-align:center}.gm-compareBox-opt .go-commpare{display:inline-block;margin-bottom:3px;width:66px;height:28px;line-height:28px;border:1px solid #e3101e;background:#e3101e;color:#fff;text-decoration:none}.gm-compareBox-opt .disable{border:1px solid #e6e6e6;background:#f8f8f8;color:#ccc;cursor:default}.gm-compareBox-opt .clear-commpare{color:#06c}.errorTips{display:none;margin-top:-36px;background:#ffdfe0;border:2px solid #fed2d3;height:32px;text-align:center;color:#cd0001;font:700 12px/32px Arial}</style>';
        $("body").append(compareBoxStyle+compareBoxHTML);
        _dataCompared = $.cookie("compare")?$.cookie("compare").replace(/:/g,"\/").split("|").splice(0,_max) : [];
        if($.cookie("g_co") && $.cookie("g_co")=="show" && _dataCompared.length > 0){
            $("#gm-compareBox").css(_opt.boxStyle).show();
        }
        return (function(){
            $.cookie("compare",_dataCompared.join("|").replace(/\//g,":"),{expires: 30,path: '/',domain:_opt.domain});
            _dataCompared = $.cookie("compare") != ""?$.cookie("compare").replace(/:/g,"\/").split("|").splice(0,_max) : [];
            _areaCode = $.cookie("atgregion")?$.cookie("atgregion").split("|")[2] : "11010000";

            $(_opt.obj).filter(function(){
                $(this).data("isCompared",false).removeAttr("style");
                if($.inArray($(this).attr("cid"), _dataCompared) >=0){
                    return true
                }
                return false
            }).data("isCompared",true).css(_opt.objStyle);
            $("#compareNum").text(_dataCompared.length)
            getProductInfo(_dataCompared);
            return arguments.callee;
        })()
    }())
    /**
     * [setItemInfo description] 根据价格类型设置商品跳转地址，并且给团抢商品添加标签，返回商品跳转地址和标签结构
     * @param {[type]} data [description]
     */
    function setItemInfo(data){
        var priceType = {
            GOMEPRICE:"normal",
            SALEPRICE:"normal",
            AREAPRICE:"normal",
            AREASALEPRICE:"normal",
            TUANPRICE:"tuanqiang",
            RUSHBUYPRICE:"tuanqiang"
        }
        var _url = "",
            _tags = ""
        switch(priceType[data.priceType]){
            case "normal":
                _url = "//item"+_opt.domain+"/"+data.productId+"-"+data.skuId+".html";
                break;
            case "tuanqiang":
                _url = "//tuan"+_opt.domain+"/deal/"+data.promotionUrl+".html";
                _tags = '<span class="tags">真划算</span>'
                break;
            default:
                break;
        }
        return {
            url:_url,
            tags:_tags
        };
    }

    /**
     * [makeHTML description] 组装对比栏内商品
     * @param  {[type]} data [description] Object
     * @return {[type]}      [description]
     */
    function makeHTML(data){
        var tpl = "";
        var skuData = [];
        var itemInfo = {};
        for(var i = 0;i<_max;i++){
            if(!data[i]){
                tpl+= '<li class="item-compare"><div class="default"><span>'+(i+1)+'</span>您还可以继续添加</div></li>';
            }else{
                itemInfo= setItemInfo(data[i].result.searchPrice);
                tpl+= '<li class="item-compare"><div class="product"><a href="'+itemInfo.url+'" target="_blank" class="pic"><img src="'+data[i].result.img+'" /></a><p class="name"><a href="'+itemInfo.url+'" target="_blank">'+data[i].result.displayName+'</a></p><p><a href="javascript:void(0)" class="delete" cid="'+data[i].result.searchPrice.productId+'/'+data[i].result.searchPrice.skuId+'">删除</a><em class="price">¥'+data[i].result.searchPrice.price+'</em>'+itemInfo.tags+'</p></div></li>';
                skuData.push(data[i].result.searchPrice.skuId)
            }
        }
        $("#gm-compareBox-list").empty().html(tpl);
        if(skuData.length > 1){
            $("#go-commpare").attr("href","//www"+_opt.domain+"/compare/"+skuData.join("-")+".html").removeClass("disable")
        }else{
            $("#go-commpare").attr("href","javascript:void(0)").addClass("disable")
        }
        
    }

    $("#gm-compareBox-hide").on("click",function(){
        $("#gm-compareBox").fadeOut();
        $.cookie("g_co","hide",{expires: 30,path: '/',domain:_opt.domain});
    })

    $("#gm-compareBox-clear").on("click",function(){
        _dataCompared = [];
        init();
    })

    $("#gm-compareBox").delegate(".delete","click",function(){
        _dataCompared.removeValve($(this).attr('cid'));
        init();
    })

    _item.delegate(_opt.obj,"click",function(){

      var $item = $(this);
      $.cookie("g_co","show",{expires: 30,path: '/',domain:_opt.domain});
      $("#gm-compareBox").css(_opt.boxStyle).show();
      if(!$item.data("isCompared")){
        if (_dataCompared.length >= _max){
            $("#errorTips").stop(false,true).show().delay(1500).fadeOut();
            return false;
        }
        _dataCompared.push($item.attr('cid'));
      }else{
        _dataCompared.removeValve($item.attr('cid'));
      }
      init();
    })
    return init;
}
})(jQuery);