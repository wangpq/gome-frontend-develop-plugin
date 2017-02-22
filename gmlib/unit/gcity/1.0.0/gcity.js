/**
 * 国美在线：城市选择器组件
 * @authors zhaoyang
 * @date    2012-12-06 18:18:18
 * @version gcity-1.0.1
 *
 *
 * @example

 *	使用时引入资源文件
 Js文件:  http://js.gomein.net.cn/??/js/g/ui/gCity.min.js
 Css文件: http://css.gomein.net.cn/css/n/detail/gCity.min.css

 *	html code（以详情页为例，具体使用时请自行编写代码）：
 <div class="prdRight city">
 <span id="address" class="regon">
 <a id="stockaddress" href="javascript:;"></a>
 </span>
 <div class="gCity clearfix"></div>
 </div>

 *	javascript code（以详情页为例，具体使用时请自行编写代码）：
 $('#address').gCity({
			gc_ads:'chtm',
			gc_evt:function(){
				//your code

				//重写城市cookie
				//$.cookie('atgregion',this.xid+"|"+this.chtm+"|"+this.cid+"|"+this.sid+"|"+this.zid,{expires:30,path:'/',domain:cookieDomain});
				//重写八叉乐cookie
				//$.cookie('atgMboxCity',this.snam,{expires:30,path:'/',domain:cookieDomain});
			}
		});
 */


;﻿(function($){
    $.fn.gCity = function(option){

        /**
         * gomeCity主函数
         * @param  {Object} $this  [绑定事件源多项]
         * @param  {Object} option [组件属性设置]
         */
        var gomeCity = function($this,option){
            /*当前选中区域存储器:省名称、省编号；市名称、市编号；县名称、县编号；镇名称、镇编号；完整地址 */
            this.cache = {"snam":"","sid":"","cnam":"","cid":"","xnam":"","xid":"","znam":"","zid":"","chtm":""};

            /* 存储地址解析：三级Code|全称|二级Code|一级Code|四级Code */
            this.adress= "11011400|北京北京市东城区东城区|11010000|11000000|110114001";
            this.province = {"11000000":"北京","12000000":"天津","13000000":"河北省","14000000":"山西省","15000000":"内蒙古","21000000":"上海","22000000":"浙江省","23000000":"江苏省","24000000":"安徽省","25000000":"福建省","26000000":"山东省","31000000":"广东省","32000000":"广西","33000000":"海南省","41000000":"湖北省","42000000":"湖南省","43000000":"河南省","44000000":"江西省","51000000":"黑龙江省","52000000":"吉林省","53000000":"辽宁省","61000000":"宁夏","62000000":"新疆","63000000":"青海省","64000000":"陕西省","65000000":"甘肃省","71000000":"四川省","72000000":"云南省","73000000":"贵州省","74000000":"重庆市","75000000":"西藏","81000000":"台湾省","82000000":"香港","83000000":"澳门","84000000":"钓鱼岛"};
            this.city={"11000000":{"11010000":"北京市"},"12000000":{"12010000":"天津市"},"13000000":{"13010000":"保定市","13020000":"沧州市","13030000":"承德市","13040000":"邯郸市","13050000":"衡水市","13060000":"廊坊市","13070000":"秦皇岛市","13080000":"石家庄市","13090000":"唐山市","13100000":"邢台市","13110000":"张家口市","13990000":"河北省其他城市"},"14000000":{"14010000":"长治市","14020000":"大同市","14030000":"晋城市","14040000":"晋中市","14050000":"临汾市","14060000":"吕梁市","14070000":"朔州市","14080000":"太原市","14090000":"忻州市","14100000":"阳泉市","14110000":"运城市","14990000":"山西省其他城市"},"15000000":{"15010000":"阿拉善盟","15020000":"巴彦淖尔市","15030000":"包头市","15040000":"赤峰市","15050000":"鄂尔多斯市","15060000":"呼和浩特市","15070000":"呼伦贝尔市","15080000":"通辽市","15090000":"乌海市","15100000":"乌兰察布市","15110000":"锡林郭勒盟","15120000":"兴安盟","15990000":"内蒙古其他城市"},"21000000":{"21010000":"上海市"},"22000000":{"22010000":"杭州市","22020000":"湖州市","22030000":"嘉兴市","22040000":"金华市","22050000":"丽水市","22060000":"宁波市","22070000":"衢州市","22080000":"绍兴市","22090000":"台州市","22100000":"温州市","22110000":"舟山市","22990000":"浙江省其他城市"},"23000000":{"23010000":"南京市","23020000":"淮安市","23030000":"连云港市","23040000":"常州市","23050000":"南通市","23060000":"苏州市","23070000":"宿迁市","23080000":"泰州市","23090000":"无锡市","23100000":"徐州市","23110000":"盐城市","23120000":"扬州市","23130000":"镇江市","23990000":"江苏省其他城市"},"24000000":{"24010000":"合肥市","24020000":"安庆市","24030000":"蚌埠市","24040000":"亳州市","24060000":"池州市","24070000":"滁州市","24080000":"阜阳市","24090000":"淮北市","24100000":"淮南市","24110000":"黄山市","24120000":"六安市","24130000":"马鞍山市","24140000":"宿州市","24150000":"铜陵市","24160000":"芜湖市","24170000":"宣城市","24990000":"安徽省其他城市"},"25000000":{"25010000":"福州市","25020000":"龙岩市","25030000":"南平市","25040000":"宁德市","25050000":"莆田市","25060000":"泉州市","25070000":"三明市","25080000":"厦门市","25090000":"漳州市","25990000":"福建省其他城市"},"26000000":{"26010000":"滨州市","26020000":"德州市","26030000":"东营市","26040000":"菏泽市","26050000":"济南市","26060000":"济宁市","26070000":"莱芜市","26080000":"聊城市","26090000":"临沂市","26100000":"青岛市","26110000":"日照市","26120000":"泰安市","26130000":"威海市","26140000":"潍坊市","26150000":"烟台市","26160000":"枣庄市","26170000":"淄博市","26990000":"山东省其他城市"},"31000000":{"31010000":"广州市","31020000":"深圳市","31030000":"潮州市","31040000":"河源市","31050000":"惠州市","31060000":"江门市","31070000":"揭阳市","31080000":"茂名市","31090000":"梅州市","31100000":"清远市","31110000":"汕头市","31120000":"汕尾市","31130000":"韶关市","31140000":"阳江市","31150000":"云浮市","31160000":"湛江市","31170000":"肇庆市","31180000":"珠海市","31190000":"东莞市","31200000":"中山市","31210000":"佛山市","31990000":"广东省其他城市"},"32000000":{"32010000":"桂林市","32020000":"百色市","32030000":"北海市","32040000":"崇左市","32050000":"防城港市","32060000":"贵港市","32070000":"河池市","32080000":"贺州市","32090000":"来宾市","32100000":"柳州市","32110000":"南宁市","32120000":"钦州市","32130000":"梧州市","32140000":"玉林市","32990000":"广西省其他城市"},"33000000":{"33010000":"海口市","33020000":"白沙县","33030000":"保亭县","33040000":"昌江县","33050000":"澄迈县","33060000":"儋州市","33070000":"定安县","33080000":"东方市","33090000":"乐东县","33100000":"临高县","33110000":"陵水县","33130000":"琼海市","33140000":"琼中县","33150000":"屯昌县","33160000":"万宁市","33170000":"文昌市","33180000":"五指山市","33210000":"三亚市","33220000":"三沙市","33990000":"海南省其他城市"},"41000000":{"41010000":"武汉市","41020000":"鄂州市","41030000":"恩施州","41040000":"黄冈市","41050000":"黄石市","41060000":"荆门市","41070000":"荆州市","41080000":"十堰市","41090000":"随州市","41100000":"咸宁市","41110000":"襄阳市","41120000":"孝感市","41130000":"宜昌市","41140000":"仙桃市","41150000":"潜江市","41160000":"天门市","41170000":"神农架林区","41990000":"湖北省其他城市"},"42000000":{"42010000":"长沙市","42020000":"常德市","42030000":"郴州市","42040000":"衡阳市","42050000":"怀化市","42060000":"娄底市","42070000":"邵阳市","42080000":"湘潭市","42090000":"湘西州","42100000":"益阳市","42110000":"永州市","42120000":"岳阳市","42130000":"张家界市","42140000":"株洲市","42990000":"湖南省其他城市"},"43000000":{"43010000":"郑州市","43020000":"安阳市","43030000":"鹤壁市","43040000":"焦作市","43050000":"开封市","43060000":"洛阳市","43070000":"漯河市","43080000":"南阳市","43090000":"平顶山市","43100000":"濮阳市","43110000":"三门峡市","43120000":"商丘市","43130000":"新乡市","43140000":"信阳市","43150000":"许昌市","43160000":"周口市","43170000":"驻马店市","43180000":"济源市","43990000":"河南省其他城市"},"44000000":{"44010000":"南昌市","44020000":"抚州市","44030000":"赣州市","44040000":"吉安市","44050000":"景德镇市","44060000":"九江市","44070000":"萍乡市","44080000":"上饶市","44090000":"新余市","44100000":"宜春市","44110000":"鹰潭市","44990000":"江西省其他城市"},"51000000":{"51010000":"哈尔滨市","51020000":"大庆市","51030000":"大兴安岭","51040000":"鹤岗市","51050000":"黑河市","51060000":"鸡西市","51070000":"佳木斯市","51080000":"牡丹江市","51090000":"七台河市","51100000":"齐齐哈尔市","51110000":"双鸭山市","51120000":"绥化市","51130000":"伊春市","51990000":"黑龙江省其他城市"},"52000000":{"52010000":"长春市","52020000":"白城市","52030000":"白山市","52040000":"吉林市","52050000":"辽源市","52060000":"四平市","52070000":"松原市","52080000":"通化市","52090000":"延边州","52990000":"吉林省其他城市"},"53000000":{"53010000":"沈阳市","53020000":"鞍山市","53030000":"本溪市","53040000":"朝阳市","53050000":"大连市","53060000":"丹东市","53070000":"抚顺市","53080000":"阜新市","53090000":"葫芦岛市","53100000":"锦州市","53110000":"辽阳市","53120000":"盘锦市","53130000":"铁岭市","53140000":"营口市","53990000":"辽宁省其他城市"},"61000000":{"61010000":"固原市","61020000":"石嘴山市","61030000":"吴忠市","61040000":"中卫市","61050000":"银川市","61990000":"宁夏其他城市"},"62000000":{"62010000":"乌鲁木齐市","62020000":"阿克苏地区","62030000":"阿勒泰地区","62040000":"巴音郭楞州","62050000":"博尔塔拉州","62060000":"昌吉州","62070000":"哈密地区","62080000":"和田地区","62090000":"喀什地区","62100000":"克拉玛依市","62110000":"克孜州","62120000":"塔城地区","62130000":"吐鲁番地区","62140000":"伊犁州","62150000":"石河子市","62160000":"阿拉尔市","62170000":"图木舒克市","62180000":"五家渠市","62990000":"新疆省其他城市"},"63000000":{"63010000":"西宁市","63020000":"果洛州","63030000":"海北州","63040000":"海东地区","63050000":"海南州","63060000":"海西州","63070000":"黄南州","63080000":"玉树州","63990000":"青海省其他城市"},"64000000":{"64010000":"西安市","64020000":"安康市","64030000":"宝鸡市","64040000":"汉中市","64050000":"商洛市","64060000":"铜川市","64070000":"渭南市","64080000":"咸阳市","64090000":"延安市","64100000":"榆林市","64990000":"陕西省其他城市"},"65000000":{"65010000":"兰州市","65020000":"白银市","65030000":"定西市","65040000":"甘南州","65050000":"嘉峪关市","65060000":"金昌市","65070000":"酒泉市","65080000":"临夏州","65090000":"陇南市","65100000":"平凉市","65110000":"庆阳市","65120000":"天水市","65130000":"张掖市","65140000":"武威市","65990000":"甘肃省其他城市"},"71000000":{"71010000":"成都市","71020000":"阿坝州","71030000":"巴中市","71040000":"达州市","71050000":"德阳市","71060000":"甘孜州","71070000":"广元市","71080000":"乐山市","71090000":"凉山州","71100000":"泸州市","71110000":"眉山市","71120000":"绵阳市","71130000":"内江市","71140000":"南充市","71150000":"攀枝花市","71160000":"遂宁市","71170000":"雅安市","71180000":"宜宾市","71190000":"资阳市","71200000":"自贡市","71210000":"广安市","71990000":"四川省其他城市"},"72000000":{"72010000":"昆明市","72020000":"保山市","72030000":"楚雄州","72040000":"大理州","72050000":"德宏州","72060000":"迪庆州","72070000":"红河州","72080000":"丽江市","72090000":"临沧市","72100000":"怒江州","72110000":"曲靖市","72120000":"普洱市","72130000":"文山州","72140000":"西双版纳州","72150000":"玉溪市","72160000":"昭通市","72990000":"云南省其他城市"},"73000000":{"73010000":"贵阳市","73020000":"安顺市","73030000":"毕节市","73040000":"六盘水市","73050000":"黔东南州","73060000":"黔南州","73070000":"黔西南州","73080000":"铜仁市","73090000":"遵义市","73990000":"贵州省其他城市"},"74000000":{"74010000":"重庆市"},"75000000":{"75010000":"拉萨市","75020000":"阿里地区","75030000":"昌都地区","75040000":"林芝地区","75050000":"那曲地区","75060000":"日喀则地区","75070000":"山南地区","75990000":"西藏其他城市"},"81000000":{"81010000":"台湾省"},"82000000":{"82010000":"香港"},"83000000":{"83010000":"澳门"},"84000000":{"84010000":"钓鱼岛"}};
            this.opt=option;
            //新添加
            //直辖市
            this.singleCity={"11000000":"11010000","12000000":"12010000","21000000":"21010000","74000000":"74010000"};
            this.obj=$this;
            this.init();
        };
        gomeCity.prototype={
            init:function(){
                var _this = this;
                _this.winClose();
                _this.obj.click(function(){
                    _this.bindEvent();
                    _this.obj.addClass("gctCur").parent().addClass('cityShow');
                    if(_this.opt.gc_new)_this.opcity(1);
                    _this.winType(true);
                });
                _this.autoProvince();
            },

            /**自动获取省级列表信息 */
            autoProvince:function(){
                var _this = this,
                    _parm = {};

                //如果是团购则请求则重写参数信息
                /*if(_this.opt.gc_group && _this.opt.gc_groupID){
                 _parm = {
                 'method':'general.listCountry',
                 'params':JSON.stringify({
                 'time':new Date().getTime(),
                 'salePromoItemId':_this.opt.gc_groupID
                 })
                 };
                 }
                 $.ajax({
                 type:"get",
                 url:_this.opt.gc_url_province,
                 cache:true,
                 dataType:"jsonp",
                 data:_parm,
                 jsonpCallback:"callback_gcity",
                 jsonpName:"callback_gcity",
                 success:function(data){
                 _this.cityModel(data);
                 }
                 });*/
                _this.cityModel(_this.province);
            },

            bindEvent:function(){
                var _this = this;
                $(_this.opt.gc_shw).unbind("click").click(function(e){e.preventDefault();_this.cityClick(_this.getEvent(e));});
            },

            /**
             * 初始化时生成组件模型
             * @param  {Object} data [返回的城市数据]
             */
            cityModel:function(data){
                /* 默认全地址数据 */
                var cdata = this.opt.gc_dat||$.cookie('atgregion');
                cdata = cdata||this.adress;
                cdata = cdata.split("|");
                /* 如果没有第四级 则默认为第四级第一个城镇 9位 */
                if(cdata.length!=5 || cdata[4]=="undefined")cdata[4] = cdata[0]+"1";
                /* 初始化this.cache区域存储器 */
                this.cache.sid = cdata[3];
                this.cache.cid = cdata[2];
                this.cache.xid = cdata[0];
                this.cache.zid = cdata[4];
                this.cityDom(data,2,1);
            },

            /**
             * 生成控件内容
             * @param  {Object} data    [当前城市数据源]
             * @param  {Number} nextTyp [下一级标识]
             * @param  {Number} cid     [当前级别编号]
             */
            cityDom:function(data,nextTyp,cid){
                var _ctdat = data.citys||data;
                if(cid==1){
                    this.createProvince(_ctdat,nextTyp);
                }else{
                    this.createOthers(_ctdat,cid,nextTyp);
                }

                /* 当第四级区域只有一个可选地址时触发 非第一次请求执行 */
                if(!this.opt.gc_inp && _ctdat.length<=1 && nextTyp==4)this.inpcity();

                /* 自动写入指定地址到页面地址显示框 */
                if(this.opt.gc_inp && nextTyp==4){
                    this.opt.gc_inp = false;

                    // 新添加
                    // 后台更改了四级数据结构 隐藏了一些数据 增加以下代码来让选择器四级出现文字
                    //if(this.cache.znam == ""){
                    //    this.cache.znam = "请选择";
                    //}

                    this.citySlect();
                    this.cache.chtm = this.fmtAddress();
                    if(this.opt.gc_ads)$(this.opt.gc_aid).html(this.cache[this.opt.gc_ads]).attr("title",this.cache[this.opt.gc_ads]);
                    if(this.opt.gc_autofn)this.opt.gc_autofn.apply(this.cache);
                }

                this.bindEvent();
            },

            /**
             * 检测返回数据的有效性
             * @param  {Object}  _ctdat [城市信息数据源]
             * @return {Boolean}        [验证结果T or F]
             */
            checkData:function(_ctdat){
                try{
                    var _dn = _ctdat.result.division,
                        _id = _dn[0].code + _dn[0].label;
                    return true;
                }catch(Exception){
                    if(window.console){
                        console.log('\u54CD\u5E94\u6570\u636E\u5F02\u5E38\r\n'+Exception);
                    }
                    return false;
                }
            },

            /**
             * 创建一级区域
             * @param  {Object} _ctdat  [当前城市数据源]
             * @param  {Number} nextTyp [下一级标识]
             */
            createProvince:function(_ctdat,nextTyp){
                var _this = this,
                    _cthtm = '';
                $.each(_ctdat,function(i,c){
                    var _cid = i,
                        _cnm = c,
                        _sty = '';
                    _cthtm+=_this.createSpan(_sty,_cnm,_cid,(_cid+','+nextTyp+',1'));
                })
                _this.cityHtm(_cthtm);
            },

            /**
             * 生成二级、三级或四级区域 [cid说明：请求二级时cid为一级编号]
             * @param  {Object} _ctdat  [当前城市数据源]
             * @param  {Number} cid     [当前级别编号]
             * @param  {Number} nextTyp [下一级标识]
             */
            createOthers:function(_ctdat,cid,nextTyp){
                var _this = this,
                    _cthtm = '',
                    _ctyid = '',
                    _ctynm = '',
                    _cdata = _ctdat;

                var zid_new = ["710103001","710101001","710102001","710104001","710105001","110102001","110103001","110105001","110104001","110115001","110114001"]
                // 新添加
                // 将隐藏的四级区域id更换为新的区域id
                $.each(zid_new,function(i,v){
                    if(_this.cache.zid == v){
                        _this.cache.zid =  (+v+1).toString();
                    }
                })


                /* 遍历当前级别的内容 */
                if(nextTyp!=2){
                    if(!this.checkData(_ctdat))return false;
                    _ctdat = _ctdat.result.division;
                }
                $.each(_ctdat,function(i,c){
                    var _cid = c.code? c.code:i,
                        _cnm = c.label?c.label:c,
                        _rid = c.relationCode||null,/* 三级区域合并特定字段 */
                        _sty = '';
                    _ctyid = _cid;
                    _ctynm = _cnm;
                    /* 如果是二级 */
                    if(_cid==_this.cache.cid){
                        //_sty='class="select"';//选中效果
                        _this.cache.cnam=_cnm;
                    }
                    /* 如果是三级 (兼容三级区域合并) */
                    if((_cid==_this.cache.xid && !_rid) || (_cid!=_this.cache.xid && _rid && _rid==_this.cache.xid)){
                        //_sty='class="select"';//选中效果
                        _this.cache.xid  = _cid;//强制将xid重写
                        _this.cache.xnam = _this.fmt(_cnm);
                    }
                    /* 如果是四级  向后兼容处理：兼容老版中只有三级地区的情况 */
                    if(_this.cache.zid && _this.cache.zid!="" && _cid==_this.cache.zid){
                        //_sty='class="select"';//选中效果
                        _this.cache.znam=_this.fmt(_cnm);
                    }
                    _cthtm += _this.createSpan(_sty,_cnm,_cid,(_cid+','+(parseInt(nextTyp)+1)+','+nextTyp),_rid);
                });

                $("#ctbox_"+nextTyp).html(_cthtm);

                /* 缓存市级数据 获取县级数据 _this.cache.cid：所属城市ID  nextTyp+1：下一级别  nextTyp：当前级别 */
                var cacheID=0;
                if(nextTyp==2){
                    cacheID = _this.cache.sid;
                    if(_this.opt.gc_inp)_this.autoAjax(_this.cache.cid,parseInt(nextTyp)+1,nextTyp);

                    /* 当二级城市为直辖市时处理 */
                    if(!_this.opt.gc_inp && _ctdat.length<=1){
                        _this.cache.cid = _ctyid;
                        _this.autoAjax(_this.cache.cid,parseInt(nextTyp)+1,nextTyp);
                    }
                }
                /* 缓存县级&获取城镇级数据 */
                if(nextTyp==3){
                    cacheID = _this.cache.cid;
                    if(_this.opt.gc_inp)_this.autoAjax(_this.cache.xid,parseInt(nextTyp)+1,nextTyp);
                }
                /* 缓存城镇 */
                if(nextTyp==4){
                    cacheID = _this.cache.xid;
                    if(_ctdat.length<=1){
                        _this.cache.zid = _ctyid;
                        _this.cache.znam = _ctynm;
                    }
                }
                /* 缓存数据 */
                _this.obj.data("data"+cacheID,_cdata);
            },

            /**
             * 自动获取对应分级内容
             * @param  {[type]} cid     [区域ID]
             * @param  {[type]} nextTyp [下一级标识]
             * @param  {[type]} rank    [当前级别]
             */
            autoAjax:function(cid,nextTyp,rank){
                var _this = this;
                window.setTimeout(function(){_this.cityajax(cid,nextTyp,rank);},1);
            },

            /**
             * 生成每级分类内容
             * @param  {String} sty     [样式名称]
             * @param  {String} cnm     [城市名称]
             * @param  {Number} cid     [城市编号]
             * @param  {String} dataVal [节点DataVal属性值]
             * @param  {Number} _rid    [三级区域合并特定字段]
             * @return {String}         [组装好的SPAN节点内容]
             */
            createSpan:function(sty,cnm,cid,dataVal,_rid){
                if(_rid)_rid = 'data-rid="'+_rid+'"';
                return '<span><a href="javascript:;" '+sty+' title="'+cnm+'" id="ct'+cid+'" data-val="'+dataVal+'" '+(_rid?_rid:"")+'>'+cnm+'</a></span>';
            },

            /* 第一次完整请求后自动写入填充“请选择”中的城市地址 */
            citySlect:function(){
                $("#pct_1").find("b").html(this.cache.snam);
                $("#pct_2").find("b").html(this.cache.cnam);
                $("#pct_3").find("b").html(this.cache.xnam);
                $("#pct_4").find("b").html(this.cache.znam);
                /* 兼容第三级区域的后台数据删除修改 */
                if(this.cache.xnam=="" || this.cache.xnam==undefined){
                    /* 强制默认为北京  */
                    var _this = this;
                    _this.opt.gc_dat=_this.adress;
                    _this.opt.gc_inp=true;
                    window.setTimeout(function(){_this.init();},1);
                    return false;
                }
            },

            /**
             * 组装控件HTML元素
             * @param  {String} _cthtm [已选择的城市名称]
             */
            cityHtm:function(_cthtm){
                var _sty = this.opt.gc_css,
                    _slt = "";
                if(this.opt.gc_slt){
                    _slt='<div id="citySelect" class="gctSelect clearfix">\
				<a href="javascript:;" id="pct_1" data-val="1" data-lnk><b></b><i></i></a>\
				<a href="javascript:;" id="pct_2" data-val="2" data-lnk><b></b><i></i></a>\
				<a href="javascript:;" id="pct_3" data-val="3" data-lnk><b></b><i></i></a>\
				<a href="javascript:;" id="pct_4" data-val="4" data-lnk class="cur"><b></b><i></i></a>\
				<a href="javascript:;" id="cityClose" class="close"></a></div>';
                }
                var _chtm ='<div id="cityMBox">\
				<div class="'+_sty+'" id="ctbox_1">'+_cthtm+'</div>\
				<div class="'+_sty+'" id="ctbox_2"></div>\
				<div class="'+_sty+'" id="ctbox_3"></div>\
				<div class="'+_sty+'" id="ctbox_4"></div></div>';
                $(this.opt.gc_shw).html(_slt+_chtm);
                /*自动获取市级*/
                this.autoAjax(this.cache.sid,2,1);
            },

            /**
             * 控件点击处理
             * @param  {Object} entDom [事件对象]
             */
            cityClick:function(entDom){
                var linkDom = $(entDom),
                    linka = linkDom.parent(),
                    _this = this,
                    linkType = true;
                if(linka.attr("data-lnk") || linka.attr("data-lnk")==""){
                    linkType=false;
                }else{
                    if(linkDom.attr("data-lnk") || linkDom.attr("data-lnk")==""){linkType=false;}
                }
                if(linka.parent().hasClass("gctBox"))linka.parent().find("a").removeClass("select");
                if(linkType){
                    if(linkDom.attr("id") && linkDom.attr("id")=="cityClose"){_this.closeCity();return false;}
                    var _ldat = linkDom.attr("data-val"),
                        _rank = 1;/* 当前区域级别标识 */
                    if(_ldat!=undefined){
                        /*linkDom.addClass("select");//设置点击选中效果*/
                        $(_this.opt.gc_shw).unbind("click");
                        _ldat = _ldat.split(",");/* 结构说明：data-val="15030000,4,3"  cid,下一级标识,当前级别标识 */
                        _rank = _ldat[2];
                        var _cityID = _ldat[0],_cityNm = _this.fmt($("#ct"+_cityID).html());
                        /* 一级区域点击 */
                        if(_rank==1){
                            _this.cache.snam = _cityNm;
                            _this.cache.sid = _cityID;
                            _this.setLoading("#ctbox_2,#ctbox_3,#ctbox_4",_ldat);
                            // 新添加
                            if(this.getPropertyCount(this.city[_cityID])==1){
                                // debugger;
                                this.cityClick($('#ct'+this.singleCity[_cityID]));
                            }
                        }
                        /* 二级区域点击 */
                        if(_rank==2){
                            _this.cache.cnam = _cityNm;
                            _this.cache.cid = _cityID;
                            _this.setLoading("#ctbox_3,#ctbox_4",_ldat);
                        }
                        /* 三级区域点击 */
                        if(_rank==3){
                            _this.cache.xnam = _cityNm;
                            _this.cache.xid = _cityID;
                            _this.setLoading("#ctbox_4",_ldat);
                        }
                        /* 末级区域点击 */
                        if(_rank==4){
                            _this.cache.znam = _cityNm;
                            _this.cache.zid = _cityID;
                            _this.inpcity();
                        }
                    }
                }else{
                    var _lval = linkDom.attr("data-val");
                    if(_lval==undefined){
                        _this.opcity(linkDom.parent().attr("data-val"));
                    }else{
                        _this.opcity(_lval);
                    }
                }
                _this.winType(true);
            },

            /**
             * 设置用户点击控件时的等待效果 emt选择器 data数据源
             * @param {Stirng} emt  [节点选择器ID]
             * @param {Object} data [数据源]
             */
            setLoading:function(emt,data){
                $(emt).html("加载中...");
                this.cityajax(data[0],data[1],data[2]);
            },
// 新添加
            //对象长度
            getPropertyCount:function(o){
                var n, count = 0;
                for(n in o){
                    if(o.hasOwnProperty(n)){
                        count++;
                    }
                }
                return count;
            },
            /* 关闭控件弹层 */
            winClose:function(){
                var _this = this;
                $('body:first').click(function(e){
                    var isOpen = $(_this.opt.gc_shw).attr("cityType");
                    if(isOpen=="true"){
                        var eDom = $(_this.getEvent(e)),
                            eElm = eDom.attr("id");
                        if(!eDom.attr("cityType") && !eDom.parent().attr("cityType") && !eDom.parent().parent().attr("cityType") && !eDom.parent().parent().parent().attr("cityType") && !eDom.parent().parent().parent().parent().attr("cityType") && eElm!="stockaddress" && eElm!="address" && eDom.parent().attr("id")!="address"){
                            _this.winType(false);
                            _this.closeCity();
                        }
                    }else{
                        _this.closeCity();
                    }
                });
            },

            /**
             * cityType状态设置
             * @param  {Boolean} typ [状态设置]
             */
            winType:function(typ){
                $(this.opt.gc_shw).attr("cityType",""+typ);
            },

            /**
             * 获取城市信息请求
             * @param  {Number} cid     [当前所属上一级ID]
             * @param  {Number} nextTyp [要查询的级别]
             * @param  {Number} rank    [当前的级别]
             */
            cityajax:function(cid,nextTyp,rank){
                var nam = "",
                    cacheID = 0;
                this.opcity(nextTyp);
                if(rank==1){
                    this.setDataClk("#pct_2",true);
                    this.setDataClk("#pct_3,#pct_4",false);
                    nam = $("#ct"+this.cache.sid).html();
                    cacheID = this.cache.sid;
                    this.cache.snam=nam;
                }if(rank==2){
                    this.setDataClk("#pct_3",true);
                    this.setDataClk("#pct_4",false);
                    nam = $("#ct"+this.cache.cid).html();
                    cacheID = this.cache.cid;
                    this.cache.cnam=nam;
                }if(rank==3){
                    this.setDataClk("#pct_4",true);
                    nam = this.fmt($("#ct"+this.cache.xid).html());
                    cacheID = this.cache.xid;
                    this.cache.xnam=nam;
                }if(rank==4){
                    nam = this.fmt($("#ct"+this.cache.zid).html());
                    this.cache.znam=nam;
                }
                $("#pct_"+rank).find("b").html(nam);
                /* 从缓存读取数据 */
                if(cacheID!=0)this.getDataCache(cacheID,nextTyp,cid);
            },

            /**
             * 格式化地址
             * @param  {String} str [地址]
             * @return {String}     [处理后的地址]
             */
            fmt:function(str){
                if(str)return str.replace("*","");
            },

            /**
             * 格式化完整地址
             * @return {String} [处理后的地址]
             */
            fmtAddress:function(){
                try{
                    return	this.cache.snam+this.cache.cnam.replace(this.cache.snam,"")+
                        this.cache.xnam.replace(this.cache.cnam,"").replace(this.cache.snam,"")+
                        this.cache.znam.replace(this.cache.cnam,"").replace(this.cache.snam,"");
                }catch(Exception){
                    return "";
                }
            },

            /**
             * 设置”请选择“按钮可点击状态
             * @param {String} emt    [选择器]
             * @param {Boolean} clkTyp [是否可点击状态设置]
             */
            setDataClk:function(emt,clkTyp){
                if(!this.opt.gc_inp){
                    if(clkTyp){
                        $(emt).attr("data-clk",clkTyp).find("b").html("请选择");
                    }else{
                        $(emt).hide().attr("data-clk",clkTyp).find("b").html("请选择");
                    }
                }
            },

            /**
             * 从缓存中读取数据
             * @param  {Number} cacheID [缓存池Data编号]
             * @param  {Number} nextTyp [下一级标识]
             * @param  {Number} cid     [当前城市编号]
             */
            getDataCache:function(cacheID,nextTyp,cid){
                if(this.obj.data("data"+cacheID)){
                    this.cityDom(this.obj.data("data"+cacheID),nextTyp,cacheID);
                    return false;
                }else{
                    /* 从服务端读取二三四级数据 */
                    var ajaxUrl = "",
                        parmDat = {'citycode':cid,'levelid':nextTyp};
                    if(nextTyp==2){
                        this.cityDom(this.city[cid],nextTyp,cid);
                    }else if(nextTyp==3){
                        ajaxUrl = siteUrl+parmDat.citycode+"/3/flag/item_web/gcity_callbackarea"
                        this.getDataAjax(cid,nextTyp,ajaxUrl);
                    }else{
                        ajaxUrl = siteUrl+parmDat.citycode+"/4/flag/item_web/gcity_callbackarea"
                        this.getDataAjax(cid,nextTyp,ajaxUrl);
                    }

                }
            },

            /**
             * 发送请求读取数据
             * @param  {Number} cid     [当前城市编号]
             * @param  {Number} nextTyp [下一级标识]
             * @param  {String} ajaxUrl [当前类型的请求地址]
             * @param  {Object} parmDat [Ajax请求的参数集合]
             */
            getDataAjax:function(cid,nextTyp,ajaxUrl){

                var _this = this;
                $.ajax({
                    type: "get",
                    url: ajaxUrl,
                    cache: true,
                    dataType: "jsonp",
                    data: {},
                    jsonpName: "gcity_callbackarea",
                    success:function(data){
                        _this.cityDom(data,nextTyp,cid);
                    }
                });
            },

            /** 输出选择信息 */
            inpcity:function(){
                var _this = this,
                    _adshtml = "";
                _this.cache.chtm = _this.fmtAddress();/* 组装全地址 */
                _adshtml=_this.cache.chtm;
                if(_this.opt.gc_ads){
                    _adshtml=_this.cache[_this.opt.gc_ads];/* 根据需要显示地址 */
                }
                $("#pct_4").find("b").html(_this.cache.znam);
                $(_this.opt.gc_aid).html(_adshtml).attr("title",_adshtml);;
                _this.closeCity();
                /* 将cache继承给回调函数使用 */
                if(_this.opt.gc_evt){
                    var defaultXid = _this.cache.xid;
                    //如果是该四级上一级为合并区域则执行
                    if($("#ct"+_this.cache.zid).attr("data-rid")) defaultXid = $("#ct"+_this.cache.zid).attr("data-rid");
                    _this.opt.gc_evt.apply($.extend({},_this.cache,{"xid":defaultXid}));
                }
                /* 将用户选择的地址保存到数据库中 */
                /*if(_this.opt.gc_upd){
                    try{
                        var _url = dynSite+contextPath+"/support/add.jsp",
                            _dat = {method:'general.updateDistrictCodeToProfile',params:JSON.stringify({districtCode:_this.cache.zid,time:new Date().getTime()})};
                        $.ajax({type:"get",url:_url,data:_dat,dataType:"jsonp",jsonpCallback:"updCity",jsonpName:"updCity",success:function(data){}});
                    }catch(e){}
                }*/
            },

            /**
             * 设置当前显示级别
             * @param  {Number]} c [当前要显示的ID]
             */
            opcity:function(c){
                for(var i=1; i<5; i++){
                    if(i==c){$("#ctbox_"+i).show();$("#pct_"+i).addClass("cur").show();}
                    else{$("#ctbox_"+i).hide();$("#pct_"+i).removeAttr("class");}
                }
            },

            /* 其他默认事件 */
            getEvent:function(e){e=e||window.event;return e.target || e.srcElement;},
            closeCity:function(){this.obj.removeClass("gctCur").parent().removeClass('cityShow');}
        };

        /**
         * 请求城市地址URL
         * @type {Object}
         * 将四个请求独立出来，已满足四个区域不同请求的需要
         * 默认二三四级请求一样
         */
        var siteUrl = "//ss" + (cookieDomain||"") +"/item/v1/region/";

        /**
         * 控件属性设置
         * @type {Object}
         */
        var config={
            gc_dat:null,	/* 用户默认地址数据  null默认读取cookie地址信息 */
            gc_css:'gctBox',
            gc_shw:'.gCity',
            gc_aid:'#stockaddress',
            gc_ads:null,	/* 自动写入所需地址 只支持写入省市县其中任意一个 ，chtm为全地址，null为默认写入所有 */
            gc_inp:true,	/* 切换城市是是否自动写入地址 默认第一次加载写入 */
            gc_upd:true,	/* 是否自动将所选城市存入数据库中 true自动保存 false不保存 */
            gc_slt:true,	/* 是否显示 请选择 按钮 */
            gc_new:false,	/* 购物车新地址特殊设置默认显示第一级 其他版块勿用 */
            gc_autofn:null,	/* 自动执行函数 */
            gc_group:false, /* 团购请求切换 */
            gc_groupID:false,/*团购ID */
            gc_evt:null 	/* 点击执行函数 */
        },option = $.extend(config,option);
        this.each(function(){new gomeCity($(this),option);});
    }
})(jQuery);