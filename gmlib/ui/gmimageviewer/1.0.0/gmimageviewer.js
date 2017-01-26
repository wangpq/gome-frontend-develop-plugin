/*!
 * a simple jquery plugin for images viewer
 * it is rely on jquery.js
 * released under the MIT license
 * http://www.gome.com.cn/license
 * version:1.0.0
 * author:WangPingqi
 * QQ:451863231
 * email :wpq163yx@163.com
 * date: 2016-10-12T19:00Z
 * update : 2016-10-18T16:00Z
 */

;(function ($, undefined) {
    function GmImageViewer(element, options) {
        this._init.apply(this, arguments);
    }
    GmImageViewer.prototype = {
        template: {
            main :  '\
				<div class="p-photos-thumbnails">\
					<div class="thumb-list">\
						<ul class="clearfix">\
						</ul>\
					</div>\
					<span class="i-prev-btn"></span>\
					<span class="i-next-btn"></span>\
				</div>\
				<div class="p-photos-viewer gm-image-wrap clearfix">\
					<div class="p-photos-wrap">\
						<i></i>\
						<img class="g-big-img" src="">\
						<div class="cursor-left"></div>\
						<div class="cursor-right"></div>\
					</div>\
					<div class="info-viewer">\
						<div class="p-comment"></div>\
						<div class="features-wrap">\
							<div class="user-item-wrap">\
								<div class="user-item clearfix">\
									<img src="" width="30" height="30" alt="Jj-zx" class="user-ico">\
									<div class="user-name"></div>\
								</div>\
							</div>\
							<div class="p-features">\
								<ul>\
									<li></li>\
								</ul>\
							</div>\
						</div>\
						<div class="comment-time"></div>\
					</div>\
				</div>',
            list : '\
				<% for(var i=0,j=list.length; i<j; i++){ %>\
				    <% if(!!list[i].pic) {%>\
						<% for(var k=0,picArray=list[i].pic,m=picArray.length; k<m; k++){ %>\
                            <% var avatar = list[i].avatar && list[i].avatar.replace(/^http:/,"") || "";%>\
							<li data-content="<%= list[i].message %>" data-text="<%= list[i].subject %>" data-userName="<%= list[i].author %>" data-time="<%= list[i].dateline %>" data-src="<%=avatar%>" >\
                                <% var imgsrc = picArray[k] && picArray[k].replace(/^http:/,"") || "";%>\
								<a rel="nofollow" href="javascript:void(0);">\
									<img alt title="<%= list[i].subject %>" _src="<%= imgsrc %>">\
								</a>\
							</li>\
						<% }%>\
					<% }%>\
				<% } %>\
				'
        },
        defaults: {
            bigImg: ".p-photos-wrap img",  //要展示的大图对象
            bigImgPrev: ".cursor-left",
            bigImgNext: ".cursor-right",
            thumbPrev: ".i-prev-btn",
            thumbNext: ".i-next-btn",
            thumbList: ".thumb-list",
            thumbListUl: ".thumb-list ul",
            prevDisable: "i-prev-disable",
            nextDisable: "i-next-disable",
            thumbSelected: "selected",
            currentIndex: 0, //默认选中的第几个图片
            itemMargin: 8,//元素中间的间距
            hasComments: false,//是否有评论内容
            currentImageIndex: 0,//第几个元素被选中的索引
            onBeforeInit: $.noop,  //初始化前触发函数
            number : 10, //每页展示图片个数
            onAfterThumbItemClick : $.noop,
            onAfterThumbNextClick: $.noop,
            onAfterThumbPrevClick: $.noop,
            onAfterBigImgNextClick : $.noop,
            onAfterBigImgPrevClick : $.noop,
            onImgPrevShowEnd : $.noop,
            onImgNextShowEnd : $.noop
        },
        _init: function (element, options) {
            //控件jquery对象
            this.element = $(element);
            //控件参数对象
            this.options = $.extend({}, this.defaults, options);
            //初始化控件模板
            this.initTpl();
            //控件上方图片列表父元素
            this.thumbList = this.element.find(this.options.thumbList);
            //控件上方图片列表父元素Ul
            this.targetListEle = this.element.find(this.options.thumbListUl);
            //要展示或者旋转的大图对象
            this.bigImg = this.element.find(this.options.bigImg);
            this.thumbPrev = this.element.find(this.options.thumbPrev);
            this.thumbNext = this.element.find(this.options.thumbNext);
            this.bigImgPrev = this.element.find(this.options.bigImgPrev);
            this.bigImgNext = this.element.find(this.options.bigImgNext);
            this.ordershowDesc = this.element.find(".info-viewer .p-comment");
            this.ordershowUserSrc = this.element.find(".info-viewer .user-item img");
            this.ordershowUserName = this.element.find(".info-viewer .user-item .user-name");
            this.ordershowUserText = this.element.find(".info-viewer .p-features li");
            this.ordershowTime = this.element.find(".info-viewer .comment-time");
            //当前展示的图片索引值
            this.currentIndex =  this.options.currentIndex;
            //控件上方点击左右箭头图片列表可跳转次数，初始值为0
            this.jumpCounts = 0;
            //图片总张数，初始值为0
            this.size=0;
            //每页展示图片张数
            this.number=this.options.number;
            //控件上方点击左右箭头图片列表跳转索引值,初始值0
            this.jumpIndex = Math.floor(this.currentIndex/this.number);
            //是否可以请求AJAX
            this.canAjax=true;
            this.init();
        },
        getAjax :function(param){
            var self=this,curPage,ajaxUrl;
            if(param.start){
                curPage=1;
            }else if(param.thumbNext || param.bigImgNext){
                curPage=self.jumpIndex+2;
            }else{
                curPage=1;
            }
            ajaxUrl='//bbs'+cookieDomain+'/api/api_getbaskorder.php?callback=orderShowData&productId='+(prdInfo.prdId || window.productId )+'&skuId='+(prdInfo.sku || window.skuId )+'&type=0&page='+curPage+'&pageSize='+self.number+'&_='+new Date().getTime()
            $.ajax({
                type: 'get',
                url: ajaxUrl,
                dataType: 'jsonp',
                jsonpName: 'orderShowData'
            }).done(function(datas){
                if(datas && datas.ordershow && datas.count>0  ){
                    self.doAjaxData({
                        list :  datas.ordershow ,
                        pageStage : parseInt(datas.page)<datas.pages ? true : false
                    });
                    self.doSomeActions(param);
                }
            })
        },
        //将大图链接改为小图链接(特殊情况忽略处理)
        changeToSmallImg : function(str){
            if(str.indexOf("-400-400.jpg")>-1){
                str= str.replace("-400-400.jpg","-100-100.jpg");
            }
            return str;
        },
        autoAppend : function(data){
            var self=this;
            self.targetListEle.append( template.compile( self.template.list)(data)   );
            self.listItemWidth=self.targetListEle.find("li").eq(0).outerWidth()+self.options.itemMargin;
            self.targetListEle.find("li img").map(function(index,dom){
                $(dom).attr("src",self.changeToSmallImg( $(dom).attr("_src") ) );
            })
            self.initEvents();
        },
        doSomeActions : function(param){
            var self=this;
            //重置展示总个数
            self.size=self.targetListEle.children().length;
            //重置图片列表可跳转次数
            self.jumpCounts=Math.ceil( self.size/self.number);
            //重置当前展示的图片索引值

            if(param){
                if(param.start){
                    self.currentIndex=self.options.currentIndex;
                }else if(param.thumbNext){
                    self.currentIndex=(Math.floor( self.currentIndex/self.number)+1)*self.number;
                }else if(param.bigImgNext){
                    self.currentIndex=self.currentIndex+1;
                }else{
                }
            }

            //重置跳转索引值
            self.jumpIndex = param && param.start ? 0 : Math.floor(self.currentIndex/self.number);
            self.targetListEle.width( self.listItemWidth * (self.jumpCounts*self.number));
            self.autoAnimateToIndex(self.currentIndex);
            self.autoCalAction();
        },
        doAjaxData : function(data){
            var self=this;
            self.autoAppend(data);
            self.canAjax=data.pageStage;
        },
        initTpl : function(){
            this.element.hasClass("gm-image-viewer") ? this.element.addClass("p-photos") : this.element.addClass("p-photos gm-image-viewer");
            this.element.html(  this.template.main);
        },
        init: function () {
            this.options.onBeforeInit();
            this.getAjax({"start":true});
            this.initEvents();
        },
        initEvents: function () {
            var self = this;
            // 控件上方图片列表项点击事件
            self.targetListEle.find("li").off("click").on("click", function () {
                var _self = $(this);
                self.currentIndex = _self.index();
                self.jumpIndex=Math.floor(self.currentIndex/self.number);
                self.options.onAfterThumbItemClick({
                    obj : self ,
                    jumpIndex : self.jumpIndex ,
                    index:self.currentIndex
                });
                self.autoAnimateToIndex(self.currentIndex);
                self.autoCalAction();
            })

            //控件上方图片列表左侧向前箭头点击事件
            self.thumbPrev.off("click").on("click", function () {
                var $this = $(this);
                if(self.jumpIndex>0){
                    self.jumpIndex--;
                    self.currentIndex = self.jumpIndex*self.number;
                    self.autoAnimateToIndex(self.jumpIndex*self.number);
                    self.autoCalAction();
                    self.options.onAfterThumbPrevClick({
                        obj : self ,
                        jumpIndex : self.jumpIndex ,
                        index:self.currentIndex
                    });
                }
            })

            //控件上方图片列表右侧向后箭头点击事件
            self.thumbNext.off("click").on("click", function () {
                var $this = $(this);
                if (self.jumpIndex < self.jumpCounts-1 ) {
                    self.canAjax ? self.getAjax({"thumbNext":true}) : self.doSomeActions({"thumbNext":true});
                    self.options.onAfterThumbNextClick({
                        obj : self ,
                        jumpIndex:self.jumpIndex,
                        index:self.currentIndex
                    });
                }else{
                    return false;
                }
            })

            //控件下方图片向后展示箭头点击事件
            self.bigImgNext.off("click").on("click", function () {
                if (self.currentIndex < self.size - 1) {
                    if(self.currentIndex!==0 && (self.currentIndex+1)%self.number==0 && self.jumpIndex < self.jumpCounts-1){
                        self.canAjax ? self.getAjax({"bigImgNext":true}) : self.doSomeActions({"bigImgNext":true});
                    }else{
                        self.doSomeActions({"bigImgNext":true});
                    }
                    self.options.onAfterBigImgNextClick({
                        obj : self ,
                        jumpIndex:self.jumpIndex,
                        index: self.currentIndex
                    });
                    self.currentIndex === self.size - 1 ? self.options.onImgNextShowEnd({obj : self }): null ;
                } else {
                    self.currentIndex === self.size - 1 ?  self.options.onImgNextShowEnd({obj : self }): null ;
                }
            })

            //控件下方图片向前展示箭头点击事件
            self.bigImgPrev.off("click").on("click", function () {
                if (self.currentIndex > 0) {
                    self.currentIndex--;
                    self.jumpIndex = Math.floor(self.currentIndex/self.number);
                    self.autoAnimateToIndex(self.currentIndex);
                    self.autoCalAction();
                    self.options.onAfterBigImgPrevClick({
                        obj : self ,
                        jumpIndex:self.jumpIndex,
                        index : self.currentIndex
                    });
                    self.currentIndex === 0 ? self.options.onImgPrevShowEnd({obj : self }) : null;
                }else {
                    self.currentIndex === 0 ? self.options.onImgPrevShowEnd({obj : self }) : null;
                }
            })
        },
        /**
         * 展示指定位置图片的动作函数
         * @method autoAnimateToIndex
         * @param {Number} index 要展示的图片索引值
         * @return {Null} 无返回值
         */
        autoAnimateToIndex: function (index) {
            var self = this,curItem = self.targetListEle.find("li").eq(index);
            curItem.addClass(self.options.thumbSelected).siblings().removeClass(self.options.thumbSelected);
            self.bigImg.attr("src", curItem.find("img").attr("_src"));
            self.ordershowDesc.text(curItem.data("content")).attr("title",curItem.data("content"));
            self.ordershowUserSrc.attr("src",curItem.data("src"));
            //self.ordershowUserName.text(curItem.data("username")).attr("title",curItem.data("username"));
            //self.ordershowUserText.text(curItem.data("text")).attr("title",curItem.data("text"));
            self.ordershowUserText.text(curItem.data("username")).attr("title",curItem.data("username"));
            self.ordershowTime.text( curItem.data("time") );
            self.targetListEle.animate({"margin-left": - self.listItemWidth*self.number * (self.jumpIndex )}, "fast");
        },
        /**
         * 控件跳转索引值计算是否自动置灰
         * @method autoCalAction
         * @return {Null} 无返回值
         */
        autoCalAction: function () {
            var self = this;
            if (self.size <= self.number) {
                self.thumbPrev.addClass(self.options.prevDisable);
                self.thumbNext.addClass(self.options.nextDisable);
                return false;
            } else {
                if(self.jumpIndex>=self.jumpCounts-1){
                    self.thumbPrev.removeClass(self.options.prevDisable);
                    self.thumbNext.addClass(self.options.nextDisable);
                    return false;
                }
                if(self.jumpIndex<=0){
                    self.thumbPrev.addClass(self.options.prevDisable);
                    self.thumbNext.removeClass(self.options.nextDisable);
                    return false;
                }
                self.thumbPrev.removeClass(self.options.prevDisable);
                self.thumbNext.removeClass(self.options.nextDisable);
            }
        }
    }

    $.fn.gmImageViewer = function (option) {
        this.each(function () {
            var $this = $(this)
                , data = $this.data('gmImageViewer')
                , options = typeof option == 'object' && option;
            if (!data) {
                $this.data('gmImageViewer', (data = new GmImageViewer(this, options)))
            }
        })
    };

})(jQuery);