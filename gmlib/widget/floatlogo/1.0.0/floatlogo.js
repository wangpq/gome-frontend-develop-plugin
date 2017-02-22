;$.fn.floatAd = function(options){
    var defaults = {
        imgSrc : "", //漂浮图片路径
        secImgSrc: "", //第二张图片路径
        imgdata:"",
        url : "javascript:void(0);", //图片点击跳转页
        lin:"",  //路线图
        speed : 10//漂浮速度 单位毫秒
    };
    var options = $.extend(defaults,options);
    var _target = options.url == "javascript:void(0);" ?  '':"target='_blank'"  ;
    var html = "<div id='float_ad' style='position:absolute;left:0px;top:0px;z-index:1000000;cleat:both;'>";
    if(options.lin == 3){
        html += "  <a href='" + options.url + "' " + _target + " data-code='"+options.imgdata+"'><img height='80' width='80' src='" + options.imgSrc + "' border='0' class='float_ad_img' /></a>";
    }else{
        html += "  <a href='" + options.url + "' " + _target + " data-code='"+options.imgdata+"'><img height='100' width='100' src='" + options.imgSrc + "' border='0' class='float_ad_img' /></a>";
    }

    var close = "<a href='javascript:;' id='close_float_ad'></a>";
    html +=close;
    html += "</div>";

    $('body').append(html);
    function init(){
        var obj=$("#float_ad");
        var OW = obj.width();//当前广告的宽
        var OH = obj.height();//高
        var DW = $(document).width(); //浏览器窗口的宽
        var GWCH =  $('.i-cart').offset().top; //购物车距离顶部的距离
        var GWCW =  $('.i-cart').offset().left; //购物车距离左侧的距离
        var logo_height =  $('#logo').offset().top; //logo距离顶部的距离
        var logo_width =  $('#logo').offset().left; //logo距离左侧的距离
        var banner_height =  $('.focus').offset().top + 450; //banner距离顶部的距离
        var sidecategory_height =  $('.sidecategory').offset().left; //全部商品分类距离左侧的距离
        var DH = $(document).height();
        var start = OH+DH;
        var win_height = $(window).height();
        var img_height = $(".float_ad_img").height();
        var win_width = $(window).width();
        var img_width = $(".float_ad_img").width();
        var secImgSrc = options.secImgSrc;
        var mid_width = (win_width-img_width)/2;
        if(options.lin == "1"){
            /*
             * 第一种路线
             * */
            obj.css({"left":0,"top":banner_height-img_height}).stop().animate({"left":win_width/2-85,"top":win_height/2-85},{duration:6000, easing:"easeInOutCubic"})
                .find("img").animate({'width':"170px", 'height':"170px"},{duration:6000, easing:"easeInOutCubic"})
                .animate({"left":win_width/2-85,"top":win_height/2-85},{duration:2000, easing:"easeInOutCubic", complete:function(){
                    obj.animate({'left':GWCW+45,'top':GWCH-17},{duration:2000, easing:"easeOutCubic"})
                        .find("img").animate({'width':0, 'height':0}, {duration:2000, easing:"easeOutCubic"});
                    obj.animate({'left':GWCW+45,'top':GWCH-17},{duration:2000, easing:"easeOutCubic"})
                        .find("a").animate({'width':0, 'height':0}, {duration:2000, easing:"easeOutCubic"});
                }
            });
        }else if(options.lin == "2"){
            /*
             * 第二种路线
             */
            obj.css({"left":win_width-107,"top":banner_height-img_height}).stop().animate({"left":win_width/2-85,"top":win_height/2-85},{duration:6000, easing:"easeInOutCubic"})
                .find("img").animate({'width':"170px", 'height':"170px"},{duration:6000, easing:"easeInOutCubic"})
                .animate({"left":win_width/2-85,"top":win_height/2-85},{duration:2000, easing:"easeInOutCubic", complete:function(){
                    obj.animate({'left':logo_width,'top':logo_height},{duration:2000, easing:"easeOutCubic"})
                        .find("img").animate({'width':0, 'height':0}, {duration:2000, easing:"easeOutCubic"});
                    obj.animate({'left':logo_width,'top':logo_height},{duration:2000, easing:"easeOutCubic"})
                        .find("a").animate({'width':0, 'height':0}, {duration:2000, easing:"easeOutCubic"});
                }
            });
        }else{
            /*
             * 第三种路线
             */
            obj.css({"left":win_width-87,"top":banner_height-450-img_height}).stop().animate({"left":sidecategory_height+200,"top":banner_height-450-img_height},{duration:15000, easing:"swing",complete:function(){
                obj.animate({'left':logo_width+5,'top':logo_height+10},{duration:1000, easing:"easeOutCubic"})
                    .find("img").animate({'width':0, 'height':0}, {duration:1000, easing:"easeOutCubic"});
                obj.animate({'left':logo_width+5,'top':logo_height+10},{duration:1000, easing:"easeOutCubic"})
                    .find("a").animate({'width':0, 'height':0}, {duration:1000, easing:"easeOutCubic"});
            }});
        }

        $('body').live('click',function(){
            // $('#float_ad').hide();
        });
        $('#close_float_ad').live('click',function(){
            $('#float_ad').hide();
        })
    }
    init();
}; //floatAd
//调用漂浮插件
var _index_ad_layer = $.cookie('_index_ad_layer');
var _index_float_logo = $.cookie('_index_float_logo');

function startFloatLogo(){
    //随机取路线
    var index = Math.floor((Math.random()*arrLin.length));
    var floatAdStaus = 1;
    var arrLins = arrLin[index];
    var Tiger,TigerUrl,TigerModelId;
    if(arrLins == 1){
        Tiger = floatTiger_1;
        TigerUrl = floatTiger_1_url;
        TigerModelId =floatLogo_d1;
    }else if(arrLins == 2){
        Tiger = floatTiger_2;
        TigerUrl = floatTiger_2_url;
        TigerModelId =floatLogo_d2;
    }else if(arrLins == 3){
        Tiger = floatTiger_3;
        TigerUrl = floatTiger_3_url;
        TigerModelId =floatLogo_d3;
    }else{
        floatAdStaus = 2;
    }
    if(floatAdStaus != '2'){
        $("body").floatAd({
            imgSrc : Tiger,
            secImgSrc: floatLogo_1,
            imgdata: TigerModelId,
            url:TigerUrl,
            lin:arrLins
        });
    }
    FLtime.setTime(FLtime.getTime() + (10 * 60 * 1000));
    $.cookie('_index_float_logo', '1', {expires:FLtime, path:'/'});
}
if($('body').hasClass('home') && $("#gome-topad-bg").length == 0  && !_index_float_logo && floatLogo){
    startFloatLogo();
}else if($('body').hasClass('home') &&  $("#gome-topad-bg").length > 0 && _index_ad_layer && !_index_float_logo && floatLogo){
    startFloatLogo();
}
