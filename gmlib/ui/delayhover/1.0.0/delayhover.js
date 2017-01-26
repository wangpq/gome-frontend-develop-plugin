; (function ($) {

    $.fn.delayHover = function (fnOver, fnOut, duration) {

        var _this = this;

        var timeouter;
        var defaultDuration = 500;//默认500 毫秒
        var fnOver_Running = false;  //函数已经执行

        //如果duration的值非法 就重置他
        if (typeof duration != "number" ||//不是字符串
            isNaN(duration) || //NaN
            duration < 0) { //非法值
        
            duration = defaultDuration;
        }

        $(_this).hover(function (event) {
            timeouter = setTimeout(function () {
                fnOver_Running = true;
                fnOver.call(_this, event)
            }, duration);
        }, function (event) {
            clearTimeout(timeouter);
            if (fnOver_Running) {
                fnOver_Running = false;
                fnOut.call(_this, event);
            }
        });
        return $(this);
    }

})(jQuery);