/*******************************************************************************
 * 对比 * addToCompare:添加对比（productId,skuId） compareTemplate:对比数据添加模板(传入后台的查询串)
 * inCookie:根据cookie判断是否添加对比，是则加入cookie（productid，skuid）
 * addOtherHtml:对比模板添加后，填充剩余的空缺项，以及对比操作栏（对比的数量） compareBox:生成对比栏界面
 * collectSIds:获取所有的sudId（收集cookie中所有的skuId） compareInit:初始化对比栏
 * clearCompareBox:清空对比栏 delCompare:删除单个商品--公用方法（当前html对象，删除的对比商品productId）
 * delElement:删除单个商品--点击删除（对比栏的当前元素） backToZero:归零 blind:绑定按钮事件 reload:重新加载
 ******************************************************************************/
var compare = {
    compareBoxes : null,
    addToCompare : function(productId, skuId) {
        var $type = this.inCookie(productId, skuId);
        if ($type == "add") {
            this.compareBox();
            this.compareShow();
            $("#j-backtop").addClass("after");
            tool.setCookie('g_co', "show");
            this.addClass();
        } else {
        }
    },
    compareTemplate : function(val) {
        if (val == null)
            return 0;
        var flag = 1;
        //$.ajax({
        //  //type : "post",
        //  url :  url.w+  "/p/compareData",
        //  data : { id : val, type : 0 ,od:'1'},
        //  //async : false,
        //  //cache : false,
        //  dataType : "json",
        //  success : function(data) {
        //      if (data.compare == "no") {
        //          compare.clearCompareBox();
        //          flag = 0;
        //      } else {
        //          var id = $("#compare");
        //          if (id.length == 0) {
        //              $(".compare-bd").append("<ul class='clearfix'></ul>");
        //          }
        //          var peg = $('#compare');
        //          peg.innerHTML = '';
        //          var _ren = template.compile($('#templateCompare').text());
        //          var _htm = _ren(data);
        //          peg.html(_htm);
        //          var count = tool.cookieSize('compare', '|');
        //          $("#pCount").html(" (" + count + ")");
        //          $("#backCompare").html(" <s></s>        (" + count + ")         ");
        //          var str = compare.addOtherHtml(count);
        //          $("#compare ul").append(str);
        //          compare.blind();
        //      }
        //  }
        //});

        g.ajax("//apis"+cookieDomain+"/p/asynSearch", {module:'compare',from:"compare_ec", id: val, type: 0, od: '1', callback: 'compare_001' }, { site: 'f' }).done(function (data) {            
            
            if (!!data.item) {
                return;
            }
            
            for (var i = 0 ; i < data.items.length; i++) {
                data.items[i].pUrl = (function (pUrl) {

                    pUrl = pUrl.replace('www', 'item');
                    pUrl = pUrl.replace('product/', '');
                    return pUrl;
                })(data.items[i].pUrl);
            }
            if (data.compare == "no") {
                compare.clearCompareBox();
                flag = 0;
            } else {
                var id = $("#compare");
                if (id.length == 0) {
                    $(".compare-bd").append("<ul class='clearfix'></ul>");
                }
                var peg = $('#compare');
                peg.innerHTML = '';
                var _ren = template.compile($('#templateCompare').text());
                var _htm = _ren(data);
                peg.html(_htm);
                var count = tool.cookieSize('compare', '|');
                $("#pCount").html(" (" + count + ")");
                $("#backCompare").html(" <s></s>        (" + count + ")         ");
                var str = compare.addOtherHtml(count);
                $("#compare ul").append(str);
                compare.blind();
            }
        })

        return flag;
    },
    inCookie : function(productId, skuId) {
        var values = tool.getCookieValue('compare');
        if (values == null) {
            var $cookieValue = productId + ":" + skuId;
            tool.setCookie('compare', $cookieValue);
            return "add";
        } else {
            var $contain = tool.cookieContain(values, skuId);
            var $count = tool.cookieSize('compare', '|');
            if ($contain) {
                compare.error("该商品已经加入对比！");
            } else if ($count == 4) {
                compare.compareShow();
                $("#j-backtop").addClass("after");
                tool.setCookie('g_co', "show");
                $(".display-page-compare-checkbox").attr('checked',false);
                compare.error("对比栏已满,您可以删除不需要的栏内商品再继续添加哦！");
            } else {
                var $cookieValue = values + "|" + productId + ":" + skuId;
                tool.setCookie('compare', $cookieValue);
                return "add";
            }
            return "unadd";
        }
    },
    compareBox : function() {
        var value = tool.getCookieValue('compare');
        var compareHide = tool.getCookieValue('g_co');
        if (compareHide === "show" && value != null){
            this.compareShow();
            $("#j-backtop").addClass("after");
            tool.setCookie('g_co', "show");
        }
        this.compareTemplate(value);
    },
    collectSIds : function() {
        var value = tool.getCookieValue('compare');
        var ids = new Array();
        if (value == null)
            return null;
        var values = value.split('|');
        for ( var int = 0; values != null && int < values.length; int++) {
            var tmp = values[int].split(':');
            ids.push(tmp[1]);
        }
        return ids;
    },
    addOtherHtml : function(count) {
        var str = "";
        var cl = "";
        if(count == 0) str = str + '<ul class="clearfix">';
        for ( var int = count + 1; int < 5; int++) {
            str = str + "<li class='compare-items'>" + "<p class='pic'>" + int  + "</p>" + "<p class='txt'>您还可以继续添加</p> <s></s></li>";
        }
        if (count < 2) cl = "disable";
        str = str + "<li class='compare-items last'>"
                + "<p class='btn-wrap'><a track='对比栏:对比' target='_blank' class='btn " + cl
                + "' onclick='javascript:compare.doCompare();return false;' href='javascript:void(0);'>对比</a>"
                + "<a track='对比栏:清空' class='btn-clear' onclick='javascript:clearCompare();return false;' href='javascript:void(0);'>清空对比栏</a></p></li>";
        if(count == 0) str = str + '</ul>';
        return str;
    },
    compareInit : function() {
        this.reload();
        this.addClass();
        this.compareBox();
        this.toggle();
        var value = tool.getCookieValue('compare');
        var co_show = tool.getCookieValue('g_co');
        if (co_show != "show" && value != null){
            $("#backCompare,.f-compare-text").show();
            tool.setCookie('g_co', "hide");
        }
    },
    doCompare : function() {
        var value = tool.getCookieValue('compare');
        var count = tool.cookieSize('compare', '|');
        if (count < 2) {
            compare.error("至少有两件商品才能对比哦！");
        } else {
            /*var url = $dynsite + $contextPath + "/compare/compare.jsp?pIds=" + value;*/
            /* 使用静态化地址 */
            value = value.split("|");
            var _v = "",_s = value.length,_e = 4-_s;
            for(var i=0; i<_s; i++){
                _v += value[i].split(":")[1];
                if(i<_s-1)_v+="-";
            }
            if(_e>0){
                for(var i=0; i<_e; i++){
                    _v+="-0";
                }
            }
            value = _v+".html";
            var url = $satsite + "/compare/" + value;
            window.open(url, "_blank");
        }
    },
    delCompare : function(id) {
        var value = tool.delCookieById(id);
        if (value == null) {
            $("#backCompare").hide();
            $("#f-compare .f-compare-text").hide();
            $("#j-backtop").addClass("after");
            tool.setCookie('g_co', "show");
            this.clearCompareBox();
        } else {
            tool.setCookie('compare', value);
            this.compareBox();
        }
    },
    clearCompareBox : function() {
        tool.clear('compare');
        this.removeClass();
        this.backToZero();
    },
    delElement : function(element) {
        var find = false; // 不在此页
        var $checkVal = $(element).attr("sid");
        var $skuId = "";
        compareBoxes = $(".display-page-compare-checkbox");// 在此页查找到对应product，移除对比勾选
        if (compareBoxes.length > 0) {
            compareBoxes.each(function() {
                var obj = $(this);
                var $sId = obj.attr("sid");
                if ($checkVal == $sId) {
                    find = true;
                    $skuId = $sId;
                    obj.removeClass("click");
                    obj.attr('checked',false);
                }
            });
        }
        if (find) { // 当前存在该商品,直接删除（不放在循环里头删是由于每删一次会请求一次）
            compare.delCompare($skuId);
        } else { // 当前不存在该商品
            $skuId = $(element).attr("sid");
            this.delCompare($skuId);
        }
    },
    backToZero : function() {
        var str = this.addOtherHtml(0);
        $("#compare").html(str);
        $("#pCount").html(" (" + 0 + ")");
        $("#backCompare").html("<s></s>(" + 0 + ")");
    },
    blind : function() {
        $(".compare-bd li.add").hover(function() {
            $(this).find(".del").show();
        }, function() {
            $(this).find(".del").hide();
        });
    },
    reload : function() {
        $(".shareDB").click(function() {
            var ele=$(this).find(".compare")
                , has = ele.hasClass("click")
                , $skuId = ele.attr("sid")
                , $productId = ele.attr("pid");
            if (has) {
                compare.delCompare($skuId);
                compare.removeClass();
            } else {
                compare.addToCompare($productId, $skuId);
            }
			return false;
        });
    },
    addClass : function() {
        var ids = this.collectSIds();
        if (ids == null) {
            $(".compare-bar").hide();
            $("#j-backtop").addClass("after");
            tool.setCookie('g_co', "show");
            return;
        }
        compareBoxes = $(".display-page-compare-checkbox");
        if (compareBoxes.length > 0) {
            compareBoxes.each(function() {
                var obj = $(this);
                var sId = obj.attr("sid");
                for ( var i = 0; i < ids.length; i++) {
                    if (sId == ids[i]) {
                        obj.addClass("click");
                        break;
                    }
                }
            });
        }
    },
    removeClass : function() {
        compareBoxes = $(".display-page-compare-checkbox");
        if (compareBoxes.length > 0) {
            compareBoxes.each(function() {
                var obj = $(this);
                var sId = obj.attr("sid");
                obj.removeClass("click");
                obj.attr('checked',false);
                var ids = compare.collectSIds();
                if (ids == null)
                    return;
                for ( var i = 0; i < ids.length; i++) {
                    if (sId == ids[i]) {
                        obj.addClass("click");
                    }
                }
            });
        }
    },
    error : function(title) {
        $("#errorCompare").html("<em>" + title + "</em>");
        $("#errorCompare").show();
        setTimeout("$('#errorCompare').hide();", 6000);
    },
    toggle : function() {
        $("#backCompare").click(function() {
            var $style = tool.elementStyle("compare-bar");
            if($style == "block"){
                $(".compare-bar").hide("1200");
                $("#backCompare").show();
                $("#f-compare .f-compare-text").show();
                $("#j-backtop").removeClass("after");
                tool.setCookie('g_co', "hide");
            }else{
                $(".compare-bar").show("1200");
                $("#backCompare").hide();
                $("#f-compare .f-compare-text").hide();
                $("#j-backtop").addClass("after");
                tool.setCookie('g_co', "show");
            }
        });
    },
    compareShow : function(){
        $(".compare-bar").show();
        $("#backCompare").hide();
        $("#f-compare .f-compare-text").hide();
    }
}
/*******************************************************************************
 * 最近浏览 * historyTemplate:浏览记录商品展示模板 checked:添加选中状态 sliblings:滑至对比栏 blind:样式绑定
 ******************************************************************************/
var historyView = {
    templateToProcess: null,
    historyTemplate: function() {
       var self = this;
              var _prs = $.cookie("proid120517atg");
              var $p=[];
                 if(_prs){
                        $p=eval(_prs);
                    }
              /*

              http://ss.gome.com.cn/item/v1/browse/prdreturn/A0005038630-pop8004894070,A0005753202-pop8008406619,A0005753206-pop8008406629,A0005446966-pop8006744971,A0005242289-pop8008408500,A0005242289-pop8008246636,A0005709681-pop8008148601,A0005709681-pop8008148612,A0005709681-pop8008148600,A0005709681-pop8008148589/100/flag/item/recentViewed?callback=recentViewed&_=1461549457771

              */
              $.ajax({
                  type: "get",
                  url: '//ss' + cookieDomain + '/item/v1/browse/prdreturn/' + $p.join(',') + '/100/flag/item/recentViewed',
                 
                  cache: false,
                  dataType: "jsonp",
                  timeout: 5000,
                  jsonpName: "recentViewed",
                  success: function(data) {
                      // 对比栏浏览历史

                      var peg = $('#historys');
                      var hist = $('#recentVisit-lists');
                      var historyBarHTML = ""
                      var historyBottomHTML = ""
                      if (peg == null) return;
                      if(data.success){
                          for (var i = 0; i < data.result.length; i++) {
                              var o = data.result[i];
                              historyBarHTML += '<li class="compare-items goods"><p class="pic"><a target="_blank" href="' + o.url + '"><img alt="' + o.name + '" src="' + o.pic.replace('_100','_50') + '"></a></p><p class="name"><a target="_blank" title="' + o.name + '" href="' + o.url + '">' + o.name + '</a></p><p class="price">¥ ' + o.price + '</p><p class="btn"><a href="javascript:void(0);" class="history-page-compare-checkbox" sid="' + o.skuId + '" pid="' + o.productId + '" track="对比栏:最近浏览:对比"></a></p></li>'
                              historyBottomHTML += '<li class="item"><p class="item-pic"><a href="' + o.url + '" target="_blank"><img src="//img.gomein.net.cn/images/grey.gif" gome-src="' + o.pic.replace('_100','_50') + '" alt=""></a></p><p class="item-price">¥' + o.price + '</p></li>'
                          }
                      }
                      peg.empty().html('<ul class="clearfix js-csum" style="width:860px; position:relative">' + historyBarHTML + '</ul>')
                      hist.empty().html(historyBottomHTML)
                      self.checked();
                      self.blinds();
                      self.moving();

                  },
                  error: function() {
      //                console.log("访问失败")
                  }
              });
    },
    checked: function() {
        var $comparehists = $(".history-page-compare-checkbox");
        var sIds = compare.collectSIds();
        if ($comparehists.length > 0) {
            $comparehists.each(function() {
                var obj = $(this);
                var $sId = obj.attr("sid");
                obj.removeClass("click");
                for (var int = 0; sIds !== null && int < sIds.length; int++) {
                    if ($sId == sIds[int]) {
                        obj.addClass("click");
                    }
                }
            });
        }
    },
    sliblings: function() {
        var compareElement = $(".compare-bar .hd li");
        compareElement.eq(0).addClass("hover").siblings().removeClass("hover");
        $(".compare-bar .bd .items").hide().eq(0).show();
    },
    blinds: function() {
        $(".newly-cont li.goods .btn a").unbind('click'); // for IE6
        $(".newly-cont li.goods .btn a").bind('click', function() {

            var has = $(this).hasClass("click");
            var $checkVal = $(this).attr("sid");
            var $productId = $(this).attr("pid");

            if (has) {
                compare.delElement($(this));
                historyView.sliblings(); // 切换至对比栏
                $(this).removeClass("click");
            } else {
                compare.addToCompare($productId, $checkVal);
                historyView.sliblings(); // 切换至对比栏
                var $compareBoxes = $(".display-page-compare-checkbox");
                if ($compareBoxes.length > 0) {
                    $compareBoxes.each(function() {
                        var obj = $(this);
                        var $sId = obj.parents(".item-tab-warp").attr("sid");
                        if ($checkVal == $sId) {
                            obj.addClass("click");
                            return false; // break
                        }
                    });
                }
            }
        });
    },
    moving: function() {
        var _this = this;
        var len = $(".js-csum").find("li").length,
            next_btn = $(".js-cnext"),
            prev_btn = $(".js-cprev"),
            box = $(".js-csum"),
            move_steps = 860,
            total = Math.round(len / 4);
        if (len < 5) {
            next_btn.hide();
            prev_btn.hide();
        }else{
            $('#historys').gSlider({
                   isAuto:false,
                   isImgLoad:true,
                   dataOriginal:"gome-src",
                   showNum:1,
                   stepLen:1,
                   time:3000,
                   btnGo:{left:'[data-btn="prev"]',right:'[data-btn="next"]'}

               });
        }
        next_btn.unbind();
        next_btn.bind("mouseup", function() {
            if (!next_btn.hasClass("disable")) {
                _this.moveindex++
            };
            box.stop(false, true).animate({
                left: move_steps * _this.moveindex * (-1)
            }, 300, function() {
                if (_this.moveindex >= total - 1) {
                    next_btn.addClass("disable");
                    prev_btn.removeClass("disable");
                } else if (_this.moveindex < total - 1 && _this.moveindex > 0) {
                    next_btn.removeClass("disable");
                    prev_btn.removeClass("disable");
                } else if (_this.moveindex <= 0) {
                    prev_btn.addClass("disable");
                    next_btn.removeClass("disable");
                }
            });
        });
        prev_btn.unbind();
        prev_btn.bind("mouseup", function() {
            if (!prev_btn.hasClass("disable")) {
                _this.moveindex--;
            } else {

            }
            box.stop(false, true).animate({
                left: move_steps * _this.moveindex * (-1)
            }, 300, function() {
                if (_this.moveindex >= total - 1) {
                    next_btn.addClass("disable");
                    prev_btn.removeClass("disable");
                } else if (_this.moveindex < total - 1 && _this.moveindex > 0) {
                    next_btn.removeClass("disable");
                    prev_btn.removeClass("disable");
                } else if (_this.moveindex <= 0) {
                    prev_btn.addClass("disable");
                    next_btn.removeClass("disable");
                }
            });
        });
    }



}
/*******************************************************************************
 * 工具 * setCookie:添加cookie（cookie名，cookie值）
 * getCookieValue:获取指定cookie名的值（cookie名称）
 * cookieContain:判断某cookie中是否存在id（cookie值，查询id）
 * cookieSize:计算cookie的大小（cookie名，拆分字符）
 * delCookieById:删除cookie中某个productId的字段（product id） clear:清空cookie（cookie名称）
 * isNum:判断是否为整数 toggleForInput:输入框交互效果核心 gnload:商品图片延时加载
 ******************************************************************************/
var tool = {
    setCookie : function(cookieName, cookieValue) {
        $.cookie(cookieName, cookieValue, {
            expires : 30,
            path : '/',
            domain : $basedomain
        });
    },
    getCookieValue : function(cookieName) {
        return $.cookie(cookieName);
    },
    cookieContain : function(cookieValue, id) {
        if (cookieValue.indexOf(id) > -1) {
            return true;
        } else {
            return false;
        }
    },
    cookieSize : function(cookieName, char) {
        var $cookieValue = this.getCookieValue(cookieName);
        if ($cookieValue == null)
            return 0;
        var values = $cookieValue.split(char);
        return values.length;
    },
    delCookieById : function(skuId) {
        var result = null;
        var value = tool.getCookieValue('compare');
        var ids = new Array();
        if (value == null)
            return null;
        var values = value.split('|');

        for ( var int = 0; values != null && int < values.length; int++) {
            if (!this.cookieContain(values[int], skuId)) {
                if (result == null)
                    result = values[int];
                else
                    result = result + "|" + values[int];
            }
        }
        return result;
    },
    clear : function(cookieName) {
        $.cookie(cookieName, null, {
            expires : 30,
            path : '/',
            domain : $basedomain
        });
    },
    isNum : function(e) {
        var isN = true;
        if (e.search("^-?\\d+$") != 0)
            isN = false;
        return isN;
    },
    isIllegal : function(e) {
        if (e == '' || e == undefined || e == null)
            return true;
        else
            return false;
    },
    toggleForInput : function($style, $id, $value, $type) {
        $style.focus(function() {
            $(this).val("");
        }).blur(function() {
            var $input = $id.val();
            if ($input == undefined || $input == "") {
                $(this).val($value);
            } else {
                $(this).val($input);
            }
        }).keydown(function(e) {
            var event = window.event || e;
            if (event.keyCode == 13) {
                pageNav.btnClick($type);
            }
        });
    },
    gnload : function() {
        //$("img").imglazyload();此处JS报错 imglazyload
    },
    encode : function(key) {
        return encodeURIComponent(key);
    },
    getQueryString : function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null){
            return unescape(r[2]);
        }
        return null;
    },
    delQueStr : function(url, ref) // 删除参数值
    {
        var str = "";
        if (url.indexOf('?') != -1)
            str = url.substr(url.indexOf('?') + 1);
        else
            return url;
        var arr = "";
        var returnurl = "";
        var setparam = "";
        if (str.indexOf('&') != -1) {
            arr = str.split('&');
            for (i in arr) {
                if (arr[i].split('=')[0] != ref) {
                    returnurl = returnurl + arr[i].split('=')[0] + "="
                            + arr[i].split('=')[1] + "&";
                }
            }
            return url.substr(0, url.indexOf('?')) + "?"
                    + returnurl.substr(0, returnurl.length - 1);
        } else {
            arr = str.split('=');
            if (arr[0] == ref)
                return url.substr(0, url.indexOf('?'));
            else
                return url;
        }
    },
    elementStyle:function(css){
        var style = $("."+css).attr("style");
        if(style == "display: block;" || style == "")
            return "block";
        else
            return "none";
    },
    openwin : function(url) {
        var a = document.createElement("a");
        a.setAttribute("href", url);
        a.setAttribute("target", "_blank");
        document.body.appendChild(a);
        a.click();
    }
}
var $dynsite = dynSite;
var $satsite = staSite;
var $contextPath = contextPath;
var $basedomain = cookieDomain;
var $veloUri = $("#veloUri").text();
var $reqUri = $("#reqUri").text();
var isIEBrowser = $.browser.msie;
(function() {
    //pageView.initAD();
    //cart.addToshoppingCart();
    //wishList.enshrine();
    //wishList.loginBack();
    compare.compareInit();
    //priceRange.priceInit();
    //pageNav.gotoPage();
    //priceRange.goToPrice();
    //imgListReady();
    tool.gnload();
    var ids = compare.collectSIds();
    if (ids == null) {
        return;
    }
    compareBoxes = $(".display-page-compare-checkbox");
    if (compareBoxes.length > 0) {
        compareBoxes.each(function() {
            var obj = $(this);
            var sId = obj.attr("sid");
            for ( var i = 0; i < ids.length; i++) {
                if (sId == ids[i]) {
                    obj.addClass("click");
                    obj.attr('checked',true);
                    break;
                }
            }
        });
    }
})();
/**
 * 清空对比栏
 * */
function clearCompare(){
    compare.clearCompareBox();
}
/**
 * 清除指定的商品对比
 * */
function del(element){
    compare.delElement(element);
}
/**隐藏*/
$(".compare-bar .hd .more").click(function() {
    var sIds = compare.collectSIds();
    if (sIds == null) {
        $("#backCompare").hide();
        $("#f-compare .f-compare-text").hide();
        $("#j-backtop").addClass("after");
        tool.setCookie('g_co', "hide");
    } else {
        $("#backCompare").show();
        $("#f-compare .f-compare-text").show();
        $("#j-backtop").removeClass("after");
        tool.setCookie('g_co', "hide");
    }
    $(".compare-bar").hide("1200");
});


$(".compare_lesat").bind("click", function() {
    $(this).addClass("hover").siblings("li").removeClass("hover");
    $(".compare-bd").hide()
    $(".js-cbox").show();
    historyView.historyTemplate()
})
$(".compare_li").bind("click", function() {
    $(this).addClass("hover").siblings("li").removeClass("hover");
    $(".compare-bd").show()
    $(".js-cbox").hide();
})