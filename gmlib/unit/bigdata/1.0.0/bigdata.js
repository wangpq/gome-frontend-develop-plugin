/**
 * updata time 2016-11-15 18:00
 * *数据统计统一埋码
 * * qyy
 * */
/*定义stm v4*/
window["ClickiTrackerName"] = 'gomeClicki';
window.gomeClicki = window.gomeClicki || function() {(window.gomeClicki.queue = window.gomeClicki.queue || []).push(arguments);}
window.gomeClicki.start = +new Date;

/*发送stm v4 pv*/
gomeClicki('create', document.location.href.search(/\.gome\.com\.cn/) < 0 ? "dc-6" : "dc-1", "auto", {
    clientId: (function(a) {
        var c, cookie = function(n) {
            var v = document.cookie.match("(?:^|;)\\s*" + n + "=([^;]*)");
            return v ? unescape(v[1]) : void 0;
        }
        while(a.length)
            if (c = cookie(a.shift()))
                return c;
    }(['__clickidc', '__c_visitor']))
});
gomeClicki('set', (function(){
    var customer = {};
    // 设置与获取cmpid，30分钟内多次来源会拼接
    // customer.dimension1 = (function(){function k(a){var b=new Date,c=arguments;if(1<c.length){var d=c[2]||0,e=c[3]||"/",f=c[4]||0,g=c[5]||0;d&&b.setTime(b.getTime()+1E3*d);document.cookie=a+"="+escape(c[1])+(d?"; expires="+b.toGMTString():"")+("; path="+e)+(f?"; domain="+f:"")+(g?"; secure":"");return c[1]}return(b=document.cookie.match("(?:^|;)\\s*"+a+"=([^;]*)"))?unescape(b[1]):0}var a=k("cmpid"),b,c;a&&null!=a&&void 0!=a&&""!=a&&(b=a.split("^!"),c=b[b.length-1]);var d="";b=/(^|\?|&)cmpid=([^&]*)(&|$)/;b=location.href.replace(/#$/,
    // "").match(b);if(null!=b&&b[2]!=c)a&&null!=a&&void 0!=a&&""!=a&&(d=a+"^!"),d+=b[2];else if(null!=b||null==document.referrer||""==document.referrer||a&&null!=a&&void 0!=a&&""!=a)d=a&&null!=a&&void 0!=a&&""!=a?a:"direct";else{var a=document.referrer,d=!1,e,g;c=[];c=[["www.baidu.com","baidu"],["m.baidu.com","baidum"],["www.sogou.com","sogou"],["www.soso.com","soso"],["www.yahoo.","yahoo"],["www.google.com","google"],["www.haosou.com","360"],["m.haosou.com","360m"],["www.youdao.com","youdao"],[".bing.com",
    // "bing"],["m.sm.cn","sm"]];var h=/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.exec(a)[0];c[0][0]==h&&(d=!0,e=c[0][1],b=/(^|\?|&)wd=([^&]*)(&|$)/,g=a.match(b)[2]);c[1][0]==h&&(d=!0,e=c[1][1],b=/(^|\?|&)word=([^&]*)(&|$)/,g=a.match(b)[2]);for(var f=2;4>f;f++)c[f][0]==h&&(d=!0,e=c[f][1],b=/(^|\?|&)query=([^&]*)(&|$)/,g=a.match(b)[2]);c[4][0]==h&&(d=!0,e=c[4][1],b=/(^|\?|&)p=([^&]*)(&|$)/,g=a.match(b)[2]);for(f=5;f<c.length;f++)-1!=h.indexOf(c[f][0])&&(d=!0,e=c[f][1],b=/(^|\?|&)q=([^&]*)(&|$)/,
    // g=a.match(b)[2]);d?d="seo_"+e+"_"+g:(e=a.split("/")[2],d="gome"!=e.split(".")[1]?"yj_"+e:"direct")}e=location.hostname.split(".");k("cmpid",d,1800,null,/^\d+$/.test(e.join(""))||3>e.length?location.hostname:e.slice(1).join("."));return d})();
    // // 设置页面类型，着陆页页面类型
    // customer.dimension2 = pageType;
    // 获取页面上一页路径
    if(document.referrer != "") customer.dimension3 = document.referrer;
    // 产品与品类相关信息
    ("undefined" != typeof dsp_gome_c1name) && (
        customer.dimension4 = dsp_gome_c1name, 
        customer.dimension5 = dsp_gome_c2name, 
        customer.dimension6 = dsp_gome_c3name, 
        customer.dimension7 = dsp_gome_c1id, 
        customer.dimension8 = dsp_gome_c3id);
    ("undefined" != typeof prdInfo) && (
        customer.dimension4 = prdInfo.firstCategoryName, 
        customer.dimension5 = prdInfo.secondCategoryName, 
        customer.dimension6 = prdInfo.thirdCategoryName, 
        customer.dimension7 = prdInfo.firstCategoryId, 
        customer.dimension8 = prdInfo.thirdCategoryId, 
        customer.dimension9 = prdInfo.prdId, 
        customer.dimension10 = prdInfo.prdName, 
        customer.dimension13 = prdInfo.sku,
        prdInfo.shopNo !== "" && (customer.dimension14 = prdInfo.shopNo),
        prdInfo.itemId !== "" && (customer.dimension15 = prdInfo.itemId),
        customer.metric1 = 1);
    ("undefined" != typeof itemId) && (
        customer.dimension15 = itemId,
        "undefined" != typeof prodid) && (
        customer.dimension9 = prodid);
    var mallId = $("#c8_shop_mId").val();
    mallId && (customer.dimension14 = mallId);
    // 设置landingPage的utm参数
    // if(window.location.href.indexOf('cmpid=') > -1) {
    //     var url = document.location.href;
    //     var search = document.location.search;
    //     var hostname = document.location.hostname;
    //     var path = document.location.pathname;
    //     var hash = document.location.hash;
    //     var cmpid = search.replace(/^\?.*cmpid=([^&]*)(&.*)?$/i, "$1").split("_");
    //     var utm = '';
    //     customer.dimension12 = cmpid.join("_");
    //     cmpid.length && (utm += '&utm_campaign=' + encodeURIComponent(cmpid.shift())) && cmpid.length && (utm += '&utm_source=' + encodeURIComponent(cmpid.shift())) && cmpid.length &&  (utm += '&utm_medium=' + encodeURIComponent(cmpid.shift())) && cmpid.length && (utm += '&utm_content=' + encodeURIComponent(cmpid.shift())) && cmpid.length && (utm += '&utm_term=' + encodeURIComponent(cmpid.join('_')));
    //     customer.location = document.location.protocol + '//' + hostname + path + search + utm + hash;
    // }
    return customer
})());
gomeClicki('send', 'pageview');
/*2015-06-23 18:06:40 */
!function(a,b,c){function d(){}function e(a){return"function"==typeof a}function f(a){return"[object Array]"==pa.call(Object(a))}function g(a){return void 0!=a&&-1<(a.constructor+"").indexOf("String")}function h(a,b){if(g(a)&&(a=b[a]),!e(a))return d;var c=oa.call(arguments,2);return function(){return a.apply(b,c.concat(oa.call(arguments)))}}function i(b){var c=a.console,f=xa,h=a[f]=a[f]||[];za&&(za&&g(qa)&&(qa+=qa.indexOf("?")>-1?"&":"?",qa+="f="+encodeURIComponent(b)+"&m="+encodeURIComponent(oa.call(arguments,1).join(""))+"&hash="+j(),m(qa,d,!0)),h.push(oa.call(arguments)),h.length>ya&&h.splice(0,ya-h.length),c&&c.log&&e(c.log)&&(e(c.log.apply)?c.log.apply(c,arguments):c.log(arguments[0])))}function j(){return Math.round(2147483647*Math.random())}function k(a){var b,c=1,d=0;if(a)for(c=0,b=a.length-1;b>=0;b--)d=a.charCodeAt(b),c=(c<<6&268435455)+d+(d<<14),d=266338304&c,c=0!==d?c^d>>21:c;return c}function l(){for(var a,b=[],c=arguments.length,d=0;c>d;d++)a=arguments[d],d>0&&(a=0===a.indexOf("/")?a.slice(1):a),c-1>d&&(a="/"===a.slice(-1)?a.slice(0,a.length-1):a),b.push(a);return b.join("/")}function m(d,e,f){var g,h;try{g="_clickiv4_"+ +new Date+j(),h=a[g]=new Image,h.onload=h.onerror=function(){try{e(),h.onload=h.onerror=a[g]=c}catch(b){}},h.src=d}catch(k){try{h=b.createElement("img"),h.onload=h.onerror=function(){try{e(),h.onload=h.onerror=a[g]=c}catch(b){}},h.src=d}catch(l){f||i("createImage","error message is: ",k.message)}}}function n(a,c,d,e){if(a){var f=b.createElement("script");f.type="text/javascript",f.async=!0,f.src=a,f.id=c,d&&(f.addEventListener?f.onload=d:f.onreadystatechange=function(){f.readyState in{loaded:1,complete:1}&&(f.onreadystatechange=null)}),e&&(f.onerror=e);var g=b.getElementsByTagName("script")[0];g.parentNode.insertBefore(f,g)}}function o(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)}function p(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)}function q(a){var c=new Date,d=arguments,e=d.length;if(e>1){var f=d[2]||0,g=d[3]||"/",h=d[4]||0,i=d[5]||0;return f&&c.setTime(c.getTime()+1e3*f),b.cookie=a+"="+escape(d[1])+(f?"; expires="+c.toGMTString():"")+("; path="+g)+(h&&"none"!=h?"; domain="+h:"")+(i?"; secure":""),d[1]}var j=b.cookie.match("(?:^|;)\\s*"+a+"=([^;]*)");return j?unescape(j[1]):0}function r(){var a=""+b.location.hostname;return 0===a.indexOf("www.")?a.substring(4):a}function s(a){var c=b.referrer;if(/^https?:\/\//i.test(c)){if(a)return c;var d="//"+b.location.hostname,e=c.indexOf(d);if(5===e||6===e){var f=c.charAt(e+d.length);if("/"===f||"?"===f||""===f||":"===f)return}return c}}function t(){var b,c,d;if((d=(d=a.navigator)?d.plugins:null)&&d.length)for(var e=0;e<d.length&&!c;e++){var f=d[e];-1<f.name.indexOf("Shockwave Flash")&&(c=f.description)}if(!c)try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),c=b.GetVariable("$version")}catch(g){}if(!c)try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),c="WIN 6,0,21,0",b.AllowScriptAccess="always",c=b.GetVariable("$version")}catch(h){}if(!c)try{b=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),c=b.GetVariable("$version")}catch(i){}return c&&(b=c.match(/[\d]+/g))&&3<=b.length&&(c=b[0]+"."+b[1]+" r"+b[2]),c||void 0}function u(a,b){return a.name=b}function v(a,b){var c,d,e=0,f={};for(d=Math.min(a.length+1,b.length);d>e;e++)if("object"==typeof b[e])for(c in b[e])b[e].hasOwnProperty(c)&&(f[c]=b[e][c]);else a.length>e&&(f[a[e]]=b[e]);return f}function w(a,b){return 1==b.length&&null!=b[0]&&"object"==typeof b[0]?b[0]:v(a,b)}function x(){return ma.userAgent.indexOf("Firefox")>=0&&![].reduce}function y(a,b){return b=b||d,a.length<=2036?z(a,b):a.length<=8192&&!x()?B(a,b)||A(a,b)||C(a,b):(i("send","request param is to long ",a.length),!1)}function z(a,b){b=b||d,m(l(Ca,Da)+"?"+a,b)}function A(b,c){if(c=c||d,!a.XDomainRequest)return!1;var e=new a.XDomainRequest;return e.open("POST",l(Ca,Ea)),e.onerror=function(){c()},e.onload=c,e.send(b),!0}function B(b,c){if(c=c||d,!a.XMLHttpRequest)return!1;var e=new a.XMLHttpRequest;return"withCredentials"in e?(e.open("POST",l(Ca,Ea),!0),e.setRequestHeader("Content-Type","text/plain"),e.onreadystatechange=function(){4==e.readyState&&(c(),c=null)},e.send(b),!0):!1}function C(c,e){var f,g,h,i,j=0,k=!1;if(e=e||d,h=function(){g.src="",g.parentNode&&g.parentNode.removeChild(g)},i=function(){if(!k)try{if(j>9||g.contentWindow.location.host==b.location.host)return k=!0,h(),p(a,"beforeunload",h),void e()}catch(c){j++,setTimeout(i,200)}},b.body){c+="####==collect_path="+l(Ca,Fa)+"==####",c=encodeURIComponent(c);try{g=b.createElement('<iframe name="'+c+'"></iframe>')}catch(m){g=b.createElement("iframe"),u(g,c)}g.height="0",g.width="0",g.style.display="none",g.style.visibility="hidden",f=l(Ca,Ga)+"#",f+=encodeURIComponent(b.location.protocol+"//"+b.location.host+"/favicon.ico"),o(a,"beforeunload",h),o(g,"load",i),b.body.appendChild(g),g.src=f}else{var n=arguments,q=arguments.callee;setTimeout(function(){q.apply(a,n)},100)}}function D(){this.keys=[],this.t1={},this.t2={}}function E(a,b,c,d,e){var f=this;u(f,a),f.protocolParameter=b,f.defaultValue=c,f.getter=d,f.setter=e}function F(a,b,c,d,e){var f=new E(a,b,c,d,e);return Ia.set(f.name,f),f.name}function G(a,b){Ha.push([new RegExp("^"+a+"$"),b])}function H(a,b,c){return F(a,b,c,void 0,d)}function I(a,b,c,e){return F(a,b,c,e,d)}function J(a){var b=Ia.get(a);if(!b)for(var c=0;c<Ha.length;c++){var d=Ha[c],e=d[0].exec(a);e&&(b=d[1](e),Ia.set(b.name,b))}return b}function K(a){var b;return Ia.map(function(c,d){d.protocolParameter==a&&(b=c)}),b}function L(a,b){var c=a.get(b);return void 0==c?"":""+c}function M(a,b){var c=a.get(b);return void 0==c?0:1*c}function N(){function a(a,b){return a&&a.hasOwnProperty&&a instanceof b}var b=this;return a(b,N)||(b=new N,b.init()),b}function O(){this.data=new D}function P(){this.stack=[]}function Q(){var a=b.location.protocol;if("http:"!=a&&"https:"!=a)throw i("checkProtocolTask","current protocol is:",a),"abort"}function R(a){return a.length>1&&a.lastIndexOf("/")==a.length-1&&(a=a.substr(0,a.length-1)),0!==a.indexOf("/")&&(a="/"+a),a}function S(a){return 0===a.indexOf(".")?a.substr(1):a}function T(a){if("cookie"===L(a,xb)){var b=[],c=a.get(tb),d=R(a.get(vb)),e=S(a.get(ub)),f=a.get(wb),g=L(a,Ma),h=r().split(".");if("auto"!=e&&(q(c,g,f,d,e),q(c)==g))return void(Ib=!0);if(4==h.length&&h[h.length-1]>0)b=["none"];else{for(var i=h.length-2;i>=0;i--)b.push(h.slice(i).join("."));b.push("none")}for(var j=0;j<b.length;j++)if(e=b[j],q(c,g,f,d,e),q(c)==g)return a.set(ub,e),void(Ib=!0);a.set(ub,"auto")}}function U(a){"cookie"!==L(a,xb)||Ib||(T(a),Ib)||a.data.set(Ma,0)}function V(a){if(100!==a.get(zb)&&k(L(a,Ma))%1e4>=100*M(a,zb))throw i("samplerTask","current sampleRate is: ",a.get(zb)),"abort"}function W(a){var b=[];Ia.map(function(c,d){if(d.protocolParameter){var e=a.get(c);0!==e&&e!=d.defaultValue&&("boolean"==typeof e&&(e*=1),b.push(d.protocolParameter+"="+encodeURIComponent(""+e)))}}),b.push("z="+j()),a.set(cb,b.join("&"),!0)}function X(a){var b=L(a,cb),c=a.get(bb);switch(a.get(La)){case"image":z(b,c);break;case"cors":B(b,c)||A(b,c);break;case"iframe":C(b,c);break;default:y(b,c)}a.set(bb,d,!0)}function Y(){for(var c=ma.appName+ma.version+ma.platform+ma.userAgent+(b.cookie||"")+(b.referrer||""),d=c.length,e=a.history.length;e>0;)c+=e--^d++;return[Math.round((new Date).getTime()/1e3),j()^2147483647&k(c)].join("").substr(0,18)}function Z(a,b){var c=a.get(tb),d=q(c);b||(b=d||Y()),a.data.set(Ma,b),T(a)}function $(a){var c="CSS1Compat"===b.compatMode?"documentElement":"body";if(a.set("referrer",s(a.get(Bb))),na){var d=na.pathname||"";"/"!=d.charAt(0)&&(d="/"+d),a.set(Xa,na.protocol+"//"+na.hostname+d+na.search),la&&(a.set(Oa,la.width+"*"+la.height),a.set(Ra,la.colorDepth+"-bit")),a.set(Pa,b[c].clientWidth+"*"+b[c].clientHeight),a.set(Ua,t()),a.set(Qa,b.characterSet||b.charset);var f="",g=!1;try{g=ma&&e(ma.javaEnabled)&&ma.javaEnabled()||!1}catch(h){i("collectClientInfo","javaEnabled error",h.message)}try{f=(ma&&(ma.language||ma.browserLanguage)||"").toLowerCase()}catch(j){i("collectClientInfo","language error",j.message)}a.set(Ta,g),a.set(Sa,f)}}function _(b){var c=a.performance||a.webkitPerformance,d=c&&c.timing;if(!d)return!1;var e=d.navigationStart;return 0===e?!1:(b[gb]=d.loadEventStart-e,b[ib]=d.domainLookupEnd-d.domainLookupStart,b[lb]=d.connectEnd-d.connectStart,b[kb]=d.responseStart-d.requestStart,b[hb]=d.responseEnd-d.responseStart,b[jb]=d.fetchStart-e,b[mb]=d.domInteractive-e,b[nb]=d.domContentLoadedEventStart-e,!0)}function aa(b){if(a.top!=a)return!1;var c=a.external,d=c&&c.onloadT;return c&&!c.isValidLoadTime&&(d=void 0),d>2147483648&&(d=void 0),d>0&&c.setPageReadyTime(),void 0==d?!1:(b[gb]=d,!0)}function ba(a,b){var c=a[b];(isNaN(c)||1/0==c||0>c)&&(a[b]=void 0)}function ca(b,c){var d=Math.min(M(b,Ab),100);if(k(L(b,Ma))%100<d){var e=[];if(_(e)||aa(e)){var f=e[gb];void 0!=f&&isFinite(f)&&!isNaN(f)&&(f>0?(ba(e,ib),ba(e,lb),ba(e,kb),ba(e,hb),ba(e,jb),ba(e,mb),ba(e,nb),c(e)):o(a,"load",function(){ca(b,c)},!1))}}}function da(a){a.timingIsSended||(a.timingIsSended=!0,ca(a.storage,function(b){a.storage.set(Wa,!0,!0),a.send("timing",b)}))}function ea(a){function b(a,b){setTimeout(function(){a.storage.set(Wa,!0,!0),a.send("pulse")},1e3*b)}if(a.storage.get(yb))for(var c=0;c<Ba.length;c++)b(a,Ba[c])}function fa(a){function b(a,b){d.storage.data.set(a,b)}function c(a,c){b(a,c),d.filters.add(a)}var d=this;d.storage=new O,d.filters=new P,b(sb,a[sb]),b(Ka,a[Ka]),b(tb,a[tb]),b(ub,a[ub]||r()),b(vb,a[vb]),b(wb,a[wb]),b(zb,a[zb]),b(La,a[La]),b(Ab,a[Ab]),b(yb,a[yb]),b(Bb,a[Bb]),b(Na,a[Na]),c(Cb,Q),c(Db,U),c(Eb,V),c(Fb,W),c(Gb,X),Z(d.storage,a[Ma]),$(d.storage),ea(d)}function ga(a,b){var c=this;c.id=a,c.url=b,c.factory=null,c.instance=null,c.loading=!1,c.ready=!1,c.queue=[],c.prefix="plugin_2015_",c.load()}function ha(){this.plugins={}}function ia(a){return a.indexOf(".")+a.indexOf(":")>-2}function ja(a){var b=this;if(e(a[0]))b.ready=a[0];else{var c=Kb.exec(a[0]);if(null!=c&&4==c.length&&(b.name=c[1]||ra,b.pluginId=c[2]||"",b.action=c[3],b.opts=oa.call(a,1)),!b.action)throw i("Env","no action"),"abort";if("require"===b.action&&(!g(a[1])||""===a[1]))throw i("Env","unexpected require arg: ",a[1]),"abort";if("provide"===b.action&&(!g(a[1])||""===a[1]))throw i("Env","unexpected provide arg: ",a[1]),"abort";if(ia(b.pluginId)||ia(b.action))throw i("Env","pluginId or action has  keyword ."),"abort";if("provide"===b.action&&b.name!=ra)throw i("Env","provide not need trackerName"),"abort"}}function ka(){Lb.append.apply(Lb,[arguments])}var la=a.screen,ma=a.navigator,na=a.location,oa=Array.prototype.slice,pa=Object.prototype.toString,qa="",ra="t0",sa="__clickidc",ta=31536e4,ua="dc",va="queue",wa="ClickiTrackerName",xa="clickiLogStack2015",ya=3e3,za=na.hash.indexOf("clicki/debug/")>-1||!1,Aa=10,Ba=[/*5,15,30*/],Ca=("https:"==na.protocol?"https:":"http:")+"//sm.gome.com.cn/",Da="collect/track_proxy",Ea="collect/track_ajax",Fa="collect/track_ajax",Ga="collect_iframe.html";D.prototype.set=function(a,b,c){this.keys.push(a),c?this.t2[":"+a]=b:this.t1[":"+a]=b},D.prototype.get=function(a){return this.t2.hasOwnProperty(":"+a)?this.t2[":"+a]:this.t1[":"+a]},D.prototype.map=function(a){for(var b=0;b<this.keys.length;b++){var c=this.keys[b],d=this.get(c);d&&a(c,d)}};var Ha=[],Ia=new D,Ja=N.prototype;Ja.init=function(){return this.data=[],this.dataLock=[],this.gestureCache=[],this.gestureBindLock=!1,this.binder=["binderScroll","binderKeydown","binderResize","binderMousedown","binderMousemove","binderSwipe","binderTurn","binderPinch"],this.bindEvents(),this.reset(),this},Ja.bindEvents=function(){for(var a=0;a<this.binder.length;a++)this.dataLock[a]=!1,this[this.binder[a]](a)},Ja.onGesturesEventTrigger=function(a){for(var b=this.gestureCache,c=a.touches?a.touches.length:1,d=c>=2?"pinch":"swipe",e=0;e<b.length;e++)b[e]&&b[e][0]===d&&this.onEventTrigger(b[e][1])},Ja.bindGesturesEvent=function(c,d){this.gestureCache.push([c,d]);var e="ontouchstart"in a;!this.gestureBindLock&&e&&b.addEventListener("touchmove",h(this.onGesturesEventTrigger,this),!1)},Ja.onEventTrigger=function(a){this.dataLock[a]||(this.dataLock[a]=!0,this.data[a]=1)},Ja.binderScroll=function(b){o(a,"scroll",h(this.onEventTrigger,this,b))},Ja.binderKeydown=function(a){o(b,"keydown",h(this.onEventTrigger,this,a))},Ja.binderResize=function(b){o(a,"resize",h(this.onEventTrigger,this,b))},Ja.binderMousedown=function(a){o(b,"mousedown",h(this.onEventTrigger,this,a))},Ja.binderMousemove=function(a){o(b,"mousemove",h(this.onEventTrigger,this,a))},Ja.binderSwipe=function(a){this.bindGesturesEvent("swipe",a)},Ja.binderTurn=function(b){a.orientation&&a.addEventListener("orientationchange",h(this.onEventTrigger,this,b),!1)},Ja.binderPinch=function(a){this.bindGesturesEvent("pinch",a)},Ja.reset=function(){for(var a=0;a<this.binder.length;a++)this.data[a]=0},Ja.get=function(){var a=this.data.join("-");return this.reset(),a},F("protocolVersion","v");var Ka=H("trackingId","tid");F("anonymizeIp","aip"),F("queueTime","qt");var La=F("forceSendMethod"),Ma=H("clientId","cid"),Na=F("userId","uid");F("miaozhenId","mzid"),F("sessionControl","sc",""),F("referrer","dr"),F("googleCampaignName","cn"),F("googleCampaignSource","cs"),F("googleCampaignMedium","cm"),F("googleCampaignKeyword","ck"),F("googleCampaignContent","cc"),F("miaozhenCampaignId","mzc"),F("miaozhenCampaignId","mzs"),F("miaozhenCampaignId","mzk"),G("customAds([0-9]+)",function(a){return new E(a[0],"ca"+a[1])});var Oa=F("screenResolution","sr"),Pa=F("viewportSize","vp"),Qa=F("encoding","de"),Ra=F("screenColors","sd"),Sa=F("language","ul"),Ta=F("javaEnabled","je"),Ua=F("flashVersion","fl"),Va=F("hitType","t"),Wa=F("nonInteraction","ni",void 0,function(a,b,c){return void 0==c?!1:c}),Xa=F("location","dl","");F("hostname","dh");var Ya=F("page","dp","");F("title","dt",function(){return b.title||void 0}),F("appName","an"),F("appId","aid",""),F("appVersion","av",""),F("appInstallerId","aiid","");var Za=F("eventCategory","ec"),$a=F("eventAction","ea"),_a=F("eventLabel","el"),ab=F("eventValue","ev");F("customActionId","caid"),G("customActionLabel([0-9]+)",function(a){return new E(a[0],"cal"+a[1])}),G("customActionValue([0-9]+)",function(a){return new E(a[0],"cav"+a[1])}),G("dimension([0-9]+)",function(a){return new E(a[0],"cd"+a[1])}),G("metric([0-9]+)",function(a){return new E(a[0],"cm"+a[1])}),I("userBehavior","ub",void 0,h("get",N()));var bb=F("hitCallback"),cb=F("hitPayload"),db=F("socialNetwork","sn"),eb=F("socialAction","sa"),fb=F("socialTarget","st"),gb=F("l1","plt"),hb=F("l2","pdt"),ib=F("l3","dns"),jb=F("l4","rrt"),kb=F("l5","srt"),lb=F("l6","tcp"),mb=F("l7","dit"),nb=F("l8","clt"),ob=F("timingCategory","utc"),pb=F("timingVar","utv"),qb=F("timingLabel","utl"),rb=F("timingValue","utt"),sb=H("name"),tb=H("cookieName",void 0,sa),ub=H("cookieDomain"),vb=H("cookiePath",void 0,"/"),wb=H("cookieExpires",void 0,ta),xb=H("storage",void 0,"cookie"),yb=H("sendPulse",void 0,!0),zb=H("sampleRate","sf",100),Ab=H("siteSpeedSampleRate",void 0,Aa),Bb=H("alwaysSendReferrer",void 0,!1),Cb=F("checkProtocolTask"),Db=F("checkStorageTask"),Eb=F("samplerTask"),Fb=F("buildHitTask"),Gb=F("sendHitTask"),Hb=!1;F("forceSSL",void 0,void 0,function(){return Hb},function(a,b,c){Hb=!!c}),G("\\&(.*)",function(a){var b=new E(a[0],a[1]),c=K(a[0].substring(1));return c&&(b.getter=function(a){return a.get(c)},b.setter=function(a,b,c,d){a.set(b,c,d)},b.protocolParameter=void 0),b}),O.prototype.clearTemp=function(){this.data.t2={}},O.prototype.get=function(a){var b=J(a),c=this.data.get(a);return b&&void 0==c&&(c=e(b.defaultValue)?b.defaultValue():b.defaultValue),b&&e(b.getter)?b.getter(this,a,c):c},O.prototype.set=function(a,b,c){if(a)if("object"==typeof a)for(var d in a)a.hasOwnProperty(d)&&arguments.callee.call(this,d,a[d],c);else{var f=J(a);f&&e(f.setter)?f.setter(this,a,b,c):this.data.set(a,b,c)}},P.prototype.add=function(a){this.stack.push(a)},P.prototype.run=function(b){try{for(var c=0;c<this.stack.length;c++){var f=b.get(this.stack[c]);e(f)&&f.call(a,b)}}catch(g){}var h=b.get(bb);h!=d&&(b.set(bb,d,!0),setTimeout(h,10))};var Ib=!1;fa.prototype.get=function(a){return this.storage.get(a)},fa.prototype.set=function(a,b){return this.storage.set(a,b),this};var Jb={pageview:[Ya],event:[Za,$a,_a,ab],social:[db,eb,fb],timing:[ob,pb,qb,rb]};fa.prototype.send=function(){var a,b;arguments.length>0&&(g(arguments[0])?(a=arguments[0],b=oa.call(arguments,1)):(a=arguments[0]&&arguments[0][Va],b=oa.call(arguments))),a&&(b=w(Jb[a]||[],b),b[Va]=a,this.storage.set(b,void 0,!0),this.filters.run(this.storage),"pageview"===a&&da(this),this.storage.clearTemp())},ga.prototype.load=function(){var a=this;a.loading=!0,n(a.url,a.prefix+a.id)},ga.prototype.provide=function(a,b){var c;this.factory=a,this.ready=!0,this.loading=!1;try{this.instance=new a(b)}catch(d){this.instance={},i("plugin provide","factory init error; plugin id is:",this.id,";error message is:",d.message)}for(;c=this.queue.shift();)this.use.apply(this,c)},ga.prototype.use=function(a,b){var c=this.instance;if(this.ready)try{c[a].apply(c,b)}catch(d){i("plugin use","action is: ",a,"; plugin id is:",this.id,";error message is:",d.message)}else this.queue.push(oa.call(arguments))},ha.prototype.getAll=function(){return this.plugins},ha.prototype.get=function(a){return this.plugins[a]},ha.prototype.set=function(a,b){this.plugins[a]=b},ha.prototype.use=function(a,b,c){var d=this.get(a);d&&d.use&&d.use(b,c)},ha.prototype.require=function(a,b){this.get(a)||this.set(a,new ga(a,b))},ha.prototype.provide=function(a,b,c){var d=this.get(a);d&&d.provide&&d.provide.apply(d,oa.call(arguments,1))};var Kb=/^(?:(\w+)\.)?(?:(\w+):)?(\w+)$/,Lb={};Lb.envs=[],Lb.pluginM=new ha,Lb.process=function(){for(var a=[],b=0;b<arguments.length;b++)try{a.push(new ja(arguments[b]))}catch(c){}return a},Lb.run=function(b){try{if(b.ready)b.ready.call(a,ka.getByName(ra));else{var c=ka.getByName(b.name);if(b.pluginId)return this.pluginM.use(b.pluginId,b.action,b.opts);switch(b.action){case"create":ka.create.apply(ka,b.opts);break;case"remove":ka.remove.call(ka,b.name);break;case"require":this.pluginM.require.apply(this.pluginM,b.opts);break;case"provide":this.pluginM.provide.apply(this.pluginM,b.opts.concat([c]));break;default:c[b.action].apply(c,b.opts)}}}catch(d){i("controller.run",d.message)}},Lb.append=function(){var a=this,b=a.process.apply(a,arguments);for(b=a.envs.concat(b),a.envs=[];b.length&&(a.run(b.shift()),!(a.envs.length>0)););a.envs=a.envs.concat(b)};var Mb=[],Nb=function(a,b,c){var d,e;return g(a[b])&&(e=a[b],d=e?e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,""):""),d||c}(a,wa,ua);ka.lock=Mb,ka.cache={},ka.start=0,ka.stack=[];var Ob=[Ka,ub,sb];ka.create=function(){var a=w(Ob,oa.call(arguments));a[sb]||(a[sb]=ra);var b=""+a[sb];if(ka.cache[b])return ka.cache[b];var c=new fa(a);return ka.cache[b]=c,ka.stack.push(c),c},ka.remove=function(a){for(var b=0;b<ka.stack.length;b++)if(ka.stack[b].get(sb)==a){ka.stack.splice(b,1),ka.cache[a]=null;break}},ka.getAll=function(){return ka.stack.slice(0)},ka.getByName=function(a){return ka.cache[a]},ka.init=function(){var b=a[Nb];if(!b||b.lock!=Mb){za=!!b.debug,qa=b.debugSendUrl,ka.loaded=!0,ka.start=b&&b.start,a[Nb]=ka;var c=b&&b[va];f(c)&&Lb.append.apply(Lb,c)}},ka.init()}(window,document);
// 用于同步v2与v4的cookie，并同时更新cookie的过期时间
(function(){
    function cookie(n) {
        var d = new Date(),
        a = arguments,l=a.length;
        if (l > 1) {
            var e = a[2] || 0, p = a[3] || '/', dm = a[4] || 0, se = a[5] || 0;
            if (e) d.setTime(d.getTime() + (e * 1000));
            document.cookie = n + "=" + escape(a[1]) + (e ? ("; expires=" + d.toGMTString()) : "") + ("; path=" + p) + (dm ? ("; domain=" + dm) : "") + (se ? "; secure" : "");
            return a[1];
        }else{
            var v = document.cookie.match('(?:^|;)\\s*' + n + '=([^;]*)');
            return v ? unescape(v[1]) : 0
        }
    }
    var __clickidc = cookie("__clickidc"), __c_visitor = cookie("__c_visitor"), subs = document.domain.split("."), res = [];
    for (var i = subs.length - 2; i >= 0; i--) {
        res.push(subs.slice(i).join("."));
    }
    for (var i = 0; i < res.length; i++) {
        !__c_visitor ? cookie("__c_visitor", __clickidc, 3600 * 24 * 365 * 10, "/", res[i]) : cookie("__c_visitor", __c_visitor, 3600 * 24 * 365 * 10, "/", res[i]);
        if (cookie("__clickidc") == cookie("__c_visitor"))
            break;
    }
})();
/**
 * 大数据埋码
 *
 * 2015-3-10
 *
(function() {
    var wurl = window.location.href;
    var key = wurl.search(/\.gome\.com\.cn/)<0?4:1;
    var c = document.createElement("script");
    c.type = "text/javascript";
    c.async = true;
    c.src = ("https:" == document.location.protocol ? "https://" : "http://") + "sitemonitor.gome.com.cn/boot/"+key;
    var h = document.getElementsByTagName("script")[0];
    h.parentNode.insertBefore(c, h);
})();
 **/

//10119
(function(a, b, c, d, e, f) {
    a[d] = a[d] || [];
    var g = a[e] = a[e] || {};
    a.tagmangerGlobalObject = e, g[f] = {dlName: d};
    var h = b.getElementsByTagName(c)[0], i = b.createElement(c);
    i.async = !0, i.src = 0 < a.location.host.search(/\.gome\.com\.cn/) ? '//js.gomein.net.cn/sitemonitor/10119.js' : '//static.tagmanager.cn/boot/10119.js'; 
    h.parentNode.insertBefore(i, h);
})(window, document, 'script', 'dataLayer', 'tagmanager', 10119);

//10402
window.setTimeout(function () {
    (function(a, b, c, d, e, f) {
        a[d] = a[d] || [];
        var g = a[e] = a[e] || {};
        a.tagmangerGlobalObject = e, g[f] = {dlName: d};
        var h = b.getElementsByTagName(c)[0], i = b.createElement(c);
        i.async = !0, i.src = 0 < a.location.host.search(/\.gome\.com\.cn/) ? '//js.gomein.net.cn/sitemonitor/10402.js' : '//static.tagmanager.cn/boot/10402.js'; 
        h.parentNode.insertBefore(i, h);
    })(window, document, 'script', 'dataLayer', 'tagmanager', 10402);
},4000);


// var pageType = pageType||"";
// var pageId = pageId||"";
// var zampda1 = zampda1||"";
// var prodid = prodid||"";
// var catName = catName||"";
// var totalPrice = totalPrice||"";
// var shippingGroups = shippingGroups||[];

// if(pageId == "" || pageType == ""){
//     var _body = $("body").attr("class")||"",_wurl = window.location.href;
//     if(_body.indexOf("home")>=0){
//         pageType = "homepage";
//         pageId = "628";
//     }else if(_wurl.indexOf("item")>=0){
//         pageType = "productPage";
//         pageId = "637";
//     }else if(_wurl.indexOf("search")>=0){
//         pageType = "searchPage";
//         pageId = "631";
//     }else if(_wurl.indexOf("category")>=0){
//         pageType = "categoryPage";
//         pageId = "632";
//     }else if(_wurl.indexOf("jiadian")>=0){
//         pageType = "electronicPage";
//         pageId = "633";
//     }else if(_wurl.indexOf("fashion")>=0){
//         pageType = "fashionPage";
//         pageId = "634";
//     }else if(_wurl.indexOf("market")>=0){
//         pageType = "marketPage";
//         pageId = "635";
//     }else if(_wurl.indexOf("enterprise")>=0){
//         pageType = "enterprisePage";
//         pageId = "636";
//     }else{
//         pageType = "other";
//         pageId = "627";
//     }
// }

// var google_tag_params = {
//     ecomm_pagetype: pageType,
//     ecomm_category: catName,
//     ecomm_prodid: prodid,
//     ecomm_totalvalue: totalPrice
// };
// var conversion_value = totalPrice;
// dataLayer = [{
//     'google_tag_params': window.google_tag_params,
//     'conversion_value': window.conversion_value
// }];