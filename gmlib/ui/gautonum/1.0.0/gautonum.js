/*! 
 * a simple jquery product purchase quantity plugin
 * released under the MIT license
 * http://www.gome.com.cn/license
 * version:1.1.0
 * author:Wang Pingqi
 * qq:451863231
 * email :wpq163yx@163.com
 * date: 2016-01-05T18:00Z
 * update : 2016-09-01T17:00Z
 */
;(function($,window,undefined){

    var GAutoNum=function(element,options){
        this._init.apply(this,arguments);
    }
    GAutoNum.prototype={
        defaults:{
            /**
             * 数量所在文本框
             * @property {String}  input
             */
            input:".j-gACval" || "input",
            /**
             * 最小值
             * @property {Number}  numMin
             */
            numMin:1,
            /**
             * 最大值
             * @property {Number} numMax
             */
            numMax: window.cartMax || 10000,
            /**
             * 自定义最大值(注：用于异步操作,重置绑定时的numMax)
             * @property {Boolean}  maxCtl
             */
            maxCtl:false,
            /**
             * 锁定控件的元素对象
             * @property {String} countLock
             */
            countLock : "i",
            /**
             * 控件不可用类名
             * @property {String} disClass
             */
            disClass : "disab",
            /**
             * 控件是否只读,默认不只读
             * @property {Boolean}  readOnly
             */
            readOnly : false,
            /**
             * 控件是否不可用,默认可用
             * @property {Boolean}  disabled
             */
            disabled : false,
            /**
             * 控件值改变后触发事件
             * @property {Function}  btnfn
             */
            /**
             * 加按钮
             * @property {String} btnPlus
             */
            btnPlus : ".j-gACbtnA" ,
            /**
             * 减按钮
             * @property {String} btnMinu
             */
            btnMinu : ".j-gACbtn" ,
            /**
             * 控件值改变后触发事件
             * @property {Function}  btnfn
             */
            btnfn: $.noop,
            /**
             * 点击加按钮后触发事件
             * @property {Function} btnPlusAfterEvent
             */
            btnPlusAfterEvent : $.noop,
            /**
             * 点击减按钮后触发事件
             * @property {Function} btnMinuAfterEvent
             */
            btnMinuAfterEvent : $.noop
        },
        _init:function(element,options){
            this.dom=element;
            this.element=$(element);
            this.options=$.extend({}, this.defaults, options);
            this._initOptions();
            this.btnPlus=this.element.find(this.options.btnPlus);
            this.btnMinu=this.element.find(this.options.btnMinu);
            this.input=this.element.find(this.options.input);
            this.countLock=this.element.find(this.options.countLock);
            this.enabled =  (this.options.readOnly ||  this.options.disabled) ? false : true ; //控件disable和read时不可用，默认可用
            this._initParams();	//初始化参数
            this._initEvents(); //初始化事件
        },
        _initOptions: function(){
            this.options.numMax=parseInt(this.options.numMax);
            this.options.numMin=parseInt(this.options.numMin);
        },
        /**
         * 初始化控件参数
         * @method _initParam
         * @return {Null}
         */
        _initParams : function(){
            var self=this
                , v = self.getValue() || 1;
            self.doValue(v);
            if(self.options.readOnly)
                self.read();
            if(self.options.disabled )
                self.disable();
        },
        /**
         * 初始化控件事件
         * @method _initEvents
         * @return {Null}
         */
        _initEvents	: function(){
            var self=this;
            //如果控件不可用
            if(self.enabled==false){
                return false;
            }
            self.input.on("keyup",function(){
                self.inputKeyUp();
            });
            self.btnPlus.off("click").on("click",function(){
                self.plusAct();
            })
            self.btnMinu.off("click").on("click",function(){
                self.minuAct();
            })
        },
        /**
         * 判断是否是数字,是为真，否为假
         * @method isNumber
         * @param {Number || String } num 要检验的数据
         * @return {Boolean} 布尔值
         */
        isNumber : function(num){
            if(/^\+?[1-9][0-9]*$/.test(num))
                return true;
            else
                return false;
        },
        /**
         * 有参数设置控件值，反之，返回控件值
         * @method cutValue
         * @param {Number} num 要设置的控件值
         * @return {Null || Number} 无返回值 或 整形数据
         */
        cutValue : function(num){
            if(num)
                this.setVal(num);
            else
                return parseInt($.trim(this.input.val()),10);
        },
        /**
         * 设置控件值
         * @method setVal
         * @param {Number} num 要设置的控件值
         * @return {Null} 无返回值
         */
        setVal : function(num){
            if(this.isNumber(num)){
                if(num<=this.options.numMax && num>=this.options.numMin ){
                    this.input.val(num);
                }
            }
        },
        /**
         * 获取控件值
         * @method getValue
         * @for getValue
         * @return {Number} 返回整形数据
         */
        getValue : function(){
            return parseInt($.trim(this.input.val()),10);
        },
        /**
         * 处理控件值
         * @method doValue
         * @return {Null} 无返回值
         */
        doValue : function(curValue){
            var self=this
                , opt=self.options;
            if( curValue!=="" && self.isNumber(curValue) )
                v = curValue;
            else
                v = $.trim( self.input.val());
            if(!isNaN(v)){
                if(self.isNumber(v)){
                    v=parseInt(v);
                    if(v<=opt.numMin){
                        self.btnPlus.removeClass(opt.disClass);
                        self.btnMinu.addClass(opt.disClass);
                        self.input.val(opt.numMin);
                    }else if(v>=opt.numMax){
                        self.btnMinu.removeClass(opt.disClass);
                        self.btnPlus.addClass(opt.disClass);
                        self.input.val(opt.numMax);
                    }else{
                        self.btnMinu.removeClass(opt.disClass);
                        self.btnPlus.removeClass(opt.disClass);
                        self.input.val(v);
                    };
                    return false;
                }else{
                    self.input.val(opt.numMin);
                    return false;
                };
            }else{
                var newNum= parseInt(self.input.val(),10 );
                if( self.isNumber(newNum))
                    self.input.val( newNum );
                else{
                    self.input.val( self.options.numMin );
                }
            }
        },
        /**
         * 文本输入框释放键盘按键时触发控件值改变事件
         * @method inputKeyUp
         * @return {Null} 无返回值
         */
        inputKeyUp : function(){
            this.doValue();
            this.options.btnfn.call(this,{
                event : "change",
                target: "input",
                value: this.input.val()
            });
        },
        /**
         * 加按钮事件
         * @method plusAct
         * @return {Null} 无返回值
         */
        plusAct : function(){
            if(this.btnPlus.hasClass(this.options.disClass)){
                return false;
            }
            var self=this
                , curValue=self.getValue();
            if(curValue< self.options.numMax){
                curValue++;
                self.doValue(curValue);
            }else{
                self.input.val(curValue);
            }
            self.options.btnPlusAfterEvent.call(self,{
                event : "click",
                value: curValue
            });
            self.options.btnfn.call(self,{
                event : "click",
                target: "btnPlus",
                value: curValue
            });
        },
        /**
         * 减按钮事件
         * @method minuAct
         * @return {Null} 无返回值
         */
        minuAct : function(){
            if(this.btnMinu.hasClass(this.options.disClass)){
                return false;
            }
            var self=this
                , curValue=self.getValue();
            if(curValue>self.options.numMin){
                curValue--;
                self.doValue(curValue);
            }else{
                self.input.val(curValue);
            }
            self.options.btnMinuAfterEvent.call(self,{
                event : "click",
                value: curValue
            });
            self.options.btnfn.call(self,{
                event : "click",
                target: "btnMinu",
                value: curValue
            });
        },
        /**
         * 有参数时opts,设置参数;否则,获取参数
         * @method options
         * @return {Null || Object} 无返回值 或 JSON
         */
        options : function(opts){
            if(opts)
                this.setOptions(opts);
            else
                return this.options;
        },
        /**
         * 设置控件配置参数
         * @method setOptions
         * @return {Null} 无返回值
         */
        setOptions : function(opts){
            this.options= $.extend({}, this.defaults, opts);
        },
        /**
         * 获取控件配置参数
         * @method getOptions
         * @return {Object} JSON
         */
        getOptions : function(){
            return this.options;
        },
        /**
         * 激活控件
         * @method enable
         * @return {Null} 无返回值
         */
        enable: function () {
            var opt=this.options;
            this.countLock.removeClass(opt.disClass).hide();
            this.btnPlus.removeClass(opt.disClass).on("click");
            this.btnMinu.removeClass(opt.disClass).on("click");
            this.input.removeClass(opt.disClass).on("keyup").attr("disabled",false);
            this.enabled = true ;
            this._initEvents();
        },

        /**
         * 设置控件不可用
         * @method disable
         * @return {Null} 无返回值
         */
        disable: function () {
            var opt=this.options;
            this.countLock.addClass(opt.disClass).show();
            this.btnPlus.addClass(opt.disClass).off("click");
            this.btnMinu.addClass(opt.disClass).off("click");
            this.input.addClass(opt.disClass).off("keyup").attr("disabled",true);
            this.enabled = false ;
        },
        /**
         * 设置控件只读
         * @method read
         * @return {Null} 无返回值
         */
        read : function(){
            var opt=this.options;
            this.countLock.removeClass(opt.disClass).show();
            this.btnPlus.removeClass(opt.disClass).off("click");
            this.btnMinu.removeClass(opt.disClass).off("click");
            this.input.removeClass(opt.disClass).off("keyup").attr("readonly",true);
            this.enabled = false ;
        },
        /**
         * 取消控件只读
         * @method read
         * @return {Null} 无返回值
         */
        unRead : function(){
            var opt=this.options;
            this.countLock.removeClass(opt.disClass).hide();
            this.btnPlus.removeClass(opt.disClass).on("click");
            this.btnMinu.removeClass(opt.disClass).on("click");
            this.input.removeClass(opt.disClass).on("keyup").attr("readonly",false);
            this.enabled = true ;
            this._initEvents();
        }
    }

    $.fn.gAutoNum = function (option) {
        this.each(function(){
            var $this = $(this)
                , data = $this.data('gAutoNum')
                , options = typeof option == 'object' && option
            if (!data)
                $this.data('gAutoNum', (data = new GAutoNum(this, options)))
        })
    };

})(jQuery,window);