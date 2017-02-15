/**
 * @example 
 * el为
 * $(el).gPop({
        zIndex: 9999999,    //弹出层的z-index
        middile: true, //是否居中显示，否为当前元素位置
        isLock: true, //是否开启锁屏
        lockColse: false, //是否可以点击关闭
        lockBgColor: '#000', //设置锁屏背景
        opacity: 0.5,        //锁屏背景透明度      
        time: null,         //定时关闭时间
        isColseBtn: true,   //是否出现关闭按钮
        colseCallback: function(){}, //点击关闭按钮回调
        beforeCallback: function(){} //显示前回调
    });
 */
;(function($){
	var win = $(window),
		doc = $(document),
		body = $('body');
	var position = function(){
      var isIE6 = !-[1,] && !window.XMLHttpRequest,
          html = document.getElementsByTagName('html')[0],
          dd = document.documentElement,
          db = document.body,
          dom = dd || db,
          // 获取滚动条位置
          getScroll = function(win){
              return {
                  left: Math.max(dd.scrollLeft, db.scrollLeft),
                  top: Math.max(dd.scrollTop, db.scrollTop)
              };
          };
      
      // 给IE6 fixed 提供一个"不抖动的环境"
      // 只需要 html 与 body 标签其一使用背景静止定位即可让IE6下滚动条拖动元素也不会抖动
      // 注意：IE6如果 body 已经设置了背景图像静止定位后还给 html 标签设置会让 body 设置的背景静止(fixed)失效 
      if (isIE6 && document.body.currentStyle.backgroundAttachment !== 'fixed') {
          html.style.backgroundImage = 'url(about:blank)';
          html.style.backgroundAttachment = 'fixed';
      };
      
      return {
          fixed: isIE6 ? function(elem){
              var style = elem.style,
                  doc = getScroll(),
                  dom = '(document.documentElement || document.body)',
                  left = parseInt(style.left) - doc.left,
                  top = parseInt(style.top) - doc.top;
              this.absolute(elem);
              style.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + left + ') + "px"');
              style.setExpression('top', 'eval(' + dom + '.scrollTop + ' + top + ') + "px"');
          } : function(elem){
              elem.style.position = 'fixed';
          },
          
          absolute: isIE6 ? function(elem){
              var style = elem.style;
              style.position = 'absolute';
              style.removeExpression('left');
              style.removeExpression('top');
          } : function(elem){
          	elem.style.position = 'absolute';
          }
      };
  	}(),
  	getObjPos = function(obj){
  		var bodyWidth = body.width(),
			objWidth = obj.outerWidth(),
			ofLeft = obj.offset().left,
			docHeight = doc.height(),
			objHeight = obj.outerHeight(),
			ofTop = obj.offset().top;
		var left = (bodyWidth > (ofLeft + objWidth)) ? ofLeft : (ofLeft - (objWidth + ofLeft - bodyWidth));
		var top = (docHeight > (ofTop + objHeight)) ? ofTop : (ofTop - (objHeight + ofTop - docHeight));
		return {
			left: left,
			top: top
		}
  	};
	/**
	 * Pop类
	 * @param  {Object} target 当前调用元素
	 * @param  {Object} opts   参数
	 * @return {}
	 */
	var Pop = function(target, opts){
		this.target = target;
		this.settings = opts;

		this.IE6 = !-[1,] && !window.XMLHttpRequest;
		this.timer = null;

		this.init();
	}
	Pop.prototype = {
		init: function(){
			var self = this;
			self.closePrevPop();
			self.settings.beforeCallback(self);
			if (self.settings.isColseBtn) {
				self.createClose();
			};
			if (self.settings.isLock) {
				self.createLock();
			};
			if (typeof self.settings.time === 'number') {
				self.timer = setTimeout(function(){
					self.closePop();
				}, self.settings.time);
			};
			self.bindEvent();
			self.showTarget();
		},
		showTarget: function(){
			var self = this,
				obj = self.target,
				left,
				top;
			obj.addClass('prevPopBox').show();
			//如果是居中
			if(self.settings.middile){
				left = Math.round((win.width() - obj.outerWidth())/2);
				top = Math.round((win.height() - obj.outerHeight()) / 2);
				if (self.IE6) {
				    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;				  
				    left = Math.round((win.width() - obj.outerWidth()) / 2);
				    top = Math.round((document.documentElement.clientHeight - obj.outerHeight()) / 2) + scrolltop;
				}
				obj.css({
					'left': left,
					'top': top,
					'z-index': self.settings.zIndex + 1
				});
				position.fixed(obj[0]);
				return;
			};
			//var pos = getObjPos(obj);
			//obj.css({
			//	'position': 'absolute',
			//	'left': pos.left,
			//	'top': pos.top,
			//	'z-index': self.settings.zIndex + 1
			//});
		},
		createLock: function(){
			var self = this;
			if($('#popLock').length>0){
					$('#popLock').show();
					return false;
				}
			self.Lock = $('<div id="popLock" style="filter:alpha(opacity='+self.settings.opacity*100+');opacity:'+self.settings.opacity+';"></div>');
			self.Lock.css({
				'position': 'fixed',
				'top':0,
				'left':0,
				'width': '100%',
				'height': '100%',
				'background-color': self.settings.lockBgColor,
				'opacity': self.settings.opacity,
				'z-index': self.settings.zIndex
			});
			if (self.IE6) {
				self.Lock.css({
					'display': 'none'
				});
				self.createIframe(self.Lock);
				};
			body.append(self.Lock);
		},
		createIframe: function(elem){
			elem.innerHTML = '<iframe style="position:absolute;left:0;top:0;width:100%;height:100%;z-index:-1;border:0 none;filter:alpha(opacity=0)"></iframe>';
		},
		createClose: function(){
			var self = this;
			self.closeBtn = $('<a class="popCloseBtn">关闭</a>');
			self.target.append(self.closeBtn);
		},
		bindEvent: function(){
			var self = this;
			if (self.closeBtn){
				self.closeBtn.bind('click', function(){
					self.closePop();
				});
			}
			if (self.Lock && self.lockColse) {
				self.Lock.bind('click', function(){
					self.closePop();
				});
			};
		},
		closePop: function(){
			var self = this;
			clearTimeout(self.timer);
			if (self.Lock) {
				self.Lock.remove();
			};
			if (self.closeBtn){
				self.closeBtn.remove();
			}
			self.target.removeClass('prevPopBox').hide();
			self.settings.colseCallback.call(self);
		},
		closePrevPop: function(){
			body.find('.prevPopBox').hide().removeClass('prevPopBox');
		}
	}
	/**
	 * 默认参数
	 * @type {Object}
	 */
	var defaultConfig = {
		zIndex: 9999,	//弹出层的z-index
		middile: true, //是否居中显示，否为当前元素位置
        isLock: true, //是否开启锁屏
        lockColse: false, //是否可以点击关闭
        lockBgColor: '#000', //设置锁屏背景
        opacity: 0.5,        //锁屏背景透明度      
        time: null,			//定时关闭时间
        isColseBtn: true,	//是否出现关闭按钮
        colseCallback: function(){}, //点击关闭按钮回调
        beforeCallback: function(){} //显示前回调
    };
    /**
     * 接口
     * @param  {Object} opts 参数
     * @return {[type]}      [description]
     */
	$.fn.gPop = function(opts){
		opts = $.extend({}, defaultConfig, opts);
		this.each(function(){
			new Pop($(this), opts);	
		});
	}
})(jQuery);
