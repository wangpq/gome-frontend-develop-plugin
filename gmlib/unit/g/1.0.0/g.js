;/**
 * 公共类库
 * 对外暴露g
 * 
 * 您可以更改 但是请保证他的兼容性
 * @author duanqifeng@yolo24.com
 **/

window.g = window.g || {};
//window.exports = g;

;
/*

获取选中城市代码
s=1-4 代表1到4级
s=0 代码区域名称
//g.cityCode(3);
        
如果不传入s或者s是非法值  就返回3级
//g.cityCode("aa")
*/

; (function () {
    window.g = window.g || {};

    function getCookie(c_name) {
        if (document.cookie.length > 0) {　　//先查询cookie是否为空，为空就return ""
            c_start = document.cookie.indexOf(c_name + "=")　　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1　　//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
                c_end = document.cookie.indexOf(";", c_start)　　//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
                if (c_end == -1) c_end = document.cookie.length
                //return unescape(document.cookie.substring(c_start, c_end))　　//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
                return decodeURIComponent(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    }



    g.cityCode = function (s) {

        //s代表城市代码等级  0代表城市区域全名
        s = parseInt(s);
        if (s >= 0 && s <= 4) {

        } else {
            s = 3;
        }

        var result = "";

        var atgregion = getCookie('atgregion') || "11010200|北京北京市朝阳区|11010000|11000000|110102002";

        var arr = atgregion.split('|');

     
        switch (s) {
            case 0:
                result = arr[1];                
                break;
            case 1:
                result = arr[3];
                break;
            case 2:
                result = arr[2];
                break;
            case 3:
                result = arr[0];
                break;
            case 4:
                result = (arr[4] == undefined ? arr[0] + '1'  : arr[4]);
                break;
        }
        return result;
    }

})();

//#region g.url
/*
    各个域名在公共头中已经定义
 * g.url.w3 www域名
 * g.url.g g域名
 */
(function () {
    var $ = jQuery;
    window.g = window.g || {};

    //有些公共头定义的公共变量 多了一个右斜线  
    //这个函数的功能是把这个右斜线去掉
    function del_youXieXian(str) {
        if (str.substr(str.length - 1, 1) == "/") {
            return str.substr(0, str.length - 1);
        } else {
            return str;
        }
    }

    var url = {
        w: del_youXieXian(staSite),
        item: del_youXieXian(staSite.replace('www', 'item')),
        //cookieDomain: del_youXieXian(cookieDomain),
        js: del_youXieXian(stageJsServer),
        css: del_youXieXian(stageCssServer),
        img: del_youXieXian(stageImageServer),
        login: del_youXieXian(staSite.replace('www', 'login')),
        reg:del_youXieXian(staSite.replace('www', 'reg')),
        //w3: staSite,
        desc: del_youXieXian(staSite.replace('www', 'desc')),//'http://desc.atguat.com.cn'
        contextPath: contextPath,
        getParam: function (param) {
            var result = {};

            if (location.search.indexOf("?") != -1) {

                var str = location.search.substr(1);

                strs = str.split("&");

                for (var i = 0; i < strs.length; i++) {

                    if (strs[i].split('=').length !== 2) {//过滤不规则url
                        continue;
                    }
                    result[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }

            if (result[param] == undefined) {
                result[param] = "";
            }

            return result[param];
        },
        g: del_youXieXian(dynSite)
    }
    g.url = url;
})();
//#endregion


//#region g.ajax
/*
 * 
 */
//g.ajax
; (function () {
    var $ = jQuery;
    ajax = function () {
        
        if ((typeof arguments[0]) != "string") {
            return;
        }

        var url = undefined;
        var data = {};
        var success = undefined;
        var ajaxConfig = {};

        //判断输入的参数
        if (arguments.length == 1) {//g.ajax('a.jsp')
            url = arguments[0];
            data = {};
            //success = function () { };
        } else if (arguments.length == 2) {//g.ajax('a.jsp',{})
            if ((typeof arguments[1]) == "function") {
                url = arguments[0];
                success = arguments[1];
            } else {
                url = arguments[0];
                data = arguments[1];
            }
        } else if (arguments.length == 3 && (typeof arguments[2]) == "function") {  //g.ajax('a.jsp',{},function(){})
            url = arguments[0];
            data = arguments[1];
            success = arguments[2];
        } else if (arguments.length == 3 && (typeof arguments[2]) == "object") {//g.ajax('a.jsp',{},{timeout:1000})
            url = arguments[0];
            data = arguments[1];
            ajaxConfig = arguments[2];
        } else if (arguments.length == 4) {
            url = arguments[0];
            data = arguments[1];
            ajaxConfig = arguments[2];
            success = arguments[3];
        }


        //if (ajaxConfig.site == undefined) {
        //    url = g.url.g + url;
        //} else if ((typeof ajaxConfig.site) == "string" && ajaxConfig.site.indexOf('g') >= 0) {
        //    url = g.url.g + url;
        //} else if ((typeof ajaxConfig.site) == "string" && ajaxConfig.site.indexOf('w') >= 0) {
        //    url = g.url.w + url;
        //} else if ((typeof ajaxConfig.site) == "string" && ajaxConfig.site.indexOf('f') >= 0) {
        //    url = url;
        //} else {
        //    url = url;
        //}

        if ((typeof ajaxConfig.site) == "string" && ajaxConfig.site.indexOf('g') >= 0) {
            url = g.url.g + url;
        } else if ((typeof ajaxConfig.site) == "string" && ajaxConfig.site.indexOf('w') >= 0) {
            url = g.url.w + url;
        } else if ((typeof ajaxConfig.site) == "string" && ajaxConfig.site.indexOf('f') >= 0) {
            url = url;
        } else if (data.site && data.site.indexOf('g') >= 0) {
            url = g.url.g + url;
        } else if (data.site && data.site.indexOf('w') >= 0) {
            url = g.url.w + url;
        } else if (data.site && data.site.indexOf('f') >= 0) {
            url = url;
        } else if(data.site && data.site.indexOf('s') >= 0){
            url = "//ss" + cookieDomain + url;
        } else {//没有配置 就给g域名
            url = g.url.g + url;
        }

        if (data.site) {
            delete data.site;
        }

        var ajaxdata = {
            type: 'get',
            url: url,
            data: data,
            dataType: 'jsonp',
            jsonpName: (data.callback == undefined ? ("cb_" + parseInt((Math.random() * 1000000000000000))) : data.callback),
            success: function (data) {
                success && success(data)
            }
        };

        if (data.callback) {
            delete data.callback;
        }

        if ((typeof ajaxConfig) == "object") {
            $.extend(ajaxdata, ajaxConfig)
        }

        return $.ajax(ajaxdata);
    }
    window.g = window.g || {};
    g.ajax = ajax;
})();

//#endregion

//#region ajax 订阅发布器

; (function () {
    function PubsubAJAX(ajax) {
        this._endfn = [];//结束函数
        this._subs = [];//主过程函数
        this._init = [];//初始信息

        this._endStatus = false;

        this.setAJAX = ajax;
    }
    PubsubAJAX.prototype = {

        publish: function () {
            var _this = this;

            for (var i = 0; i < _this._init.length; i++) {
                if (_this._init[i]() == false) {
                    return;
                }
            }

            this._endStatus = false;

            if ((typeof this.setAJAX) == 'function') {
                this.setAJAX().done(function (data) {
                    for (var i = 0; i < _this._subs.length; i++) {
                        _this._subs[i](data);
                    }
                    _this._endStatus = true;

                    for (var i = 0; i < _this._endfn.length; i++) {
                        _this._endfn[i](data);
                    }
                });
            } else {
                for (var i = 0; i < _this._subs.length; i++) {
                    _this._subs[i](data);
                }
                _this._endStatus = true;
                for (var i = 0; i < _this._endfn.length; i++) {
                    _this._endfn[i](data);
                }
            }
        },
        init: function (fn) {
            fn && this._init.push(fn);
        },
        addSub: function (fn) {
            fn && this._subs.push(fn);
        },
        end: function (fn) {
            fn && this._endfn.push(fn);
        },
        endStatus: function () {
            return this._endStatus;
        }
    }

    window.g = window.g || {};
    g.Pubsub = PubsubAJAX;

})();
//var p = new PubsubAJAX(function () {
//    return g.ajax('/ec/navigation/gome/index/loginStyle.jsp');
//});


//p.addSub(function (data) {
//    console.log(1);
//})
//p.addSub(function (data) {
//    console.log(2);
//})

//p.publish();

//#endregion

//#region 登录组件

//弹层
; (function (exports) {
    var $ = jQuery;
	 var curProtocol = window.location.protocol.split(':')[0];
	 var callbackUrl = g.url.g.indexOf(location.host) >= 0 ? ("http://" + location.host + "/ec/homeus/glogin_callback.html") : "http://" + location.host + "/glogin_callback.html";
	  if (curProtocol === 'https') {
			callbackUrl=g.url.g.indexOf(location.host) >= 0 ? ("//" + location.host + "/ec/homeus/glogin_callback.html") : "//" + location.host + "/glogin_callback.html";
	  }

    var conf = {
        loaded:false,
        login_url: (function () {
            if (g.url.login.indexOf("atgsit") > 0 || g.url.login.indexOf("atguat") > 0 || g.url.login.indexOf("gomeprelive") > 0) {
                return g.url.login
            }else {
                return g.url.login.replace('http', 'https');
            }
        })() + '/popLogin.no?callbackHost=' + callbackUrl + "&orginURI=" + location.href,
        reg_url: (function () {
            if (g.url.reg.indexOf("atgsit") > 0 || g.url.reg.indexOf("atguat") > 0 || g.url.reg.indexOf("gomeprelive") > 0) {
                return g.url.reg;
            }else {
                return g.url.reg.replace('http', 'https');
            }
        })() + '/register/index/pop.no?callbackHost=' + callbackUrl + "&orginURI=" + location.href,

        verifyUserUrl: g.url.login + '/redirectResetPwd.no?loginType=1',//login.atgsit.com.cn/redirectResetPwd.no?loginType=1
        loginbg: $('<div style="position:fixed;top:0;left:0; width:100%;height:100%;  background:#000;opacity:0.15;  filter:alpha(opacity=15); display:none;"></div>'),
        loginfrm: $('<iframe id="loginFrame" scrolling="no"  frameborder="0" style="z-index:2; width:462px;height:605px; position:fixed;   background-color:transparent; " allowTransparency="true"></iframe>'),
        zIndex: 10000,
        show: function (userName) {
             
            conf.loginbg
                 .show()
                 .css('zIndex', conf.zIndex);             

            conf.loginfrm.remove();

            conf.loginfrm = $('<iframe scrolling="no"  frameborder="0" style="z-index:2; width:462px;height:605px; position:fixed;   background-color:transparent; " allowTransparency="true"></iframe>');
            $('body').append(conf.loginfrm);
            conf.loginfrm.attr('src', conf.src + "&orginURI=" + location.href + ((userName ==undefined ||userName =="")?'':"&userName=" + userName) + "&_t=" + parseInt((Math.random() * 1000000000000)));
            conf.loginfrm.show().css({
                left: ($(window).innerWidth() - conf.loginfrm.width()) / 2,
                top: ($(window).height() - conf.loginfrm.height()) / 2,
                zIndex: conf.zIndex + 1
            });

        },
        verifyUser_Show: function () {
            conf.loginbg
              .show()
              .css('zIndex', conf.zIndex);

            conf.loginfrm.show().css({
                left: ($(window).innerWidth() - conf.loginfrm.width()) / 2,
                top: ($(window).height() - conf.loginfrm.height()) / 2,
                zIndex: conf.zIndex + 1
            }).attr('src', conf.verifyUserUrl +  '&callbackHost=' + callbackUrl + "&orginURI=" + location.href    + "&_t=" + parseInt((Math.random() * 1000000000000)));
        },
        login_open: function (userName) {
            //document.domain = 'gome.com.cn';
            conf.loginbg
              .show()
              .css('zIndex', conf.zIndex);

            conf.loginfrm.remove();

            conf.loginfrm = $('<iframe id="loginFrame" scrolling="no"  frameborder="0" style="z-index:2; width:462px;height:605px; position:fixed;   background-color:transparent; " allowTransparency="true"></iframe>');
            $('body').append(conf.loginfrm);
            //console.log(conf);
            conf.loginfrm.attr('src', conf.login_url + ((userName ==undefined ||userName =="")?'':"&userName=" + userName) + "&_t=" + parseInt((Math.random() * 1000000000000)));
            conf.loginfrm.show().css({
                left: ($(window).innerWidth() - conf.loginfrm.width()) / 2,
                top: ($(window).height() - conf.loginfrm.height()) / 2,
                zIndex: conf.zIndex + 1
            });

            /**
             *
             * @type {number}
             */
            var callback = window.setInterval(function() {

                var ifr = document.getElementById('loginFrame');
                try{
                    //console.log(ifr.src);//?option_callback=1
                    if( (ifr.src == 'http://www.gome.com.cn/glogin_callback.html') || (ifr.src =='https://www.gome.com.cn/glogin_callback.html') ) {
                        //alert(ifr.src);

                        var option_callback = 1;

                        option_callback = parseInt(option_callback);
                        //console.log("option_callback:" + option_callback)

                        //以下值 只能添加 不能删除
                        switch (option_callback) {
                            case 0:
                                g.login.callback();
                                break;
                            case 1://登录成功
                                g.login.callback(true);
                                break;
                            case 2://校验用户
                                g.login.verifyUser();
                                break;
                            case 3://弹出登录框
                                g.login.login_open(getParam("userName"));
                                break;
                            case 4://弹出注册
                                g.login.reg_open();
                                break;
                            case 10://嵌入登录层 回调
                                g.embedLogin.callback(true);
                                break;
                            case 11://嵌入登录层 登录
                                g.embedLogin.start_login();
                                break;
                            case 12://嵌入登录层 注册
                                g.embedLogin.start_reg();
                                break;
                            default:
                                g.login.callback();
                                break;
                        }

                        clearInterval(callback);
                    }

                }catch(ex){
                    clearInterval(callback);
                }
            }, 1000);
        },
        reg_open: function () {

            conf.loginbg
            .show()
            .css('zIndex', conf.zIndex);

            conf.loginfrm.remove();

            conf.loginfrm = $('<iframe scrolling="no"  frameborder="0" style="z-index:2; width:462px;height:605px; position:fixed;   background-color:transparent; " allowTransparency="true"></iframe>');
            $('body').append(conf.loginfrm);
            conf.loginfrm.attr('src', conf.reg_url + "&_t=" + parseInt((Math.random() * 1000000000000)));
            conf.loginfrm.show().css({
                left: ($(window).innerWidth() - conf.loginfrm.width()) / 2,
                top: ($(window).height() - conf.loginfrm.height()) / 2,
                zIndex: conf.zIndex + 1
            });
        },
        close: function () {
            conf.loginbg.hide();
            conf.loginfrm.hide().removeAttr("src");
            //document.domain = location.host;
        }, 
        callback: function () { }
    } 
    login = function (fn,reg) {
        if (conf.loaded == false) {
            conf.loaded = true;
            $('body').append(conf.loginbg);
        }

        if (login.running == true) {
            return;
        }
        login.running = true;

       // conf.fn = null;

        $.ajax({
            type: 'get',
            url: '//member'+cookieDomain+'/gome/index/loginStyle',
            dataType: 'jsonp',
            jsonpName :"loginStyle"
        }).done(function(data){
            login.running = false;
            if (data.loginStatus >= 3) {
                loginData=data;//add
                fn && fn();
            } else {
                conf.fn = fn;
                ("reg" == reg) ? conf.reg_open() : conf.login_open();//通常走登录 不走注册
            }
        });
 
    };

    login.callback = function (logined) {
        conf.close();
        if (logined) {
            if (window.signData) { //有头部
                 signData.getUser();
             }
            login(function(){
                conf.fn &&  conf.fn();
            });
          //  conf.fn && conf.fn();
          //  if (window.signData) {
          //      //signData.lazyCartEnd = false;
          //      signData.loginEnd = false;
          //      signData.gloginfn = conf.fn;
          //      signData.init();
          //  } else {
          //      conf.fn && conf.fn();
          //  }                
        };       
    }

    login.close = function () { };
    login.verifyUser = function () {//弹层校验用户
        conf.close();
        conf.verifyUser_Show();
    }    
    login.login_open = function (userName) {
        conf.close();
        conf.login_open(userName);
    }
    login.reg_open = function () {
        conf.close();
        conf.reg_open()
    }

    login.config = function (obj) {
        conf = $.extend(conf, obj);
    }

    exports.login = login;
})(g);

//嵌入登录层
(function (exports) {
    var $ = jQuery;

    var curProtocol = window.location.protocol.split(':')[0];
     var callbackUrl = g.url.g.indexOf(location.host) >= 0 ? ("http://" + location.host + "/ec/homeus/glogin_callback.html") : "http://" + location.host + "/glogin_callback.html";
      if (curProtocol === 'https') {
            callbackUrl=g.url.g.indexOf(location.host) >= 0 ? ("//" + location.host + "/ec/homeus/glogin_callback.html") : "//" + location.host + "/glogin_callback.html";
      }

    var embedLogin = {
        start: function (option) {

            $.extend(embedLogin.config, option);

            if (!embedLogin.config.wrap) {
                return;
            }

            embedLogin.config.frm.remove();
            embedLogin.config.frm = $('<iframe scrolling ="no" style="height: 315px; width: 294px;" frameborder="0"></iframe>');

            embedLogin.callback = option.callback;

            $(embedLogin.config.wrap).append(embedLogin.config.frm);
            embedLogin.config.frm.attr('src', embedLogin.config.src_login + "?callbackHost=" + callbackUrl + (embedLogin.config.toSite ? "&toSite=" + embedLogin.config.toSite : ""));
        },
        start_login: function () {
            //if (!embedLogin.config.wrap) {
            //    return;
            //}
            embedLogin.config.frm.remove();
            embedLogin.config.frm = $('<iframe scrolling ="no" style="height: 315px; width: 294px;" frameborder="0"></iframe>');
            $(embedLogin.config.wrap).append(embedLogin.config.frm);

            embedLogin.config.frm.attr('src', embedLogin.config.src_login + "?callbackHost=" + callbackUrl + (embedLogin.config.toSite ? "&toSite=" + embedLogin.config.toSite : ""));
        },
        start_reg: function () {
            //if (!embedLogin.config.wrap) {
            //    return;
            //}
            embedLogin.config.frm.remove();
            embedLogin.config.frm = $('<iframe scrolling ="no" style="height: 315px; width: 294px;" frameborder="0"></iframe>');
            $(embedLogin.config.wrap).append(embedLogin.config.frm);

            embedLogin.config.frm.attr('src', embedLogin.config.src_reg + "?callbackHost=" + callbackUrl + (embedLogin.config.toSite ? "&toSite=" + embedLogin.config.toSite : ""));
        },
        config: {
            callback:undefined,
            // wrap: '',
            frm: $('<iframe scrolling ="no" style="height: 315px; width: 294px;" frameborder="0"></iframe>'),
            src_login: g.url.login + '/embedLogin.no',
            src_reg: g.url.reg + '/register/index/embed.no',
            toSite:undefined
        },
        callback: function (logined) {
            if (logined) {
                //console.log(embedLogin.config.frm.eq(0))
                embedLogin.config.frm.remove();
                embedLogin.config.callback && embedLogin.config.callback();                
            }
        }
    };

    exports.embedLogin = embedLogin;

})(g);

//#endregion

//#region Dialog
; (function (exports) {
    var $ = jQuery;
    var bg_Dialog = $('<div class="Dialog_bg"></div>');   
    var add_bg_Dialog = false;

    function Dialog(dom, config) {

        if (!add_bg_Dialog) {
            add_bg_Dialog = true;
            $('body').append(bg_Dialog);
        }

        config = config || {}
        this.config = config;
        this.config.zIndex = config.zIndex || 10000;
        this._bg_Dialog = bg_Dialog;
        this._dom = dom;

        this._wrap = $('<div class="Dialog"></div>');
        this._wrap.append(dom);
        $('body').append(this._wrap);

        if (config.closeBtn != false) {
            this._closeBtn = $('<a class="closeBtn" href="javascript:;">╳</a>');
            this._wrap.append(this._closeBtn);
            var _this = this;
            this._closeBtn.click(function () {
                _this.close();
            })
        }
        dom.show();
    }

    Dialog.prototype = {
        open: function (fn) {
            if (fn) {
                var result = fn();
                if (result == false) {
                    return;
                }
            }
            var _this = this;

            var ie6 = window.navigator.userAgent.indexOf('IE6') > 0;

            this._bg_Dialog
                .show()
                .css({
                    'z-index': this.config.zIndex - 1
                });

            this._wrap.show().css({
                top: $(window).height() / 2 - this._dom.height() / 2 + (ie6 ? $(window).scrollTop() : 0),
                left: $(window).width() / 2 - this._dom.width() / 2 + (ie6 ? $(window).scrollLeft() : 0),
                'z-index': _this.config.zIndex
            });
        },
        close: function (fn) {
            if (fn) {
                var result = fn();
                if (result == false) {
                    return;
                }
            }

            this._bg_Dialog.hide();

            if (this.config.isDestroy) {
                this._wrap.remove();
                //this._wrap.hide();
            } else {
                this._wrap.hide();
            }
        }
    };

    exports.Dialog = Dialog;
})(g);

//#endregion

//#region addcart
; (function (exports) {
    var $ = jQuery;
    var wrap;
    
    var addcartDialog;
    var errorDialogHTML  ;
     
    var addcart_errorDialog;

    function addCart(data, extend) {

        (function () {
            wrap = $('<div class="addCart-box">' +
                        '<div class="addCart-loading">正在添加商品到购物车...</div>' + //正在添加购物车

                        '<div class="addCart-state-success dn">' +//添加成功
                            '<span class="addCart-state-icon"></span>' +
                            '<h5 class="addCart-state">添加成功</h5>' +
                            '<p class="addCart-info">购物车共有<b class="totalQuantity highlight">5</b>件商品，商品总价：<b class="highlight totalAmount">¥3122.00</b></p>' +
                            '<div class="addCart-btn">' +
                                '<a class="addCart-gotoCart" href="' + g.url.g + '/ec/homeus/cart/cart.jsp">去购物车结算&nbsp;&gt;</a>' +
                                '<a class="addCart-shopping">继续购物</a>' +
                            '</div>' +
                        '</div>' +

                        '<dl class="addCart-bulkData">' +//底下的推荐
                                    '<dt class="bulkData-title">购买了此商品的用户还购买了：</dt>' +
                                    //<dd class="bulkData-item">
                                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-pic"><img width="80" height="80" src="http://img2.gomein.net.cn/image/prodimg/production_image/201407/15/1121490033/20141202175941j473282536-bq_80.jpg" alt=""></a>
                                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-name">康佳（KONKA）LED40F1500C  40英寸彩电窄边框 超薄节能低耗LED（黑色边框）</a>
                                    //    <b class="bulkData-price">¥1999.0</b>
                                    //</dd>
                                    //<dd class="bulkData-item">
                                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-pic"><img width="80" height="80" src="http://img2.gomein.net.cn/image/prodimg/production_image/201407/15/1121490033/20141202172448S668344935-bq_80.jpg" alt=""></a>
                                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-name">康佳（KONKA）LED40F1500C  40英寸彩电窄边框 超薄节能低耗LED（黑色边框）</a>
                                    //    <b class="bulkData-price">¥1999.0</b>
                                    //</dd>
                                    //<dd class="bulkData-item">
                                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-pic"><img width="80" height="80" src="http://img2.gomein.net.cn/image/prodimg/production_image/201407/15/1121490033/20141202172448S668344935-bq_80.jpg" alt=""></a>
                                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-name">康佳（KONKA）LED40F1500C  40英寸彩电窄边框 超薄节能低耗LED（黑色边框）</a>
                                    //    <b class="bulkData-price">¥1999.0</b>
                                    //</dd>
                                    //<dd class="bulkData-item">
                                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-pic"><img width="80" height="80" src="http://img2.gomein.net.cn/image/prodimg/production_image/201407/15/1121490033/20141202172448S668344935-bq_80.jpg" alt=""></a>
                                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-name">康佳（KONKA）LED40F1500C  40英寸彩电窄边框 超薄节能低耗LED（黑色边框）</a>
                                    //    <b class="bulkData-price">¥1999.0</b>
                                    //</dd>
                        '</dl>' +
                  '</div>'
        );

            $('body').append(wrap);


            addcartDialog = new g.Dialog(wrap);
            wrap.find('.addCart-shopping').click(function () {
                addcartDialog.close();
            })

            errorDialogHTML = $('<div class="addCart-state-failed">' +
                                '<span class="addCart-state-icon"></span>' +
                                '<p>您购物车中的相同商品购买数量<span class="highlight">不能大于<b>20</b>件</span></p>' +
                                '<p>请您&nbsp;<a href="' + g.url.g + '/ec/homeus/myaccount/customer/customer.jsp' + '" class="link"><b>点击此链接</b></a>&nbsp;联系客服购买！</p>' +
                            '</div>');
            $('body').append(errorDialogHTML);
            addcart_errorDialog = new g.Dialog(errorDialogHTML);

        })();

        extend = extend || { showDialog: true };

        $('.addCart-loading').show();
        $('.addCart-state-success').hide();

        $.ajax({
            type: 'get',
            url: addCart.config.url_addCart,
            data: {
                method: data.method || 'homeus.addNormalItemToOrder',
                params: JSON.stringify($.extend(data, addCart.config.data))
            },
            dataType: 'jsonp'
        }).done(function (data) {
            extend.callback && extend.callback(data);
        }).done(function (data) {
            if (data.result && data.result.cart) {//添加成功
                wrap.find('.addCart-loading').hide();
                wrap.find('.addCart-state-success').show();
                wrap.find('.totalQuantity').html(data.result.cart.cartSummary.totalQuantity);
                wrap.find('.totalAmount').html("¥" + data.result.cart.cartSummary.totalAmount);
            }
        }).done(function (data) {//添加失败

            if (data.result && data.result.cart) {
                return;
            }
            var _dat = data;

            if (_dat.error && _dat.error.data) {
                var _err = _dat.error.data, _cde = _err.code, _txt = "", _typ = "件";

                //由于购物车遗留问题 无法返回对应错误信息
                //如果有出现这个值  下面的提示信息就不一样了
                var useriderror = false;

                switch (_cde) {
                    case 'gomeSKU':
                        _txt = "您购物车中的商品种类"
                        _typ = "种"
                        break
                    case 'bookSKU':
                        _txt = "您购物车中的图书种类"
                        _typ = "种"
                        break
                    case 'bbcSKU':
                        _txt = "您购物车中的店铺商品种类"
                        _typ = "种"
                        break
                    case 'gomeQuantity':
                        _txt = "您购物车中的相同商品购买数量"
                        break
                    case 'bookQuantity':
                        _txt = "您购物车中的相同图书购买数量"
                        break
                    case 'bbcQuantity':
                        _txt = "您购物车中的相同店铺商品购买数量"
                        break;
                    case 'bbcQuantityForLimitBuy':
                        _txt = _dat.error.data.message;
                        break;
                    default:
                        _txt = "您购物车中的相同商品购买数量";
                        useriderror = true;

                }
                /**弹出方式*/
                if (window.useriderror == true) { //部分老用户不能添加购物车 给出的提示 以后把这个提示加上
                    errorDialogHTML.html("该商品暂无法购买，请您联系客服解决：4008-708-708");
                } else if (_err.code == "bbcQuantityForLimitBuy") {//限购提示
                    _htm = '<div class="errorTxt">' + _txt + '</div>';
                    _this.dialog({ inner: "#dialogEr", cssname: "dialogBox Er", errIco: "warn", errMsg: _htm });
                } else if (_typ == "件") {
                    errorDialogHTML = '<div class="addCart-state-failed">' +
                                        '<span class="addCart-state-icon"></span>' +
                                        '<p>' + _txt + '<span class="highlight">不能大于<b>' + _err.quantityMax + '</b>件</span></p>' +
                                        '<p>请您&nbsp;<a href="' + g.url.g + '/ec/homeus/myaccount/customer/customer.jsp' + '" class="link"><b>点击此链接</b></a>&nbsp;联系客服购买！</p>' +
                                      '</div>';
                } else if (_typ == "种") {
                    errorDialogHTML = '<div class="addCart-state-failed">' +
                                      '<span class="addCart-state-icon"></span>' +
                                      '<p>' + _txt + '已达上限(' + _err.quantityMax + _typ + ')！</p>' +
                                     // '<p>请您&nbsp;<a href="' + g.url.g + '/ec/homeus/myaccount/customer/customer.jsp' + '" class="link"><b>点击此链接</b></a>&nbsp;联系客服购买！</p>' +
                                    '</div>';
                }
            } else {
                errorDialogHTML.html('添加异常！请重试！');
            }
            addcartDialog.close();
            addcart_errorDialog.open();
        });


        addcartDialog.open();

        setTimeout(function () {
            g.ajax("//bigd.gome.com.cn/gome/dataOrderAssociate", {
                'pid': data.productId,
                area: g.cityCode(),
                'size': 4,
                'imagesize': 80,
                callbackparam: 'dataOrderAssociateService',
                callback: 'dataOrderAssociateService',
                site: 'f'
            }).done(function (data) {
                wrap.find('.addCart-bulkData')
                    .html("")
                    .html(
                        '<dt class="bulkData-title">购买了此商品的用户还购买了：</dt>' +
                        //<dd class="bulkData-item">
                        //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-pic"><img width="80" height="80" src="http://img2.gomein.net.cn/image/prodimg/production_image/201407/15/1121490033/20141202175941j473282536-bq_80.jpg" alt=""></a>
                        //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-name">康佳（KONKA）LED40F1500C  40英寸彩电窄边框 超薄节能低耗LED（黑色边框）</a>
                        //    <b class="bulkData-price">¥1999.0</b>
                        //</dd>
                        ''
                        );

                var html = "";

                for (var i = 0 ; i < data.productList.length; i++) {
                    html += '<dd class="bulkData-item">' +
                                '<a href="' + data.productList[i].detailHref + ' title="' + data.productList[i].dispName + '" class="bulkData-pic" target="_blank"><img width="80" height="80" src="' + data.productList[i].imgUrl + '" alt="' + data.productList[i].dispName + '"></a>' +
                                '<a href="' + data.productList[i].detailHref + ' title="' + data.productList[i].dispName + '" class="bulkData-name" target="_blank">' + data.productList[i].dispName + '</a>'
                    '</dd>';

                    //<dd class="bulkData-item">
                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-pic"><img width="80" height="80" src="http://img2.gomein.net.cn/image/prodimg/production_image/201407/15/1121490033/20141202175941j473282536-bq_80.jpg" alt=""></a>
                    //    <a track="6:9132573445" href="#" target="_blank" title="" class="bulkData-name">康佳（KONKA）LED40F1500C  40英寸彩电窄边框 超薄节能低耗LED（黑色边框）</a>
                    //    <b class="bulkData-price">¥1999.0</b>
                    //</dd>
                }

                wrap.find('.addCart-bulkData')
                    .css({ visibility: 'visible' })
                    .html("")
                    .html('<dt class="bulkData-title">购买了此商品的用户还购买了：</dt>' + html);
            });
        });


        //if (extend.showDialog == true) {//提示框
        //    //var addcartDialog = new g.Dialog($('body').append('div'));

        //    var wrap = $('<div></div>');

        //    $('body').append(wrap);
        //    var addcartDialog = new g.Dialog(wrap);

        //}
    }

    addCart.config = {
        url_addCart: g.url.g + "/ec/homeus/support/add.jsp",
        url_cart: '',
        data: {
            //productId: prdInfo.prdId,
            //catalogRefId: prdInfo.sku,
            addItemCount: 1,

            ////延保
            //warrantyProId: warrantyProId,
            //warrantySkuId: warrantySkuId,

            quantity: 1,//购买数量
            //warrantyQuantity: 1, 	//购买数量

            ////唯品会
            //'addCartData.activeId': prdInfo.programId,
            //'addCartData.activityType': "VipPrice",

            method: 'homeus.addNormalItemToOrder'//(prdInfo.isprd3d ? '3dSite.addNormalItemToOrder' : 'homeus.addNormalItemToOrder')
        }
    }

    exports.addCart = addCart;
})(g);
//#endregion
;