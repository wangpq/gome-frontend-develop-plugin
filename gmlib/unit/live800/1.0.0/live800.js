//商家在线客服用的  
;function merchantLive800CallBack(el, statu) { //以后考虑吧这个函数迁移到合适的地方
	/*
	el live800的dom对象
	statu: 
	    -1:禁用
	     0:启用
	     1:离线
	     其余的值:禁用
	*/
	
    var m = el.getAttribute("merchant") == 1;//商家在线客服

    if(m) 
    {       
        if(statu !=0 && statu !=1)
        {          
			$('#store_live800').addClass('off_live800');
            //$('#store_live800_wrap').removeClass('off_live800');
        }           
        if(statu>=0){
        	$('#store_live800_wrap').removeClass('off_live800');
        }
    }
    if( $('.live800Provider').find("span a").length>0){
    	$('.live800Provider').parent().show();
    }
};
if(!LIM) var LIM={};
var live800Icon_fn = [];
/**
 * 调用以下方法重新给部署图标赋值展现
 */
LIM.live800_IconInit = function(){
	if(live800Icon_fn&&live800Icon_fn.length>0){
		live800Icon_fn[0]();
	}
};

(function() {
    var CONST = {
            "live800Server": ["//chat1.gome.com.cn/live800",
                               "//chat2.gome.com.cn/live800",
                               "//chat3.gome.com.cn/live800",
                               "//chat4.gome.com.cn/live800",
                               "//chat5.gome.com.cn/live800"],
            "live800CssUrl": "live800_gome.css",
            "live800IconUrl": ["live800_icon_s.png", "live800_icon_f.png"]
        };
	
	var SERVERCOUNT = CONST["live800Server"].length;
	window.Livebind = function(el, name, func, auto){
		if (window.attachEvent) {
			el.attachEvent("on" + name, func);
			if(auto)func();
		} else {
			el.addEventListener(name, func, false);
		}
	};
	function $(name, ctx) {
		var childs = (ctx || document.body).getElementsByTagName('*'), length = childs.length, els = [];
		for (var i = 0; i < length; i++) {
			if (childs[i].className.match(new RegExp("(^|\\s)" + name
					+ "(\\s|$)"))) {
				els.push(childs[i]);
			}
		}
		return els;
	};
	Sys = function() {
		;
	}
	Sys.NS = (document.layers) ? true : false;
	Sys.IE = (document.all) ? true : false; 
	Sys.DOM = (document.getElementById) ? true : false;
	if (Sys.IE)
		Sys.DOM = false;
	Sys.MAC = (navigator.platform)
		&& (navigator.platform.toUpperCase().indexOf('MAC') >= 0);
	if (Sys.NS)
		Sys.MAC = false;
	Sys.getObj = function(objId) {
	    if (document.getElementById)
		    return document.getElementById(objId);
	    else if (document.all)
		    return document.all(objId);
    };
    /**原生js实现jquery的document.ready  开始**/
    if(!LIVEDOM) var LIVEDOM = {};
    LIVEDOM.domReady = function(f){
	    with (LIVEDOM) {
	        if (domReady.done) {
	            return f();
	        }
	        if (domReady.timer) {
	            domReady.ready.push(f);
	        }
	        else {
	            Livebind(window, "load", isDOMReady);
	            domReady.ready = [f];
	            var h = this;
	            domReady.timer = setInterval(function(){
	                h.isDOMReady();
	            }, 13);
	        }
	    }
	};
	LIVEDOM.isDOMReady = function(){
	    with (LIVEDOM) {
	        if (domReady.done){
	            return false;
	        }
	        if (document && document.getElementsByTagName && document.getElementById && document.body) {
	            clearInterval(domReady.timer);
	            domReady.timer = null;
	            for (var i = 0;i < domReady.ready.length;i++) {
	                domReady.ready[i]();
	            }
	            domReady.ready = null;
	            domReady.done = true;
	        }
	    }
	};
	/**原生js实现jquery的document.ready  结束**/
    
	function getRandomServer(servers) {
		var count = servers.length, random;
		if (count == 1) {
			random = 0;
		} else {
			random = (new Date()).getTime() % count;
		}
		return servers[random];
	};
	function getProtocol() {
		var protocol = document.location.protocol;
		protocol = (protocol == "file:") ? "http:" : protocol;
		return protocol;
	};
	function getchaturl(ele,companyId){
		var company = ele.getAttribute("lim:company");
		if(companyId&&companyId.length>0){
			company = companyId;
		}
		var page = ele.getAttribute("lim:page");
		var shopId = ele.getAttribute("lim:shopId");
        var shopname = ele.getAttribute("lim:shopname");
		var queryString = "", html = "", el = ele;
		var chatUrl = CONST["live800Server"][getServer(company)] + "/chatClient/chatbox.jsp";
		var params = "info="+ window.loginData.infoValue || "_=_";
		queryString += "companyID=" + companyId;
		queryString += "&page=" + page;
		queryString += "&shopId=" +shopId;
        queryString += "&shopname="+encodeURIComponent(shopname);
		if (queryString.indexOf("enterurl") == -1) {
			queryString += "&enterurl=" + encodeURIComponent(document.URL);
		}
		if(ele.getAttribute("lim:productId")&&ele.getAttribute("lim:productId")!=null){
			queryString += "&productId="+ele.getAttribute("lim:productId");
		}
		if(ele.getAttribute("lim:remark")&&ele.getAttribute("lim:remark")!=null){
			queryString += "&remark="+urlEncode(ele.getAttribute("lim:remark"));
		}
		queryString += "&" + params;
		if (getProtocol() == "https:") {
			chatUrl.replace("http:", "https:");
		}
		return  chatUrl + "?" + queryString;
	};
	
	function init(el, s, companyId) {
		var statusClass = null;
		var cursor = "pointer";
		switch (s) {
			case -1://禁用
				statusClass = "disable";
				cursor = "default";
				break;
			case 0 :
			    statusClass = "offline";//离线
				cursor = "pointer";
				break;
			case 1 :
				statusClass = "online";
				cursor = "pointer";
				break;
			default ://默认状态 也是禁用
				cursor = "default";
				statusClass = null;
		}
		
        //商家在线客服
        if ((typeof (merchantLive800CallBack) != "undefined")) {
            merchantLive800CallBack(el, s);
        }
		
		var shopName = "%E5%95%86%E9%93%BA";
		var offLineTip = "%E5%AE%A2%E6%9C%8D%E6%9A%82%E6%97%B6%E4%B8%8D%E5%9C%A8%E7%BA%BF%EF%BC%8C%E5%9C%A8%E7%BA%BF%E6%9C%8D%E5%8A%A1%E6%97%B6%E9%97%B4%EF%BC%9A09%3A00--18%3A00";
		var tip = el.getAttribute("lim:offLineTip");
		if (tip != "") {
			offLineTip = tip;
		}
		var sName = el.getAttribute("lim:shopName");
		if(sName!=""){
			shopName = sName;
		}
		var inPreferences = new Array();
		inPreferences["statusClass"] = statusClass;
		inPreferences["cursor"] = cursor;	
		inPreferences["shopName"] = shopName;
		inPreferences["offLineTip"] = offLineTip;
		if(companyId){
			inPreferences["companyId"] = companyId;
		}
		var iconType = "steady";
		try {
			iconType = el.getAttribute("lim:type");
		} catch (e) {
			iconType = "steady";
		}
		if(iconType=="float"){
			    new FloatIcon(el,inPreferences);
		}else{
			new SteadyIcon(el,inPreferences);
		}
	};
	
	function SteadyIcon(el,inPreferences){
	    this.elObj = el;
		this.preferences = inPreferences;
		this.image =  CONST["live800IconUrl"][0];
		this.status = this.preferences["statusClass"];
		this.cursor = this.preferences["cursor"];
		this.shopName = this.preferences["shopName"];
		this.offLineTip = this.preferences["offLineTip"];
		this.companyId = this.preferences["companyId"];
		this.init();
	}
	SteadyIcon.prototype.init = function(){
	    this.emptyIcon();
	    if(this.status=="online"){//在线
	        this.Steady_generate();
			this.clickAction();
	    }else if(this.status=="offline"){//离线
	        this.Steady_generate();
			this.offlineTipAction();
	    }else{//其他状态不做任何操作 
			;
		}
	};
	
	SteadyIcon.prototype.emptyIcon = function(){
		var el = this.elObj;
		el.innerHTML = "";
	};
	
	SteadyIcon.prototype.Steady_generate = function(){
		var el = this.elObj;
		var companyId = this.companyId;
		if(!companyId){
			companyId = el.getAttribute("lim:company")||"";
		}
		var status = this.status;
		var canLeave = true;
		if(status=="offline"&&"3"!=companyId){
			canLeave = false;
			this.cursor = "default";
		}
		var _htm = this.elObj.getAttribute("lim:innerHtm")||"";/* 是否支持自定义内容 */
	    el.innerHTML = '<a href="javascript:;" class="'+this.status+'s" style="cursor:'+this.cursor+'">'+_htm+'</a>';
	    Livebind(el, "click", function(){
		    if(window.loginData.isTransient==true){
		    	var winHref=window.location.href,
		    	loginUrl = staSite.replace('www', 'login') +'/login?tableName=login&orginURI=' + winHref;

		    	//var winHref = window.location.href, loginUrl = dynSite + contextPath + '/myaccount/login.jsp?tableName=login&orginURI=' + winHref;

				window.location.href = loginUrl;
				return false;
			}else{
				if(!canLeave){
					return false;
				}
				var url = getchaturl(el,companyId),openId="live800_"+el.getAttribute("lim:company");
				openwindow(openId,url);
				return false;
			}
		});
	};
	
	SteadyIcon.prototype.clickAction = function(){
		this.elObj.title = "";
	};
	
	SteadyIcon.prototype.offlineTipAction = function(){
		this.elObj.title = urlDecode(this.offLineTip);
	};
	
	function FloatIcon(el,inPreferences){
	    this.preferences = inPreferences;
	    this.locationObj = el;
	    this.company =  this.preferences["companyId"]?this.preferences["companyId"]:el.getAttribute("lim:company");
	    this.shopName = this.preferences["shopName"];
	    this.offLineTip = this.preferences["offLineTip"];
	    this.inviteInnerHtml = null;
	    this.changeTimerId = null;
	    this.layerHtml = null;
	    this.statusClass = this.preferences["statusClass"];
	    this.image = CONST["live800IconUrl"][1];
	    this.cursor = this.preferences["cursor"];
	    this.toRight = el.getAttribute("lim:Position")==null?"1":el.getAttribute("lim:position");
	    this.floatTop = parseInt(el.getAttribute("lim:FloatTop")==null?"150":el.getAttribute("lim:floatTop"));
	    this.floatSide = parseInt(el.getAttribute("lim:FloatSide")==null?"100":el.getAttribute("lim:floatSide"));
	    this.toBottom = false;
	    this.init();
	};
	FloatIcon.prototype.init = function(){
        this.FloatIcon_generate();
        if(this.statusClass=="online"){
	        this.clickAction();
	    }else{
	       this.offlineTipAction();
	    }
    };
	FloatIcon.prototype.FloatIcon_generate = function(){
		var marginStr = " left:" + this.floatSide + "px;";
	    if (this.toRight == "1") {
		    marginStr = " right:" + this.floatSide + "px;";
	    }
	    this.layerHtml = "<div id=\"FloatIcon\" style=\"z-index:8888;position:absolute;visibility:visible;"
			+ marginStr
			+ "top:200px;height:auto;width:auto;\"><div style='position:relative;'>";
	    this.inviteInnerHtml = '<a id="live800iconlink" target="_self" href="javascript:void(0)"'
			+ ' class="'
			+ this.statusClass + 'f'
			+ '" style="display:block;background-image:url('
			+ this.image
			+ ');background-repeat:no-repeat;overflow:hidden;cursor:default'
			+ ';border:none;"><div class="shopTitle"><div style="width:55px;height:18px;text-align:right;overflow:hidden;" title='
			+ urlDecode(this.shopName)+'>'+urlDecode(this.shopName)+'你好</div>'
			+ '<div style="width:55px;">在线客服</div></div><img name="live800icon" id="live800icon" src="'
			+ CONST["live800Server"]+'/SurferServer?cmd=111&companyID='
			+ this.company
			+ '"  border="0" style="width:125px;height:20px;visibility:hidden;"/>'
			+ '<div class="shopDESC" title="欢迎来到'+urlDecode(this.shopName)
			+ '，有什么可以帮您?">欢迎来到'+urlDecode(this.shopName)+'，有什么可以帮您?</div>'
			+ '<div id="live800FloatChatDiv" class="clickPath" style="cursor:'
			+ this.cursor + '"></div></a>';
	    this.layerHtml += this.inviteInnerHtml;
	    this.layerHtml += "<div class='icon:close'><div></div>";	    
	    this.locationObj.innerHTML = this.layerHtml;
	    var floatIco = this;
	    this.changeTimerId = setInterval(function(){changeIcon(floatIco);},200); 
	};
	
	FloatIcon.prototype.clickAction = function(){
	    var clickObj = Sys.getObj("live800FloatChatDiv");
	    if(clickObj){
	        clickObj.title = "";
	        var interfase = new Array();
	        interfase["company"]=this.company;
	        interfase["page"] = this.locationObj.getAttribute("lim:page");
		    interfase["shopId"] = this.locationObj.getAttribute("lim:shopId");
		    interfase["productId"] = this.locationObj.getAttribute("lim:productId");
		    interfase["remark"] = this.locationObj.getAttribute("lim:remark");
		    interfase["params"] = "info=" + window.loginData.infoValue;
		    var url = getFloatOpenUrl(interfase);
		    var openId = "live800_"+this.company;
		    clickObj.innerHTML = "<a href='"+url+"' target='" + openId 
		    	+ "' style='display:block;overflow:hidden;border:none;'  onclick=\"openwindow('"+openId+"');\"></a>";
	    }
	};
	
	FloatIcon.prototype.offlineTipAction = function(){
	    var tipObj = Sys.getObj("live800FloatChatDiv");
	    tipObj.title = urlDecode(this.offLineTip);
	};
	
	function getFloatOpenUrl(interfase){
		var company = interfase["company"];
		var page = interfase["page"];
		var shopId = interfase["shopId"];
        var shopname = interfase["shopname"];
		var chatUrl = CONST["live800Server"][getServer(company)]
				+ "/chatClient/chatbox.jsp", params = interfase["params"]
				|| "_=_", queryString = "", html = "";
		queryString += "companyID=" + company;
		queryString += "&page=" + page;
		queryString += "&shopId=" +shopId;
        queryString += "&shopname="+encodeURIComponent(shopname);
		if(interfase["productId"]&&interfase["productId"]!=""){
			queryString += "&productId=" + interfase["productId"];
		}
		if(interfase["remark"]&&interfase["remark"]!=""){
			queryString += "&remark=" + urlEncode(interfase["remark"]);
		}
		if (queryString.indexOf("enterurl") == -1) {
			queryString += "&enterurl=" + encodeURIComponent(document.URL);
		}
		queryString += "&" + params;
		if (getProtocol() == "https:") {
			chatUrl.replace("http:", "https:");
		}
		return chatUrl + "?" + queryString;
	}
	
	FloatIcon.prototype.changeFloatIcon = function(){
	    var obj = Sys.getObj("FloatIcon");
	    var live800iconlink = Sys.getObj("live800iconlink");
	    var live800icon = obj.getElementsByTagName("img")[0];
        var iconHeight = live800icon.height;
        var iconWidth = live800icon.width;
	    // float to bottom
	    var y;
	    var x;
	    if (this.toBottom) {
		    if (document.body)
			    y = document.body.clientHeight - iconHeight - this.floatTop;
		    else
			    y = innerHeight - iconHeight - this.floatTop;
	    } else
		    y = this.floatTop;

	    // float to right
	    if (this.toRight == "1" && !!iconWidth) {
		    if (document.body.clientWidth)
			    x = document.body.clientWidth - iconWidth - this.floatSide + 16;
		    else if (document.documentElement.clientWidth) {
			    x = document.documentElement.clientWidth - iconWidth
					- this.floatSide;
		    } else
			    x = innerWidth - iconWidth - this.floatSide;
	    } else
		    x = this.floatSide;
		    
		var obj = null;
		if (Sys.IE) {
			obj = document.all.FloatIcon.style;
		} else if (Sys.NS) {
			obj = document.layers.FloatIcon;
		} else if (Sys.DOM) {
			obj = Sys.getObj('FloatIcon').style;
		}
		if (Sys.IE) {
			scrollPosY = 0;
			scrollPosX = 0;
			eval('try {' + 'if (typeof(document.documentElement) !=	"undefined") {'
				+ 'scrollPosY =	document.documentElement.scrollTop;'
				+ 'scrollPosX = document.documentElement.scrollLeft;' + '}'
				+ '} catch	(e)	{}');
			scrollPosY = Math.max(document.body.scrollTop, scrollPosY);
			scrollPosX = Math.max(document.body.scrollLeft, scrollPosX);
			
			obj.left = scrollPosX + x + 'px';
			obj.top = scrollPosY + y + 'px';
		} else if (Sys.NS) {
			obj.left = pageXOffset + x;
			obj.top = pageYOffset + y;
		} else if (Sys.DOM) {
			obj.left = pageXOffset + x + 'px';
			obj.top = pageYOffset + y + 'px';
		}
	};
	
	FloatIcon.prototype.clearTimer = function () {
        clearInterval(this.changeTimerId); 
    };
	
	function changeIcon(floatIcon){
	    floatIcon.changeFloatIcon();
	};
	
	function getServer(id) {
		if (!id) {
			alert("parameters is invalidate!");
		}
		if(id==3){
			return (parseInt(id)+1 % SERVERCOUNT)
		}
		return (id % (SERVERCOUNT-2));
	};
	function getStringValue(queryValue){
		if(queryValue==null||""==queryValue){
			return "";
		}
		var queryA = queryValue.split("&");
		var length = queryA.length;
		for(var i=0;i<length;i++){
			var v = queryA[i];
			var temp = v.split("=");
			var name= temp[0];
			if("skillId"==name){
				return temp[1];
			}
		}
		return "";
	};
	function sort(all) {
		var rs = [];
		var length = all.length;
		for (var i = 0; i < SERVERCOUNT+1; i++) {
			rs[i] = [];
		}
		var id;
		for (var i = 0; i < length; i++) {
			try {
				id = all[i].getAttribute("lim:company");
				if(id==""){
					continue;
				}
				var params = "info=" + window.loginData.infoValue;
				var sk = getStringValue(params);
				if(!sk||sk==""){
					sk = "0";
				}
				if(/^\d+$/.test(id)){
					if("3"==id){//自营
						rs[SERVERCOUNT].push({
							id : id,
							dom : all[i],
							skillId : sk 
						})
					}else{//商户
						rs[getServer(id)].push({
							id : id,
							dom : all[i],
							skillId:sk
						});
					}
				}else{//供应商
					rs[SERVERCOUNT-1].push({
						id : id,
						dom : all[i],
						skillId : sk 
					})
				}
			} catch (e) {
				continue;
			}
		}
		return rs;
	};

	function urlToParams(params) {
		try {
			var cmdMap = params.split("&"), cmdParams = [], temp;
			for (var i = 0; i < cmdMap.length; i++) {
				temp = cmdMap[i].split("=");
				cmdParams[temp[0]] = temp[1];
			}
			return cmdParams;
		} catch (e) {
			E.report('请勿非法修改参数', '1206');
			return [];
		}
	};

	function urlEncode(Str) {
		if (Str == null || Str == "") {
			return "";
		}
		var newStr = "";
		function toCase(sStr) {
			return sStr.toString(16).toUpperCase();
		};
		for (var i = 0, icode, len = Str.length; i < len; i++) {
			icode = Str.charCodeAt(i);
			if (icode < 0x10) {
				newStr += "%0" + icode.toString(16).toUpperCase();
			} else if (icode < 0x80) {
				if (icode == 0x20) {
					newStr += "+";
				} else if ((icode >= 0x30 && icode <= 0x39)
						|| (icode >= 0x41 && icode <= 0x5A)
						|| (icode >= 0x61 && icode <= 0x7A)) {
					newStr += Str.charAt(i);
				} else {
					newStr += "%" + toCase(icode);
				}
			} else if (icode < 0x800) {
				newStr += "%" + toCase(0xC0 + (icode >> 6));
				newStr += "%" + toCase(0x80 + icode % 0x40);
			} else {
				newStr += "%" + toCase(0xE0 + (icode >> 12));
				newStr += "%" + toCase(0x80 + (icode >> 6) % 0x40);
				newStr += "%" + toCase(0x80 + icode % 0x40);
			}
		}
		return newStr;
	};
	function urlDecode(Str) {
		if (Str == null || Str == "") {
			return "";
		}
		var newStr = "";
		function toCase(sStr) {
			return sStr.toString(16).toUpperCase();
		};
		for (var i = 0, ichar, len = Str.length; i < len;) {
			if (Str.charAt(i) == "%") {
				ichar = Str.charAt(i + 1);
				if (ichar.toLowerCase() == "e") {
					newStr += String
							.fromCharCode(((parseInt("0x"
									+ Str.substr(i + 1, 2)) - 0xE0) * 0x1000)
									+ ((parseInt("0x" + Str.substr(i + 4, 2)) - 0x80) * 0x40)
									+ (parseInt("0x" + Str.substr(i + 7, 2)) - 0x80));
					i += 9;
				} else if (ichar.toLowerCase() == "c"
						|| ichar.toLowerCase() == "d") {
					newStr += String.fromCharCode(((parseInt("0x"
							+ Str.substr(i + 1, 2)) - 0xC0) * 0x40)
							+ parseInt("0x" + Str.substr(i + 4, 2)) - 0x80);
					i += 6;
				} else {
					newStr += String.fromCharCode(parseInt("0x"
							+ Str.substr(i + 1, 2)));
					i += 3;
				}
			} else {
				newStr += Str.charAt(i).replace(/\+/, " ");
				i++;
			}
		}
		return newStr;
	};
	function getParams(rs) {
		if (!rs || rs.length == 0) {
			return "";
		}
		var list = [], length = rs.length;
		var slist = [];
		for (var i = 0; i < length; i++) {
			list.push(rs[i].id);
			slist.push(rs[i].skillId);
		}
		return "companys=" + urlEncode(list.join(";")) + "&skillIds=" + urlEncode(slist.join(";")) + "&t="
				+ new Date().getTime();
	};
	
	/**
	 * 供应商图标初始化，递归请求（原因是不知道公司id是属于哪个服务器的）
	 */
	function gysIcoInit(serverId,data){
		if(serverId<0){
			return;
		}
		var url = CONST["live800Server"][serverId] + "/mstatus.js?sid=" + serverId + "&" + getParams(data) + "&type=1";//供应商图标请求添加type=1
		new live800Request(url, function() {
			var users = this.data.userlist;
			var nextServerId = this.data.sid;
			var len = 0;
			if(typeof(live800Companys) != "undefined"){
				var companys = live800Companys;
				if(companys){len = companys.length;}
				try {
				    var nextRs = [];
				    var flag = 0;
				    for (var j = 0; j < len; j++) {
				    	var status = companys[j][1];
				    	var companyId = companys[j][0];
				    	var el = users[j].dom;
				    	if(companyId&&companyId!="-1"){
					    	init(el, status,companyId);
				    	}else{
				    		nextRs[flag] = users[j];
				    		flag ++;
				    	}
				    }
				    if(nextRs&&nextRs.length>0){
				    	nextServerId = nextServerId - 1;
				    	gysIcoInit(nextServerId,nextRs);
				    }
			    } catch (e) {}
			}
		}, null, {
			sid : serverId,
			userlist : data
		});
	};
	
	function appendCss() {
		//var cssLink = document.createElement("link");
		//cssLink.setAttribute("type", "text/css");
		//cssLink.setAttribute("rel", "stylesheet");
		//cssLink.setAttribute("href", CONST["live800CssUrl"]);
		//document.getElementsByTagName("head")[0].appendChild(cssLink);
	};
	function live800Request(url, onload, onerror, data) {
		this.url = url;
		this.onload = onload;
		this.onerror = onerror ? onerror : this.defaultError;
		this.data = data;
		this.init(url);
	};
	live800Request.prototype = {
		init : function(url) {
			this.script = document.createElement("script");
			this.script.setAttribute("type", "text/javascript");
			this.script.setAttribute("src", url);
			document.getElementsByTagName("head")[0].appendChild(this.script);
			var request = this;
			if (this.script) {
				if (document.all) {
					var script = this.script;
					this.script.onreadystatechange = function() {
						var state = script.readyState;
						if (state == "loaded" || state == "interactive"
								|| state == "complete") {
							request.onload.call(request);
						}
					};
				} else {
					this.script.onload = function() {
						request.onload.call(request);
					};
				}
			} else {
				request.onerror.call(this);
			}
		},
		defaultError : function() {
			alert("create script node fail!");
		}
	};
	function onInit() {
		var icons = $("live800");
		var rs = sort(icons), length = rs.length;
		if (length > 0) {
			appendCss();
			for (var i = 0; i < length; i++) {
				if (rs[i] && rs[i].length > 0) {
					if(i==SERVERCOUNT-1){//固定首次访问chat1服务器
						gysIcoInit(2,rs[i]);
					}else if(i==SERVERCOUNT){
						var rsLength = rs[i].length;
						for(var j=0;j<rsLength;j++){
							init(rs[i][j].dom, 1);
						}
					}else{
						var url = CONST["live800Server"][i] + "/mstatus.js?sid=" + i + "&" + getParams(rs[i]);
						new live800Request(url, function() {
							var users = this.data.userlist;
							var sid = this.data.sid;
							var len = 0;
							if(typeof(live800Status) != "undefined"){
								var status = live800Status ? live800Status[sid] : [];
								if(status){len = status.length;}
								try {
								    for (var j = 0; j < len; j++) {
									    init(users[j].dom, status[j]);
								    }
							    } catch (e) {}
							}
						}, null, {
							sid : i,
							userlist : rs[i]
						});
					}
				}
			}
		}
	};
	LIVEDOM.domReady(function(){
	//Livebind(window, "load", function() {
		onInit();
		live800Icon_fn.push(onInit);
	});
})();

function openwindow(openId,url){
	var winAttr = "toolbar=0,scrollbars=1,location=0,menubar=0,resizable=1,width=1240,height=700"; 
	try{
		var newWindow = window.open(url||'',openId, winAttr);
		newWindow.focus();
		newWindow.opener = window;
	}catch(e){
		if(window.console)window.console.log("弹出在线客服窗口失败。");
	}
};