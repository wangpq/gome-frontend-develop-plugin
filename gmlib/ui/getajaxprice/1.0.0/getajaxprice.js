;(function ( $, window, document, undefined ) {
    var pluginName = "getAjaxPrice";
    //if($(".delprice").length>=1){   //屏蔽原价
    //    $(".delprice").remove();
    //}
    $.fn[ pluginName ] = function ( options ) {
        var i = 0;
        this.gLoad({
            df: 50,
            e: function() {
                var areaCode,source="channel",priceUrl,callback;
                var $Prices = $(this).find('[data-target="p-price"]');
//        通过data属性取得所有需要异步的价格dom 返回所有productid-skuid

                var skuIdsTotal = $Prices.map(function() {
                    return $(this).attr('data-skuId');//为了兼容ie用了attr
//                    return $(this).data().skuid;
                }).get().join(',');
//        获得区域cookie
                areaCode = cityID()[2];
//                console.log(areaCode);
//        刘阳明给的结构
//        /price/promogen/{skuIds}/{areaCode}/flag/{source}/{callback}
//        实际出来的url效果为
//        http://ss.gome.com.cn/item/v1/price/promogen/1118360033,pop8007735531,pop8007735540/11010000/flag/loadgdGoodsInfoCode/callback=jQuery1102013362416519204645_1452743114493?_=1452743114704
//        实际出来的数据为
//        callback=jQuery1102013362416519204645_1452743114493({"result":[{"areaPrice":"2999.00","minPrice":"2850.00","originalAreaPrice":"2850.00","originalPrice":"3599.00","price":"3599.00","skuId":"1118360033"},{"minPrice":"139.00","originalPrice":"188.00","price":"139.00","skuId":"pop8007735531"},{"minPrice":"199.00","originalPrice":"308.00","price":"199.00","skuId":"pop8007735540"}],"success":true})
                callback = "callback"+(i++);
                priceUrl ="//ss" + cookieDomain + "/item/v1/price/promogen/" + skuIdsTotal +"/"+ areaCode+"/flag/channel/"+callback;

                $.ajax({
                    type: "get",
                    url: priceUrl,
                    cache: false,
                    dataType: "jsonp",
                    jsonpName: callback,
                    success: function (data) {
                        if(data && data.success == true) {
                            $Prices.each(function () {
                                var $price = $(this);
                                new SinglePro($price, data.result)
                            })
                        }
                    },
                    error:function(XMLHttpRequest, textStatus, jqXHR){
//                        console.log("textStatus:"+textStatus);
//                        console.log("XMLHttpRequest.status:"+XMLHttpRequest.status);
//                        console.log("XMLHttpRequest.readyState:"+XMLHttpRequest.readyState);
//                        console.log("XMLHttpRequest.responseText:"+XMLHttpRequest.responseText);
                    }
                });

                function SinglePro(element, data) {
                    this.selector = (element);
                    this.data        = data;
                    this.skuid = element.attr('data-skuId');
// //        国美价变灰中划线效果
//                     this.s = element.attr('data-s') || false;
//                     this.zhe = element.attr('data-zhe') || false;
//                     this.jian = element.attr('data-jian') || false;
                    this.minPrice = element.find(".minPrice") || false;
                    this.oPrice = element.find(".oPrice")|| false;
                    this.zhePrice = element.find(".zhePrice")|| false;
                    this.jianPrice = element.find(".jianPrice")|| false;
                    this.wanPrice = element.find(".wanPrice")|| false;
                    this.refresh()
                }
                SinglePro.prototype.refresh = function () {
                    var that = this;
                    $.each(this.data, function (i, item) {
                        var zhe,jian,wan;
                        if(item.originalPrice - item.minPrice > 0 ){
                            this.oPrice =this.originalPrice;
                        }
                        that.skuid ==item["skuId"] && (
                            that.minPrice.html(item["minPrice"]),
                                zhe = ((item.minPrice/item.originalPrice)*10).toFixed(1),
                                jian = (item.originalPrice - item.minPrice).toFixed(2),
                                wan = (item.minPrice/10000),
                            // 判断现价是否大于或者等于原价
                            that.oPrice.length && parseFloat(jian) > 0 ? that.oPrice.html(item["oPrice"]) : that.oPrice.parent().remove(),
                           // that.oPrice.length  &&  that.oPrice.html(item["oPrice"]),
                            //that.oPrice.length  && that.oPrice.parent().remove(),   //若要屏蔽原价，将上一句注掉，这句放开，并放开开始那段屏蔽原价的代码
                            that.zhePrice.length && that.zhePrice.html(zhe),
                            that.jianPrice.length && that.jianPrice.html(jian),
                            that.wanPrice.length && that.wanPrice.html(wan)
                        );
                    })

                }

                function cityID() {
                    var _cookie = $.cookie('atgregion') || "11011400|北京北京市东城区东城区|11010000|11000000|110114001",
                        _array = _cookie.split("|");
//                    if(_array.length === 4)_array.push(_array[0]+"1");
                    return _array;
                }

            }
        });
    };
})( jQuery, window, document );