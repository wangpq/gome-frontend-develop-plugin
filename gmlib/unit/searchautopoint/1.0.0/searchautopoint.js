;(function($) {
    $.fn.autopoint = function(options) {
        defaults = {
            url : options.url,
            environment : options.environment,
            targetType : options.targetType,
            contentLabels : options.contentLabels,
            language : options.language,
            keyLeft : 37,
            keyUp : 38,
            keyRight : 39,
            keyDown : 40,
            keyEnter : 13,
            listHoverCSS : "hover",
            topoffset : options.topoffset || 10
        };
        var options = $.extend(defaults, options);

        var dropDiv = $("#searchTips");
        var tipsList = $("#searchTipsList");

        var isOver = false;
        dropDiv.hover(function() {
            isOver = true;
        }, function() {
            isOver = false;
        });
        var cid = $.cookie("__clickidc"),  //cookieID
            type = ["search","delete","clear"],
            productName = "",
            uid = "";   //登录用户ID
        /*setTimeout(function(){
            if(window.loginData.loginId){
                uid = window.loginData.loginId;
            };
        }, 500);*/

        //查询是：cid，uid，type，callback；有cid必须带cid
        //删除是：cid，uid，type，callback，product； 有cid必须带cid
        //清空是： cid，uid，type，callback；有cid必须带cid
        // 缓存对象
        var SearchAutoCache = function() {
            this.capacity = 3; // 默认存放大小
            this.list = new Array();

            this.push = function(key, value) {
                var data = {'key':key,'value':value};

                if (data == null) return;
                if(this.list.length>=this.capacity)
                {
                    this.list.removeCache(0);
                }
                this.list.push(data);
            };

            this.remove = function(obj) {
                if (this.list == null) return;
                this.list.removeCache(0);
            };

            this.clear = function() {
                this.list = new Array();
            };

            this.get = function(key) {
                if (key == null) return;
                for(var i=0;i < this.list.length; i++) {
                    var d = this.list[i];
                    if(key == d.key) {
                        return d;
                    }
                }
            };
        };

        //对象数组扩展
        Array.prototype.removeCache = function(dx) {
            if (isNaN(dx) || dx > this.length) {
                return false;
            }
            for (var i = 0, n = 0; i < this.length; i++) {
                if (this[i] != this[dx]) {
                    this[n++] = this[i];
                }
            }
            this.length -= 1;
        }

        var cache = new SearchAutoCache();

        return this.each(function() {
            var param = $(this);
            var highlightindex = -1;
            var isZx_=false;
            $(this)
                .bind(
                'keydown',
                function(event) {

                    if (dropDiv.css('display') != 'none') {

                        var currentList = tipsList.find('.' + options.listHoverCSS);

                        if (event.keyCode == options.keyDown) {
                            var nextItem = null;

                            highlightindex ++ ;
                            if(highlightindex == tipsList.find('li').length) {
                                highlightindex = 0;
                            }
                            nextItem = tipsList.find('li').eq(highlightindex);
                            /**找到下一个元素**/
                            if(nextItem != null)
                            {
                                unHoverAll();
                                nextItem.mouseover();
                                isZx_=false;
                                $(this).val(getPointWord(nextItem));
                            }
                            return false;
                        }
                        else if (event.keyCode == options.keyUp)
                        {
                            var prevItem = null;
                            if (highlightindex != -1) {
                                highlightindex -- ;
                            }

                            if (highlightindex == -1) {
                                highlightindex = tipsList.find('li').length - 1;
                            }

                            prevItem = tipsList.find('li').eq(highlightindex);
                            /**找到下一个元素**/
                            if(prevItem != null)
                            {
                                unHoverAll();
                                prevItem.mouseover();
                                isZx_=false;
                                $(this).val(getPointWord(prevItem));
                            }
                            return false;
                        }
                        else if (event.keyCode == options.keyEnter)
                        {
                            var $li = tipsList.find('li').eq(highlightindex);
                            var inputKey = getPointWord($li);
                            if($li.hasClass('search-item')) {
                                var category = $li.attr('category');
                                if(highlightindex == -1){
                                    var url = '//search'+cookieDomain + '/search?question='+encodeURI(inputKey);
                                }else{
                                    var url = '//search'+cookieDomain + '/search?question='+encodeURI(inputKey)+'&catId='+category;
                                }
                                //var url = staSite + '/search?question='+encodeURI(inputKey)+'&catId='+category;
                                window.location.href = url;
                                return false;
                            } else {
                                //tipsList.empty();
                                //dropDiv.hide();
                                if($(".search-input-bot").attr("autoPoint") == "point"){
                                    doSearchbot();
                                }else{
                                    doSearch();
                                }
                            }
                            return false;
                        }

                    }
                    /**当按下键之前记录输入框值,以方便查看键弹起时值有没有变**/
                    $(this).attr('alt', $(this).val());
                    isZx_=true;
                })
                .hover(function() {
                    /**/
                    isOver = true;
                },function() {
                    isOver = false;
                });






            /* 文本框输入事件 */
            var _inpEvt = function(event) {
                /**如果弹起的键是向上或向下方向键则返回**/
                if (!isZx_){
                    return;
                }


                var val = $(this).val();
                /**若输入框值没有改变或变为空则返回**/
                if ($(this).val() == $(this).attr('alt')){
                    return;
                }else{
                    //$("#his_title").hide(0);
                    //tipsList.empty();
                    //dropDiv.hide(0);
                    if($("#his_title").css('display')=='block'){
                        $("#his_title").hide(0);
                        tipsList.empty();
                        dropDiv.hide(0);
                    }else{
                    }
                    setTimeout(function() {
                        $("#his_title").hide(0);
                            //tipsList.empty();
                            //dropDiv.hide(0);
                        if(timer) {
                            clearTimeout(timer);
                        }
                        timer = setTimeout(function(){
                            //tipsList.empty();
                            //$("#his_title").hide(0);
                            getData(param, val);
                        },200);
                    }, 1000)
                    $("#his_title").hide(0);
                }
                if ($(this).val() == '') {

                    setTimeout(function() {
                        signData.login({},function(loginData) {
                            if(window.loginData.loginId){     ////////////////////////////////////////////
                                uid = window.loginData.loginId;
                            };
                            if(!loginData.isTransient && loginData.isTransient!="true"){
                                tipsList.empty();
                                getDataHis(param,0);

                                //$("#his_title").show(0);
                                //dropDiv.show(0);
                            }else{
                                tipsList.empty();
                                $("#his_title").hide(0);
                                dropDiv.hide(0);
                                return;
                            }
                        });
                    }, 1000)
                }
                /*if(timer) {
                 clearTimeout(timer);
                 }*/

                /**查询提示数据**/
                /* timer = setTimeout(function(){
                 getData(param, val);
                 },200);*/
            };
            this.oninput=_inpEvt;
            this.onpropertychange=_inpEvt;
            var timer = null;
            $("body").mouseover(function() {

                if(timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function(){
                    if (isOver && dropDiv.find('.' + options.listHoverCSS) != 0){
                        return;
                    }

                    tipsList.empty();
                    dropDiv.hide();
                },150);
            });

            /** 处理ajax返回成功的方法* */
            handleResponse = function(parent, json) {
                if (json == null || json.length == 0) {
                    /**返回数据为空**/
                    dropDiv.hide();
                    $("#his_title").hide(0);
                    return ;
                }

                render(parent, json);
                /**防止ajax返回之前输入框失去焦点导致提示框不消失**/
                    //parent.focus();
                $("#his_title").hide(0);
                dropDiv.show();
            }
            handleResponseHis = function(parent, json) {
                if (json == null || json.length == 0) {
                    /**返回数据为空**/
                    dropDiv.hide();
                    return ;
                }

                renderHis(parent, json);
                /**防止ajax返回之前输入框失去焦点导致提示框不消失**/
                    //parent.focus();

                dropDiv.show();
            }
            /** 通过ajax返回json格式数据生成用来创建dom的字符串**/
            render = function(parent, json) {
                tipsList.empty();
                var appendStr = '';

                /**用json对象中内容替换模版字符串中匹配/\{([a-z]+)\}/ig的内容,如{word},{view}**/
                for ( var i = 0; i < json.length; i ++) {
                    var d = json[i];
                    if(d.length >= 4) {
                        appendStr += '<li class="search-item" category="'+d[3].cat[1]+'" keyword="'+d[0]+'">'+
                        '<span class="fs" style="float:left;">在'+
                        '<b>'+d[3].cat[3]+'</b><i>&gt;</i>'+
                        '<a class="akeyword" href="javascript:txtCode();">'+d[3].cat[0]+'</a>分类中搜索</span><span class="fr color-b">约'+d[3].cat[2]+'条</span></li>';
                    }else{
                        appendStr += '<li><a class="akeyword" href="javascript:txtCode();">'+
                        '<span class="fl">'+d[0]+'</span><span class="fr color-b">约'+d[1]+'条</span></a></li>';
                    }
                }

                jebind(parent, appendStr);
            }
            renderHis = function(parent, json) {
                tipsList.empty();
                var appendStr = '';

                /**用json对象中内容替换模版字符串中匹配/\{([a-z]+)\}/ig的内容,如{word},{view}**/
                var historyTpl = '';
                for (var i = 0, len = json.length; i < len; i++) {
                    if(len >= 1) {
                        historyTpl += '<li><a class="akeyword" href="#">' +'<span class="fl">' + json[i].search + '</span><span id="his_del" class="fr color-b" style="display:none">删除</span></a></li>'
                        // historyTpl += '<li class="clearfix"><a class="akeyword" href="#">' +'<span class="fl">' + json[i].search + '</span></a><span id="his_del" class="fr color-b hisDel" style="display:none">删除</span></li>'
                    }
                }
                $("#searchTips").find('ul').append(historyTpl);

                jebindHis(parent, historyTpl);
            }
            /** 将新建dom对象插入到提示框中,并重新绑定mouseover事件监听**/
            jebind = function(parent, a) {
                tipsList.append(a);
                tipsList.find('li.search-item:last').css('border-bottom','1px solid #EEEEEE');

                tipsList.find('li').each(function(i) {
                    $(this).attr('index',i);
                    $(this).unbind('mouseover').mouseover(function() {
                        unHoverAll();
                        //parent.val(getPointWord($(this)));
                        $(this).addClass(options.listHoverCSS);
                        $(this).find('a:first').addClass(options.listHoverCSS);
                        highlightindex = $(this).attr('index');
                    }).unbind('click').click(function() {
                        var inputKey = getPointWord($(this));
                        parent.val(inputKey);
                        tipsList.empty()
                        dropDiv.hide();
                        parent.focus();
                        highlightindex = -1;
                        if($(this).hasClass('search-item')) {
                            var category = $(this).attr('category');
                            var url = '//search'+cookieDomain + '/search?question='+encodeURI(inputKey)+'&catId='+category;
                            window.location.href = url;
                            return false;
                        } else {
                            if($(".search-input-bot").attr("autoPoint") == "point"){
                                doSearchbot();
                            }else{
                                doSearch();
                            }
                        }
                    });
                });
            }
            jebindHis = function(parent, a) {
                //tipsList.append(a);
                //tipsList.find('li.search-item:last').css('border-bottom','1px solid #EEEEEE');
                $("#hisClear").click(function(){//清空
                    getDataHis(param,2);
                });
                tipsList.find('li').each(function(i) {
                    //$(this).attr('index',i);
                    $(this).find("#his_del").click(function(event){//删 除
                        event.stopPropagation();
                        var hisName = $(this).siblings().text();
                        getDataHis(param,1,hisName);

                    });
                    $(this).unbind('mouseover').mouseover(function() {
                        unHoverAll();
                        //parent.val(getPointWord($(this)));
                        $(this).find("#his_del").show();
                        $(this).siblings().find("#his_del").hide();
                        $(this).addClass(options.listHoverCSS);
                        $(this).find('a:first').addClass(options.listHoverCSS);
                        highlightindex = $(this).index();
                        //highlightindex = $(this).attr('index');
                    }).unbind('click').click(function() {
                        var inputKey = getPointWord($(this));
                        parent.val(inputKey);
                        tipsList.empty()
                        dropDiv.hide();
                        parent.focus();
                        highlightindex = -1;
                        if($(this).hasClass('search-item')) {
                            var category = $(this).attr('category');
                            var url = '//search'+cookieDomain + '/search?question='+encodeURI(inputKey)+'&catId='+category;
                            window.location.href = url;
                            return false;
                        } else {
                            if($(".search-input-bot").attr("autoPoint") == "point"){
                                doSearchbot();
                            }else{
                                doSearch();
                            }
                        }
                    });
                });

            }
            /**将提示框中所有列的hover样式去掉**/
            unHoverAll = function() {
                tipsList.find('li').each(function(i) {
                    $(this).removeClass(options.listHoverCSS);
                    $(this).find('a:first').removeClass(options.listHoverCSS);
                });
            }
            /**在提示框中取得当前选中的提示关键字**/
            getPointWord = function(p) {
                return p.attr('keyword') ? p.attr('keyword'):p.find('span:first').text();
            }

            /**通过ajax向服务器请求数据**/
            getData = function(parent, word) {
                word = word.replace(/[()'";,{}~!@#$%^&*(){}?\|<>.]/g, "");

                var locationUrl = document.location,
                    reg=/\/category\/(.*)?\.html.*$/ig,
                    r = [],cate,cateUrl="";
                while(r = reg.exec(locationUrl)) {
                    cate = r[1];
                }
                if(cate) cateUrl = "&category="+cate;
                var strUrl = options.url + "&module=searchSuggest"
                    +"&query=" + encodeURI(word) //encodeURI(word)
                    +"&jp=true"
                    +cateUrl;
                //+"&targetType="+options.targetType
                //+"&contentLabels="+options.contentLabels
                //+"&language="+options.language;

                if(cache.get(word)) {
                    var data = cache.get(word).value;
                    handleResponse(parent, data);
                }else{
                    $.ajax({
                        type: "get",
                        url: strUrl,
                        dataType: "jsonp",
                        jsonpName: "suggest",
                        success: function(data){
                            $("#his_title").hide(0);
                            tipsList.empty();
                            handleResponse(parent, data);
                            //dropDiv.show(0);
                            cache.push(word,data);
                        }
                    });
                }
            }

            getDataHis = function(parent,typeId,name) {
                var  serName = name&&name!=undefined  ?  ('&product=' + name) : '';
                $.ajax({
                    type: "get",
                    url: "//bigd.gome.com.cn/gome/search?cid=" + cid + "&uid=" + uid + "&type=" + type[typeId] + serName,
                    //url: "http://10.144.34.76:8080/rec_httpservice/search?cid=" + cid + "&uid=" + uid + "&type=" + type[typeId] + serName,
                    //url: "http://10.126.53.211/httpservice/search?cid=23234&uid=3&type=search&id=&callback=search",
                    cache: false,
                    dataType: "jsonp",
                    jsonpName: "search",
                    success: function (data) {
                        if(typeId==1){
                            //var data={status:"0"};
                            if(data.status == "0"){
                                getDataHis(parent,0);
                            }
                        }else if(typeId==2){
                            //var data={status:"0"};
                            if(data.status == "0"){
                                tipsList.empty()
                                dropDiv.hide();
                            }
                        }else{
                            //var data = {"lst": [{"search": "apple"},{"search": "手机"}],"size": "2"};
                            data = data.lst;
                            if(data && data.length){
                                $("#his_title").show();
                                //dropDiv.show(0);
                                handleResponseHis(parent,data);
                            }else{
                                $("#his_title").hide();
                                dropDiv.hide();
                            }
                        }
                    }

                });
            }

            $("#searchInput").focus(function(){
                if($("#searchInput").val()==""){
                    setTimeout(function() {
                        signData.login({},function(loginData) {
                            if(window.loginData.loginId){
                                uid = window.loginData.loginId;
                            };
                            if(!loginData.isTransient && loginData.isTransient!="true"){
                                dropDiv.hide();
                                getDataHis(param,0);
                                //dropDiv.show();
                            }else{


                            }
                        });
                    }, 1000)
                }else{
                    $("#his_title").hide();
                    tipsList.empty()
                    dropDiv.hide();
                    var val = $(this).val();
                    getData(param, val);
                    //dropDiv.show();
                }
            })

        });
    }
})(jQuery);