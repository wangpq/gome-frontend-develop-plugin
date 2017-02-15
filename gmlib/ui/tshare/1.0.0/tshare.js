;
/**
 * Created by zhaoyu-ds on 14-7-12.
 */

//document.domain = 'atguat.com.cn';

var Tshare = function(container,options) {
    this.options = {
        title:'分享拿提成',
        button:'一键分享',
        userName:'',
        brokerage:'',
        content:'',
        containerText:'分享拿提成',
        callBackUrl:''
    };
    this.options = $.extend(this.options,options);
    var t = this.options;

    var NewLine = '\n';
    var temp = '';
    temp+='<div id="tshare" class="tshare">'+NewLine;
    temp+='        <iframe width="520" height="406" class="iframe-block" marginwidth="0" marginheight="0" frameborder="0" scrolling="no" ></iframe>'+NewLine;
    temp+='        <div class="hd">'+NewLine;
    temp+='            <span class="hd-title">'+ t.title+'</span> <a href="javascript:;" hidefocus="true" class="tclose"></a>'+NewLine;
    temp+='        </div>'+NewLine;
    temp+='        <div class="cd">'+NewLine;
    temp+='            <!--分享-->'+NewLine;
    temp+='            <div class="default-block">'+NewLine;
    temp+='                <div class="user-bar">'+NewLine;
    temp+='                    <span class="user">'+ t.userName+'</span>'+NewLine;
    temp+='                    <span class="brokerage">预计佣金：<span class="br-price">'+ t.brokerage+'</span></span>'+NewLine;
    temp+='                    <a href="#" class="br-look">查看收益</a>'+NewLine;
    temp+='                </div>'+NewLine;
    temp+='                <div class="s-content">'+NewLine;
    temp+='                    <textarea class="share-contents" >'+ t.content+'</textarea>'+NewLine;
    temp+='                </div>'+NewLine;
    temp+='                    <div class="s-input">还可以输入<span class="characters">41</span>字</div>'+NewLine;
    temp+='                <div class="share-bd">'+NewLine;
    temp+='                    <div class="s-title">'+NewLine;
    temp+='                        <span class="t-share-title">分享到:</span>点击下方图标绑定帐号，绑定越多，提成越多!'+NewLine;
    temp+='                    </div>'+NewLine;
    temp+='                    <div class="s-icons">'+NewLine;
    temp+='                        <label href="https://api.weibo.com/oauth2/authorize?client_id=2537522211&redirect_uri=//s.gome.com.cn/OAuth_weibo/Redirect"  hidefocus="true" class="weibo-icons" value="weibo"><span></span></label><label href="https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=100271288&redirect_uri=//s.gome.com.cn/OAuth_qq/Redirect&scope=get_user_info,add_t,add_pic_t&state=QC" hidefocus="true" class="qq-icons" value="qq"><span></span></label><label href="https://graph.renren.com/oauth/authorize?client_id=97210651d69b43dbb030e209b177164e&response_type=code&scope=publish_blog+publish_feed+publish_share&display=page&redirect_uri=//s.gome.com.cn/OAuth_renren/Redirect" hidefocus="true" class="renren-icons" value="renren"><span></span></label><label href="https://www.douban.com/service/auth2/auth?client_id=0fc273a29cdab7fb2f475ae7d69027f1&response_type=code&scope=commodity_basic_w,community_basic_note,shuo_basic_w&redirect_uri=//s.gome.com.cn/OAuth_douban/Redirect" hidefocus="true" class="douban-icons" value="douban"><span></span></label><label href="//api.kaixin001.com/oauth2/authorize?client_id=207415170195b06090d030e854d93ca1&response_type=code&state=GM_KaiXin&scope=create_diary+create_records&redirect_uri=//s.gome.com.cn/OAuth_kaixin/Redirect" hidefocus="true" class="kaixin-icons" value="kaixin"><span></span></label><label href="https://open.yixin.im/oauth/authorize?client_id=yx819c6b3cb04c4faa9dc8db919c5c164b&response_type=code&&redirect_uri=//s.gome.com.cn/OAuth_yixin/Redirect" hidefocus="true" class="yixin-icons" value="yixin"><span></span></label>'+NewLine;
    temp+='                    </div>'+NewLine;
    temp+='                    <div class="s-error"></div>'+NewLine;
    temp+='                    <div class="t-share-btn-block">'+NewLine;
    temp+='                        <a href="javascript:;" class="t-share-btn share-btn">'+ t.button+'</a>'+NewLine;
    temp+='                    </div>'+NewLine;
    temp+='                </div>'+NewLine;
    temp+='            </div>'+NewLine;
    temp+='            <!--分享成功-->'+NewLine;
    temp+='            <div class="success-block">'+NewLine;
    temp+='                <span class="success-icons"></span>'+NewLine;
    temp+='                <div class="success-title">您已成功一键分享，坐等收益吧！</div>'+NewLine;
    temp+='                <div class="user-bar">'+NewLine;
    temp+='                    <span class="user">'+t.userName+'</span>'+NewLine;
    temp+='                    <span class="brokerage">预计佣金：<span class="br-price">'+t.brokerage+'</span></span>'+NewLine;
    temp+='                    <a href="#" class="br-look">查看收益</a>'+NewLine;
    temp+='                </div>'+NewLine;
    temp+='                <div class="t-share-btn-block">'+NewLine;
    temp+='                    <a href="javascript:;" class="t-share-btn ok-btn">确定</a>'+NewLine;
    temp+='                </div>'+NewLine;
    temp+='            </div>'+NewLine;
    temp+='        </div>'+NewLine;
    temp+='</div>'+NewLine;
    temp+='<div id ="popup-iframe-block" class="popup-iframe-block"><a href="javascript:;" class="close-iframe"></a></div>'+NewLine;

    this.tpl = temp;
    this.nodes = {};
    this.container = $(container);
    this.setup();
}

Tshare.prototype = {
    setup:function(){
        var tpl = this.tpl;
        var contents = this.options.content;

        if(!this.container) return false;
        $(document.body).append(tpl);

        this.init();

        return this;
    },
    init:function(){
        var This = this;
        var parent = $('#tshare');
        this.nodes.parent = parent;
        this.nodes.close = parent.find('.tclose');
        this.nodes.icons = parent.find('.s-icons');
        this.nodes.subBtn = parent.find('.share-btn');
        this.nodes.contents = parent.find('.share-contents');
        this.nodes.error = parent.find('.s-error');
        this.nodes.shareBtn = parent.find('.ok-btn');


        //关闭按钮
        this.nodes.close.on('click',jQuery.proxy(This.close,This));
        this.nodes.shareBtn.on('click',jQuery.proxy(This.close,This));

        this.nodes.icons.children().on('click', This.select);
        this.nodes.subBtn.on('click',jQuery.proxy(This.submit,This));

        this.nodes.contents.on('keyup',jQuery.proxy(This.getLength,This));
        this.nodes.contents.on('mousedown',jQuery.proxy(This.getLength,This));

        //显示输入的长度
        this.getLength();


        $('.close-iframe').on('click',function(){
            $('.popup-iframe-block').hide();
            $('.popup-iframe').remove();
            $('#Overlay').css('zIndex',9999998);
        });

        //delete this.nodes;
    },
    getStatus:function(){
        var icons = this.nodes.icons;
        var This = this;

        $.ajax({
            type: 'GET',
            url: '//s.gome.com.cn/OAuthCheck_ajax',
            dataType : 'jsonp',//jsonp方式
            jsonp: 'callback',
            data:{
                'u':This.options.callBackUrl,
                'c':$.cookie('memberNo')||''
            },
            success:function(data){
                //data = {o:['qq','weibo','renren','douban']};
                var data = data.o;
                //var data = ['sina','tqq'];
                if(data){
                    $.each(data,function(i,item){
                        var icons =  $('.'+item+'-icons');
                        if(icons.length==1){
                            icons.addClass('login '+item+'-check');
                        }
                    })
                    This.shareCheck();
                }
            }
        });
    },
    show:function(){
        var This = this;
        This.getStatus();
        This.nodes.parent.find('.default-block').show();
        This.nodes.parent.find('.success-block').hide();
        pop.layerShow('','tshare');
    },
    shareCheck:function(){
        var icons = this.nodes.icons.children();
        var error = true;
        var noSelect = true;
        var selected = [];
        var This = this;

        This.text = {
            weibo:'分享到新浪微博',
            qq:'分享到腾讯微博',
            renren:'分享到人人网',
            douban:'分享到豆瓣',
            kaixin:'分享到开心网',
            yixin:'分享到易信'
        };

        $.each(icons,function(i,item){
            var c = $(item).attr('class');
            if(c.match(/login/)){
                error = false;
            }
            if(c.match(/check/)){
                noSelect = false;
                selected.push($(item).attr('value'));
            }
            var val = $(item).attr('value');
            $(item).attr("title",'点击'+This.text[val]);
            if(c.match(/login/)&&c.match(/check/)){
                $(item).attr("title",'取消'+This.text[val]);
            }
        });
        if(error){

        }
        else {
            this.nodes.error.html('');
        }

        return {error:error,noSelect:noSelect,selected:selected};
    },
    submit:function(){
        var This = this;
        var items = this.shareCheck();
        if(items.error){
            this.nodes.error.hide().html('<span class="error-icons"></span> <span class="error-text">您还未绑定任何社交账号哦，绑定后才可分享赚佣金~</span>').fadeIn();
            return false;
        }
        if(items.noSelect){
            this.nodes.error.hide().html('<span class="noselect-icons"></span> <span class="noselect-text">请选择您要分享的社交账号</span>').fadeIn();
            return false;
        }

        var content = this.nodes.parent.find('.share-contents').val();

        //lock
        if($('.share-btn').attr('style')){
            return false;
        };
        $('.share-btn').css('background-color','#ccc');
        $.ajax({
            type: 'GET',
            url: '//s.gome.com.cn/onekeyshare_ajax',
            dataType : 'jsonp',
            jsonp: 'callback',
            data:{
                'c':encodeURIComponent(content),
                'o':'_'+items.selected.join('_'),
                'u':encodeURIComponent(location.href),
                'a':'a'
            },
            success:function(data){
                var data = data;
                if(data.success!=''){
                    This.nodes.parent.find('.default-block').hide();
                    This.nodes.parent.find('.success-block').fadeIn();
                }
                $('.share-btn').removeAttr('style');
            }
        });
    },
    select:function(e){
        var c = $(this).attr('class');

        var popup = {
            weibo:{width:640,height:460},
            qq:{width:460,height:600},
            renren:{width:666,height:400},
            kaixin:{width:460,height:486},
            douban:{width:600,height:570},
            yixin:{width:480,height:410}
        };


        if(!c.match(/login/)){
            var value = $(this).attr('value');

            if(value=='kaixin'){
                var opener  = window.open;
                var left = parseInt($('#tshare').css('left'));
                var top = parseInt($('#tshare').css('top'));
                //window.open($(this).attr('href'), null, "height=200, width=400, status=yes, toolbar=no, menubar=no, location=no");
                opener($(this).attr('href'),'newwindow','height='+popup[value].height+',width='+popup[value].width+',top='+(screen.height-popup[value].height)/2+',left='+(screen.width-popup[value].width)/2+',toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,status=no')
            }
            else {
                $('.popup-iframe-block').css({width:popup[value].width,height:popup[value].height}).append('<iframe src="'+$(this).attr('href')+'" width="'+popup[value].width+'" height="'+popup[value].height+'" marginwidth="0" marginheight="0" class="popup-iframe" frameborder="0" scrolling="no" ></iframe>').show();
                pop.layerShow('','popup-iframe-block');
                $('.popup-iframe-block').css('zIndex',10000000);
                $('#Overlay').css('zIndex',9999999);
            }
            e.preventDefault();
        }
        else {
            e.preventDefault();
            var className = $(this).attr("value");
            $(this).toggleClass(className+'-check');
            $(this).closest('#tshare').find('.s-error').html('');
            var val = $(this).attr("title");
            if($(this).hasClass(className+'-check')){
                $(this).attr("title",val.replace('点击','取消'));
            }
            else {
                $(this).attr("title",val.replace('取消','点击'));
            }
        }
    },
    popIframeClose:function(name,status){
        var This = this;
        $('#Overlay').css('zIndex',9999998);
        $('.popup-iframe-block').hide();
        $('.popup-iframe').remove();
        if(status==1){
            This.nodes.parent.find('.s-error').html('');
            var item = This.nodes.parent.find('.'+name+'-icons');
            item.addClass('login '+name+'-check').attr('title','取消'+This.text[name]);
        }
    },
    getLength:function(){
        var This = this;
        var maxstrlen=100;
        var textarea  = this.nodes.contents;
        var i = 0;
        function _getStringLength(str){
            var myLen =0;
            for(;(i<str.length)&&(myLen<=maxstrlen*2);i++){
                if(str.charCodeAt(i)>0&&str.charCodeAt(i)<128){
                    myLen++;
                }
                else{
                    myLen+=2;
                }
            }
            return myLen;
        }

        function _checkWord(textarea){
            var len = maxstrlen;
            var str = textarea.val();
            var myLen = _getStringLength(str);
            var wck = This.nodes.parent.find('.characters');
            if(myLen>len*2){
                textarea.val(str.substring(0,i+1));
                wck.html(0);
            }
            else{
                wck.html(Math.floor((len*2-myLen)/2));
            }
        }
        _checkWord(textarea);
    },
    close:function(){
        //$('#tshare').remove();
        pop.closeLayer('tshare');
    }
}