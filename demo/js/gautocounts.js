;(function($){
    var GAutoCounts=function(element,options){
        //this._init(element,options);
        this._init.apply(this,arguments);
    }
    GAutoCounts.prototype={
        defaults:{
            /**
             * 最大长度
             * @property {Number} maxLen
             */
            maxLen: null,
            /**
             * 提示对象元素
             * @property {String} tip
             */
            tip : null,
            /**
             * 文本改变触发事件
             * @property {Function} onChange
             */
            onChange : $.noop
        },
        _init:function(element,options){  
            this.dom=element;
            this.element=$(element);
            this.options=$.extend({}, this.defaults, options);
            this.initEvents();
        },
        setOptions : function(opts){
            this.options= $.extend({}, this.defaults, opts);
        },
        getOptions : function(){
            return this.options;
        },
        initEvents : function(){ 
            var self=this;
            self.element.on("keyup",function(){ 
                self.wordCountsCheck(self.options.maxLen,$(self.options.tip),$(this) );
                self.options.onChange.call(self,self)
            }) 
        },
        /**
         * 字数限制提示
         * @method wordCountsCheck
         * @param {String} maxLen 输入文字的最大个数
         * @param {String} tip 提示文本的jquery对象
         * @param {String} textarea 文本输入框
         * @return {Null}
         */
        wordCountsCheck : function(maxLen,tip,textarea){
            var self=this
                , str=$.trim( textarea.val() )
                , data=self.getStrInfo(str,maxLen)
                , strLen=data.strLen
                , position=data.position;
            self.curValue=Math.ceil((strLen)/2);
            self.curValue>=maxLen ? textarea.val(str.substring(0,position)) : null;
            if(tip)
                tip.text(self.curValue+"/"+maxLen);
        },
        /**
         * 返回当前字符串的的字节长度和最后一个字节时的位置(即最后一个字符是第几个字符)
         */
        getStrInfo : function(str,maxstrlen){
            var strLen =0;
            for(var i= 0,len=str.length;i<len&& strLen<2*maxstrlen;i++){
                if(str.charCodeAt(i)>0&&str.charCodeAt(i)<128)
                    strLen++;
                else
                    strLen+2<=2*maxstrlen ? strLen+=2 : strLen;
            }
            return {
                strLen : strLen,
                position : i
            } 
        }

    }

    $.fn.gAutoCounts = function (option) {
        this.each(function(){
            var $this = $(this)
            , data = $this.data('gAutoCounts')
            , options = typeof option == 'object' && option

            if (!data){
                $this.data('gAutoCounts', (data = new GAutoCounts(this, options)))
            }
        })
    };

})(jQuery);