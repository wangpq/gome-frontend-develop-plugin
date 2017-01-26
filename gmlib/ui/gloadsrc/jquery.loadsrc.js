;(function ($) {

    $.fn.loadsrc = function (_src) {

        _src = _src || $.fn.loadsrc.config.theSRC;

        if (this.length == 1 && (this.is('img') || this.is('iframe'))) {//一个图片元素
            changeSRC(this, _src);
        } else if (this.length >= 1) {//多个元素
            this.each(function () {
                if ($(this).is('img') || $(this).is('iframe')) {
                    changeSRC($(this), _src);
                } else {
                    $(this).find('img,iframe').each(function () {
                        changeSRC($(this), _src);
                    });
                }
            });
        }
        return this;
    }

    function changeSRC(ele, _src) {
        if (ele.data('loadsrc') == true || ele.attr(_src) == undefined) {
            return;
        }

        ele.data('loadsrc', true);
        ele.attr('src', ele.attr(_src));
    }

    $.fn.loadsrc.config = {
        theSRC: '_src'  //图片的临时路径
        //tags: ['img', 'iframe']
    }
})(jQuery);